import React, { useState, useRef, useCallback, useMemo } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import MapView, { Polyline, PROVIDER_DEFAULT } from 'react-native-maps';
import { Crosshair, Layers, Mountain } from 'lucide-react-native';

import {
  SelectedEntity,
  TransportFilter,
  LiveVehicle,
  SimulatedVehicleState,
  StopPoint,
} from '../types/transport';
import { cleanUberMapStyle } from '../styles/mapStyles';
import {
  JALPAN_REGION,
  SIERRA_GORDA_OVERVIEW,
  MOCK_LIVE_TAXIS,
  generateDynamicRoutes,
} from '../data/mockTransportData';
import { useTransportSimulation } from '../hooks/useTransportSimulation';
import {
  TaxiMarker,
  SimulatedTransportMarker,
  StopMarker,
} from './TransportMarker';
import { HeaderControls } from './HeaderControls';
import { BottomSheetDetails } from './BottomSheetDetails';

const { width, height } = Dimensions.get('window');

export const TransportMap: React.FC = () => {
  const mapRef = useRef<MapView>(null);

  // Filtro activo y estado de búsqueda
  const [activeFilter, setActiveFilter] = useState<TransportFilter>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEntity, setSelectedEntity] = useState<SelectedEntity>(null);
  const [showPolylines, setShowPolylines] = useState<boolean>(true);

  // Carga de rutas dinámicas sincronizadas con la hora actual
  const routes = useMemo(() => generateDynamicRoutes(), []);

  // Hook del motor de simulación temporal e interpolación GIS
  const {
    simulatedVehicles,
    liveTaxis,
    allTaxisCount,
    formattedSimulatedTime,
    speedMultiplier,
    setSpeedMultiplier,
  } = useTransportSimulation({
    routes,
    initialTaxis: MOCK_LIVE_TAXIS,
    activeFilter,
    tickIntervalMs: 2000,
    initialSpeedMultiplier: 2,
  });

  // Conteo de transportes activos
  const busCount = useMemo(
    () => simulatedVehicles.filter((v) => v.transportType === 'BUS').length,
    [simulatedVehicles]
  );
  const vanCount = useMemo(
    () => simulatedVehicles.filter((v) => v.transportType === 'QRORIDE').length,
    [simulatedVehicles]
  );

  // Manejadores de selección con animación suave de cámara
  const handleSelectTaxi = useCallback((taxi: LiveVehicle) => {
    setSelectedEntity({ type: 'LIVE_VEHICLE', data: taxi });
    mapRef.current?.animateToRegion(
      {
        latitude: taxi.coordinate.latitude - 0.005, // Offset para dejar espacio al BottomSheet
        longitude: taxi.coordinate.longitude,
        latitudeDelta: 0.025,
        longitudeDelta: 0.025,
      },
      600
    );
  }, []);

  const handleSelectSimulated = useCallback((vehicle: SimulatedVehicleState) => {
    setSelectedEntity({ type: 'SIMULATED_VEHICLE', data: vehicle });
    mapRef.current?.animateToRegion(
      {
        latitude: vehicle.currentCoordinate.latitude - 0.015,
        longitude: vehicle.currentCoordinate.longitude,
        latitudeDelta: 0.065,
        longitudeDelta: 0.065,
      },
      600
    );
  }, []);

  const handleSelectStop = useCallback((stop: StopPoint, routeName: string) => {
    setSelectedEntity({ type: 'STOP', data: stop, routeName });
    mapRef.current?.animateToRegion(
      {
        latitude: stop.coordinate.latitude - 0.005,
        longitude: stop.coordinate.longitude,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      },
      600
    );
  }, []);

  const handleRecenterJalpan = useCallback(() => {
    mapRef.current?.animateToRegion(JALPAN_REGION, 700);
  }, []);

  const handleOverviewSierraGorda = useCallback(() => {
    mapRef.current?.animateToRegion(SIERRA_GORDA_OVERVIEW, 900);
  }, []);

  const handleFocusSelectedRoute = useCallback(() => {
    if (selectedEntity?.type === 'SIMULATED_VEHICLE') {
      const coords = selectedEntity.data.polyline;
      mapRef.current?.fitToCoordinates(coords, {
        edgePadding: { top: 120, right: 40, bottom: 280, left: 40 },
        animated: true,
      });
    }
  }, [selectedEntity]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* MapView a pantalla completa con estilo Uber limpio */}
      <MapView
        ref={mapRef}
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        initialRegion={JALPAN_REGION}
        customMapStyle={cleanUberMapStyle}
        showsUserLocation
        showsMyLocationButton={false}
        showsCompass={false}
        showsScale={false}
        onPress={() => setSelectedEntity(null)}
      >
        {/* Renderizado de Polylines de Carreteras (Federal 120, Estatal 69) */}
        {showPolylines &&
          routes.map((route) => (
            <Polyline
              key={route.id}
              coordinates={route.polyline}
              strokeColor={route.routeColor}
              strokeWidth={4}
              lineCap="round"
              lineJoin="round"
            />
          ))}

        {/* Renderizado de Paradas clave */}
        {showPolylines &&
          routes.flatMap((route) =>
            route.stops.map((stop) => (
              <StopMarker
                key={`${route.id}-${stop.id}`}
                stop={stop}
                routeName={route.name}
                onPress={handleSelectStop}
              />
            ))
          )}

        {/* Marcadores de Taxis en Tiempo Real (Memoizados) */}
        {liveTaxis.map((taxi) => {
          const isSelected =
            selectedEntity?.type === 'LIVE_VEHICLE' &&
            selectedEntity.data.id === taxi.id;
          return (
            <TaxiMarker
              key={taxi.id}
              taxi={taxi}
              isSelected={isSelected}
              onPress={handleSelectTaxi}
            />
          );
        })}

        {/* Marcadores de Autobuses y Vans Simulados (Memoizados) */}
        {simulatedVehicles.map((vehicle) => {
          const isSelected =
            selectedEntity?.type === 'SIMULATED_VEHICLE' &&
            selectedEntity.data.vehicleId === vehicle.vehicleId;
          return (
            <SimulatedTransportMarker
              key={vehicle.vehicleId}
              vehicle={vehicle}
              isSelected={isSelected}
              onPress={handleSelectSimulated}
            />
          );
        })}
      </MapView>

      {/* Controles Flotantes Superiores Estilo Uber */}
      <HeaderControls
        activeFilter={activeFilter}
        onSelectFilter={setActiveFilter}
        taxiCount={allTaxisCount}
        busCount={busCount}
        vanCount={vanCount}
        simulatedTimeText={formattedSimulatedTime}
        speedMultiplier={speedMultiplier}
        onChangeSpeedMultiplier={setSpeedMultiplier}
        searchQuery={searchQuery}
        onChangeSearchQuery={setSearchQuery}
      />

      {/* Botones Flotantes de Acción en el Mapa (FAB) */}
      <View style={styles.fabContainer}>
        {/* Centrar en Jalpan de Serra */}
        <TouchableOpacity
          style={styles.fabButton}
          activeOpacity={0.85}
          onPress={handleRecenterJalpan}
        >
          <Crosshair size={20} color="#0f172a" />
        </TouchableOpacity>

        {/* Vista panorámica de toda la Sierra */}
        <TouchableOpacity
          style={styles.fabButton}
          activeOpacity={0.85}
          onPress={handleOverviewSierraGorda}
        >
          <Mountain size={20} color="#0f172a" />
        </TouchableOpacity>

        {/* Alternar visibilidad de las capas de ruta */}
        <TouchableOpacity
          style={[styles.fabButton, !showPolylines && styles.fabButtonInactive]}
          activeOpacity={0.85}
          onPress={() => setShowPolylines(!showPolylines)}
        >
          <Layers size={20} color={showPolylines ? '#2563eb' : '#64748b'} />
        </TouchableOpacity>
      </View>

      {/* BottomSheet colapsable de información rápida */}
      <BottomSheetDetails
        selectedEntity={selectedEntity}
        onClose={() => setSelectedEntity(null)}
        onFocusRoute={handleFocusSelectedRoute}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  map: {
    width,
    height,
  },
  fabContainer: {
    position: 'absolute',
    right: 16,
    top: 240,
    gap: 10,
    zIndex: 15,
  },
  fabButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  fabButtonInactive: {
    backgroundColor: '#f1f5f9',
  },
});
