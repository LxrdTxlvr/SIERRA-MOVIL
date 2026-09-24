import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';
import {
  Bus,
  PlusCircle,
  Clock,
  Car,
  User,
  Users,
  CheckCircle2,
  Trash2,
  Calendar,
  Sparkles,
  MapPin,
  Route as RouteIcon,
  ShieldAlert,
  Lock,
  Compass,
  Globe,
  MessageSquare,
  Info,
} from 'lucide-react-native';
import {
  ScheduledTransportRoute,
  QrorideTripPosting,
  UserRole,
  LiveVehicle,
  StopPoint,
} from '../types/transport';

interface AdminPanelProps {
  currentRole: UserRole;
  routes: ScheduledTransportRoute[];
  drivers: LiveVehicle[];
  qroridePostings: QrorideTripPosting[];
  onAddItinerary: (routeId: string, itinerary: {
    departureTime: string;
    busNumber: string;
    driverName: string;
    availableSeats: number;
    fareMxn: number;
  }) => void;
  onDeleteItinerary: (routeId: string, itineraryId: string) => void;
  onAddDriver: (driver: Omit<LiveVehicle, 'lastUpdated'>) => void;
  onAddStop: (routeId: string, stop: Omit<StopPoint, 'id'>) => void;
  onOpenAuth: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  currentRole,
  routes,
  drivers,
  qroridePostings,
  onAddItinerary,
  onDeleteItinerary,
  onAddDriver,
  onAddStop,
  onOpenAuth,
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<
    'SCHEDULES' | 'DRIVERS_INDEX' | 'STOPS' | 'ROUTES_GIS'
  >('SCHEDULES');

  // Formulario Horario Autobús
  const [selectedRouteId, setSelectedRouteId] = useState<string>(routes[0]?.id || '');
  const [departureTime, setDepartureTime] = useState<string>('15:30');
  const [busNumber, setBusNumber] = useState<string>('Vencedor #204');
  const [driverName, setDriverName] = useState<string>('Carlos Trejo Balderas');
  const [availableSeats, setAvailableSeats] = useState<string>('32');
  const [serviceType, setServiceType] = useState<string>('Ordinario / Escala');

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
    let text = encodeURIComponent('Hola, me comunico desde la Sierra Gorda (Jalpan de Serra) para consultar disponibilidad y costos de boletos de autobús.');
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

  // Formulario Indexación Conductor
  const [newDriverName, setNewDriverName] = useState<string>('');
  const [newDriverPhone, setNewDriverPhone] = useState<string>('');
  const [newDriverType, setNewDriverType] = useState<'TAXI' | 'QRORIDE'>('TAXI');
  const [newUnitNumber, setNewUnitNumber] = useState<string>('');
  const [newPlates, setNewPlates] = useState<string>('');
  const [newBaseSite, setNewBaseSite] = useState<string>('Base Taxis Crucero Xiris');
  const [newVehicleModel, setNewVehicleModel] = useState<string>('');

  // Formulario Parada en Ruta
  const [selectedRouteForStop, setSelectedRouteForStop] = useState<string>(routes[0]?.id || '');
  const [stopName, setStopName] = useState<string>('');
  const [stopLat, setStopLat] = useState<string>('21.2173');
  const [stopLng, setStopLng] = useState<string>('-99.4708');
  const [stopNotes, setStopNotes] = useState<string>('');
  const [isTerminal, setIsTerminal] = useState<boolean>(false);

  // Guardar Horario
  const handleSaveItinerary = () => {
    if (!departureTime || !busNumber || !driverName) {
      Alert.alert('Datos incompletos', 'Por favor ingresa la hora, número de unidad y chofer.');
      return;
    }

    onAddItinerary(selectedRouteId, {
      departureTime,
      busNumber,
      driverName,
      availableSeats: parseInt(availableSeats, 10) || 30,
      fareMxn: 0,
    });

    Alert.alert(
      '¡Horario Programado!',
      `Se agregó la salida ${departureTime} para la unidad ${busNumber} con éxito.`
    );
  };

  // Guardar Conductor
  const handleSaveDriver = () => {
    if (!newDriverName.trim() || !newDriverPhone.trim() || !newUnitNumber.trim()) {
      Alert.alert('Datos requeridos', 'Por favor ingresa el nombre, teléfono y número de unidad.');
      return;
    }

    const newDriver: Omit<LiveVehicle, 'lastUpdated'> = {
      id: `drv-${Date.now()}`,
      type: newDriverType,
      driverName: newDriverName.trim(),
      unitNumber: newUnitNumber.trim(),
      plates: newPlates.trim() || 'A-000-TGA',
      baseSite: newBaseSite,
      phone: newDriverPhone.trim(),
      whatsapp: `52${newDriverPhone.trim().replace(/[^0-9]/g, '')}`,
      coordinate: {
        latitude: 21.2173 + (Math.random() - 0.5) * 0.003,
        longitude: -99.4708 + (Math.random() - 0.5) * 0.003,
      },
      heading: 90,
      status: 'AVAILABLE',
      speedKmH: 0,
      vehicleModel: newVehicleModel.trim() || 'Nissan Versa 2023 Oficial',
      rating: 5.0,
      totalTrips: 0,
      iqtVerified: true,
      notes: 'Conductor dado de alta e indexado por Administración.',
    };

    onAddDriver(newDriver);

    Alert.alert('¡Conductor Indexado!', `Se registró a ${newDriverName} (Unidad #${newUnitNumber}) exitosamente.`);
    setNewDriverName('');
    setNewDriverPhone('');
    setNewUnitNumber('');
    setNewPlates('');
    setNewVehicleModel('');
  };

  // Guardar Parada
  const handleSaveStop = () => {
    if (!stopName.trim()) {
      Alert.alert('Datos requeridos', 'Ingresa el nombre del punto de parada.');
      return;
    }

    const currentRoute = routes.find((r) => r.id === selectedRouteForStop);
    const nextOrder = (currentRoute?.stops.length || 0) + 1;

    onAddStop(selectedRouteForStop, {
      name: stopName.trim(),
      coordinate: {
        latitude: parseFloat(stopLat) || 21.2173,
        longitude: parseFloat(stopLng) || -99.4708,
      },
      order: nextOrder,
      isTerminal,
      notes: stopNotes.trim() || 'Parada oficial en carretera.',
    });

    Alert.alert('¡Parada Guardada!', `Se agregó "${stopName}" a la ruta seleccionada.`);
    setStopName('');
    setStopNotes('');
  };

  // SI EL USUARIO NO ES ADMIN: VISTA INFORMATIVA SOLO LECTURA CON CANDADO
  if (currentRole !== 'ADMIN') {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Horarios de Transporte</Text>
          <Text style={styles.headerSubtitle}>
            Consulta salidas programadas en la Sierra Gorda y Huasteca
          </Text>
          <TouchableOpacity style={styles.adminLockBtn} activeOpacity={0.85} onPress={onOpenAuth}>
            <Lock size={15} color="#ffffff" />
            <Text style={styles.adminLockBtnText}>Acceso Administrativo</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.fareNoticeBanner}>
            <Info size={18} color="#0284c7" />
            <Text style={styles.fareNoticeText}>
              Los costos y venta de pasajes son fijados por cada empresa. Toca en Taquilla Web o WhatsApp para consultar tarifas actualizadas y adquirir tus boletos directamente con la transportista.
            </Text>
          </View>

          <Text style={styles.listSectionTitle}>ITINERARIOS EN TIEMPO REAL</Text>
          {routes.map((route) => (
            <View key={route.id} style={styles.scheduleCard}>
              <View style={styles.scheduleCardHeader}>
                <View style={[styles.routeBadge, { backgroundColor: route.routeColor }]}>
                  <Text style={styles.routeBadgeText}>{route.routeCode}</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 8 }}>
                  <Text style={styles.scheduleOperator}>{route.operator}</Text>
                  <Text style={styles.scheduleName}>{route.name}</Text>
                </View>
              </View>

              {/* Botones de Redirección Oficial */}
              <View style={styles.carrierBtnRow}>
                <TouchableOpacity
                  style={styles.carrierWebBtn}
                  activeOpacity={0.8}
                  onPress={() => handleOpenCarrierWeb(route.operator)}
                >
                  <Globe size={13} color="#0284c7" />
                  <Text style={styles.carrierWebText}>Taquilla Web</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.carrierWaBtn}
                  activeOpacity={0.8}
                  onPress={() => handleOpenCarrierWhatsApp(route.operator)}
                >
                  <MessageSquare size={13} color="#16a34a" />
                  <Text style={styles.carrierWaText}>WhatsApp Empresa</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.itinerariesList}>
                {route.itineraries.length === 0 ? (
                  <Text style={styles.emptyItinText}>No hay salidas programadas para hoy.</Text>
                ) : (
                  route.itineraries.map((it) => (
                    <View key={it.id} style={styles.itinCardItem}>
                      <View style={styles.itinLeftCol}>
                        <View style={styles.itinTimeUnitRow}>
                          <Clock size={13} color="#059669" />
                          <Text style={styles.itinTimeText}>{it.departureTime} hrs</Text>
                          <View style={styles.itinUnitPill}>
                            <Text style={styles.itinUnitText}>{it.busNumber || 'Camión'}</Text>
                          </View>
                        </View>
                        <Text style={styles.itinSubInfoText} numberOfLines={1}>
                          Chofer: {it.driverName || 'En turno'}
                        </Text>
                      </View>
                      <View style={styles.itinStatusPill}>
                        <Text style={styles.itinStatusText}>Salida Diaria</Text>
                      </View>
                    </View>
                  ))
                )}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }

  // SI ES ADMINISTRADOR: PANEL COMPLETO CON LAS 4 HERRAMIENTAS
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <Text style={styles.headerTitle}>Panel de Control</Text>
          <View style={styles.roleBadge}>
            <Sparkles size={12} color="#ffffff" />
            <Text style={styles.roleBadgeText}>Admin Autorizado</Text>
          </View>
        </View>
        <Text style={styles.headerSubtitle}>
          Gestión de horarios, indexación de choferes, paradas y carreteras reales
        </Text>

        {/* 4 Tabs Superiores */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsRowScroll}>
          <TouchableOpacity
            style={[styles.tabBtn, activeAdminTab === 'SCHEDULES' && styles.tabBtnActive]}
            onPress={() => setActiveAdminTab('SCHEDULES')}
          >
            <Bus size={15} color={activeAdminTab === 'SCHEDULES' ? '#ffffff' : '#64748b'} />
            <Text style={[styles.tabBtnText, activeAdminTab === 'SCHEDULES' && styles.tabBtnTextActive]}>
              Horarios
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabBtn, activeAdminTab === 'DRIVERS_INDEX' && styles.tabBtnActive]}
            onPress={() => setActiveAdminTab('DRIVERS_INDEX')}
          >
            <Users size={15} color={activeAdminTab === 'DRIVERS_INDEX' ? '#ffffff' : '#64748b'} />
            <Text style={[styles.tabBtnText, activeAdminTab === 'DRIVERS_INDEX' && styles.tabBtnTextActive]}>
              Indexar Choferes
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabBtn, activeAdminTab === 'STOPS' && styles.tabBtnActive]}
            onPress={() => setActiveAdminTab('STOPS')}
          >
            <MapPin size={15} color={activeAdminTab === 'STOPS' ? '#ffffff' : '#64748b'} />
            <Text style={[styles.tabBtnText, activeAdminTab === 'STOPS' && styles.tabBtnTextActive]}>
              Puntos de Parada
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabBtn, activeAdminTab === 'ROUTES_GIS' && styles.tabBtnActive]}
            onPress={() => setActiveAdminTab('ROUTES_GIS')}
          >
            <RouteIcon size={15} color={activeAdminTab === 'ROUTES_GIS' ? '#ffffff' : '#64748b'} />
            <Text style={[styles.tabBtnText, activeAdminTab === 'ROUTES_GIS' && styles.tabBtnTextActive]}>
              Carreteras Reales
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* TAB 1: HORARIOS DE AUTOBUSES */}
        {activeAdminTab === 'SCHEDULES' && (
          <View>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <PlusCircle size={18} color="#059669" />
                <Text style={styles.cardTitle}>Programar Salida de Autobús</Text>
              </View>

              <Text style={styles.inputLabel}>SELECCIONAR RUTA</Text>
              <View style={styles.routeSelector}>
                {routes.map((r) => {
                  const isSelected = selectedRouteId === r.id;
                  return (
                    <TouchableOpacity
                      key={r.id}
                      style={[
                        styles.routeOption,
                        isSelected && { borderColor: r.routeColor, backgroundColor: '#f0fdf4' },
                      ]}
                      onPress={() => setSelectedRouteId(r.id)}
                    >
                      <View style={[styles.routeDot, { backgroundColor: r.routeColor }]} />
                      <View style={{ flex: 1 }}>
                        <Text style={styles.routeNameText}>{r.operator}</Text>
                        <Text style={styles.routeDescText}>{r.name}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <View style={styles.rowTwoCols}>
                <View style={styles.col}>
                  <Text style={styles.inputLabel}>HORA SALIDA (HH:MM)</Text>
                  <View style={styles.inputWithIcon}>
                    <Clock size={16} color="#64748b" />
                    <TextInput
                      style={styles.textInput}
                      value={departureTime}
                      onChangeText={setDepartureTime}
                      placeholder="15:30"
                    />
                  </View>
                </View>

                <View style={styles.col}>
                  <Text style={styles.inputLabel}>UNIDAD #</Text>
                  <View style={styles.inputWithIcon}>
                    <Bus size={16} color="#64748b" />
                    <TextInput
                      style={styles.textInput}
                      value={busNumber}
                      onChangeText={setBusNumber}
                      placeholder="Vencedor #204"
                    />
                  </View>
                </View>
              </View>

              <View style={styles.rowTwoCols}>
                <View style={styles.col}>
                  <Text style={styles.inputLabel}>CHOFER EN TURNO</Text>
                  <View style={styles.inputWithIcon}>
                    <User size={16} color="#64748b" />
                    <TextInput
                      style={styles.textInput}
                      value={driverName}
                      onChangeText={setDriverName}
                      placeholder="Nombre del conductor"
                    />
                  </View>
                </View>

                <View style={styles.col}>
                  <Text style={styles.inputLabel}>TIPO DE SERVICIO</Text>
                  <View style={styles.inputWithIcon}>
                    <RouteIcon size={16} color="#64748b" />
                    <TextInput
                      style={styles.textInput}
                      value={serviceType}
                      onChangeText={setServiceType}
                      placeholder="Ordinario / Escala"
                    />
                  </View>
                </View>
              </View>

              <TouchableOpacity style={styles.submitBtn} activeOpacity={0.85} onPress={handleSaveItinerary}>
                <CheckCircle2 size={18} color="#ffffff" />
                <Text style={styles.submitBtnText}>Guardar Salida en la Red</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.listSectionTitle}>HORARIOS PROGRAMADOS POR RUTA</Text>
            {routes.map((route) => (
              <View key={route.id} style={styles.scheduleCard}>
                <View style={styles.scheduleCardHeader}>
                  <View style={[styles.routeBadge, { backgroundColor: route.routeColor }]}>
                    <Text style={styles.routeBadgeText}>{route.routeCode}</Text>
                  </View>
                  <View style={{ flex: 1, marginLeft: 8 }}>
                    <Text style={styles.scheduleOperator}>{route.operator}</Text>
                    <Text style={styles.scheduleName}>{route.name}</Text>
                  </View>
                </View>

                <View style={styles.itinerariesList}>
                  {route.itineraries.map((it) => (
                    <View key={it.id} style={styles.itinCardItem}>
                      <View style={styles.itinLeftCol}>
                        <View style={styles.itinTimeUnitRow}>
                          <Clock size={13} color="#059669" />
                          <Text style={styles.itinTimeText}>{it.departureTime} hrs</Text>
                          <View style={styles.itinUnitPill}>
                            <Text style={styles.itinUnitText}>{it.busNumber || 'Camión'}</Text>
                          </View>
                        </View>
                        <Text style={styles.itinSubInfoText} numberOfLines={1}>
                          Chofer: {it.driverName || 'En turno'} • Salida Programada
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => onDeleteItinerary(route.id, it.id)}
                        style={styles.deleteItinBtn}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                      >
                        <Trash2 size={16} color="#ef4444" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* TAB 2: INDEXACIÓN DE CONDUCTORES */}
        {activeAdminTab === 'DRIVERS_INDEX' && (
          <View>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Users size={18} color="#2563eb" />
                <Text style={styles.cardTitle}>Indexar Nuevo Conductor al Sistema</Text>
              </View>

              <Text style={styles.cardTip}>
                Los conductores indexados aparecerán en el directorio público y mapa con estatus de disponibilidad.
              </Text>

              <View style={styles.rowTwoCols}>
                <TouchableOpacity
                  style={[styles.typePill, newDriverType === 'TAXI' && styles.typePillActive]}
                  onPress={() => setNewDriverType('TAXI')}
                >
                  <Text style={[styles.typePillText, newDriverType === 'TAXI' && styles.typePillTextActive]}>
                    Taxi Concesionado
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.typePill, newDriverType === 'QRORIDE' && styles.typePillActive]}
                  onPress={() => setNewDriverType('QRORIDE')}
                >
                  <Text style={[styles.typePillText, newDriverType === 'QRORIDE' && styles.typePillTextActive]}>
                    QROvan / QROride
                  </Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.inputLabel}>NOMBRE COMPLETO</Text>
              <TextInput
                style={styles.singleInput}
                value={newDriverName}
                onChangeText={setNewDriverName}
                placeholder="Ej. Roberto Trejo Balderas"
              />

              <View style={styles.rowTwoCols}>
                <View style={styles.col}>
                  <Text style={styles.inputLabel}>TELÉFONO CELULAR</Text>
                  <TextInput
                    style={styles.singleInput}
                    value={newDriverPhone}
                    onChangeText={setNewDriverPhone}
                    keyboardType="phone-pad"
                    placeholder="441 296 0111"
                  />
                </View>
                <View style={styles.col}>
                  <Text style={styles.inputLabel}>UNIDAD #</Text>
                  <TextInput
                    style={styles.singleInput}
                    value={newUnitNumber}
                    onChangeText={setNewUnitNumber}
                    placeholder="042"
                  />
                </View>
              </View>

              <View style={styles.rowTwoCols}>
                <View style={styles.col}>
                  <Text style={styles.inputLabel}>PLACAS OFICIALES</Text>
                  <TextInput
                    style={styles.singleInput}
                    value={newPlates}
                    onChangeText={setNewPlates}
                    placeholder="A-492-TGA"
                  />
                </View>
                <View style={styles.col}>
                  <Text style={styles.inputLabel}>VEHÍCULO / MODELO</Text>
                  <TextInput
                    style={styles.singleInput}
                    value={newVehicleModel}
                    onChangeText={setNewVehicleModel}
                    placeholder="Nissan Versa 2023"
                  />
                </View>
              </View>

              <Text style={styles.inputLabel}>SITIO O BASE ASIGNADA</Text>
              <TextInput
                style={styles.singleInput}
                value={newBaseSite}
                onChangeText={setNewBaseSite}
                placeholder="Base Taxis Crucero Xiris"
              />

              <TouchableOpacity
                style={[styles.submitBtn, { backgroundColor: '#2563eb' }]}
                activeOpacity={0.85}
                onPress={handleSaveDriver}
              >
                <CheckCircle2 size={18} color="#ffffff" />
                <Text style={styles.submitBtnText}>Dar de Alta Conductor</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.listSectionTitle}>CONDUCTORES REGISTRADOS ({drivers.length})</Text>
            {drivers.map((d) => (
              <View key={d.id} style={styles.driverCard}>
                <View style={styles.driverCardHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.driverCardName}>{d.driverName}</Text>
                    <Text style={styles.driverCardSub}>
                      Unidad #{d.unitNumber} • {d.vehicleModel || 'Vehículo de Transporte'}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.driverStatusBadge,
                      { backgroundColor: d.status === 'AVAILABLE' ? '#dcfce7' : '#ffedd5' },
                    ]}
                  >
                    <Text
                      style={[
                        styles.driverStatusBadgeText,
                        { color: d.status === 'AVAILABLE' ? '#15803d' : '#c2410c' },
                      ]}
                    >
                      {d.status === 'AVAILABLE' ? 'Libre' : 'En Servicio'}
                    </Text>
                  </View>
                </View>
                <Text style={styles.driverCardBase}>{d.baseSite} • Tel: {d.phone}</Text>
              </View>
            ))}
          </View>
        )}

        {/* TAB 3: PUNTOS DE PARADA EN RUTA */}
        {activeAdminTab === 'STOPS' && (
          <View>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <MapPin size={18} color="#059669" />
                <Text style={styles.cardTitle}>Agregar Punto de Parada en Carretera</Text>
              </View>

              <Text style={styles.inputLabel}>SELECCIONAR RUTA ASOCIADA</Text>
              <View style={styles.routeSelector}>
                {routes.map((r) => {
                  const isSelected = selectedRouteForStop === r.id;
                  return (
                    <TouchableOpacity
                      key={r.id}
                      style={[
                        styles.routeOption,
                        isSelected && { borderColor: r.routeColor, backgroundColor: '#f0fdf4' },
                      ]}
                      onPress={() => setSelectedRouteForStop(r.id)}
                    >
                      <View style={[styles.routeDot, { backgroundColor: r.routeColor }]} />
                      <View style={{ flex: 1 }}>
                        <Text style={styles.routeNameText}>{r.name}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <Text style={styles.inputLabel}>NOMBRE DE LA PARADA / TERMINAL</Text>
              <TextInput
                style={styles.singleInput}
                value={stopName}
                onChangeText={setStopName}
                placeholder="Ej. Ahuacatlán de Jesús Centro"
              />

              <View style={styles.rowTwoCols}>
                <View style={styles.col}>
                  <Text style={styles.inputLabel}>LATITUD (GPS)</Text>
                  <TextInput
                    style={styles.singleInput}
                    value={stopLat}
                    onChangeText={setStopLat}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.col}>
                  <Text style={styles.inputLabel}>LONGITUD (GPS)</Text>
                  <TextInput
                    style={styles.singleInput}
                    value={stopLng}
                    onChangeText={setStopLng}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <Text style={styles.inputLabel}>NOTAS DE ABORDAJE</Text>
              <TextInput
                style={styles.singleInput}
                value={stopNotes}
                onChangeText={setStopNotes}
                placeholder="Frente a la plaza principal / gasolinera"
              />

              <TouchableOpacity
                style={[styles.terminalCheckRow, isTerminal && styles.terminalCheckRowActive]}
                onPress={() => setIsTerminal(!isTerminal)}
              >
                <CheckCircle2 size={16} color={isTerminal ? '#059669' : '#64748b'} />
                <Text style={styles.terminalCheckText}>Es Terminal o Parada Principal de Destino</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.submitBtn} activeOpacity={0.85} onPress={handleSaveStop}>
                <MapPin size={18} color="#ffffff" />
                <Text style={styles.submitBtnText}>Guardar Punto de Parada</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.listSectionTitle}>PARADAS CONFIGURADAS EN ESTA RUTA</Text>
            {routes
              .find((r) => r.id === selectedRouteForStop)
              ?.stops.map((s, idx) => (
                <View key={s.id} style={styles.stopCard}>
                  <View style={styles.stopOrderCircle}>
                    <Text style={styles.stopOrderText}>{idx + 1}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.stopCardTitle}>{s.name}</Text>
                    <Text style={styles.stopCardSub}>
                      {s.isTerminal ? 'Terminal Oficial' : 'Punto Intermedio'} • Lat: {s.coordinate.latitude.toFixed(4)}, Lon: {s.coordinate.longitude.toFixed(4)}
                    </Text>
                  </View>
                </View>
              ))}
          </View>
        )}

        {/* TAB 4: RECOLOCACIÓN Y CARRETERAS REALES (GIS) */}
        {activeAdminTab === 'ROUTES_GIS' && (
          <View>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <RouteIcon size={18} color="#ea580c" />
                <Text style={styles.cardTitle}>Trazados Reales por Carretera (GIS)</Text>
              </View>
              <Text style={styles.cardTip}>
                El sistema ahora respeta las carreteras federales y estatales sin cortar cerros ni caminos rectos.
              </Text>

              <View style={styles.gisRouteCard}>
                <View style={[styles.gisColorBar, { backgroundColor: '#ea580c' }]} />
                <View style={{ flex: 1, padding: 12 }}>
                  <Text style={styles.gisRouteTitle}>Carretera Federal 120: Jalpan - Xilitla</Text>
                  <Text style={styles.gisRouteDesc}>
                    34 waypoints de alta precisión que siguen las curvas de la sierra por Landa de Matamoros, Puerto del Lobo, Ahuacatlán de Jesús hasta Xilitla Centro.
                  </Text>
                  <View style={styles.gisStatusBadge}>
                    <CheckCircle2 size={12} color="#15803d" />
                    <Text style={styles.gisStatusText}>Alineada a Carretera Real (1h 36m)</Text>
                  </View>
                </View>
              </View>

              <View style={styles.gisRouteCard}>
                <View style={[styles.gisColorBar, { backgroundColor: '#059669' }]} />
                <View style={{ flex: 1, padding: 12 }}>
                  <Text style={styles.gisRouteTitle}>Carretera Federal 120: Jalpan - Querétaro</Text>
                  <Text style={styles.gisRouteDesc}>
                    Trazado de montaña con curvas de herradura por Pinal de Amoles, Puerta del Cielo, El Chuveje, Peña Blanca, Cadereyta, Ezequiel Montes hasta Querétaro.
                  </Text>
                  <View style={styles.gisStatusBadge}>
                    <CheckCircle2 size={12} color="#15803d" />
                    <Text style={styles.gisStatusText}>Alineada a Carretera Real (3h 05m)</Text>
                  </View>
                </View>
              </View>

              <View style={styles.gisRouteCard}>
                <View style={[styles.gisColorBar, { backgroundColor: '#7c3aed' }]} />
                <View style={{ flex: 1, padding: 12 }}>
                  <Text style={styles.gisRouteTitle}>Carretera 69 y 120: Rioverde - Jalpan - Xilitla</Text>
                  <Text style={styles.gisRouteDesc}>
                    Corredor Huasteca/Sierra que conecta Rioverde y Concá con parada en Jalpan de Serra y continuación hacia Xilitla.
                  </Text>
                  <View style={styles.gisStatusBadge}>
                    <CheckCircle2 size={12} color="#15803d" />
                    <Text style={styles.gisStatusText}>Alineada con Parada Central Jalpan</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
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
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0f172a',
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  roleBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
    marginBottom: 12,
  },
  adminLockBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#0f172a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    gap: 6,
  },
  adminLockBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
  },
  tabsRowScroll: {
    gap: 6,
    paddingVertical: 2,
  },
  tabBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    gap: 6,
  },
  tabBtnActive: {
    backgroundColor: '#0f172a',
  },
  tabBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748b',
  },
  tabBtnTextActive: {
    color: '#ffffff',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    paddingBottom: 90,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 18,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
  },
  cardTip: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748b',
    letterSpacing: 0.5,
    marginBottom: 4,
    marginTop: 8,
  },
  routeSelector: {
    gap: 6,
    marginBottom: 6,
  },
  routeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
    gap: 8,
  },
  routeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  routeNameText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0f172a',
  },
  routeDescText: {
    fontSize: 11,
    color: '#64748b',
  },
  rowTwoCols: {
    flexDirection: 'row',
    gap: 10,
  },
  col: {
    flex: 1,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingHorizontal: 10,
    height: 42,
  },
  textInput: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: '#0f172a',
    marginLeft: 6,
    padding: 0,
  },
  singleInput: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingHorizontal: 12,
    height: 42,
    fontSize: 13,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 6,
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#059669',
    paddingVertical: 12,
    borderRadius: 14,
    marginTop: 14,
    gap: 8,
  },
  submitBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#ffffff',
  },
  listSectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748b',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  scheduleCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 12,
  },
  scheduleCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  routeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  routeBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#ffffff',
  },
  scheduleOperator: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0f172a',
  },
  scheduleName: {
    fontSize: 11,
    color: '#64748b',
  },
  itinerariesList: {
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 8,
    gap: 6,
  },
  itinCardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8fafc',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  itinLeftCol: {
    flex: 1,
    marginRight: 10,
  },
  itinTimeUnitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 4,
  },
  itinTimeText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0f172a',
  },
  itinUnitPill: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: '#bfdbfe',
  },
  itinUnitText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1d4ed8',
  },
  itinSubInfoText: {
    fontSize: 11,
    color: '#475569',
  },
  fareNoticeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f9ff',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bae6fd',
    gap: 10,
    marginBottom: 14,
  },
  fareNoticeText: {
    fontSize: 11,
    color: '#0369a1',
    fontWeight: '600',
    flex: 1,
    lineHeight: 16,
  },
  carrierBtnRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
    marginBottom: 4,
  },
  carrierWebBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f9ff',
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bae6fd',
    gap: 5,
  },
  carrierWebText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0284c7',
  },
  carrierWaBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0fdf4',
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bbf7d0',
    gap: 5,
  },
  carrierWaText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#16a34a',
  },
  itinStatusPill: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#cbd5e1',
  },
  itinStatusText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#475569',
  },
  deleteItinBtn: {
    backgroundColor: '#fef2f2',
    padding: 8,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#fecaca',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyItinText: {
    fontSize: 12,
    color: '#94a3b8',
    fontStyle: 'italic',
    paddingVertical: 6,
  },
  typePill: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  typePillActive: {
    backgroundColor: '#0f172a',
    borderColor: '#0f172a',
  },
  typePillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  typePillTextActive: {
    color: '#ffffff',
  },
  driverCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 8,
  },
  driverCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  driverCardName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0f172a',
  },
  driverCardSub: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 2,
  },
  driverStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: 8,
  },
  driverStatusBadgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  driverCardBase: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 6,
  },
  stopCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 6,
    gap: 10,
  },
  stopOrderCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stopOrderText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#ffffff',
  },
  stopCardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0f172a',
  },
  stopCardSub: {
    fontSize: 10,
    color: '#64748b',
  },
  terminalCheckRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  terminalCheckRowActive: {
    opacity: 1,
  },
  terminalCheckText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },
  gisRouteCard: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#f8fafc',
    marginBottom: 10,
    overflow: 'hidden',
  },
  gisColorBar: {
    width: 6,
  },
  gisRouteTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0f172a',
  },
  gisRouteDesc: {
    fontSize: 11,
    color: '#475569',
    marginVertical: 4,
  },
  gisStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  gisStatusText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#15803d',
  },
});
