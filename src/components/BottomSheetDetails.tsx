import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import {
  Phone,
  X,
  Navigation,
  Car,
  Bus,
  Clock,
  MapPin,
  ShieldCheck,
  CreditCard,
  Compass,
} from 'lucide-react-native';
import { SelectedEntity } from '../types/transport';

interface BottomSheetDetailsProps {
  selectedEntity: SelectedEntity;
  onClose: () => void;
  onFocusRoute?: () => void;
}

export const BottomSheetDetails: React.FC<BottomSheetDetailsProps> = ({
  selectedEntity,
  onClose,
  onFocusRoute,
}) => {
  if (!selectedEntity) return null;

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

  // 1. Vista de Detalle: Taxi en Tiempo Real
  if (selectedEntity.type === 'LIVE_VEHICLE') {
    const taxi = selectedEntity.data;
    const isAvailable = taxi.status === 'AVAILABLE';

    return (
      <View style={styles.sheetCard}>
        {/* Cabecera con Botón de Cierre */}
        <View style={styles.sheetHeader}>
          <View style={styles.headerLeft}>
            <View style={[styles.avatarBubble, { backgroundColor: '#fef3c7' }]}>
              <Car size={24} color="#d97706" />
            </View>
            <View style={styles.headerTextCol}>
              <View style={styles.titleRow}>
                <Text style={styles.mainTitle}>Taxi Unidad #{taxi.unitNumber}</Text>
                <View
                  style={[
                    styles.statusPill,
                    { backgroundColor: isAvailable ? '#ecfdf5' : '#fff7ed' },
                  ]}
                >
                  <View
                    style={[
                      styles.statusDot,
                      { backgroundColor: isAvailable ? '#10b981' : '#f97316' },
                    ]}
                  />
                  <Text
                    style={[
                      styles.statusPillText,
                      { color: isAvailable ? '#065f46' : '#9a3412' },
                    ]}
                  >
                    {isAvailable ? 'Disponible' : 'En Servicio'}
                  </Text>
                </View>
              </View>
              <Text style={styles.subtitle}>{taxi.baseSite}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={18} color="#64748b" />
          </TouchableOpacity>
        </View>

        {/* Datos del Conductor y Unidad */}
        <View style={styles.detailGrid}>
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>CONDUCTOR</Text>
            <Text style={styles.gridValue}>{taxi.driverName}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>PLACAS OFICIALES</Text>
            <Text style={styles.gridValue}>{taxi.plates}</Text>
          </View>
        </View>

        {/* Aviso de Confianza */}
        <View style={styles.trustBanner}>
          <ShieldCheck size={16} color="#059669" />
          <Text style={styles.trustText}>
            Unidad registrada ante el Instituto Queretano del Transporte (IQT)
          </Text>
        </View>

        {/* Botón de Llamada Telefónica Nativa */}
        <TouchableOpacity
          style={styles.callActionButton}
          activeOpacity={0.85}
          onPress={() => handleCall(taxi.phone, taxi.driverName)}
        >
          <Phone size={18} color="#ffffff" />
          <Text style={styles.callActionText}>
            Llamar al Conductor ({taxi.phone})
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 2. Vista de Detalle: Autobús Regional / QROride Simulado
  if (selectedEntity.type === 'SIMULATED_VEHICLE') {
    const transport = selectedEntity.data;
    const isBus = transport.transportType === 'BUS';
    const primaryColor = isBus ? '#2563eb' : '#7c3aed';

    return (
      <View style={styles.sheetCard}>
        {/* Cabecera */}
        <View style={styles.sheetHeader}>
          <View style={styles.headerLeft}>
            <View
              style={[
                styles.avatarBubble,
                { backgroundColor: isBus ? '#eff6ff' : '#f5f3ff' },
              ]}
            >
              <Bus size={24} color={primaryColor} />
            </View>
            <View style={styles.headerTextCol}>
              <Text style={styles.mainTitle}>{transport.operator}</Text>
              <Text style={styles.subtitle}>{transport.routeName}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={18} color="#64748b" />
          </TouchableOpacity>
        </View>

        {/* Barra de Progreso del Trayecto en Carretera */}
        <View style={styles.progressContainer}>
          <View style={styles.progressHeaderRow}>
            <Text style={styles.progressLabel}>
              {transport.status === 'IN_TRANSIT'
                ? 'En trayecto por la Sierra'
                : transport.status === 'AT_TERMINAL'
                ? 'En Terminal de salida'
                : 'Salida programada'}
            </Text>
            <Text style={[styles.progressPercent, { color: primaryColor }]}>
              {Math.round(transport.progress * 100)}% completado
            </Text>
          </View>
          <View style={styles.progressBarBackground}>
            <View
              style={[
                styles.progressBarFill,
                {
                  width: `${Math.max(5, transport.progress * 100)}%`,
                  backgroundColor: primaryColor,
                },
              ]}
            />
          </View>
        </View>

        {/* Métricas de Viaje */}
        <View style={styles.detailGrid}>
          <View style={styles.gridItem}>
            <View style={styles.iconLabelRow}>
              <Clock size={12} color="#64748b" />
              <Text style={styles.gridLabel}>TIEMPO RESTANTE</Text>
            </View>
            <Text style={styles.gridValue}>~{transport.remainingMinutes} min</Text>
          </View>

          <View style={styles.gridItem}>
            <View style={styles.iconLabelRow}>
              <Navigation size={12} color="#64748b" />
              <Text style={styles.gridLabel}>LLEGADA ESTIMADA</Text>
            </View>
            <Text style={styles.gridValue}>{transport.estimatedArrivalTime}</Text>
          </View>

          <View style={styles.gridItem}>
            <View style={styles.iconLabelRow}>
              <CreditCard size={12} color="#64748b" />
              <Text style={styles.gridLabel}>TARIFA PROMEDIO</Text>
            </View>
            <Text style={[styles.gridValue, { color: '#059669' }]}>
              ${transport.fare} MXN
            </Text>
          </View>
        </View>

        {/* Botón de Enfoque de Ruta */}
        {onFocusRoute && (
          <TouchableOpacity
            style={[styles.routeFocusButton, { borderColor: primaryColor }]}
            onPress={onFocusRoute}
          >
            <Compass size={16} color={primaryColor} />
            <Text style={[styles.routeFocusText, { color: primaryColor }]}>
              Ver trazado completo en el mapa
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  // 3. Vista de Detalle: Parada / Terminal
  if (selectedEntity.type === 'STOP') {
    const stop = selectedEntity.data;

    return (
      <View style={styles.sheetCard}>
        <View style={styles.sheetHeader}>
          <View style={styles.headerLeft}>
            <View style={[styles.avatarBubble, { backgroundColor: '#f1f5f9' }]}>
              <MapPin size={24} color="#0f172a" />
            </View>
            <View style={styles.headerTextCol}>
              <Text style={styles.mainTitle}>{stop.name}</Text>
              <Text style={styles.subtitle}>
                {stop.isTerminal ? 'Terminal Principal' : 'Punto de Abordaje'}
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={18} color="#64748b" />
          </TouchableOpacity>
        </View>

        <View style={styles.trustBanner}>
          <Text style={styles.trustText}>
            Ruta: {selectedEntity.routeName || 'Carretera Sierra Gorda'}
          </Text>
        </View>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  sheetCard: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.16,
    shadowRadius: 14,
    elevation: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    zIndex: 30,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarBubble: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerTextCol: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  mainTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
  },
  closeButton: {
    backgroundColor: '#f1f5f9',
    padding: 6,
    borderRadius: 12,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 5,
  },
  statusPillText: {
    fontSize: 11,
    fontWeight: '700',
  },
  detailGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f8fafc',
    borderRadius: 14,
    padding: 12,
    marginTop: 14,
  },
  gridItem: {
    flex: 1,
  },
  iconLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  gridLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#64748b',
    letterSpacing: 0.5,
  },
  gridValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
    marginTop: 2,
  },
  progressContainer: {
    marginTop: 14,
  },
  progressHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
  },
  progressPercent: {
    fontSize: 12,
    fontWeight: '800',
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 6,
    borderRadius: 3,
  },
  trustBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 12,
    gap: 6,
  },
  trustText: {
    fontSize: 11,
    color: '#166534',
    fontWeight: '600',
    flex: 1,
  },
  callActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#059669',
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 14,
    gap: 8,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  callActionText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#ffffff',
  },
  routeFocusButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    paddingVertical: 12,
    borderRadius: 14,
    marginTop: 12,
    gap: 8,
  },
  routeFocusText: {
    fontSize: 13,
    fontWeight: '800',
  },
});
