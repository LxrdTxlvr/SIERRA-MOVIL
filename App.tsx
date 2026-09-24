import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  Map,
  Users,
  SlidersHorizontal,
  UserCheck,
} from 'lucide-react-native';

import {
  ActiveTab,
  LiveVehicle,
  ScheduledTransportRoute,
  QrorideTripPosting,
  UserProfile,
  TaxiStand,
  StopPoint,
} from './src/types/transport';
import {
  generateDynamicRoutes,
  MOCK_LIVE_TAXIS,
  MOCK_TAXI_STANDS,
  INITIAL_QRORIDE_POSTINGS,
} from './src/data/mockTransportData';

import { TransportMap } from './src/components/TransportMap';
import { DriverDirectoryPanel } from './src/components/DriverDirectoryPanel';
import { AdminPanel } from './src/components/AdminPanel';
import { DriverProfileModal } from './src/components/DriverProfileModal';
import { AuthModal } from './src/components/AuthModal';
import { supabaseService } from './src/services/supabaseService';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('MAP');

  // Estado de rutas e itinerarios por carretera real
  const [routes, setRoutes] = useState<ScheduledTransportRoute[]>(() =>
    generateDynamicRoutes()
  );

  // Bases y Sitios de Taxis (reubicables por Administrador)
  const [taxiStands, setTaxiStands] = useState<TaxiStand[]>(MOCK_TAXI_STANDS);

  // Directorio de Conductores
  const [drivers, setDrivers] = useState<LiveVehicle[]>(MOCK_LIVE_TAXIS);

  // Viajes compartidos QROride
  const [qroridePostings, setQroridePostings] = useState<QrorideTripPosting[]>(
    INITIAL_QRORIDE_POSTINGS
  );

  // Perfil del usuario activo (por defecto PASAJERO / PÚBLICO sin requerir cuenta)
  const [currentUser, setCurrentUser] = useState<UserProfile>({
    id: 'passenger-guest',
    name: 'Pasajero',
    email: '',
    phone: '',
    role: 'PASSENGER', // Acceso libre sin login
  });

  // Modales
  const [selectedDriverForProfile, setSelectedDriverForProfile] = useState<LiveVehicle | null>(null);
  const [authModalVisible, setAuthModalVisible] = useState<boolean>(false);
  const [focusedDriver, setFocusedDriver] = useState<LiveVehicle | null>(null);

  // Sincronización inicial con Supabase (con respaldo automático si no hay llaves)
  useEffect(() => {
    async function loadData() {
      try {
        const [fetchedDrivers, fetchedStands, fetchedRoutes, fetchedTrips] = await Promise.all([
          supabaseService.fetchDrivers(),
          supabaseService.fetchTaxiStands(),
          supabaseService.fetchRoutes(),
          supabaseService.fetchQrorideTrips(),
        ]);
        if (fetchedDrivers && fetchedDrivers.length > 0) setDrivers(fetchedDrivers);
        if (fetchedStands && fetchedStands.length > 0) setTaxiStands(fetchedStands);
        if (fetchedRoutes && fetchedRoutes.length > 0) setRoutes(fetchedRoutes);
        if (fetchedTrips && fetchedTrips.length > 0) setQroridePostings(fetchedTrips);
      } catch (err) {
        console.warn('Uso de catálogo local activo:', err);
      }
    }
    loadData();
  }, []);

  // Handlers para Administración
  const handleAddItinerary = async (
    routeId: string,
    newItin: {
      departureTime: string;
      busNumber: string;
      driverName: string;
      availableSeats: number;
      fareMxn: number;
    }
  ) => {
    const id = `itin-custom-${Date.now()}`;
    setRoutes((prevRoutes) =>
      prevRoutes.map((r) => {
        if (r.id === routeId) {
          return {
            ...r,
            itineraries: [
              ...r.itineraries,
              {
                id,
                departureTime: newItin.departureTime,
                estimatedDurationMinutes: 180,
                busNumber: newItin.busNumber,
                driverName: newItin.driverName,
                availableSeats: newItin.availableSeats,
                fareMxn: newItin.fareMxn,
              },
            ],
          };
        }
        return r;
      })
    );
    await supabaseService.addItinerary(routeId, newItin);
  };

  const handleDeleteItinerary = async (routeId: string, itineraryId: string) => {
    setRoutes((prevRoutes) =>
      prevRoutes.map((r) => {
        if (r.id === routeId) {
          return {
            ...r,
            itineraries: r.itineraries.filter((it) => it.id !== itineraryId),
          };
        }
        return r;
      })
    );
    await supabaseService.deleteItinerary(itineraryId);
  };

  const handleAddDriver = async (newDriver: Omit<LiveVehicle, 'lastUpdated'>) => {
    const fullDriver: LiveVehicle = { ...newDriver, lastUpdated: 'En vivo' };
    setDrivers((prev) => [fullDriver, ...prev]);
    await supabaseService.addDriver(newDriver);
  };

  const handleAddStop = async (routeId: string, stop: Omit<StopPoint, 'id'>) => {
    const newStop: StopPoint = { ...stop, id: `stp-${Date.now()}` };
    setRoutes((prev) =>
      prev.map((r) => (r.id === routeId ? { ...r, stops: [...r.stops, newStop] } : r))
    );
    await supabaseService.addRouteStop(routeId, stop);
  };

  const handleMoveTaxiStand = async (
    standId: string,
    coordinate: { latitude: number; longitude: number }
  ) => {
    setTaxiStands((prev) =>
      prev.map((s) => (s.id === standId ? { ...s, coordinate } : s))
    );
    await supabaseService.updateTaxiStandLocation(standId, coordinate);
  };

  // Ubicar conductor en el mapa desde el directorio con zoom
  const handleLocateDriverOnMap = (driver: LiveVehicle) => {
    setSelectedDriverForProfile(null);
    setFocusedDriver(driver);
    setActiveTab('MAP');
  };

  // Registro de nuevo conductor en el sistema
  const handleRegisterDriver = (newDriver: LiveVehicle) => {
    setDrivers((prev) => [newDriver, ...prev]);
    if (newDriver.hasLiveLocation !== false) {
      setFocusedDriver(newDriver);
      setActiveTab('MAP');
    } else {
      setActiveTab('DRIVERS');
    }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {/* Vista Activa */}
        <View style={styles.content}>
          {activeTab === 'MAP' && (
            <TransportMap
              routes={routes}
              taxiStands={taxiStands}
              liveTaxisList={drivers}
              onOpenProfile={(driver) => setSelectedDriverForProfile(driver)}
              onOpenAuth={() => setAuthModalVisible(true)}
              userRole={currentUser.role}
              onMoveTaxiStand={handleMoveTaxiStand}
              focusedVehicle={focusedDriver}
            />
          )}

          {activeTab === 'DRIVERS' && (
            <DriverDirectoryPanel
              drivers={drivers}
              taxiStands={taxiStands}
              onSelectDriver={(driver) => setSelectedDriverForProfile(driver)}
              onLocateDriver={handleLocateDriverOnMap}
            />
          )}

          {activeTab === 'ADMIN' && (
            <AdminPanel
              currentRole={currentUser.role}
              routes={routes}
              drivers={drivers}
              qroridePostings={qroridePostings}
              onAddItinerary={handleAddItinerary}
              onDeleteItinerary={handleDeleteItinerary}
              onAddDriver={handleAddDriver}
              onAddStop={handleAddStop}
              onOpenAuth={() => setAuthModalVisible(true)}
            />
          )}
        </View>

        {/* Barra de Navegación Inferior Flotante / Tab Bar */}
        <SafeAreaView style={styles.bottomNavContainer}>
          <View style={styles.bottomNav}>
            {/* Tab 1: Mapa */}
            <TouchableOpacity
              style={[
                styles.navItem,
                activeTab === 'MAP' && styles.navItemActive,
              ]}
              onPress={() => setActiveTab('MAP')}
              activeOpacity={0.75}
            >
              <Map
                size={20}
                color={activeTab === 'MAP' ? '#0f172a' : '#64748b'}
              />
              <Text
                style={[
                  styles.navText,
                  activeTab === 'MAP' && styles.navTextActive,
                ]}
                numberOfLines={1}
              >
                Mapa
              </Text>
            </TouchableOpacity>

            {/* Tab 2: Choferes */}
            <TouchableOpacity
              style={[
                styles.navItem,
                activeTab === 'DRIVERS' && styles.navItemActive,
              ]}
              onPress={() => setActiveTab('DRIVERS')}
              activeOpacity={0.75}
            >
              <Users
                size={20}
                color={activeTab === 'DRIVERS' ? '#0f172a' : '#64748b'}
              />
              <Text
                style={[
                  styles.navText,
                  activeTab === 'DRIVERS' && styles.navTextActive,
                ]}
                numberOfLines={1}
              >
                Choferes
              </Text>
            </TouchableOpacity>

            {/* Tab 3: Horarios / Admin */}
            <TouchableOpacity
              style={[
                styles.navItem,
                activeTab === 'ADMIN' && styles.navItemActive,
              ]}
              onPress={() => setActiveTab('ADMIN')}
              activeOpacity={0.75}
            >
              <SlidersHorizontal
                size={20}
                color={activeTab === 'ADMIN' ? '#0f172a' : '#64748b'}
              />
              <Text
                style={[
                  styles.navText,
                  activeTab === 'ADMIN' && styles.navTextActive,
                ]}
                numberOfLines={1}
              >
                Horarios
              </Text>
            </TouchableOpacity>

            {/* Tab 4: Acceso / Cuenta */}
            <TouchableOpacity
              style={[
                styles.navItem,
                currentUser.role === 'ADMIN' && styles.navItemAdmin,
              ]}
              onPress={() => setAuthModalVisible(true)}
              activeOpacity={0.75}
            >
              <UserCheck
                size={20}
                color={currentUser.role === 'ADMIN' ? '#9333ea' : '#64748b'}
              />
              <Text
                style={[
                  styles.navText,
                  currentUser.role === 'ADMIN' && { color: '#9333ea', fontWeight: '800' },
                ]}
                numberOfLines={1}
              >
                {currentUser.role === 'ADMIN' ? 'Admin' : 'Acceso'}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        {/* Modal de Perfil de Conductor */}
        <DriverProfileModal
          visible={!!selectedDriverForProfile}
          driver={selectedDriverForProfile}
          onClose={() => setSelectedDriverForProfile(null)}
          onLocateOnMap={handleLocateDriverOnMap}
        />

        {/* Modal de Autenticación y Registro de Conductor */}
        <AuthModal
          visible={authModalVisible}
          currentUser={currentUser}
          onClose={() => setAuthModalVisible(false)}
          onUpdateUser={setCurrentUser}
          onRegisterDriver={handleRegisterDriver}
        />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  content: {
    flex: 1,
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    pointerEvents: 'box-none',
  },
  bottomNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginBottom: Platform.OS === 'ios' ? 4 : 12,
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    borderRadius: 14,
    gap: 3,
  },
  navItemActive: {
    backgroundColor: '#f1f5f9',
  },
  navItemAdmin: {
    backgroundColor: '#faf5ff',
    borderWidth: 1,
    borderColor: '#e9d5ff',
  },
  navText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748b',
  },
  navTextActive: {
    color: '#0f172a',
    fontWeight: '800',
  },
});
