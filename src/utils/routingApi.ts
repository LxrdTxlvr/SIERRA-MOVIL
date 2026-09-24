import { Coordinate } from '../types/transport';

/**
 * Servicio de API de Enrutamiento (Routing API) para SierraTransporte.
 * Soporta OSRM (Open Source Routing Machine) sin necesidad de API key
 * y Geoapify Routing API si se suministra EXPO_PUBLIC_GEOAPIFY_API_KEY en .env.
 */

const GEOAPIFY_API_KEY = process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY || '';

interface RouteResult {
  polyline: Coordinate[];
  distanceKm: number;
  durationMinutes: number;
}

const memoryRouteCache = new Map<string, RouteResult>();

export async function fetchRealDrivingRoute(
  start: Coordinate,
  end: Coordinate
): Promise<RouteResult | null> {
  const cacheKey = `${start.latitude.toFixed(4)},${start.longitude.toFixed(4)}->${end.latitude.toFixed(4)},${end.longitude.toFixed(4)}`;
  if (memoryRouteCache.has(cacheKey)) {
    return memoryRouteCache.get(cacheKey)!;
  }

  // 1. Intentar Geoapify si hay API Key configurada en .env
  if (GEOAPIFY_API_KEY && !GEOAPIFY_API_KEY.includes('tu-clave')) {
    try {
      const url = `https://api.geoapify.com/v1/routing?waypoints=${start.latitude},${start.longitude}|${end.latitude},${end.longitude}&mode=drive&apiKey=${GEOAPIFY_API_KEY}`;
      const res = await fetch(url);
      const json = await res.json();

      if (json.features && json.features[0]) {
        const feature = json.features[0];
        const rawCoords: [number, number][] = feature.geometry.coordinates[0];
        const polyline: Coordinate[] = rawCoords.map(([lon, lat]) => ({
          latitude: lat,
          longitude: lon,
        }));
        const distanceKm = Number(((feature.properties.distance || 0) / 1000).toFixed(1));
        const durationMinutes = Math.round((feature.properties.time || 0) / 60);

        const result: RouteResult = { polyline, distanceKm, durationMinutes };
        memoryRouteCache.set(cacheKey, result);
        return result;
      }
    } catch (e) {
      console.warn('Geoapify falló, recurriendo a OSRM:', e);
    }
  }

  // 2. Usar OSRM (Open Source Routing Machine) que es gratuito y no requiere API Key
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${start.longitude},${start.latitude};${end.longitude},${end.latitude}?overview=full&geometries=geojson`;
    const res = await fetch(url);
    const json = await res.json();

    if (json.routes && json.routes[0]) {
      const route = json.routes[0];
      const rawCoords: [number, number][] = route.geometry.coordinates;
      const polyline: Coordinate[] = rawCoords.map(([lon, lat]) => ({
        latitude: lat,
        longitude: lon,
      }));
      const distanceKm = Number((route.distance / 1000).toFixed(1));
      const durationMinutes = Math.round(route.duration / 60);

      const result: RouteResult = { polyline, distanceKm, durationMinutes };
      memoryRouteCache.set(cacheKey, result);
      return result;
    }
  } catch (err) {
    console.warn('Error al calcular ruta con OSRM:', err);
  }

  return null;
}
