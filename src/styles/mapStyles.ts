/**
 * Estilos personalizados para react-native-maps
 * Tema Uber Minimalista Moderno (High Contrast / Clean Roads):
 * - Oculta POIs comerciales irrelevantes y ruido visual
 * - Resalta arterias y carreteras federales/estatales (Mex 120, Mex 69)
 * - Tonos neutros elegantes (gris claro, agua turquesa sutil en Presa Jalpan)
 */

export const cleanUberMapStyle = [
  {
    elementType: 'geometry',
    stylers: [{ color: '#f5f6f8' }],
  },
  {
    elementType: 'labels.icon',
    stylers: [{ visibility: 'off' }],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ color: '#525b68' }],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#ffffff' }, { weight: 3 }],
  },
  {
    featureType: 'administrative.land_parcel',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'administrative.neighborhood',
    stylers: [{ visibility: 'simplified' }],
  },
  {
    featureType: 'poi',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#e5f3e9' }], // Áreas naturales y Reserva de la Biosfera
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#ffffff' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#7b8794' }],
  },
  // Carreteras principales y Federal 120
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#cbd5e1' }, { weight: 2.2 }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#94a3b8' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#1e293b' }],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [{ color: '#e2e8f0' }],
  },
  {
    featureType: 'transit',
    stylers: [{ visibility: 'off' }],
  },
  // Cuerpos de agua (Presa Jalpan, Río Santa María, Río Jalpan)
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#c7e5f0' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#476579' }],
  },
];
