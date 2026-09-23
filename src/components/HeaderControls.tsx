import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Search, MapPin, Zap, Clock } from 'lucide-react-native';
import { TransportFilter } from '../types/transport';

interface HeaderControlsProps {
  activeFilter: TransportFilter;
  onSelectFilter: (filter: TransportFilter) => void;
  taxiCount: number;
  busCount: number;
  vanCount: number;
  simulatedTimeText: string;
  speedMultiplier: number;
  onChangeSpeedMultiplier: (speed: number) => void;
  searchQuery: string;
  onChangeSearchQuery: (text: string) => void;
}

export const HeaderControls: React.FC<HeaderControlsProps> = ({
  activeFilter,
  onSelectFilter,
  taxiCount,
  busCount,
  vanCount,
  simulatedTimeText,
  speedMultiplier,
  onChangeSpeedMultiplier,
  searchQuery,
  onChangeSearchQuery,
}) => {
  const totalCount = taxiCount + busCount + vanCount;

  const filters: { id: TransportFilter; label: string; count: number; color: string }[] = [
    { id: 'ALL', label: 'Todos', count: totalCount, color: '#0f172a' },
    { id: 'TAXI', label: 'Taxis en Vivo', count: taxiCount, color: '#f59e0b' },
    { id: 'BUS', label: 'Autobuses', count: busCount, color: '#2563eb' },
    { id: 'QRORIDE', label: 'QROride / Vans', count: vanCount, color: '#7c3aed' },
  ];

  const toggleSpeed = () => {
    if (speedMultiplier === 1) onChangeSpeedMultiplier(5);
    else if (speedMultiplier === 5) onChangeSpeedMultiplier(10);
    else onChangeSpeedMultiplier(1);
  };

  return (
    <View style={styles.headerContainer}>
      {/* Barra de Búsqueda Flotante Estilo Uber */}
      <View style={styles.searchCard}>
        <View style={styles.searchIconWrapper}>
          <Search size={18} color="#0f172a" />
        </View>

        <TextInput
          style={styles.searchInput}
          placeholder="¿A dónde vas en la Sierra Gorda?"
          placeholderTextColor="#94a3b8"
          value={searchQuery}
          onChangeText={onChangeSearchQuery}
        />

        <View style={styles.locationPinWrapper}>
          <MapPin size={18} color="#2563eb" />
        </View>
      </View>

      {/* Reloj de simulación y selector de velocidad de tránsito */}
      <View style={styles.statusRow}>
        <View style={styles.clockContainer}>
          <Clock size={12} color="#475569" />
          <Text style={styles.clockText}>{simulatedTimeText}</Text>
          <View style={styles.liveIndicator}>
            <View style={styles.livePulse} />
            <Text style={styles.liveText}>GPS ACTIVO</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.speedButton} onPress={toggleSpeed}>
          <Zap size={12} color="#2563eb" />
          <Text style={styles.speedText}>{speedMultiplier}x Simulación</Text>
        </TouchableOpacity>
      </View>

      {/* Carrusel Horizontal de Filtros (Chips/Pills) */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterScrollContent}
      >
        {filters.map((filter) => {
          const isActive = activeFilter === filter.id;
          return (
            <TouchableOpacity
              key={filter.id}
              activeOpacity={0.8}
              style={[
                styles.pill,
                isActive && {
                  backgroundColor: filter.color,
                  borderColor: filter.color,
                },
              ]}
              onPress={() => onSelectFilter(filter.id)}
            >
              <Text
                style={[
                  styles.pillText,
                  isActive && styles.pillTextActive,
                ]}
              >
                {filter.label}
              </Text>
              <View
                style={[
                  styles.pillBadge,
                  isActive
                    ? { backgroundColor: 'rgba(255, 255, 255, 0.25)' }
                    : { backgroundColor: '#f1f5f9' },
                ]}
              >
                <Text
                  style={[
                    styles.pillBadgeText,
                    isActive && { color: '#ffffff' },
                  ]}
                >
                  {filter.count}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: 50,
    left: 16,
    right: 16,
    zIndex: 20,
  },
  searchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  searchIconWrapper: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
    padding: 0,
  },
  locationPinWrapper: {
    marginLeft: 8,
    backgroundColor: '#eff6ff',
    padding: 6,
    borderRadius: 8,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 4,
  },
  clockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: '#e2e8f0',
  },
  clockText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#334155',
    marginLeft: 4,
    marginRight: 8,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecfdf5',
    paddingHorizontal: 5,
    paddingVertical: 1.5,
    borderRadius: 6,
  },
  livePulse: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#10b981',
    marginRight: 4,
  },
  liveText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#059669',
  },
  speedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: '#e2e8f0',
  },
  speedText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563eb',
    marginLeft: 4,
  },
  filterScrollContent: {
    paddingTop: 8,
    paddingBottom: 4,
    gap: 8,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  pillText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
  },
  pillTextActive: {
    color: '#ffffff',
  },
  pillBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 6,
  },
  pillBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748b',
  },
});
