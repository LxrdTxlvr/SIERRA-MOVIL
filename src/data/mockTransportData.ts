import { LiveVehicle, ScheduledTransportRoute, StopPoint } from '../types/transport';
import { minutesToTimeString } from '../utils/geoInterpolation';

/**
 * Coordenada central: Jalpan de Serra, Querétaro (Plaza Principal y Misión)
 */
export const JALPAN_REGION = {
  latitude: 21.2177,
  longitude: -99.4716,
  latitudeDelta: 0.055,
  longitudeDelta: 0.055,
};

/**
 * Vista panorámica de toda la Sierra Gorda (para ver rutas completas a Querétaro)
 */
export const SIERRA_GORDA_OVERVIEW = {
  latitude: 21.0500,
  longitude: -99.6500,
  latitudeDelta: 1.200,
  longitudeDelta: 1.200,
};

/**
 * Taxis locales en tiempo real en Jalpan de Serra
 */
export const MOCK_LIVE_TAXIS: LiveVehicle[] = [
  {
    id: 'taxi-042',
    type: 'TAXI',
    driverName: 'Don Roberto Trejo',
    unitNumber: '042',
    plates: 'A-492-TGA',
    baseSite: 'Sitio Misión Jalpan (Plaza Principal)',
    phone: '+524412960111',
    coordinate: { latitude: 21.2185, longitude: -99.4722 },
    heading: 85,
    status: 'AVAILABLE',
    speedKmH: 22,
    lastUpdated: 'Hace 10 seg',
  },
  {
    id: 'taxi-018',
    type: 'TAXI',
    driverName: 'Juan Pablo Rubio',
    unitNumber: '018',
    plates: 'A-118-TGB',
    baseSite: 'Sitio Matamoros / Mercado Municipal',
    phone: '+524412960222',
    coordinate: { latitude: 21.2162, longitude: -99.4698 },
    heading: 140,
    status: 'AVAILABLE',
    speedKmH: 0,
    lastUpdated: 'Hace 30 seg',
  },
  {
    id: 'taxi-095',
    type: 'TAXI',
    driverName: 'Miguel Ángel Castillo',
    unitNumber: '095',
    plates: 'A-395-TGC',
    baseSite: 'Sitio Hospital General de Jalpan',
    phone: '+524412960333',
    coordinate: { latitude: 21.2260, longitude: -99.4775 },
    heading: 210,
    status: 'OCCUPIED',
    speedKmH: 45,
    lastUpdated: 'Hace 5 seg',
  },
  {
    id: 'taxi-031',
    type: 'TAXI',
    driverName: 'Carlos Mendoza',
    unitNumber: '031',
    plates: 'A-231-TGA',
    baseSite: 'Sitio Malecón Presa Jalpan',
    phone: '+524412960444',
    coordinate: { latitude: 21.2088, longitude: -99.4740 },
    heading: 320,
    status: 'AVAILABLE',
    speedKmH: 15,
    lastUpdated: 'Hace 12 seg',
  },
];

/**
 * Polyline realista de Carretera Federal 120 (Mex 120):
 * Jalpan de Serra -> Piedras Anchas -> Puerto de Ayutla -> Pinal de Amoles (Puerta del Cielo) -> Peña Blanca -> Cadereyta -> Querétaro
 */
export const POLYLINE_JALPAN_QUERETARO = [
  { latitude: 21.2177, longitude: -99.4716 }, // Terminal Jalpan
  { latitude: 21.2155, longitude: -99.4782 },
  { latitude: 21.2110, longitude: -99.4880 },
  { latitude: 21.2052, longitude: -99.5021 }, // Cruce Malecón
  { latitude: 21.1980, longitude: -99.5185 },
  { latitude: 21.1874, longitude: -99.5350 }, // Piedras Anchas
  { latitude: 21.1760, longitude: -99.5520 },
  { latitude: 21.1620, longitude: -99.5740 }, // Cañón del Chuveje (Acceso)
  { latitude: 21.1495, longitude: -99.5950 },
  { latitude: 21.1390, longitude: -99.6200 }, // Puerto del Tejocote
  { latitude: 21.1345, longitude: -99.6275 }, // Pinal de Amoles (Centro / Terminal)
  { latitude: 21.1290, longitude: -99.6450 }, // Puerta del Cielo (Mirador Cuatro Palos)
  { latitude: 21.1180, longitude: -99.6720 },
  { latitude: 21.0950, longitude: -99.7150 }, // El Rodeo
  { latitude: 21.0620, longitude: -99.7600 },
  { latitude: 21.0250, longitude: -99.8050 }, // Peña Blanca
  { latitude: 20.9500, longitude: -99.8350 }, // Higuerillas
  { latitude: 20.8400, longitude: -99.8200 }, // Vizarrón de Montes
  { latitude: 20.6980, longitude: -99.8150 }, // Cadereyta de Montes
  { latitude: 20.6050, longitude: -99.9800 }, // Bernal / Tequisquiapan junction
  { latitude: 20.5930, longitude: -100.3920 }, // Terminal Querétaro (Alameda / 5 de Feb)
];

/**
 * Polyline realista de Carretera Jalpan -> Concá -> Arroyo Seco (Mex 69)
 */
export const POLYLINE_JALPAN_CONCA = [
  { latitude: 21.2177, longitude: -99.4716 }, // Terminal Jalpan
  { latitude: 21.2260, longitude: -99.4720 },
  { latitude: 21.2380, longitude: -99.4755 },
  { latitude: 21.2580, longitude: -99.4890 }, // Cruce Salida Norte
  { latitude: 21.2850, longitude: -99.5080 },
  { latitude: 21.3200, longitude: -99.5350 },
  { latitude: 21.3550, longitude: -99.5680 }, // Presa de Concá
  { latitude: 21.3780, longitude: -99.5850 }, // Cruce Misión Concá
  { latitude: 21.4050, longitude: -99.5980 }, // Manantiales El Refugio
  { latitude: 21.4350, longitude: -99.6120 }, // Balneario Concá
  { latitude: 21.5450, longitude: -99.6920 }, // Arroyo Seco Centro
];

/**
 * Polyline realista Jalpan -> Landa de Matamoros (Mex 120 hacia Xilitla)
 */
export const POLYLINE_JALPAN_LANDA = [
  { latitude: 21.2177, longitude: -99.4716 }, // Terminal Jalpan
  { latitude: 21.2190, longitude: -99.4580 },
  { latitude: 21.2180, longitude: -99.4350 },
  { latitude: 21.2050, longitude: -99.3980 }, // Santa María de Álamos
  { latitude: 21.1980, longitude: -99.3550 }, // Tilaco access
  { latitude: 21.1850, longitude: -99.3200 }, // Misión Landa de Matamoros
];

/**
 * Paradas principales de la ruta Jalpan - Querétaro
 */
export const STOPS_JALPAN_QUERETARO: StopPoint[] = [
  { id: 'stp-jal', name: 'Terminal Central Jalpan', coordinate: { latitude: 21.2177, longitude: -99.4716 }, order: 1, isTerminal: true },
  { id: 'stp-chu', name: 'Puente El Chuveje', coordinate: { latitude: 21.1620, longitude: -99.5740 }, order: 2 },
  { id: 'stp-pin', name: 'Pinal de Amoles (Centro)', coordinate: { latitude: 21.1345, longitude: -99.6275 }, order: 3 },
  { id: 'stp-pue', name: 'Mirador Puerta del Cielo', coordinate: { latitude: 21.1290, longitude: -99.6450 }, order: 4 },
  { id: 'stp-pen', name: 'Parada Peña Blanca', coordinate: { latitude: 21.0250, longitude: -99.8050 }, order: 5 },
  { id: 'stp-cad', name: 'Terminal Cadereyta', coordinate: { latitude: 20.6980, longitude: -99.8150 }, order: 6 },
  { id: 'stp-qro', name: 'Terminal de Autobuses Querétaro (TAQ)', coordinate: { latitude: 20.5930, longitude: -100.3920 }, order: 7, isTerminal: true },
];

/**
 * Paradas principales de la ruta Jalpan - Concá
 */
export const STOPS_JALPAN_CONCA: StopPoint[] = [
  { id: 'stp-c-jal', name: 'Terminal Jalpan', coordinate: { latitude: 21.2177, longitude: -99.4716 }, order: 1, isTerminal: true },
  { id: 'stp-c-man', name: 'Manantiales de Concá', coordinate: { latitude: 21.4050, longitude: -99.5980 }, order: 2 },
  { id: 'stp-c-mis', name: 'Misión San Miguel Concá', coordinate: { latitude: 21.4350, longitude: -99.6120 }, order: 3 },
  { id: 'stp-c-arr', name: 'Plaza Principal Arroyo Seco', coordinate: { latitude: 21.5450, longitude: -99.6920 }, order: 4, isTerminal: true },
];

/**
 * Genera itinerarios dinámicos calculados respecto a la hora actual
 * para asegurar que durante la ejecución de la app SIEMPRE haya vehículos
 * visibles en movimiento en la carretera y unidades programadas.
 */
export function generateDynamicRoutes(refDate: Date = new Date()): ScheduledTransportRoute[] {
  const currentTotalMinutes = refDate.getHours() * 60 + refDate.getMinutes();

  // Salida que comenzó hace 25 minutos (en trayecto activo por la Sierra)
  const activeBusDep = minutesToTimeString(currentTotalMinutes - 25);
  // Salida que comenzó hace 15 minutos en Concá (en trayecto)
  const activeVanDep = minutesToTimeString(currentTotalMinutes - 15);
  // Próxima salida en 10 minutos (en terminal)
  const nextDeparture = minutesToTimeString(currentTotalMinutes + 10);
  // Salida posterior en 50 minutos
  const laterDeparture = minutesToTimeString(currentTotalMinutes + 50);

  return [
    {
      id: 'route-fa-120',
      routeCode: 'BUS-120',
      name: 'Jalpan de Serra - Santiago de Querétaro',
      operator: 'Flecha Amarilla / Coordinados',
      transportType: 'BUS',
      routeColor: '#2563eb', // Azul corporativo elegante
      polyline: POLYLINE_JALPAN_QUERETARO,
      stops: STOPS_JALPAN_QUERETARO,
      baseFareMxn: 320,
      itineraries: [
        {
          id: 'itin-fa-1',
          departureTime: activeBusDep,
          estimatedDurationMinutes: 180, // 3 horas a través de la sierra
          busNumber: 'Eco-1048',
          driverName: 'Héctor Balderas',
        },
        {
          id: 'itin-fa-2',
          departureTime: nextDeparture,
          estimatedDurationMinutes: 180,
          busNumber: 'Eco-1092',
          driverName: 'Martín Reséndiz',
        },
        {
          id: 'itin-fa-3',
          departureTime: laterDeparture,
          estimatedDurationMinutes: 180,
        },
      ],
    },
    {
      id: 'route-qro-conca',
      routeCode: 'QRO-69',
      name: 'Jalpan de Serra - Concá / Arroyo Seco',
      operator: 'QROride Sierra Express',
      transportType: 'QRORIDE',
      routeColor: '#7c3aed', // Púrpura moderno
      polyline: POLYLINE_JALPAN_CONCA,
      stops: STOPS_JALPAN_CONCA,
      baseFareMxn: 75,
      itineraries: [
        {
          id: 'itin-qro-1',
          departureTime: activeVanDep,
          estimatedDurationMinutes: 50,
          busNumber: 'Van QRO-08',
          driverName: 'Gabriel Pedraza',
        },
        {
          id: 'itin-qro-2',
          departureTime: nextDeparture,
          estimatedDurationMinutes: 50,
          busNumber: 'Van QRO-14',
          driverName: 'Raúl Montes',
        },
      ],
    },
    {
      id: 'route-van-landa',
      routeCode: 'VAN-120-E',
      name: 'Jalpan de Serra - Landa de Matamoros',
      operator: 'Sierra Vans Regional',
      transportType: 'QRORIDE',
      routeColor: '#059669', // Verde esmeralda
      polyline: POLYLINE_JALPAN_LANDA,
      stops: [
        { id: 'stp-l-1', name: 'Base Jalpan', coordinate: { latitude: 21.2177, longitude: -99.4716 }, order: 1, isTerminal: true },
        { id: 'stp-l-2', name: 'Misión Landa', coordinate: { latitude: 21.1850, longitude: -99.3200 }, order: 2, isTerminal: true },
      ],
      baseFareMxn: 45,
      itineraries: [
        {
          id: 'itin-van-l1',
          departureTime: minutesToTimeString(currentTotalMinutes - 10),
          estimatedDurationMinutes: 35,
          busNumber: 'Sprinter 05',
          driverName: 'Esteban Godínez',
        },
      ],
    },
  ];
}
