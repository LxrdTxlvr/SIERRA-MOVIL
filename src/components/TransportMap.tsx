import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Alert,
} from 'react-native';
import MapView, { Polyline, PROVIDER_DEFAULT } from 'react-native-maps';
import { Crosshair, Layers, Mountain } from 'lucide-react-native';

import {
  SelectedEntity,
  TransportFilter,
  LiveVehicle,
  SimulatedVehicleState,
  StopPoint,
  TaxiStand,
  ScheduledTransportRoute,
  UserRole,
} from '../types/transport';
import { cleanUberMapStyle } from '../styles/mapStyles';
import {
  JALPAN_REGION,
  SIERRA_GORDA_OVERVIEW,
  MOCK_LIVE_TAXIS,
  MOCK_TAXI_STANDS,
} from '../data/mockTransportData';
import { useTransportSimulation } from '../hooks/useTransportSimulation';
import {
  TaxiMarker,
  SimulatedTransportMarker,
  StopMarker,
  TaxiStandMarker,
} from './TransportMarker';
import { HeaderControls } from './HeaderControls';
import { BottomSheetDetails } from './BottomSheetDetails';

const { width, height } = Dimensions.get('window');

interface TransportMapProps {
  routes: ScheduledTransportRoute[];
  taxiStands?: TaxiStand[];
  liveTaxisList?: LiveVehicle[];
  onOpenProfile: (driver: LiveVehicle) => void;
  onOpenAuth: () => void;
  userRole: UserRole;
  onMoveTaxiStand?: (standId: string, coordinate: { latitude: number; longitude: number }) => void;
  focusedVehicle?: LiveVehicle | null;
}

export const TransportMap: React.FC<TransportMapProps> = ({
  routes,
  taxiStands = MOCK_TAXI_STANDS,
  liveTaxisList = MOCK_LIVE_TAXIS,
  onOpenProfile,
  onOpenAuth,
  userRole,
  onMoveTaxiStand,
  focusedVehicle,
}) => {
  const mapRef = useRef<MapView>(null);

  // Filtro activo y estado de búsqueda
  const [activeFilter, setActiveFilter] = useState<TransportFilter>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEntity, setSelectedEntity] = useState<SelectedEntity>(null);
  const [showPolylines, setShowPolylines] = useState<boolean>(true);

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
    initialTaxis: liveTaxisList,
    activeFilter,
    tickIntervalMs: 2000,
    initialSpeedMultiplier: 2,
  });

  // Si se solicita enfocar un conductor específico desde el directorio ("Ubicar unidad en el mapa")
  useEffect(() => {
    if (focusedVehicle && focusedVehicle.hasLiveLocation !== false) {
      setSelectedEntity({ type: 'LIVE_VEHICLE', data: focusedVehicle });
      mapRef.current?.animateToRegion(
        {
          latitude: focusedVehicle.coordinate.latitude - 0.0015,
          longitude: focusedVehicle.coordinate.longitude,
          latitudeDelta: 0.006,
          longitudeDelta: 0.006,
        },
        550
      );
    }
  }, [focusedVehicle]);

  const busCount = useMemo(
    () => simulatedVehicles.filter((v) => v.transportType === 'BUS').length,
    [simulatedVehicles]
  );
  const vanCount = useMemo(
    () => simulatedVehicles.filter((v) => v.transportType === 'QRORIDE').length,
    [simulatedVehicles]
  );

  // Manejadores directos de toque sobre CADA pin en el mapa
  const handleSelectTaxi = useCallback((taxi: LiveVehicle) => {
    setSelectedEntity({ type: 'LIVE_VEHICLE', data: taxi });
    mapRef.current?.animateToRegion(
      {
        latitude: taxi.coordinate.latitude - 0.002,
        longitude: taxi.coordinate.longitude,
        latitudeDelta: 0.012,
        longitudeDelta: 0.012,
      },
      450
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
      450
    );
  }, []);

  const handleSelectStop = useCallback((stop: StopPoint, routeName: string) => {
    setSelectedEntity({ type: 'STOP', data: stop, routeName });
    mapRef.current?.animateToRegion(
      {
        latitude: stop.coordinate.latitude - 0.003,
        longitude: stop.coordinate.longitude,
        latitudeDelta: 0.018,
        longitudeDelta: 0.018,
      },
      450
    );
  }, []);

  const handleSelectStand = useCallback((stand: TaxiStand) => {
    setSelectedEntity({ type: 'TAXI_STAND', data: stand });
    mapRef.current?.animateToRegion(
      {
        latitude: stand.coordinate.latitude - 0.002,
        longitude: stand.coordinate.longitude,
        latitudeDelta: 0.010,
        longitudeDelta: 0.010,
      },
      450
    );
  }, []);

  const handleRecenterJalpan = useCallback(() => {
    mapRef.current?.animateToRegion(JALPAN_REGION, 600);
  }, []);

  const handleOverviewSierraGorda = useCallback(() => {
    mapRef.current?.animateToRegion(SIERRA_GORDA_OVERVIEW, 700);
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

  const handleMoveStand = useCallback(
    (standId: string, coordinate: { latitude: number; longitude: number }) => {
      onMoveTaxiStand?.(standId, coordinate);
      Alert.alert(
        '📍 Ubicación de Base Actualizada',
        `Nuevas coordenadas guardadas: Lat ${coordinate.latitude.toFixed(5)}, Lon ${coordinate.longitude.toFixed(5)}`
      );
    },
    [onMoveTaxiStand]
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* MapView a pantalla completa */}
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
        onPress={(e) => {
          // Ignorar toques sobre marcadores para no deseleccionar la ficha
          const action = (e.nativeEvent as any)?.action;
          if (action === 'marker-press' || action === 'polygon-press' || action === 'polyline-press') {
            return;
          }
          setSelectedEntity(null);
        }}
      >
        {/* Polylines de Carreteras Reales obtenidas con API de Enrutamiento (Mex 120, Mex 69) */}
        {showPolylines &&
          routes.map((route) => (
            <Polyline
              key={route.id}
              coordinates={route.polyline}
              strokeColor={route.routeColor}
              strokeWidth={4.5}
              lineCap="round"
              lineJoin="round"
            />
          ))}

        {/* Paradas oficiales a lo largo de las carreteras */}
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

        {/* Bases de Taxis oficiales (arrastrables si es Administrador) */}
        {taxiStands.map((stand) => (
          <TaxiStandMarker
            key={stand.id}
            stand={stand}
            onPress={handleSelectStand}
            isAdmin={userRole === 'ADMIN'}
            onMove={handleMoveStand}
          />
        ))}

        {/* Marcadores de Taxis en Tiempo Real con GPS activo */}
        {liveTaxis
          .filter((t) => t.hasLiveLocation !== false)
          .map((taxi) => {
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

        {/* Marcadores de Autobuses y Vans en carretera */}
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
        onOpenAuth={onOpenAuth}
        userRole={userRole}
      />

      {/* Botones Flotantes de Navegación Rápida en el Mapa */}
      <View style={styles.fabContainer}>
        {/* Centrar en Jalpan Centro */}
        <TouchableOpacity
          style={styles.fabButton}
          activeOpacity={0.85}
          onPress={handleRecenterJalpan}
        >
          <Crosshair size={20} color="#0f172a" />
        </TouchableOpacity>

        {/* Vista panorámica de toda la Sierra y conexiones */}
        <TouchableOpacity
          style={styles.fabButton}
          activeOpacity={0.85}
          onPress={handleOverviewSierraGorda}
        >
          <Mountain size={20} color="#0f172a" />
        </TouchableOpacity>

        {/* Alternar visibilidad de carreteras */}
        <TouchableOpacity
          style={[styles.fabButton, !showPolylines && styles.fabButtonInactive]}
          activeOpacity={0.85}
          onPress={() => setShowPolylines(!showPolylines)}
        >
          <Layers size={20} color={showPolylines ? '#2563eb' : '#64748b'} />
        </TouchableOpacity>
      </View>

      {/* BottomSheet colapsable que se abre al tocar CUALQUIER pin en el mapa */}
      <BottomSheetDetails
        selectedEntity={selectedEntity}
        onClose={() => setSelectedEntity(null)}
        onFocusRoute={handleFocusSelectedRoute}
        onViewDriverProfile={onOpenProfile}
        userRole={userRole}
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
    right: 14,
    top: 240,
    gap: 10,
    zIndex: 15,
  },
  fabButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
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
