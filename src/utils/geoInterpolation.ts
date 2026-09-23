import { Coordinate, ScheduledTransportRoute, SimulatedVehicleState } from '../types/transport';

/**
 * Conversión de grados a radianes
 */
const toRad = (deg: number): number => (deg * Math.PI) / 180;

/**
 * Conversión de radianes a grados
 */
const toDeg = (rad: number): number => (rad * 180) / Math.PI;

/**
 * Radio de la Tierra en kilómetros
 */
const EARTH_RADIUS_KM = 6371;

/**
 * Calcula la distancia ortodrómica (Gran Círculo / Haversine) entre dos coordenadas en kilómetros
 */
export function haversineDistance(c1: Coordinate, c2: Coordinate): number {
  const dLat = toRad(c2.latitude - c1.latitude);
  const dLon = toRad(c2.longitude - c1.longitude);

  const lat1 = toRad(c1.latitude);
  const lat2 = toRad(c2.latitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_KM * c;
}

/**
 * Calcula el acimut o rumbo geodésico (Bearing) entre dos coordenadas (0° a 360°)
 * 0° / 360° = Norte, 90° = Este, 180° = Sur, 270° = Oeste
 */
export function calculateBearing(c1: Coordinate, c2: Coordinate): number {
  const lat1 = toRad(c1.latitude);
  const lat2 = toRad(c2.latitude);
  const dLon = toRad(c2.longitude - c1.longitude);

  const y = Math.sin(dLon) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

  const bearingRad = Math.atan2(y, x);
  const bearingDeg = (toDeg(bearingRad) + 360) % 360;

  return Math.round(bearingDeg * 10) / 10;
}

/**
 * Estructura de distancias acumuladas precalculadas de una Polyline
 */
export interface PolylineMetrics {
  totalDistance: number;
  segmentDistances: number[];
  cumulativeDistances: number[];
}

/**
 * Precalcula métricas de distancia sobre una polilínea para interpolación en O(log N) o O(N) eficiente
 */
export function computePolylineMetrics(polyline: Coordinate[]): PolylineMetrics {
  if (polyline.length < 2) {
    return { totalDistance: 0, segmentDistances: [], cumulativeDistances: [0] };
  }

  const segmentDistances: number[] = [];
  const cumulativeDistances: number[] = [0];
  let accumulated = 0;

  for (let i = 0; i < polyline.length - 1; i++) {
    const dist = haversineDistance(polyline[i], polyline[i + 1]);
    segmentDistances.push(dist);
    accumulated += dist;
    cumulativeDistances.push(accumulated);
  }

  return {
    totalDistance: accumulated,
    segmentDistances,
    cumulativeDistances,
  };
}

/**
 * Interpola la posición geográfica exacta y el ángulo de dirección (bearing)
 * a lo largo de una Polyline dado un progreso continuo `t` entre 0.0 y 1.0.
 */
export function interpolatePositionAlongPolyline(
  polyline: Coordinate[],
  progress: number,
  precomputedMetrics?: PolylineMetrics
): { coordinate: Coordinate; bearing: number } {
  if (!polyline || polyline.length === 0) {
    return { coordinate: { latitude: 0, longitude: 0 }, bearing: 0 };
  }

  if (polyline.length === 1) {
    return { coordinate: polyline[0], bearing: 0 };
  }

  // Normalizar t entre 0.0 y 1.0
  const t = Math.max(0, Math.min(1, progress));

  const metrics = precomputedMetrics || computePolylineMetrics(polyline);
  const { totalDistance, cumulativeDistances } = metrics;

  if (totalDistance === 0) {
    return { coordinate: polyline[0], bearing: 0 };
  }

  if (t <= 0) {
    return {
      coordinate: polyline[0],
      bearing: calculateBearing(polyline[0], polyline[1]),
    };
  }

  if (t >= 1) {
    const lastIdx = polyline.length - 1;
    return {
      coordinate: polyline[lastIdx],
      bearing: calculateBearing(polyline[lastIdx - 1], polyline[lastIdx]),
    };
  }

  const targetDist = t * totalDistance;

  // Búsqueda binaria o secuencial del segmento correspondiente
  let segmentIndex = 0;
  for (let i = 0; i < cumulativeDistances.length - 1; i++) {
    if (targetDist >= cumulativeDistances[i] && targetDist <= cumulativeDistances[i + 1]) {
      segmentIndex = i;
      break;
    }
  }

  const startCoord = polyline[segmentIndex];
  const endCoord = polyline[segmentIndex + 1];
  const segStartDist = cumulativeDistances[segmentIndex];
  const segEndDist = cumulativeDistances[segmentIndex + 1];
  const segLength = segEndDist - segStartDist;

  // Fracción dentro del segmento actual
  const segmentFactor = segLength > 0 ? (targetDist - segStartDist) / segLength : 0;

  // Interpolación lineal sobre el segmento local
  const interpolatedLat = startCoord.latitude + segmentFactor * (endCoord.latitude - startCoord.latitude);
  const interpolatedLon = startCoord.longitude + segmentFactor * (endCoord.longitude - startCoord.longitude);

  const bearing = calculateBearing(startCoord, endCoord);

  return {
    coordinate: {
      latitude: interpolatedLat,
      longitude: interpolatedLon,
    },
    bearing,
  };
}

/**
 * Convierte "HH:mm" a minutos desde la medianoche
 */
export function timeStringToMinutes(timeStr: string): number {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return (hours || 0) * 60 + (minutes || 0);
}

/**
 * Convierte minutos desde la medianoche a "HH:mm"
 */
export function minutesToTimeString(totalMinutes: number): string {
  const normalized = ((Math.floor(totalMinutes) % 1440) + 1440) % 1440;
  const hours = Math.floor(normalized / 60);
  const minutes = normalized % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

/**
 * Calcula el estado de simulación para una ruta en un instante de tiempo dado
 * Soporta unidades activas en carretera y unidades preparándose en terminal
 */
export function calculateVehicleSimulation(
  route: ScheduledTransportRoute,
  currentDate: Date = new Date(),
  metrics?: PolylineMetrics
): SimulatedVehicleState | null {
  if (!route.polyline || route.polyline.length < 2 || !route.itineraries || route.itineraries.length === 0) {
    return null;
  }

  const currentMinutes = currentDate.getHours() * 60 + currentDate.getMinutes() + currentDate.getSeconds() / 60;
  const routeMetrics = metrics || computePolylineMetrics(route.polyline);

  // 1. Buscar si hay una salida activa en tránsito
  for (const itinerary of route.itineraries) {
    const depMinutes = timeStringToMinutes(itinerary.departureTime);
    const duration = itinerary.estimatedDurationMinutes;
    const arrMinutes = depMinutes + duration;

    // Caso A: Unidad en trayecto activo
    if (currentMinutes >= depMinutes && currentMinutes <= arrMinutes) {
      const elapsed = currentMinutes - depMinutes;
      const progress = elapsed / duration;
      const { coordinate, bearing } = interpolatePositionAlongPolyline(route.polyline, progress, routeMetrics);
      const remainingMinutes = Math.max(0, Math.round(duration - elapsed));

      return {
        vehicleId: `${route.id}-${itinerary.id}`,
        routeId: route.id,
        routeName: route.name,
        operator: route.operator,
        transportType: route.transportType,
        currentCoordinate: coordinate,
        heading: bearing,
        progress,
        status: 'IN_TRANSIT',
        departureTime: itinerary.departureTime,
        estimatedArrivalTime: minutesToTimeString(arrMinutes),
        remainingMinutes,
        fare: route.baseFareMxn,
        polyline: route.polyline,
      };
    }
  }

  // 2. Si no hay una activa en tránsito, buscar la próxima salida programada dentro de las próximas 2 horas
  let closestFutureItinerary = null;
  let minDiff = Infinity;

  for (const itinerary of route.itineraries) {
    const depMinutes = timeStringToMinutes(itinerary.departureTime);
    let diff = depMinutes - currentMinutes;
    if (diff < 0) {
      // Pudo haber sido hoy más temprano o será mañana
      diff += 1440;
    }

    if (diff < minDiff) {
      minDiff = diff;
      closestFutureItinerary = itinerary;
    }
  }

  // Si está programada para salir en los próximos 45 minutos, mostrarla en terminal como "WAITING"
  if (closestFutureItinerary && minDiff <= 45) {
    const startCoord = route.polyline[0];
    const initialBearing = calculateBearing(route.polyline[0], route.polyline[1]);
    const depMinutes = timeStringToMinutes(closestFutureItinerary.departureTime);
    const arrMinutes = depMinutes + closestFutureItinerary.estimatedDurationMinutes;

    return {
      vehicleId: `${route.id}-${closestFutureItinerary.id}`,
      routeId: route.id,
      routeName: route.name,
      operator: route.operator,
      transportType: route.transportType,
      currentCoordinate: startCoord,
      heading: initialBearing,
      progress: 0,
      status: minDiff <= 15 ? 'AT_TERMINAL' : 'WAITING',
      departureTime: closestFutureItinerary.departureTime,
      estimatedArrivalTime: minutesToTimeString(arrMinutes),
      remainingMinutes: minDiff,
      fare: route.baseFareMxn,
      polyline: route.polyline,
    };
  }

  return null;
}
