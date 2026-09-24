import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Linking,
  Alert,
  Image,
} from 'react-native';
import {
  Search,
  Phone,
  Car,
  MapPin,
  Star,
  ShieldCheck,
  ChevronRight,
  PhoneCall,
  UserCheck,
} from 'lucide-react-native';
import { LiveVehicle, TaxiStand } from '../types/transport';

interface DriverDirectoryPanelProps {
  drivers: LiveVehicle[];
  taxiStands: TaxiStand[];
  onSelectDriver: (driver: LiveVehicle) => void;
  onLocateDriver: (driver: LiveVehicle) => void;
}

export const DriverDirectoryPanel: React.FC<DriverDirectoryPanelProps> = ({
  drivers,
  taxiStands,
  onSelectDriver,
  onLocateDriver,
}) => {
  const [search, setSearch] = useState('');
  const [selectedSiteFilter, setSelectedSiteFilter] = useState<string>('ALL');

  // Filtros de base/sitio
  const siteFilters = [
    { id: 'ALL', label: 'Todos' },
    { id: 'Xiris', label: 'Sitio Xiris' },
    { id: 'Jardín', label: 'Sitio Jardín' },
    { id: 'Mercado', label: 'Sitio Mercado' },
    { id: 'QRORIDE', label: 'QROride' },
  ];

  const filteredDrivers = useMemo(() => {
    return drivers.filter((driver) => {
      const matchSearch =
        driver.driverName.toLowerCase().includes(search.toLowerCase()) ||
        driver.unitNumber.toLowerCase().includes(search.toLowerCase()) ||
        driver.phone.includes(search) ||
        driver.baseSite.toLowerCase().includes(search.toLowerCase());

      if (!matchSearch) return false;

      if (selectedSiteFilter === 'ALL') return true;
      if (selectedSiteFilter === 'QRORIDE') return driver.type === 'QRORIDE';
      return driver.baseSite.toLowerCase().includes(selectedSiteFilter.toLowerCase());
    });
  }, [drivers, search, selectedSiteFilter]);

  const handleCall = async (phone: string, name: string) => {
    const url = `tel:${phone}`;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(
        'Llamada Telefónica',
        `No se pudo iniciar la llamada directa al ${phone} (${name}).`
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Cabecera con Buscador */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Directorio de Conductores</Text>
        <Text style={styles.headerSubtitle}>
          Taxis oficiales y conductores verificados de Jalpan de Serra
        </Text>

        <View style={styles.searchBox}>
          <Search size={18} color="#64748b" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por chofer, unidad # o teléfono..."
            placeholderTextColor="#94a3b8"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Chips de filtro por sitio */}
        <View style={styles.filterRow}>
          {siteFilters.map((filter) => {
            const isActive = selectedSiteFilter === filter.id;
            return (
              <TouchableOpacity
                key={filter.id}
                style={[
                  styles.filterChip,
                  isActive && styles.filterChipActive,
                ]}
                onPress={() => setSelectedSiteFilter(filter.id)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    isActive && styles.filterChipTextActive,
                  ]}
                >
                  {filter.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Directorio de Bases Telefónicas Fijas (Sitios) */}
      <View style={styles.basesContainer}>
        <Text style={styles.sectionTitle}>TELÉFONOS DE SITIOS (BASES FIJAS)</Text>
        <View style={styles.baseCardsRow}>
          {taxiStands.map((stand) => (
            <TouchableOpacity
              key={stand.id}
              style={styles.baseCard}
              activeOpacity={0.8}
              onPress={() => handleCall(stand.phone || '4412960100', stand.name)}
            >
              <View style={styles.baseCardIcon}>
                <PhoneCall size={14} color="#059669" />
              </View>
              <View style={styles.baseCardInfo}>
                <Text style={styles.baseCardName} numberOfLines={1}>
                  {stand.name.replace('Sitio Taxis ', '')}
                </Text>
                <Text style={styles.baseCardPhone}>{stand.phone || '4412960100'}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Lista de Conductores Individuales */}
      <FlatList
        data={filteredDrivers}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Car size={36} color="#94a3b8" />
            <Text style={styles.emptyText}>No se encontraron conductores con ese criterio.</Text>
          </View>
        }
        renderItem={({ item }) => {
          const isAvailable = item.status === 'AVAILABLE';
          return (
            <TouchableOpacity
              style={styles.driverCard}
              activeOpacity={0.9}
              onPress={() => onSelectDriver(item)}
            >
              <View style={styles.cardHeader}>
                <View style={styles.avatarContainer}>
                  {item.driverPhoto ? (
                    <Image source={{ uri: item.driverPhoto }} style={styles.avatarImg} />
                  ) : (
                    <View style={styles.avatarFallback}>
                      <Text style={styles.avatarInitial}>{item.driverName.charAt(0)}</Text>
                    </View>
                  )}
                  {item.iqtVerified && (
                    <View style={styles.verifiedIcon}>
                      <ShieldCheck size={11} color="#ffffff" />
                    </View>
                  )}
                </View>

                <View style={styles.driverMainInfo}>
                  <View style={styles.nameRow}>
                    <Text style={styles.driverNameText}>{item.driverName}</Text>
                    <View
                      style={[
                        styles.statusDotSmall,
                        { backgroundColor: isAvailable ? '#10b981' : '#f97316' },
                      ]}
                    />
                  </View>
                  <View style={styles.badgeRow}>
                    <View style={styles.categoryPill}>
                      <Text style={styles.categoryPillText}>
                        {item.category === 'TAXI_LOCAL'
                          ? `Taxi ${item.municipality === 'ARROYO_SECO' ? 'Arroyo Seco' : item.municipality === 'PINAL_DE_AMOLES' ? 'Pinal' : 'Jalpan'}`
                          : item.category === 'QROTAXI'
                          ? 'Qrotaxi'
                          : item.category === 'QRORIDE'
                          ? 'QROride'
                          : item.category === 'QROVAN'
                          ? 'QroVan'
                          : item.category === 'BUS_DRIVER'
                          ? 'Autobús'
                          : item.type === 'TAXI'
                          ? 'Taxi Local'
                          : 'QROride'}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.locationModePill,
                        item.hasLiveLocation !== false
                          ? styles.locationModePillGps
                          : styles.locationModePillDir,
                      ]}
                    >
                      <Text
                        style={[
                          styles.locationModeText,
                          item.hasLiveLocation !== false
                            ? styles.locationModeTextGps
                            : styles.locationModeTextDir,
                        ]}
                      >
                        {item.hasLiveLocation !== false ? '🟢 GPS en Mapa' : '📁 Solo Directorio'}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.unitText}>
                    Unidad #{item.unitNumber} • {item.plates}
                  </Text>
                  <View style={styles.siteLocationRow}>
                    <MapPin size={11} color="#64748b" />
                    <Text style={styles.siteText} numberOfLines={1}>{item.baseSite}</Text>
                  </View>
                </View>

                <View style={styles.ratingBadge}>
                  <Star size={11} color="#f59e0b" fill="#f59e0b" />
                  <Text style={styles.ratingBadgeText}>{item.rating?.toFixed(1) || '4.9'}</Text>
                </View>
              </View>

              {/* Botón de Llamada Rápida Directa */}
              <View style={styles.cardFooter}>
                <TouchableOpacity
                  style={styles.directCallBtn}
                  activeOpacity={0.8}
                  onPress={() => handleCall(item.phone, item.driverName)}
                >
                  <Phone size={14} color="#ffffff" />
                  <Text style={styles.directCallText}>Llamar al {item.phone}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.viewProfileBtn}
                  activeOpacity={0.8}
                  onPress={() => onSelectDriver(item)}
                >
                  <Text style={styles.viewProfileText}>Ver Perfil</Text>
                  <ChevronRight size={14} color="#2563eb" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingTop: 54,
    paddingHorizontal: 16,
    paddingBottom: 14,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
    marginBottom: 12,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
    padding: 0,
  },
  filterRow: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
    backgroundColor: '#f1f5f9',
  },
  filterChipActive: {
    backgroundColor: '#0f172a',
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748b',
  },
  filterChipTextActive: {
    color: '#ffffff',
  },
  basesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748b',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  baseCardsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  baseCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 6,
  },
  baseCardIcon: {
    backgroundColor: '#ecfdf5',
    padding: 6,
    borderRadius: 8,
  },
  baseCardInfo: {
    flex: 1,
  },
  baseCardName: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0f172a',
  },
  baseCardPhone: {
    fontSize: 10,
    fontWeight: '600',
    color: '#059669',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 90,
    gap: 12,
  },
  driverCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatarImg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e2e8f0',
  },
  avatarFallback: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
  },
  verifiedIcon: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#059669',
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#ffffff',
  },
  driverMainInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  driverNameText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0f172a',
  },
  statusDotSmall: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  unitText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
    marginTop: 2,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 3,
    flexWrap: 'wrap',
  },
  categoryPill: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: '#bfdbfe',
  },
  categoryPillText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1d4ed8',
  },
  locationModePill: {
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 6,
    borderWidth: 0.5,
  },
  locationModePillGps: {
    backgroundColor: '#ecfdf5',
    borderColor: '#a7f3d0',
  },
  locationModePillDir: {
    backgroundColor: '#f1f5f9',
    borderColor: '#cbd5e1',
  },
  locationModeText: {
    fontSize: 9.5,
    fontWeight: '700',
  },
  locationModeTextGps: {
    color: '#059669',
  },
  locationModeTextDir: {
    color: '#475569',
  },
  siteLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 2,
  },
  siteText: {
    fontSize: 11,
    color: '#64748b',
    flex: 1,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 3,
  },
  ratingBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#92400e',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    gap: 8,
  },
  directCallBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#059669',
    paddingVertical: 8,
    borderRadius: 10,
    gap: 6,
  },
  directCallText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#ffffff',
  },
  viewProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    gap: 2,
  },
  viewProfileText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2563eb',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    gap: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
});
