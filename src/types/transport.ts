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

export type DriverCategory = 
  | 'TAXI_LOCAL'    // Taxi Local (Jalpan, Arroyo Seco, Pinal de Amoles)
  | 'QROTAXI'       // Qrotaxi
  | 'QRORIDE'       // Qroride (viaje compartido)
  | 'QROVAN'        // QroVan (camioneta colectiva)
  | 'BUS_DRIVER';   // Chofer de Autobús

export type LocalMunicipality = 'JALPAN' | 'ARROYO_SECO' | 'PINAL_DE_AMOLES';

/**
 * Representa un vehículo en tiempo real (Taxis y unidades con GPS activo) o del directorio
 */
export interface LiveVehicle {
  id: string;
  type: 'TAXI' | 'QRORIDE';
  category?: DriverCategory;
  municipality?: LocalMunicipality;
  hasLiveLocation?: boolean; // false si sólo quiere aparecer en el directorio de choferes sin compartir GPS
  driverName: string;
  unitNumber: string;
  plates: string;
  baseSite: string; // Ej. "Base Crucero Xiris (Jalpan)", "Sitio Jardín Principal"
  phone: string;    // Teléfono directo para enlace nativo
  coordinate: Coordinate;
  heading: number;  // Grados 0-360
  status: 'AVAILABLE' | 'OCCUPIED';
  speedKmH?: number;
  lastUpdated: string;
  // Campos extendidos de perfil de conductor
  driverPhoto?: string;
  rating?: number;          // Ej. 4.9
  totalTrips?: number;       // Ej. 340
  vehicleModel?: string;     // Ej. "Nissan Versa 2023 Blanco/Rojo Querétaro"
  iqtVerified?: boolean;     // Concesión verificada ante el IQT
  whatsapp?: string;         // Número para enlace WhatsApp
  notes?: string;
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
  availableSeats?: number;
  fareMxn?: number;
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
  operator?: string; // Ej. "Autobuses Vencedor", "Flecha Amarilla", etc.
  notes?: string;
}

/**
 * Parada o sitio oficial de taxis
 */
export interface TaxiStand {
  id: string;
  name: string;
  locationName: string;
  coordinate: Coordinate;
  capacity: number;
  activeTaxisCount: number;
  phone?: string;
}

/**
 * Ruta fija con Polyline geométrica y horarios predefinidos
 */
export interface ScheduledTransportRoute {
  id: string;
  routeCode: string; // Ej. "VENC-120", "FA-120", "QRO-69"
  name: string;      // Ej. "Jalpan de Serra - Santiago de Querétaro (Vencedor)"
  operator: string;  // Ej. "Autobuses Vencedor", "Flecha Amarilla", "QROride Sierra Express"
  transportType: 'BUS' | 'QRORIDE';
  routeColor: string; // Color distintivo para la Polyline en el mapa
  polyline: Coordinate[]; // Secuencia de waypoints sobre la carretera real
  stops: StopPoint[];
  itineraries: ScheduledItinerary[];
  baseFareMxn: number; // Tarifa en MXN
}

/**
 * Publicación de viaje compartido por conductor QROride
 */
export interface QrorideTripPosting {
  id: string;
  driverName: string;
  driverPhone: string;
  origin: string;
  destination: string;
  departureDate: string;
  departureTime: string;
  availableSeats: number;
  farePerSeatMxn: number;
  carModel: string;
  notes?: string;
  status: 'SCHEDULED' | 'FULL' | 'COMPLETED';
}

/**
 * Roles de usuario del sistema SierraTransporte
 */
export type UserRole = 'PASSENGER' | 'DRIVER' | 'ADMIN';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  driverDetails?: {
    unitNumber?: string;
    plates?: string;
    concessionType?: 'TAXI' | 'QRORIDE';
    baseSite?: string;
    rating?: number;
    isAvailable?: boolean;
  };
}

/**
 * Pestañas principales de navegación
 */
export type ActiveTab = 'MAP' | 'DRIVERS' | 'ADMIN' | 'ACCOUNT';

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
  driverName?: string;
  unitNumber?: string;
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
  | { type: 'TAXI_STAND'; data: TaxiStand }
  | null;
