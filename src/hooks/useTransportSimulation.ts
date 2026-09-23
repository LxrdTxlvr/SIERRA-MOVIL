import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import {
  LiveVehicle,
  ScheduledTransportRoute,
  SimulatedVehicleState,
  TransportFilter,
} from '../types/transport';
import {
  calculateVehicleSimulation,
  computePolylineMetrics,
  PolylineMetrics,
} from '../utils/geoInterpolation';

interface UseTransportSimulationProps {
  routes: ScheduledTransportRoute[];
  initialTaxis: LiveVehicle[];
  activeFilter: TransportFilter;
  tickIntervalMs?: number;
  initialSpeedMultiplier?: number;
}

export function useTransportSimulation({
  routes,
  initialTaxis,
  activeFilter,
  tickIntervalMs = 2000,
  initialSpeedMultiplier = 2, // 2x por defecto para apreciar el desplazamiento en pantalla
}: UseTransportSimulationProps) {
  // Reloj simulado que permite acelerar la demostración o mantenerse en tiempo real
  const [simulatedTime, setSimulatedTime] = useState<Date>(() => new Date());
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(initialSpeedMultiplier);
  const [liveTaxis, setLiveTaxis] = useState<LiveVehicle[]>(initialTaxis);
  const [simulatedVehicles, setSimulatedVehicles] = useState<SimulatedVehicleState[]>([]);

  // Precomputar métricas de las polilíneas una sola vez en memoria (O(1) en cada tick)
  const routeMetricsMap = useMemo(() => {
    const map = new Map<string, PolylineMetrics>();
    for (const route of routes) {
      map.set(route.id, computePolylineMetrics(route.polyline));
    }
    return map;
  }, [routes]);

  const lastTickTimestampRef = useRef<number>(Date.now());

  // Función de actualización de posiciones
  const updateSimulationTick = useCallback(() => {
    const now = Date.now();
    const realDeltaSeconds = (now - lastTickTimestampRef.current) / 1000;
    lastTickTimestampRef.current = now;

    // Avanzar reloj simulado según el factor multiplicador
    setSimulatedTime((prevTime) => {
      const advancedTime = new Date(prevTime.getTime() + realDeltaSeconds * 1000 * speedMultiplier);
      
      // Calcular nuevo estado para cada ruta
      const nextSimulatedVehicles: SimulatedVehicleState[] = [];
      for (const route of routes) {
        const metrics = routeMetricsMap.get(route.id);
        const state = calculateVehicleSimulation(route, advancedTime, metrics);
        if (state) {
          nextSimulatedVehicles.push(state);
        }
      }
      setSimulatedVehicles(nextSimulatedVehicles);

      return advancedTime;
    });

    // Simulación de micro-movimiento orgánico en taxis disponibles (drift controlado en el centro)
    setLiveTaxis((prevTaxis) =>
      prevTaxis.map((taxi) => {
        if (taxi.status === 'OCCUPIED') {
          // El taxi ocupado se desplaza ligeramente en su rumbo
          const rad = (taxi.heading * Math.PI) / 180;
          const deltaLat = Math.cos(rad) * 0.00008;
          const deltaLon = Math.sin(rad) * 0.00008;
          return {
            ...taxi,
            coordinate: {
              latitude: taxi.coordinate.latitude + deltaLat,
              longitude: taxi.coordinate.longitude + deltaLon,
            },
          };
        }
        return taxi;
      })
    );
  }, [routes, routeMetricsMap, speedMultiplier]);

  // Intervalo de simulación optimizado sin saturar el hilo JS
  useEffect(() => {
    lastTickTimestampRef.current = Date.now();
    // Ejecutar tick inicial inmediato
    updateSimulationTick();

    const intervalId = setInterval(() => {
      updateSimulationTick();
    }, tickIntervalMs);

    return () => clearInterval(intervalId);
  }, [tickIntervalMs, updateSimulationTick]);

  // Filtrado de vehículos activos según la píldora de filtro seleccionada
  const filteredTaxis = useMemo(() => {
    if (activeFilter === 'BUS' || activeFilter === 'QRORIDE') {
      return [];
    }
    return liveTaxis;
  }, [liveTaxis, activeFilter]);

  const filteredSimulatedVehicles = useMemo(() => {
    if (activeFilter === 'TAXI') {
      return [];
    }
    if (activeFilter === 'BUS') {
      return simulatedVehicles.filter((v) => v.transportType === 'BUS');
    }
    if (activeFilter === 'QRORIDE') {
      return simulatedVehicles.filter((v) => v.transportType === 'QRORIDE');
    }
    return simulatedVehicles;
  }, [simulatedVehicles, activeFilter]);

  // Formato de hora simulada "HH:mm:ss"
  const formattedSimulatedTime = useMemo(() => {
    return simulatedTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  }, [simulatedTime]);

  return {
    simulatedVehicles: filteredSimulatedVehicles,
    liveTaxis: filteredTaxis,
    allSimulatedCount: simulatedVehicles.length,
    allTaxisCount: liveTaxis.length,
    simulatedTime,
    formattedSimulatedTime,
    speedMultiplier,
    setSpeedMultiplier,
    triggerManualTick: updateSimulationTick,
  };
}
