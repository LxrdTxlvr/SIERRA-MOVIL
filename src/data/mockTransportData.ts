import {
  LiveVehicle,
  ScheduledTransportRoute,
  StopPoint,
  TaxiStand,
  QrorideTripPosting,
} from '../types/transport';
import { minutesToTimeString } from '../utils/geoInterpolation';
import {
  REAL_JALPAN_XILITLA_HIGHWAY,
  REAL_JALPAN_QUERETARO_HIGHWAY,
  REAL_RIOVERDE_JALPAN_HIGHWAY,
  REAL_RIOVERDE_JALPAN_XILITLA_HIGHWAY,
} from './realHighwayPolylines';

/**
 * Coordenada central: Jalpan de Serra, Querétaro (Plaza Principal y Misión Centro)
 */
export const JALPAN_REGION = {
  latitude: 21.2173,
  longitude: -99.4708,
  latitudeDelta: 0.016,
  longitudeDelta: 0.016,
};

/**
 * Vista panorámica de toda la Sierra Gorda y conexión a Querétaro / Xilitla / Rioverde
 */
export const SIERRA_GORDA_OVERVIEW = {
  latitude: 21.1500,
  longitude: -99.5500,
  latitudeDelta: 1.550,
  longitudeDelta: 1.550,
};

/**
 * Paradas oficiales y sitios de taxis en Jalpan de Serra Centro
 * El Administrador puede trasladar estos marcadores arrastrándolos directamente en el mapa.
 */
export const MOCK_TAXI_STANDS: TaxiStand[] = [
  {
    id: 'stand-xiris',
    name: 'Base Taxis Mercado Municipal',
    locationName: 'Fray Junípero Serra esq. Morelos',
    coordinate: { latitude: 21.21825, longitude: -99.47423 },
    capacity: 6,
    activeTaxisCount: 3,
    phone: '4412960100',
  },
  {
    id: 'stand-jardin',
    name: 'Base Taxis foraneos',
    locationName: 'Costado Presidencia Municipal / Misión Centro',
    coordinate: { latitude: 21.21827, longitude: -99.47482 },
    capacity: 8,
    activeTaxisCount: 4,
    phone: '4412960200',
  },
  {
    id: 'stand-mercado',
    name: 'Base Taxis Centro',
    locationName: 'Calle Juárez y Matamoros',
    coordinate: { latitude: 21.21820, longitude: -99.47398 },
    capacity: 5,
    activeTaxisCount: 2,
    phone: '4412960300',
  },
];

/**
 * Parada Oficial de Camiones Vencedor en Jalpan Centro
 */
export const VENCEDOR_JALPAN_STOP: StopPoint = {
  id: 'stp-venc-jalpan-centro',
  name: 'Parada Vencedor Jalpan Centro',
  coordinate: { latitude: 21.21715, longitude: -99.47055 },
  order: 1,
  isTerminal: true,
  operator: 'Autobuses Vencedor',
  notes: 'Punto de conexión central de la Sierra Gorda.',
};

/**
 * Directorio y unidades de Taxis y Vans en tiempo real.
 * Distribuidos espaciadamente por las calles de Jalpan para evitar empalmes.
 */
export const MOCK_LIVE_TAXIS: LiveVehicle[] = [
  {
    id: 'taxi-042',
    type: 'TAXI',
    driverName: 'Don Roberto Trejo',
    unitNumber: '042',
    plates: 'A-492-TGA',
    baseSite: 'Base Taxis Crucero Xiris (Jalpan)',
    phone: '4412960111',
    whatsapp: '524412960111',
    coordinate: { latitude: 21.21660, longitude: -99.46980 },
    heading: 90,
    status: 'AVAILABLE',
    speedKmH: 0,
    lastUpdated: 'En vivo',
    driverPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    rating: 4.95,
    totalTrips: 1420,
    vehicleModel: 'Nissan Versa 2023 (Blanco/Rojo Oficial)',
    iqtVerified: true,
    notes: 'Disponible para viajes locales y comunidades.',
  },
  {
    id: 'taxi-018',
    type: 'TAXI',
    driverName: 'Juan Pablo Rubio',
    unitNumber: '018',
    plates: 'A-118-TGB',
    baseSite: 'Base Taxis Jardín Principal',
    phone: '4412960222',
    whatsapp: '524412960222',
    coordinate: { latitude: 21.21910, longitude: -99.46820 },
    heading: 140,
    status: 'AVAILABLE',
    speedKmH: 0,
    lastUpdated: 'En vivo',
    driverPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    rating: 4.88,
    totalTrips: 980,
    vehicleModel: 'Chevrolet Aveo 2022',
    iqtVerified: true,
    notes: 'Servicio local y viajes a Pinal o Landa.',
  },
  {
    id: 'taxi-095',
    type: 'TAXI',
    driverName: 'Miguel Ángel Castillo',
    unitNumber: '095',
    plates: 'A-395-TGC',
    baseSite: 'Base Taxis Crucero Xiris',
    phone: '4412960333',
    whatsapp: '524412960333',
    coordinate: { latitude: 21.22250, longitude: -99.47180 },
    heading: 200,
    status: 'OCCUPIED',
    speedKmH: 35,
    lastUpdated: 'En vivo',
    driverPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    rating: 4.92,
    totalTrips: 1850,
    vehicleModel: 'Nissan March 2024',
    iqtVerified: true,
    notes: 'En viaje hacia Hospital General.',
  },
  {
    id: 'taxi-031',
    type: 'TAXI',
    driverName: 'Carlos Mendoza G.',
    unitNumber: '031',
    plates: 'A-231-TGA',
    baseSite: 'Base Taxis Mercado Municipal',
    phone: '4412960444',
    whatsapp: '524412960444',
    coordinate: { latitude: 21.21380, longitude: -99.47350 },
    heading: 320,
    status: 'AVAILABLE',
    speedKmH: 0,
    lastUpdated: 'En vivo',
    driverPhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    rating: 4.79,
    totalTrips: 640,
    vehicleModel: 'Nissan V-Drive 2023',
    iqtVerified: true,
    notes: 'Disponible para viajes foráneos a Landa y Xilitla.',
  },
  {
    id: 'taxi-077',
    type: 'TAXI',
    driverName: 'Ramón Velázquez Pérez',
    unitNumber: '077',
    plates: 'A-772-TGB',
    baseSite: 'Base Taxis Jardín Principal',
    phone: '4412960555',
    whatsapp: '524412960555',
    coordinate: { latitude: 21.21620, longitude: -99.46550 },
    heading: 75,
    status: 'AVAILABLE',
    speedKmH: 15,
    lastUpdated: 'En vivo',
    driverPhoto: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
    rating: 4.96,
    totalTrips: 2100,
    vehicleModel: 'Volkswagen Vento 2022',
    iqtVerified: true,
    notes: 'Concesión vigente IQT.',
  },
  {
    id: 'qro-driver-01',
    type: 'QRORIDE',
    driverName: 'Adrián Balderas Nieves',
    unitNumber: 'Van-08',
    plates: 'UKZ-941-F',
    baseSite: 'QROride Base Centro Jalpan',
    phone: '4411029876',
    whatsapp: '524411029876',
    coordinate: { latitude: 21.21520, longitude: -99.47050 },
    heading: 180,
    status: 'AVAILABLE',
    speedKmH: 0,
    lastUpdated: 'En vivo',
    driverPhoto: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=200',
    rating: 4.98,
    totalTrips: 450,
    vehicleModel: 'Toyota HiAce 2023 (14 Pasajeros)',
    iqtVerified: true,
    notes: 'Viajes Jalpan - Querétaro y Jalpan - Xilitla.',
  },
  {
    id: 'taxi-arroyo-01',
    type: 'TAXI',
    category: 'TAXI_LOCAL',
    municipality: 'ARROYO_SECO',
    hasLiveLocation: false, // Solo Directorio (sin GPS en vivo)
    driverName: 'Pedro Reséndiz Olvera',
    unitNumber: 'AS-14',
    plates: 'A-614-TGA',
    baseSite: 'Base Taxi Arroyo Seco Centro',
    phone: '4412961122',
    whatsapp: '524412961122',
    coordinate: { latitude: 21.5500, longitude: -99.6892 },
    heading: 0,
    status: 'AVAILABLE',
    speedKmH: 0,
    lastUpdated: 'Directorio',
    driverPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    rating: 4.88,
    totalTrips: 310,
    vehicleModel: 'Nissan Tsuru GSII (Oficial Arroyo)',
    iqtVerified: true,
    notes: 'Servicio en cabecera municipal de Arroyo Seco y viajes a Concá.',
  },
  {
    id: 'taxi-pinal-01',
    type: 'TAXI',
    category: 'TAXI_LOCAL',
    municipality: 'PINAL_DE_AMOLES',
    hasLiveLocation: true,
    driverName: 'Marcos Rubio Trejo',
    unitNumber: 'PA-05',
    plates: 'A-105-TGB',
    baseSite: 'Base Taxis Pinal de Amoles',
    phone: '4412965544',
    whatsapp: '524412965544',
    coordinate: { latitude: 21.1378, longitude: -99.6264 },
    heading: 45,
    status: 'AVAILABLE',
    speedKmH: 12,
    lastUpdated: 'En vivo',
    driverPhoto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
    rating: 4.94,
    totalTrips: 920,
    vehicleModel: 'Chevrolet Aveo 2023',
    iqtVerified: true,
    notes: 'Base junto a Mirador Cuatro Palos y Puente de Dios.',
  },
];

// Puntos de Parada
export const STOPS_JALPAN_XILITLA: StopPoint[] = [
  VENCEDOR_JALPAN_STOP,
  {
    id: 'stp-jx-landa',
    name: 'Misión de Landa de Matamoros Centro',
    coordinate: { latitude: 21.18500, longitude: -99.32000 },
    order: 2,
    operator: 'Vencedor / Vans',
  },
  {
    id: 'stp-jx-lobo',
    name: 'El Lobo (Gasolinera y Parada de Sierra)',
    coordinate: { latitude: 21.24800, longitude: -99.23100 },
    order: 3,
  },
  {
    id: 'stp-jx-lagunita',
    name: 'La Lagunita (Cruce Agua Zarca)',
    coordinate: { latitude: 21.26800, longitude: -99.20500 },
    order: 4,
  },
  {
    id: 'stp-jx-ahuacatlan',
    name: 'Ahuacatlán de Jesús (SLP)',
    coordinate: { latitude: 21.33200, longitude: -99.04900 },
    order: 5,
  },
  {
    id: 'stp-jx-xilitla',
    name: 'Terminal Xilitla (Jardín Hidalgo)',
    coordinate: { latitude: 21.38850, longitude: -98.98900 },
    order: 6,
    isTerminal: true,
    operator: 'Autobuses Vencedor',
  },
];

export const STOPS_SIERRA_QUERETARO: StopPoint[] = [
  VENCEDOR_JALPAN_STOP,
  { id: 'stp-chu', name: 'Puente Cascada El Chuveje', coordinate: { latitude: 21.16450, longitude: -99.57200 }, order: 2 },
  { id: 'stp-pin', name: 'Pinal de Amoles (Terminal Central)', coordinate: { latitude: 21.13480, longitude: -99.62700 }, order: 3, isTerminal: true },
  { id: 'stp-pue', name: 'Mirador Puerta del Cielo', coordinate: { latitude: 21.12750, longitude: -99.64650 }, order: 4 },
  { id: 'stp-pen', name: 'Peña Blanca (Peñamiller)', coordinate: { latitude: 21.02500, longitude: -99.80500 }, order: 5 },
  { id: 'stp-cad', name: 'Terminal Cadereyta de Montes', coordinate: { latitude: 20.69800, longitude: -99.81500 }, order: 6, isTerminal: true },
  { id: 'stp-eze', name: 'Ezequiel Montes (Centro)', coordinate: { latitude: 20.66500, longitude: -99.89800 }, order: 7 },
  { id: 'stp-sjr', name: 'Terminal San Juan del Río', coordinate: { latitude: 20.39200, longitude: -99.99800 }, order: 8, isTerminal: true },
  { id: 'stp-taq', name: 'Terminal de Autobuses Querétaro (TAQ)', coordinate: { latitude: 20.57500, longitude: -100.3650 }, order: 9, isTerminal: true },
];

export const STOPS_RIOVERDE_JALPAN_XILITLA: StopPoint[] = [
  { id: 'stp-rv-central', name: 'Terminal Central Rioverde (SLP)', coordinate: { latitude: 21.93000, longitude: -99.99600 }, order: 1, isTerminal: true },
  { id: 'stp-rv-conca', name: 'Balneario y Misión de Concá', coordinate: { latitude: 21.43500, longitude: -99.61200 }, order: 2 },
  VENCEDOR_JALPAN_STOP,
  ...STOPS_JALPAN_XILITLA.slice(1),
];

export const INITIAL_QRORIDE_POSTINGS: QrorideTripPosting[] = [
  {
    id: 'post-qro-1',
    driverName: 'Adrián Balderas Nieves',
    driverPhone: '4411029876',
    origin: 'Jalpan de Serra (Crucero Xiris)',
    destination: 'Santiago de Querétaro (Plaza Antea / 5 de Feb)',
    departureDate: 'Hoy',
    departureTime: '15:30',
    availableSeats: 3,
    farePerSeatMxn: 180,
    carModel: 'Toyota HiAce 2023 Confort',
    notes: 'Viaje directo por Pinal y Cadereyta.',
    status: 'SCHEDULED',
  },
  {
    id: 'post-qro-2',
    driverName: 'Marcos Reséndiz',
    driverPhone: '4411154321',
    origin: 'Jalpan de Serra (Jardín Principal)',
    destination: 'Xilitla, SLP (Jardín Hidalgo)',
    departureDate: 'Hoy',
    departureTime: '16:00',
    availableSeats: 4,
    farePerSeatMxn: 90,
    carModel: 'Nissan Kicks 2022',
    notes: 'Viaje por carretera Mex 120 a Xilitla.',
    status: 'SCHEDULED',
  },
  {
    id: 'post-qro-3',
    driverName: 'Lucía Trejo',
    driverPhone: '4411087654',
    origin: 'Jalpan de Serra',
    destination: 'Concá / Arroyo Seco / Rioverde',
    departureDate: 'Hoy',
    departureTime: '17:15',
    availableSeats: 4,
    farePerSeatMxn: 60,
    carModel: 'Renault Duster 2023',
    status: 'SCHEDULED',
  },
];

/**
 * Generador dinámico de rutas y horarios predeterminados con carreteras 100% sobre asfalto real
 */
export function generateDynamicRoutes(refDate: Date = new Date()): ScheduledTransportRoute[] {
  const currentTotalMinutes = refDate.getHours() * 60 + refDate.getMinutes();

  return [
    {
      id: 'route-venc-120-qro',
      routeCode: 'VENC-120',
      name: 'Jalpan de Serra - Santiago de Querétaro (Por Pinal de Amoles)',
      operator: 'Autobuses Vencedor',
      transportType: 'BUS',
      routeColor: '#059669', // Verde corporativo Vencedor
      polyline: REAL_JALPAN_QUERETARO_HIGHWAY,
      stops: STOPS_SIERRA_QUERETARO,
      baseFareMxn: 290,
      itineraries: [
        {
          id: 'itin-venc-q1',
          departureTime: minutesToTimeString(currentTotalMinutes - 35),
          estimatedDurationMinutes: 188,
          busNumber: 'Vencedor #204',
          driverName: 'Héctor Balderas',
          availableSeats: 12,
          fareMxn: 290,
        },
        {
          id: 'itin-venc-q2',
          departureTime: minutesToTimeString(currentTotalMinutes + 35),
          estimatedDurationMinutes: 188,
          busNumber: 'Vencedor #218 (Irizar i6)',
          driverName: 'Martín Reséndiz',
          availableSeats: 28,
          fareMxn: 290,
        },
      ],
    },
    {
      id: 'route-venc-xilitla',
      routeCode: 'VENC-XILITLA',
      name: 'Jalpan de Serra - Xilitla, SLP (Carretera Federal 120)',
      operator: 'Autobuses Vencedor Huasteca',
      transportType: 'BUS',
      routeColor: '#ea580c', // Naranja distintivo de la ruta a Xilitla
      polyline: REAL_JALPAN_XILITLA_HIGHWAY,
      stops: STOPS_JALPAN_XILITLA,
      baseFareMxn: 110,
      itineraries: [
        {
          id: 'itin-vx-1',
          departureTime: minutesToTimeString(currentTotalMinutes - 20),
          estimatedDurationMinutes: 107,
          busNumber: 'Vencedor #142',
          driverName: 'Raúl Trejo Sánchez',
          availableSeats: 14,
          fareMxn: 110,
        },
        {
          id: 'itin-vx-2',
          departureTime: minutesToTimeString(currentTotalMinutes + 25),
          estimatedDurationMinutes: 107,
          busNumber: 'Vencedor #156',
          driverName: 'Eustaquio Olvera',
          availableSeats: 32,
          fareMxn: 110,
        },
      ],
    },
    {
      id: 'route-fa-120',
      routeCode: 'FA-120',
      name: 'Jalpan - San Juan del Río - Querétaro (Ordinario)',
      operator: 'Flecha Amarilla / Coordinados',
      transportType: 'BUS',
      routeColor: '#2563eb', // Azul corporativo
      polyline: REAL_JALPAN_QUERETARO_HIGHWAY,
      stops: STOPS_SIERRA_QUERETARO,
      baseFareMxn: 320,
      itineraries: [
        {
          id: 'itin-fa-1',
          departureTime: minutesToTimeString(currentTotalMinutes - 15),
          estimatedDurationMinutes: 195,
          busNumber: 'Eco-1048',
          driverName: 'Gabriel Pedraza',
          availableSeats: 8,
          fareMxn: 320,
        },
      ],
    },
    {
      id: 'route-venc-rioverde-xilitla',
      routeCode: 'VENC-RV-XIL',
      name: 'Rioverde (SLP) - Jalpan - Xilitla (Corredor Huasteca/Sierra)',
      operator: 'Autobuses Vencedor Interprovincial',
      transportType: 'BUS',
      routeColor: '#7c3aed', // Púrpura regional
      polyline: REAL_RIOVERDE_JALPAN_XILITLA_HIGHWAY,
      stops: STOPS_RIOVERDE_JALPAN_XILITLA,
      baseFareMxn: 240,
      itineraries: [
        {
          id: 'itin-rv-1',
          departureTime: minutesToTimeString(currentTotalMinutes + 45),
          estimatedDurationMinutes: 240,
          busNumber: 'Vencedor #310 (Gran Confort)',
          driverName: 'Fernando Godínez',
          availableSeats: 22,
          fareMxn: 240,
        },
      ],
    },
  ];
}
