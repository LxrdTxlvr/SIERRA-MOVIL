import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
  Alert,
  Platform,
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
  User,
  Star,
  PhoneCall,
  MessageSquare,
  Sparkles,
  Move,
  Globe,
} from 'lucide-react-native';
import { SelectedEntity, LiveVehicle, UserRole } from '../types/transport';

interface BottomSheetDetailsProps {
  selectedEntity: SelectedEntity;
  onClose: () => void;
  onFocusRoute?: () => void;
  onViewDriverProfile?: (driver: LiveVehicle) => void;
  userRole?: UserRole;
}

export const BottomSheetDetails: React.FC<BottomSheetDetailsProps> = ({
  selectedEntity,
  onClose,
  onFocusRoute,
  onViewDriverProfile,
  userRole = 'PASSENGER',
}) => {
  if (!selectedEntity) return null;

  const handleCall = async (phone: string, name: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const url = `tel:${cleanPhone}`;
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

  const handleWhatsApp = async (phone: string, name: string, unitNumber: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const fullPhone = cleanPhone.startsWith('52') ? cleanPhone : `52${cleanPhone}`;
    const message = encodeURIComponent(
      `Hola ${name} (Unidad #${unitNumber}), te contacto desde SierraTransporte para solicitar un servicio en Jalpan de Serra.`
    );
    const url = `https://wa.me/${fullPhone}?text=${message}`;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('WhatsApp', 'No se pudo abrir WhatsApp en este dispositivo.');
    }
  };

  const handleOpenCarrierWeb = async (operator: string) => {
    let url = 'https://autobusesvencedor.com';
    let carrierName = 'Autobuses Vencedor';

    if (operator.toLowerCase().includes('flecha')) {
      url = 'https://flecha-amarilla.com.mx';
      carrierName = 'Flecha Amarilla';
    } else if (operator.toLowerCase().includes('primera')) {
      url = 'https://primeraplus.com.mx';
      carrierName = 'Primera Plus';
    }

    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(carrierName, `Visita el portal oficial para cotizar y comprar boletos: ${url}`);
    }
  };

  const handleOpenCarrierWhatsApp = async (operator: string) => {
    let phone = '524813820000'; // Vencedor
    let text = encodeURIComponent('Hola, me comunico desde Jalpan de Serra para consultar disponibilidad y costos de boletos de autobús.');
    if (operator.toLowerCase().includes('flecha') || operator.toLowerCase().includes('primera')) {
      phone = '524777100060'; // Grupo Flecha Amarilla / Primera Plus
    }
    const url = `https://wa.me/${phone}?text=${text}`;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      handleOpenCarrierWeb(operator);
    }
  };

  // 1. Vista de Detalle: Taxi en Tiempo Real o Conductor QROride / Van
  if (selectedEntity.type === 'LIVE_VEHICLE') {
    const vehicle = selectedEntity.data;
    const isAvailable = vehicle.status === 'AVAILABLE';

    return (
      <View style={styles.sheetCard}>
        {/* Cabecera con Botón de Cierre */}
        <View style={styles.sheetHeader}>
          <View style={styles.headerLeft}>
            <View
              style={[
                styles.avatarBubble,
                { backgroundColor: isAvailable ? '#ecfdf5' : '#fff7ed' },
              ]}
            >
              <Car size={24} color={isAvailable ? '#059669' : '#ea580c'} />
            </View>
            <View style={styles.headerTextCol}>
              <View style={styles.titleRow}>
                <Text style={styles.mainTitle}>
                  {vehicle.type === 'TAXI' ? `Taxi Unidad #${vehicle.unitNumber}` : 'QROvan / QROride'}
                </Text>
                <View
                  style={[
                    styles.statusPill,
                    { backgroundColor: isAvailable ? '#dcfce7' : '#ffedd5' },
                  ]}
                >
                  <View
                    style={[
                      styles.statusDot,
                      { backgroundColor: isAvailable ? '#16a34a' : '#ea580c' },
                    ]}
                  />
                  <Text
                    style={[
                      styles.statusPillText,
                      { color: isAvailable ? '#15803d' : '#c2410c' },
                    ]}
                  >
                    {isAvailable ? 'LIBRE / DISPONIBLE' : 'EN SERVICIO / OCUPADO'}
                  </Text>
                </View>
              </View>
              <Text style={styles.subtitle} numberOfLines={1}>
                {vehicle.baseSite}
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={18} color="#64748b" />
          </TouchableOpacity>
        </View>

        {/* Datos del Conductor y Unidad */}
        <View style={styles.detailGrid}>
          <View style={styles.detailRowTop}>
            <View style={{ flex: 1.4 }}>
              <Text style={styles.gridLabel}>CONDUCTOR</Text>
              <Text style={styles.gridDriverName}>{vehicle.driverName}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={styles.gridLabel}>PLACAS</Text>
              <Text style={styles.gridValue}>{vehicle.plates || 'En trámite'}</Text>
            </View>
            <View style={{ flex: 0.9, alignItems: 'flex-end' }}>
              <Text style={styles.gridLabel}>CALIFICACIÓN</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 2 }}>
                <Star size={12} color="#f59e0b" fill="#f59e0b" />
                <Text style={styles.gridValue}>{vehicle.rating?.toFixed(2) || '4.95'}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Modelo y Verificación */}
        <View style={styles.trustBanner}>
          <ShieldCheck size={16} color="#059669" />
          <Text style={styles.trustText}>
            {vehicle.vehicleModel || 'Vehículo de Transporte Oficial'} • Concesión IQT Jalpan
          </Text>
        </View>

        {/* Botones de Comunicación Inmediata para Pasajeros */}
        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={styles.whatsappActionButton}
            activeOpacity={0.85}
            onPress={() =>
              handleWhatsApp(
                vehicle.whatsapp || vehicle.phone,
                vehicle.driverName,
                vehicle.unitNumber
              )
            }
          >
            <MessageSquare size={16} color="#ffffff" />
            <Text style={styles.whatsappActionText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.callActionButton}
            activeOpacity={0.85}
            onPress={() => handleCall(vehicle.phone, vehicle.driverName)}
          >
            <Phone size={16} color="#ffffff" />
            <Text style={styles.callActionText}>Llamar</Text>
          </TouchableOpacity>

          {onViewDriverProfile && (
            <TouchableOpacity
              style={styles.profileSecondaryBtn}
              activeOpacity={0.85}
              onPress={() => onViewDriverProfile(vehicle)}
            >
              <User size={16} color="#0f172a" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  // 2. Vista de Detalle: Autobús Regional (Vencedor / Flecha Amarilla) / QROride Simulado
  if (selectedEntity.type === 'SIMULATED_VEHICLE') {
    const transport = selectedEntity.data;
    const isVencedor = transport.operator.includes('Vencedor');
    const isBus = transport.transportType === 'BUS';
    const primaryColor = isVencedor ? '#059669' : isBus ? '#2563eb' : '#7c3aed';

    return (
      <View style={styles.sheetCard}>
        {/* Cabecera */}
        <View style={styles.sheetHeader}>
          <View style={styles.headerLeft}>
            <View
              style={[
                styles.avatarBubble,
                { backgroundColor: isVencedor ? '#ecfdf5' : isBus ? '#eff6ff' : '#f5f3ff' },
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

        {/* Barra de Progreso del Trayecto en Carretera Real */}
        <View style={styles.progressContainer}>
          <View style={styles.progressHeaderRow}>
            <Text style={styles.progressLabel}>
              {transport.status === 'IN_TRANSIT'
                ? 'En trayecto activo por Carretera Federal'
                : transport.status === 'AT_TERMINAL'
                ? 'En Parada Central de Abordaje'
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
              <Globe size={12} color="#64748b" />
              <Text style={styles.gridLabel}>EMPRESA</Text>
            </View>
            <Text style={[styles.gridValue, { color: primaryColor }]} numberOfLines={1}>
              {isVencedor ? 'Vencedor' : isBus ? 'Flecha Amarilla' : 'QROvan'}
            </Text>
          </View>
        </View>

        {/* Botones de Redirección Oficial de la Transportista */}
        <View style={styles.carrierDetailActionsRow}>
          <TouchableOpacity
            style={[styles.carrierDetailBtn, { borderColor: primaryColor }]}
            activeOpacity={0.8}
            onPress={() => handleOpenCarrierWeb(transport.operator)}
          >
            <Globe size={14} color={primaryColor} />
            <Text style={[styles.carrierDetailBtnText, { color: primaryColor }]}>
              Taquilla Web
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.carrierDetailWaBtn}
            activeOpacity={0.8}
            onPress={() => handleOpenCarrierWhatsApp(transport.operator)}
          >
            <MessageSquare size={14} color="#ffffff" />
            <Text style={styles.carrierDetailWaText}>WhatsApp Boletos</Text>
          </TouchableOpacity>
        </View>

        {/* Botón de Enfoque de Ruta */}
        {onFocusRoute && (
          <TouchableOpacity
            style={[styles.routeFocusButton, { borderColor: primaryColor }]}
            onPress={onFocusRoute}
          >
            <Compass size={16} color={primaryColor} />
            <Text style={[styles.routeFocusText, { color: primaryColor }]}>
              Ver trazado completo por carretera en el mapa
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  // 3. Vista de Detalle: Base / Sitio de Taxis Oficial
  if (selectedEntity.type === 'TAXI_STAND') {
    const stand = selectedEntity.data;

    return (
      <View style={styles.sheetCard}>
        <View style={styles.sheetHeader}>
          <View style={styles.headerLeft}>
            <View style={[styles.avatarBubble, { backgroundColor: '#e0f2fe' }]}>
              <MapPin size={24} color="#0284c7" />
            </View>
            <View style={styles.headerTextCol}>
              <Text style={styles.mainTitle}>{stand.name}</Text>
              <Text style={styles.subtitle}>{stand.locationName}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={18} color="#64748b" />
          </TouchableOpacity>
        </View>

        <View style={styles.detailGrid}>
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>CAPACIDAD DE LA BASE</Text>
            <Text style={styles.gridValue}>{stand.capacity} Unidades</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>TAXIS EN SITIO</Text>
            <Text style={[styles.gridValue, { color: '#059669' }]}>
              {stand.activeTaxisCount} Disponibles
            </Text>
          </View>
        </View>

        {userRole === 'ADMIN' && (
          <View style={styles.adminTipBanner}>
            <Move size={14} color="#7e22ce" />
            <Text style={styles.adminTipText}>
              Modo Administrador: Puedes arrastrar directamente este marcador en el mapa para recolocarlo en su punto exacto.
            </Text>
          </View>
        )}

        {stand.phone && (
          <TouchableOpacity
            style={styles.callActionButton}
            activeOpacity={0.85}
            onPress={() => handleCall(stand.phone!, stand.name)}
          >
            <PhoneCall size={16} color="#ffffff" />
            <Text style={styles.callActionText}>
              Llamar a la Base ({stand.phone})
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  // 4. Vista de Detalle: Parada / Terminal (ej. Parada Autobuses Vencedor)
  if (selectedEntity.type === 'STOP') {
    const stop = selectedEntity.data;
    const isVencedor = stop.id.includes('venc') || stop.operator?.includes('Vencedor');

    return (
      <View style={styles.sheetCard}>
        <View style={styles.sheetHeader}>
          <View style={styles.headerLeft}>
            <View
              style={[
                styles.avatarBubble,
                { backgroundColor: isVencedor ? '#ecfdf5' : '#f1f5f9' },
              ]}
            >
              {isVencedor ? <Bus size={24} color="#059669" /> : <MapPin size={24} color="#0f172a" />}
            </View>
            <View style={styles.headerTextCol}>
              <Text style={styles.mainTitle}>{stop.name}</Text>
              <Text style={styles.subtitle}>
                {stop.isTerminal ? 'Terminal Oficial de Abordaje' : 'Punto de Parada en Carretera'}
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={18} color="#64748b" />
          </TouchableOpacity>
        </View>

        <View style={styles.trustBanner}>
          <Text style={styles.trustText}>
            {stop.notes || `Ruta: ${selectedEntity.routeName || 'Sierra Gorda'}`}
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
    bottom: Platform.OS === 'ios' ? 96 : 90, // Margen limpio por encima de la barra de navegación
    left: 14,
    right: 14,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.18,
    shadowRadius: 14,
    elevation: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    zIndex: 40,
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
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
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
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 12,
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
    paddingVertical: 2.5,
    borderRadius: 12,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    marginRight: 5,
  },
  statusPillText: {
    fontSize: 10,
    fontWeight: '800',
  },
  detailGrid: {
    backgroundColor: '#f8fafc',
    borderRadius: 14,
    padding: 12,
    marginTop: 10,
  },
  detailRowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gridDriverName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0f172a',
    marginTop: 2,
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
    fontSize: 13,
    fontWeight: '700',
    color: '#1e293b',
    marginTop: 2,
  },
  progressContainer: {
    marginTop: 12,
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
    marginTop: 10,
    gap: 6,
  },
  trustText: {
    fontSize: 11,
    color: '#166534',
    fontWeight: '600',
    flex: 1,
  },
  adminTipBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fdf4ff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 10,
    gap: 6,
    borderWidth: 1,
    borderColor: '#f5d0fe',
  },
  adminTipText: {
    fontSize: 11,
    color: '#7e22ce',
    fontWeight: '600',
    flex: 1,
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  whatsappActionButton: {
    flex: 1.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#25d366',
    paddingVertical: 12,
    borderRadius: 14,
    gap: 6,
    shadowColor: '#25d366',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  whatsappActionText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#ffffff',
  },
  callActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#059669',
    paddingVertical: 12,
    borderRadius: 14,
    gap: 6,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  callActionText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#ffffff',
  },
  profileSecondaryBtn: {
    backgroundColor: '#f1f5f9',
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  routeFocusButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    paddingVertical: 10,
    borderRadius: 14,
    marginTop: 10,
    gap: 8,
  },
  routeFocusText: {
    fontSize: 12,
    fontWeight: '800',
  },
  carrierDetailActionsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  carrierDetailBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    paddingVertical: 10,
    borderRadius: 14,
    gap: 6,
  },
  carrierDetailBtnText: {
    fontSize: 12,
    fontWeight: '800',
  },
  carrierDetailWaBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#25d366',
    paddingVertical: 10,
    borderRadius: 14,
    gap: 6,
    shadowColor: '#25d366',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  carrierDetailWaText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#ffffff',
  },
});
