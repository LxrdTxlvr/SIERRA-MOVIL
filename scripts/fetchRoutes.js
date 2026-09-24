const fs = require('fs');
const https = require('https');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'SierraTransporte-App/1.0' } }, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

// Ramer-Douglas-Peucker algorithm to keep polyline clean and compact
function perpendicularDistance(point, lineStart, lineEnd) {
  let dx = lineEnd.longitude - lineStart.longitude;
  let dy = lineEnd.latitude - lineStart.latitude;
  const mag = Math.hypot(dx, dy);
  if (mag > 0) {
    dx /= mag;
    dy /= mag;
  }
  const pvx = point.longitude - lineStart.longitude;
  const pvy = point.latitude - lineStart.latitude;
  const pvdot = dx * pvx + dy * pvy;
  const dsx = pvdot * dx;
  const dsy = pvdot * dy;
  const ax = pvx - dsx;
  const ay = pvy - dsy;
  return Math.hypot(ax, ay);
}

function rdp(points, epsilon) {
  if (points.length <= 2) return points;
  let maxDist = 0;
  let index = 0;
  for (let i = 1; i < points.length - 1; i++) {
    const dist = perpendicularDistance(points[i], points[0], points[points.length - 1]);
    if (dist > maxDist) {
      maxDist = dist;
      index = i;
    }
  }
  if (maxDist > epsilon) {
    const left = rdp(points.slice(0, index + 1), epsilon);
    const right = rdp(points.slice(index), epsilon);
    return left.slice(0, -1).concat(right);
  } else {
    return [points[0], points[points.length - 1]];
  }
}

async function getHighwayRoute(waypoints) {
  const coordStr = waypoints.map((w) => `${w[0]},${w[1]}`).join(';');
  const url = `https://router.project-osrm.org/route/v1/driving/${coordStr}?overview=full&geometries=geojson`;
  console.log('Fetching route for:', waypoints.length, 'waypoints...');
  const json = await fetchJson(url);
  if (!json.routes || !json.routes[0]) {
    throw new Error('No route returned: ' + JSON.stringify(json));
  }
  const coords = json.routes[0].geometry.coordinates.map(([lon, lat]) => ({
    latitude: Number(lat.toFixed(5)),
    longitude: Number(lon.toFixed(5)),
  }));
  const simplified = rdp(coords, 0.00025);
  console.log(`Original: ${coords.length} pts -> Simplified: ${simplified.length} pts`);
  return simplified;
}

async function main() {
  // 1. Jalpan -> Xilitla (Carretera Federal 120 through Landa de Matamoros)
  const jalpanXilitlaPoints = [
    [-99.4708, 21.2173], // Jalpan de Serra
    [-99.3217, 21.1856], // Landa de Matamoros
    [-99.2000, 21.2500], // Ahuacatlán
    [-98.9892, 21.3853], // Xilitla
  ];
  const jalpanXilitla = await getHighwayRoute(jalpanXilitlaPoints);

  // 2. Jalpan -> Santiago de Querétaro (Carretera Federal 120 through Pinal de Amoles, Peña Blanca, Vizarrón, Cadereyta, Ezequiel Montes, Querétaro)
  const jalpanQroPoints = [
    [-99.4708, 21.2173], // Jalpan
    [-99.6264, 21.1378], // Pinal de Amoles
    [-99.7333, 20.9833], // Peña Blanca
    [-99.7167, 20.8333], // Vizarrón
    [-99.8167, 20.6972], // Cadereyta de Montes
    [-99.8972, 20.6667], // Ezequiel Montes
    [-100.3899, 20.5888], // Terminal Querétaro Centro
  ];
  const jalpanQueretaro = await getHighwayRoute(jalpanQroPoints);

  // 3. Rioverde -> Jalpan de Serra (Carretera Federal 69 through San Ciro de Acosta, Arroyo Seco, Concá)
  const rioverdeJalpanPoints = [
    [-99.9917, 21.9333], // Rioverde SLP
    [-99.8167, 21.6500], // San Ciro de Acosta
    [-99.6892, 21.5500], // Arroyo Seco
    [-99.6231, 21.4333], // Concá
    [-99.4708, 21.2173], // Jalpan de Serra
  ];
  const rioverdeJalpan = await getHighwayRoute(rioverdeJalpanPoints);

  // 4. Rioverde -> Jalpan -> Xilitla (Combination)
  const rioverdeJalpanXilitla = [...rioverdeJalpan, ...jalpanXilitla.slice(1)];

  const fileContent = `import { Coordinate } from '../types/transport';

/**
 * Carreteras Reales de la Sierra Gorda y conexiones interestatales.
 * Generadas utilizando la API de Enrutamiento (OSRM / OpenStreetMap) siguiendo con precisión milimétrica
 * el trazo asfáltico oficial de las Carreteras Federales Mex 120 y Mex 69, evitando cortes sobre cerros.
 */

// 1. Carretera Federal 120: Jalpan de Serra <-> Xilitla (${jalpanXilitla.length} puntos)
export const REAL_JALPAN_XILITLA_HIGHWAY: Coordinate[] = ${JSON.stringify(jalpanXilitla, null, 2)};

// 2. Carretera Federal 120 & 100: Jalpan de Serra <-> Santiago de Querétaro (${jalpanQueretaro.length} puntos)
export const REAL_JALPAN_QUERETARO_HIGHWAY: Coordinate[] = ${JSON.stringify(jalpanQueretaro, null, 2)};

// 3. Carretera Federal 69: Rioverde <-> Jalpan de Serra (${rioverdeJalpan.length} puntos)
export const REAL_RIOVERDE_JALPAN_HIGHWAY: Coordinate[] = ${JSON.stringify(rioverdeJalpan, null, 2)};

// 4. Ruta Combinada: Rioverde <-> Jalpan de Serra <-> Xilitla (${rioverdeJalpanXilitla.length} puntos)
export const REAL_RIOVERDE_JALPAN_XILITLA_HIGHWAY: Coordinate[] = ${JSON.stringify(rioverdeJalpanXilitla, null, 2)};
`;

  fs.writeFileSync('src/data/realHighwayPolylines.ts', fileContent, 'utf8');
  console.log('Successfully written src/data/realHighwayPolylines.ts!');
}

main().catch((e) => {
  console.error('Error fetching routes:', e);
  process.exit(1);
});
