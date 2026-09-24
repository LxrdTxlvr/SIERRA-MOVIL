import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  Linking,
  Alert,
  ScrollView,
} from 'react-native';
import {
  Phone,
  MessageSquare,
  ShieldCheck,
  Star,
  Car,
  MapPin,
  Calendar,
  X,
  Award,
  CircleAlert,
} from 'lucide-react-native';
import { LiveVehicle } from '../types/transport';

interface DriverProfileModalProps {
  visible: boolean;
  driver: LiveVehicle | null;
  onClose: () => void;
  onLocateOnMap?: (driver: LiveVehicle) => void;
}

export const DriverProfileModal: React.FC<DriverProfileModalProps> = ({
  visible,
  driver,
  onClose,
  onLocateOnMap,
}) => {
  if (!driver) return null;

  const isAvailable = driver.status === 'AVAILABLE';

  const handleCall = async () => {
    const url = `tel:${driver.phone}`;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(
        'Llamada Telefónica',
        `No se pudo abrir el marcador telefónico para el número ${driver.phone}.`
      );
    }
  };

  const handleWhatsApp = async () => {
    const phone = driver.whatsapp || driver.phone;
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      `Hola ${driver.driverName}, te contacto desde la app SierraTransporte para solicitar un servicio en Jalpan de Serra.`
    );
    const url = `https://wa.me/${cleanPhone}?text=${message}`;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('WhatsApp', 'No se pudo abrir WhatsApp en este dispositivo.');
    }
  };

  const getCategoryLabel = (d: LiveVehicle) => {
    if (d.category === 'TAXI_LOCAL') {
      const muni =
        d.municipality === 'ARROYO_SECO'
          ? 'Arroyo Seco'
          : d.municipality === 'PINAL_DE_AMOLES'
          ? 'Pinal de Amoles'
          : 'Jalpan';
      return `Taxi Local (${muni})`;
    }
    if (d.category === 'QROTAXI') return 'Qrotaxi Concesión';
    if (d.category === 'QRORIDE') return 'QROride Compartido';
    if (d.category === 'QROVAN') return 'QroVan Colectivo';
    if (d.category === 'BUS_DRIVER') return 'Chofer Autobús Regional';
    return d.type === 'TAXI' ? 'Taxi Oficial Concesionado' : 'Conductor QROride';
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          {/* Header con botón cerrar */}
          <View style={styles.header}>
            <View style={styles.headerBadge}>
              <Car size={16} color="#2563eb" />
              <Text style={styles.headerBadgeText}>
                {getCategoryLabel(driver)}
              </Text>
            </View>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <X size={20} color="#64748b" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {/* Tarjeta de Identidad del Conductor */}
            <View style={styles.profileSection}>
              <View style={styles.avatarWrapper}>
                {driver.driverPhoto ? (
                  <Image source={{ uri: driver.driverPhoto }} style={styles.avatarImage} />
                ) : (
                  <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarInitial}>
                      {driver.driverName.charAt(0)}
                    </Text>
                  </View>
                )}
                {driver.iqtVerified && (
                  <View style={styles.verifiedBadge}>
                    <ShieldCheck size={14} color="#ffffff" />
                  </View>
                )}
              </View>

              <Text style={styles.driverName}>{driver.driverName}</Text>
              <Text style={styles.unitSub}>Unidad #{driver.unitNumber} • Placas {driver.plates}</Text>

              {/* Píldora de Estatus y Calificación */}
              <View style={styles.statusRatingRow}>
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
                      styles.statusText,
                      { color: isAvailable ? '#065f46' : '#9a3412' },
                    ]}
                  >
                    {isAvailable ? 'Disponible / Libre' : 'En Servicio / Ocupado'}
                  </Text>
                </View>

                <View style={styles.ratingPill}>
                  <Star size={14} color="#f59e0b" fill="#f59e0b" />
                  <Text style={styles.ratingText}>{driver.rating?.toFixed(2) || '4.90'}</Text>
                  <Text style={styles.ratingCount}>({driver.totalTrips || 850} viajes)</Text>
                </View>
              </View>
            </View>

            {/* Ficha de Detalles del Vehículo y Sitio */}
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <MapPin size={18} color="#2563eb" />
                <View style={styles.infoTextCol}>
                  <Text style={styles.infoLabel}>SITIO O BASE ASIGNADA</Text>
                  <Text style={styles.infoValue}>{driver.baseSite}</Text>
                </View>
              </View>

              <View style={styles.infoDivider} />

              <View style={styles.infoRow}>
                <Car size={18} color="#059669" />
                <View style={styles.infoTextCol}>
                  <Text style={styles.infoLabel}>VEHÍCULO Y MODELO</Text>
                  <Text style={styles.infoValue}>
                    {driver.vehicleModel || 'Sedán Estándar de Transporte'}
                  </Text>
                </View>
              </View>

              <View style={styles.infoDivider} />

              <View style={styles.infoRow}>
                <Award size={18} color="#7c3aed" />
                <View style={styles.infoTextCol}>
                  <Text style={styles.infoLabel}>CERTIFICACIÓN IQT QUERÉTARO</Text>
                  <Text style={styles.infoValue}>
                    Concesión Vigente Región Jalpan de Serra
                  </Text>
                </View>
              </View>
            </View>

            {/* Notas del Conductor */}
            {driver.notes && (
              <View style={styles.notesBox}>
                <CircleAlert size={16} color="#64748b" />
                <Text style={styles.notesText}>{driver.notes}</Text>
              </View>
            )}

            {/* Botones de Acción Inmediata: Llamar y WhatsApp */}
            <View style={styles.actionButtonsCol}>
              <TouchableOpacity
                style={styles.callButton}
                activeOpacity={0.85}
                onPress={handleCall}
              >
                <Phone size={20} color="#ffffff" />
                <Text style={styles.callButtonText}>Llamar al {driver.phone}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.whatsappButton}
                activeOpacity={0.85}
                onPress={handleWhatsApp}
              >
                <MessageSquare size={20} color="#ffffff" />
                <Text style={styles.whatsappButtonText}>Mensaje por WhatsApp</Text>
              </TouchableOpacity>

              {onLocateOnMap && (
                <TouchableOpacity
                  style={[
                    styles.locateButton,
                    driver.hasLiveLocation === false && styles.locateButtonDisabled,
                  ]}
                  disabled={driver.hasLiveLocation === false}
                  activeOpacity={0.85}
                  onPress={() => {
                    onClose();
                    onLocateOnMap(driver);
                  }}
                >
                  <MapPin
                    size={18}
                    color={driver.hasLiveLocation === false ? '#94a3b8' : '#0f172a'}
                  />
                  <Text
                    style={[
                      styles.locateButtonText,
                      driver.hasLiveLocation === false && styles.locateButtonTextDisabled,
                    ]}
                  >
                    {driver.hasLiveLocation === false
                      ? 'Sin ubicación GPS activa (Solo Directorio)'
                      : 'Ubicar unidad en el mapa'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: '88%',
    paddingBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  headerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eff6ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 6,
  },
  headerBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1d4ed8',
  },
  closeBtn: {
    backgroundColor: '#f8fafc',
    padding: 6,
    borderRadius: 20,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 10,
  },
  avatarImage: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 3,
    borderColor: '#ffffff',
    backgroundColor: '#e2e8f0',
  },
  avatarPlaceholder: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    fontSize: 32,
    fontWeight: '800',
    color: '#ffffff',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#059669',
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  driverName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0f172a',
    textAlign: 'center',
  },
  unitSub: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '600',
    marginTop: 2,
  },
  statusRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 10,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 6,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#92400e',
  },
  ratingCount: {
    fontSize: 11,
    color: '#b45309',
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoTextCol: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748b',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
    marginTop: 2,
  },
  infoDivider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 12,
  },
  notesBox: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 12,
    gap: 8,
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  notesText: {
    fontSize: 12,
    color: '#475569',
    flex: 1,
    lineHeight: 17,
  },
  actionButtonsCol: {
    gap: 10,
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#059669',
    paddingVertical: 14,
    borderRadius: 16,
    gap: 8,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  callButtonText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#ffffff',
  },
  whatsappButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#25d366',
    paddingVertical: 14,
    borderRadius: 16,
    gap: 8,
  },
  whatsappButtonText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#ffffff',
  },
  locateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f5f9',
    paddingVertical: 12,
    borderRadius: 16,
    gap: 8,
  },
  locateButtonDisabled: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  locateButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },
  locateButtonTextDisabled: {
    color: '#94a3b8',
    fontWeight: '600',
  },
});
