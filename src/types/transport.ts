/**
 * Definiciones de tipos para SierraTransporte
 * Módulo de Movilidad y GIS para la Sierra Gorda de Querétaro
 */

export type TransportType = 'TAXI' | 'BUS' | 'QRORIDE';

export type VehicleStatus = 
  | 'AVAILABLE'     // Taxi disponible / Libre
  | 'OCCUPIED'      // Taxi ocupado / En servicio
  | 'IN_TRANSIT'    // Autobús / Van en carretera hacia destino
  | 'AT_TERMINAL'   // En base o terminal esperando salida
  | 'WAITING';      // Próxima salida programada

export interface Coordinate {
  latitude: number;
  longitude: number;
}

/**
 * Representa un vehículo en tiempo real (Taxis y unidades con GPS activo)
 */
export interface LiveVehicle {
  id: string;
  type: 'TAXI';
  driverName: string;
  unitNumber: string;
  plates: string;
  baseSite: string; // Ej. "Sitio Misión Jalpan", "Sitio Matamoros"
  phone: string;    // Teléfono directo para enlace nativo
  coordinate: Coordinate;
  heading: number;  // Grados 0-360
  status: 'AVAILABLE' | 'OCCUPIED';
  speedKmH?: number;
  lastUpdated: string;
}

/**
 * Itinerario horario programado para transportes foráneos/regionales
 */
export interface ScheduledItinerary {
  id: string;
  departureTime: string; // Formato "HH:mm" (24 horas)
  estimatedDurationMinutes: number;
  direction?: 'OUTBOUND' | 'RETURN';
  busNumber?: string;
  driverName?: string;
}

/**
 * Parada intermedia o terminal de abordaje
 */
export interface StopPoint {
  id: string;
  name: string;
  coordinate: Coordinate;
  order: number;
  isTerminal?: boolean;
}

/**
 * Ruta fija con Polyline geométrica y horarios predefinidos
 */
export interface ScheduledTransportRoute {
  id: string;
  routeCode: string; // Ej. "JAL-QRO-120", "JAL-CON-69"
  name: string;      // Ej. "Jalpan de Serra - Querétaro (Por Pinal de Amoles)"
  operator: string;  // Ej. "Flecha Amarilla", "QROride Sierra Express", "Coordinados"
  transportType: 'BUS' | 'QRORIDE';
  routeColor: string; // Color distintivo para la Polyline en el mapa
  polyline: Coordinate[]; // Secuencia de waypoints sobre la carretera
  stops: StopPoint[];
  itineraries: ScheduledItinerary[];
  baseFareMxn: number; // Tarifa aproximada en MXN
}

/**
 * Estado dinámico de un vehículo simulado a lo largo de una ruta
 */
export interface SimulatedVehicleState {
  vehicleId: string;
  routeId: string;
  routeName: string;
  operator: string;
  transportType: 'BUS' | 'QRORIDE';
  currentCoordinate: Coordinate;
  heading: number; // Ángulo de rotación del vehículo (0-360)
  progress: number; // Porcentaje de avance de la ruta (0.0 a 1.0)
  status: 'IN_TRANSIT' | 'AT_TERMINAL' | 'WAITING';
  departureTime: string;
  estimatedArrivalTime: string;
  remainingMinutes: number;
  nextStop?: string;
  fare: number;
  polyline: Coordinate[];
}

/**
 * Filtro superior de la interfaz tipo Uber
 */
export type TransportFilter = 'ALL' | 'TAXI' | 'BUS' | 'QRORIDE';

/**
 * Entidad seleccionada actualmente para visualización en el BottomSheet
 */
export type SelectedEntity = 
  | { type: 'LIVE_VEHICLE'; data: LiveVehicle }
  | { type: 'SIMULATED_VEHICLE'; data: SimulatedVehicleState }
  | { type: 'STOP'; data: StopPoint; routeName?: string }
  | null;
