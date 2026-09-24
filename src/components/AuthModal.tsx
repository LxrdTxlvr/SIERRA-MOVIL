import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Switch,
} from 'react-native';
import {
  Car,
  Shield,
  X,
  CheckCircle,
  KeyRound,
  Mail,
  ArrowRight,
  LogOut,
  Info,
  Lock,
  Phone,
  MessageSquare,
  MapPin,
  Sparkles,
  Radio,
  FileText,
  Bus,
} from 'lucide-react-native';
import {
  UserRole,
  UserProfile,
  LiveVehicle,
  DriverCategory,
  LocalMunicipality,
} from '../types/transport';
import { supabaseService } from '../services/supabaseService';

interface AuthModalProps {
  visible: boolean;
  currentUser: UserProfile;
  onClose: () => void;
  onUpdateUser: (user: UserProfile) => void;
  onRegisterDriver?: (driver: LiveVehicle) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  visible,
  currentUser,
  onClose,
  onUpdateUser,
  onRegisterDriver,
}) => {
  const [activeTab, setActiveTab] = useState<'DRIVER' | 'ADMIN'>(
    currentUser.role === 'ADMIN' ? 'ADMIN' : 'DRIVER'
  );

  // Formulario Administrador
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Formulario Registro de Conductor Real
  const [driverName, setDriverName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [category, setCategory] = useState<DriverCategory>('TAXI_LOCAL');
  const [municipality, setMunicipality] = useState<LocalMunicipality>('JALPAN');
  const [unitNumber, setUnitNumber] = useState('');
  const [plates, setPlates] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [baseSite, setBaseSite] = useState('');
  const [shareLiveLocation, setShareLiveLocation] = useState(true);
  const [submittingDriver, setSubmittingDriver] = useState(false);

  const handleAdminLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Datos requeridos', 'Por favor ingresa tu correo y contraseña de administrador.');
      return;
    }

    setLoading(true);
    const { user, error } = await supabaseService.signInWithEmail(email.trim(), password);
    setLoading(false);

    if (error || !user) {
      Alert.alert('Acceso Denegado', error || 'Credenciales inválidas.');
      return;
    }

    onUpdateUser({
      ...user,
      role: 'ADMIN',
    });

    Alert.alert(
      '¡Bienvenido Administrador!',
      `Has iniciado sesión como ${user.name}. Tienes acceso completo a la gestión de rutas, horarios y conductores.`
    );
    onClose();
  };

  const handleLogout = async () => {
    setLoading(true);
    await supabaseService.signOut();
    setLoading(false);

    onUpdateUser({
      id: 'passenger-guest',
      name: 'Pasajero Invitado',
      email: '',
      phone: '',
      role: 'PASSENGER',
    });

    Alert.alert('Sesión Cerrada', 'Has vuelto al modo público de Pasajero.');
    onClose();
  };

  const handleRegisterDriver = async () => {
    if (!driverName.trim()) {
      Alert.alert('Nombre requerido', 'Por favor ingresa tu nombre completo.');
      return;
    }
    if (!phone.trim()) {
      Alert.alert('Teléfono requerido', 'Ingresa un número telefónico para que los pasajeros te puedan llamar.');
      return;
    }
    if (!unitNumber.trim()) {
      Alert.alert('Unidad requerida', 'Ingresa el número de tu unidad o económico (ej. 042).');
      return;
    }
    if (!plates.trim()) {
      Alert.alert('Placas requeridas', 'Ingresa las placas de tu vehículo.');
      return;
    }

    setSubmittingDriver(true);

    // Asignar coordenadas iniciales según el municipio o base
    let baseCoord = { latitude: 21.2173, longitude: -99.4708 }; // Jalpan Centro
    if (category === 'TAXI_LOCAL') {
      if (municipality === 'ARROYO_SECO') {
        baseCoord = { latitude: 21.5500, longitude: -99.6892 };
      } else if (municipality === 'PINAL_DE_AMOLES') {
        baseCoord = { latitude: 21.1378, longitude: -99.6264 };
      }
    }

    // Agregar ligera variación para no encimar pines
    const coordinate = {
      latitude: baseCoord.latitude + (Math.random() - 0.5) * 0.004,
      longitude: baseCoord.longitude + (Math.random() - 0.5) * 0.004,
    };

    let displayBase = baseSite.trim();
    if (!displayBase) {
      if (category === 'TAXI_LOCAL') {
        displayBase = `Base Taxi ${municipality === 'JALPAN' ? 'Jalpan Centro' : municipality === 'ARROYO_SECO' ? 'Arroyo Seco' : 'Pinal de Amoles'}`;
      } else if (category === 'QROTAXI') {
        displayBase = 'Qrotaxi Concesión Estatal';
      } else if (category === 'QRORIDE') {
        displayBase = 'QROride Sierra Gorda';
      } else if (category === 'QROVAN') {
        displayBase = 'QroVan Transporte Colectivo';
      } else {
        displayBase = 'Terminal de Autobuses';
      }
    }

    const newDriver: LiveVehicle = {
      id: `driver-${Date.now()}`,
      type: category === 'QRORIDE' ? 'QRORIDE' : 'TAXI',
      category,
      municipality: category === 'TAXI_LOCAL' ? municipality : undefined,
      hasLiveLocation: shareLiveLocation,
      driverName: driverName.trim(),
      unitNumber: unitNumber.trim(),
      plates: plates.trim().toUpperCase(),
      baseSite: displayBase,
      phone: phone.trim(),
      whatsapp: whatsapp.trim() || phone.trim(),
      coordinate,
      heading: Math.floor(Math.random() * 360),
      status: 'AVAILABLE',
      speedKmH: shareLiveLocation ? 15 : 0,
      lastUpdated: new Date().toLocaleTimeString(),
      rating: 5.0,
      totalTrips: 1,
      vehicleModel: vehicleModel.trim() || (category === 'BUS_DRIVER' ? 'Autobús Foráneo' : 'Sedán Oficial'),
      iqtVerified: true,
      notes: shareLiveLocation ? 'Unidad activa con GPS en mapa' : 'Conductor disponible para llamadas y WhatsApp en directorio',
    };

    // Guardar en Supabase (si está configurado)
    await supabaseService.addDriver(newDriver);

    onRegisterDriver?.(newDriver);
    setSubmittingDriver(false);

    Alert.alert(
      '¡Registro Exitoso!',
      shareLiveLocation
        ? `Bienvenido ${newDriver.driverName}. Tu unidad #${newDriver.unitNumber} ahora aparece visible en el mapa en tiempo real y en el directorio de choferes.`
        : `Bienvenido ${newDriver.driverName}. Tu información ha sido agregada al directorio de choferes para que los pasajeros te puedan contactar por llamada o WhatsApp.`
    );

    // Limpiar formulario
    setDriverName('');
    setPhone('');
    setWhatsapp('');
    setUnitNumber('');
    setPlates('');
    setVehicleModel('');
    setBaseSite('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTitleCol}>
              <Text style={styles.title}>Control de Acceso</Text>
              <Text style={styles.subtitle} numberOfLines={1}>
                SierraTransporte • Sierra Gorda
              </Text>
            </View>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={onClose}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              activeOpacity={0.7}
            >
              <X size={18} color="#475569" />
            </TouchableOpacity>
          </View>

          {/* Selector de modo */}
          <View style={styles.modeTabs}>
            <TouchableOpacity
              style={[styles.modeTab, activeTab === 'DRIVER' && styles.modeTabActive]}
              onPress={() => setActiveTab('DRIVER')}
            >
              <Car size={16} color={activeTab === 'DRIVER' ? '#ffffff' : '#64748b'} />
              <Text style={[styles.modeTabText, activeTab === 'DRIVER' && styles.modeTabTextActive]}>
                Registro Conductor
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modeTab, activeTab === 'ADMIN' && styles.modeTabActive]}
              onPress={() => setActiveTab('ADMIN')}
            >
              <Shield size={16} color={activeTab === 'ADMIN' ? '#ffffff' : '#64748b'} />
              <Text style={[styles.modeTabText, activeTab === 'ADMIN' && styles.modeTabTextActive]}>
                Administrador
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
            {/* 1. REGISTRO DE CONDUCTORES REALES */}
            {activeTab === 'DRIVER' && (
              <View style={styles.driverFormContainer}>
                <View style={styles.formHeaderBanner}>
                  <Sparkles size={20} color="#059669" />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.formHeaderTitle}>Alta de Transportista Real</Text>
                    <Text style={styles.formHeaderDesc}>
                      Regístrate para brindar servicio a los pasajeros de la Sierra Gorda.
                    </Text>
                  </View>
                </View>

                {/* Categoría de Transporte */}
                <Text style={styles.inputLabel}>TIPO DE TRANSPORTE</Text>
                <View style={styles.categoryChipsGrid}>
                  <TouchableOpacity
                    style={[styles.categoryChip, category === 'TAXI_LOCAL' && styles.categoryChipActive]}
                    onPress={() => setCategory('TAXI_LOCAL')}
                  >
                    <Car size={14} color={category === 'TAXI_LOCAL' ? '#ffffff' : '#0f172a'} />
                    <Text style={[styles.categoryChipText, category === 'TAXI_LOCAL' && styles.categoryChipTextActive]}>
                      Taxi Local
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.categoryChip, category === 'QROTAXI' && styles.categoryChipActive]}
                    onPress={() => setCategory('QROTAXI')}
                  >
                    <Car size={14} color={category === 'QROTAXI' ? '#ffffff' : '#0f172a'} />
                    <Text style={[styles.categoryChipText, category === 'QROTAXI' && styles.categoryChipTextActive]}>
                      Qrotaxi
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.categoryChip, category === 'QRORIDE' && styles.categoryChipActive]}
                    onPress={() => setCategory('QRORIDE')}
                  >
                    <Car size={14} color={category === 'QRORIDE' ? '#ffffff' : '#0f172a'} />
                    <Text style={[styles.categoryChipText, category === 'QRORIDE' && styles.categoryChipTextActive]}>
                      Qroride
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.categoryChip, category === 'QROVAN' && styles.categoryChipActive]}
                    onPress={() => setCategory('QROVAN')}
                  >
                    <Bus size={14} color={category === 'QROVAN' ? '#ffffff' : '#0f172a'} />
                    <Text style={[styles.categoryChipText, category === 'QROVAN' && styles.categoryChipTextActive]}>
                      QroVan
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.categoryChip, category === 'BUS_DRIVER' && styles.categoryChipActive]}
                    onPress={() => setCategory('BUS_DRIVER')}
                  >
                    <Bus size={14} color={category === 'BUS_DRIVER' ? '#ffffff' : '#0f172a'} />
                    <Text style={[styles.categoryChipText, category === 'BUS_DRIVER' && styles.categoryChipTextActive]}>
                      Autobús
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Subselector de municipio para Taxi Local */}
                {category === 'TAXI_LOCAL' && (
                  <View style={styles.subSelectorBox}>
                    <Text style={styles.subSelectorLabel}>MUNICIPIO DE OPERACIÓN:</Text>
                    <View style={styles.municipalityRow}>
                      <TouchableOpacity
                        style={[styles.muniChip, municipality === 'JALPAN' && styles.muniChipActive]}
                        onPress={() => setMunicipality('JALPAN')}
                      >
                        <Text style={[styles.muniChipText, municipality === 'JALPAN' && styles.muniChipTextActive]}>
                          Jalpan
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[styles.muniChip, municipality === 'ARROYO_SECO' && styles.muniChipActive]}
                        onPress={() => setMunicipality('ARROYO_SECO')}
                      >
                        <Text style={[styles.muniChipText, municipality === 'ARROYO_SECO' && styles.muniChipTextActive]}>
                          Arroyo Seco
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[styles.muniChip, municipality === 'PINAL_DE_AMOLES' && styles.muniChipActive]}
                        onPress={() => setMunicipality('PINAL_DE_AMOLES')}
                      >
                        <Text style={[styles.muniChipText, municipality === 'PINAL_DE_AMOLES' && styles.muniChipTextActive]}>
                          Pinal de Amoles
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}

                {/* Nombre del Chofer */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>NOMBRE COMPLETO</Text>
                  <View style={styles.inputWithIcon}>
                    <Car size={16} color="#64748b" />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Ej. Roberto Olvera García"
                      placeholderTextColor="#94a3b8"
                      value={driverName}
                      onChangeText={setDriverName}
                    />
                  </View>
                </View>

                {/* Teléfono y WhatsApp */}
                <View style={styles.twoColsRow}>
                  <View style={styles.col}>
                    <Text style={styles.inputLabel}>TELÉFONO LLAMADAS</Text>
                    <View style={styles.inputWithIcon}>
                      <Phone size={16} color="#64748b" />
                      <TextInput
                        style={styles.textInput}
                        placeholder="441 296 0000"
                        placeholderTextColor="#94a3b8"
                        keyboardType="phone-pad"
                        value={phone}
                        onChangeText={setPhone}
                      />
                    </View>
                  </View>

                  <View style={styles.col}>
                    <Text style={styles.inputLabel}>WHATSAPP</Text>
                    <View style={styles.inputWithIcon}>
                      <MessageSquare size={16} color="#64748b" />
                      <TextInput
                        style={styles.textInput}
                        placeholder="441 296 0000"
                        placeholderTextColor="#94a3b8"
                        keyboardType="phone-pad"
                        value={whatsapp}
                        onChangeText={setWhatsapp}
                      />
                    </View>
                  </View>
                </View>

                {/* Unidad y Placas */}
                <View style={styles.twoColsRow}>
                  <View style={styles.col}>
                    <Text style={styles.inputLabel}>UNIDAD / ECONÓMICO #</Text>
                    <View style={styles.inputWithIcon}>
                      <Text style={styles.prefixPill}>#</Text>
                      <TextInput
                        style={styles.textInput}
                        placeholder="042"
                        placeholderTextColor="#94a3b8"
                        value={unitNumber}
                        onChangeText={setUnitNumber}
                      />
                    </View>
                  </View>

                  <View style={styles.col}>
                    <Text style={styles.inputLabel}>PLACAS</Text>
                    <View style={styles.inputWithIcon}>
                      <TextInput
                        style={[styles.textInput, { textTransform: 'uppercase' }]}
                        placeholder="A-492-TGA"
                        placeholderTextColor="#94a3b8"
                        autoCapitalize="characters"
                        value={plates}
                        onChangeText={setPlates}
                      />
                    </View>
                  </View>
                </View>

                {/* Modelo y Base */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>MODELO DEL VEHÍCULO</Text>
                  <View style={styles.inputWithIcon}>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Ej. Nissan Versa 2023 Blanco/Rojo"
                      placeholderTextColor="#94a3b8"
                      value={vehicleModel}
                      onChangeText={setVehicleModel}
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>BASE O SITIO ASIGNADO</Text>
                  <View style={styles.inputWithIcon}>
                    <MapPin size={16} color="#64748b" />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Ej. Base Crucero Xiris / Centro"
                      placeholderTextColor="#94a3b8"
                      value={baseSite}
                      onChangeText={setBaseSite}
                    />
                  </View>
                </View>

                {/* Switch: Compartir ubicación en vivo o solo directorio */}
                <View style={styles.locationToggleCard}>
                  <View style={{ flex: 1, marginRight: 12 }}>
                    <View style={styles.toggleTitleRow}>
                      <Radio size={16} color={shareLiveLocation ? '#059669' : '#64748b'} />
                      <Text style={styles.toggleTitle}>Compartir GPS en Vivo en el Mapa</Text>
                    </View>
                    <Text style={styles.toggleDesc}>
                      {shareLiveLocation
                        ? '🟢 Tu unidad aparecerá como pin en movimiento en el mapa para que los pasajeros te ubiquen.'
                        : '📁 Solo aparecerás en el directorio de choferes para contacto telefónico o WhatsApp.'}
                    </Text>
                  </View>
                  <Switch
                    value={shareLiveLocation}
                    onValueChange={setShareLiveLocation}
                    trackColor={{ false: '#cbd5e1', true: '#86efac' }}
                    thumbColor={shareLiveLocation ? '#059669' : '#f1f5f9'}
                  />
                </View>

                {/* Botón de Guardado */}
                <TouchableOpacity
                  style={styles.submitDriverBtn}
                  activeOpacity={0.85}
                  onPress={handleRegisterDriver}
                  disabled={submittingDriver}
                >
                  {submittingDriver ? (
                    <ActivityIndicator color="#ffffff" />
                  ) : (
                    <>
                      <CheckCircle size={18} color="#ffffff" />
                      <Text style={styles.submitDriverBtnText}>Registrar y Comenzar Servicio</Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>
            )}

            {/* 2. MODO ADMINISTRADOR (LOGIN RESTRINGIDO) */}
            {activeTab === 'ADMIN' && (
              <View>
                {currentUser.role === 'ADMIN' ? (
                  <View style={styles.adminActiveBox}>
                    <View style={styles.adminBadge}>
                      <Shield size={20} color="#c026d3" />
                      <Text style={styles.adminBadgeText}>Sesión de Administrador Activa</Text>
                    </View>
                    <Text style={styles.adminActiveName}>{currentUser.name}</Text>
                    <Text style={styles.adminActiveEmail}>{currentUser.email}</Text>

                    <View style={styles.privilegesList}>
                      <Text style={styles.privilegeItem}>✔ Programar y editar horarios de autobuses</Text>
                      <Text style={styles.privilegeItem}>✔ Indexación de choferes (Taxis, Buses, QROride)</Text>
                      <Text style={styles.privilegeItem}>✔ Puntos de parada en ruta</Text>
                      <Text style={styles.privilegeItem}>✔ Arrastre y recolocación de bases en el mapa</Text>
                    </View>

                    <TouchableOpacity
                      style={styles.logoutBtn}
                      activeOpacity={0.85}
                      onPress={handleLogout}
                      disabled={loading}
                    >
                      {loading ? (
                        <ActivityIndicator color="#ef4444" />
                      ) : (
                        <>
                          <LogOut size={16} color="#ef4444" />
                          <Text style={styles.logoutBtnText}>Cerrar Sesión</Text>
                        </>
                      )}
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View>
                    <View style={styles.adminNotice}>
                      <Lock size={18} color="#9333ea" />
                      <Text style={styles.adminNoticeText}>
                        Acceso restringido únicamente para administradores del sistema SierraTransporte.
                      </Text>
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>CORREO DE ADMINISTRADOR</Text>
                      <View style={styles.inputWithIcon}>
                        <Mail size={16} color="#64748b" />
                        <TextInput
                          style={styles.textInput}
                          placeholder="admin@sierratransporte.mx"
                          placeholderTextColor="#94a3b8"
                          keyboardType="email-address"
                          autoCapitalize="none"
                          value={email}
                          onChangeText={setEmail}
                        />
                      </View>
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>CONTRASEÑA</Text>
                      <View style={styles.inputWithIcon}>
                        <KeyRound size={16} color="#64748b" />
                        <TextInput
                          style={styles.textInput}
                          placeholder="••••••••"
                          placeholderTextColor="#94a3b8"
                          secureTextEntry
                          value={password}
                          onChangeText={setPassword}
                        />
                      </View>
                    </View>

                    <TouchableOpacity
                      style={styles.loginBtn}
                      activeOpacity={0.85}
                      onPress={handleAdminLogin}
                      disabled={loading}
                    >
                      {loading ? (
                        <ActivityIndicator color="#ffffff" />
                      ) : (
                        <>
                          <Text style={styles.loginBtnText}>Entrar como Administrador</Text>
                          <ArrowRight size={18} color="#ffffff" />
                        </>
                      )}
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
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
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  modalCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    maxHeight: '88%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  headerTitleCol: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  closeBtn: {
    backgroundColor: '#f1f5f9',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modeTabs: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    marginHorizontal: 18,
    marginTop: 14,
    borderRadius: 12,
    padding: 4,
    gap: 6,
  },
  modeTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  modeTabActive: {
    backgroundColor: '#0f172a',
  },
  modeTabText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748b',
  },
  modeTabTextActive: {
    color: '#ffffff',
  },
  content: {
    padding: 18,
  },
  driverFormContainer: {
    gap: 10,
  },
  formHeaderBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecfdf5',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#a7f3d0',
    gap: 10,
    marginBottom: 4,
  },
  formHeaderTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#065f46',
  },
  formHeaderDesc: {
    fontSize: 11,
    color: '#047857',
    marginTop: 1,
  },
  categoryChipsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 4,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 5,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  categoryChipActive: {
    backgroundColor: '#0f172a',
    borderColor: '#0f172a',
  },
  categoryChipText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#334155',
  },
  categoryChipTextActive: {
    color: '#ffffff',
  },
  subSelectorBox: {
    backgroundColor: '#f8fafc',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 4,
  },
  subSelectorLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#64748b',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  municipalityRow: {
    flexDirection: 'row',
    gap: 6,
  },
  muniChip: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  muniChipActive: {
    backgroundColor: '#0284c7',
    borderColor: '#0284c7',
  },
  muniChipText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
  },
  muniChipTextActive: {
    color: '#ffffff',
  },
  inputGroup: {
    marginBottom: 8,
  },
  inputLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748b',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingHorizontal: 12,
    height: 42,
  },
  prefixPill: {
    fontSize: 14,
    fontWeight: '800',
    color: '#64748b',
    marginRight: 4,
  },
  textInput: {
    flex: 1,
    marginLeft: 6,
    fontSize: 13,
    fontWeight: '600',
    color: '#0f172a',
    padding: 0,
  },
  twoColsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  col: {
    flex: 1,
  },
  locationToggleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginTop: 4,
    marginBottom: 10,
  },
  toggleTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  toggleTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0f172a',
  },
  toggleDesc: {
    fontSize: 10.5,
    color: '#64748b',
    lineHeight: 15,
  },
  submitDriverBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#059669',
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
    marginTop: 4,
    marginBottom: 16,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  submitDriverBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#ffffff',
  },
  adminNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#faf5ff',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f3e8ff',
    gap: 8,
    marginBottom: 16,
  },
  adminNoticeText: {
    fontSize: 12,
    color: '#6b21a8',
    fontWeight: '600',
    flex: 1,
  },
  loginBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f172a',
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
    marginTop: 6,
    marginBottom: 16,
  },
  loginBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#ffffff',
  },
  adminActiveBox: {
    backgroundColor: '#fdf4ff',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f5d0fe',
    marginBottom: 16,
  },
  adminBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  adminBadgeText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#9333ea',
  },
  adminActiveName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
  },
  adminActiveEmail: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
    marginBottom: 12,
  },
  privilegesList: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 12,
    gap: 6,
    marginBottom: 14,
  },
  privilegeItem: {
    fontSize: 11,
    color: '#475569',
    fontWeight: '600',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#fecaca',
    paddingVertical: 10,
    borderRadius: 12,
    gap: 6,
  },
  logoutBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ef4444',
  },
});
