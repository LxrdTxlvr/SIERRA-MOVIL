import React, { memo } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Marker } from 'react-native-maps';
import { Car, Bus, Compass, Navigation, MapPin, Move } from 'lucide-react-native';
import { LiveVehicle, SimulatedVehicleState, StopPoint, TaxiStand } from '../types/transport';

interface TaxiMarkerProps {
  taxi: LiveVehicle;
  isSelected: boolean;
  onPress: (taxi: LiveVehicle) => void;
}

export const TaxiMarker = memo(({ taxi, isSelected, onPress }: TaxiMarkerProps) => {
  const isAvailable = taxi.status === 'AVAILABLE';

  return (
    <Marker
      coordinate={taxi.coordinate}
      anchor={{ x: 0.5, y: 0.5 }}
      flat={false}
      stopPropagation={true}
      onPress={(e) => {
        e?.stopPropagation?.();
        onPress(taxi);
      }}
      tracksViewChanges={true}
    >
      <View
        pointerEvents="none"
        style={[styles.markerContainer, isSelected && styles.markerSelected]}
      >
        <View
          style={[
            styles.taxiIconBubble,
            { backgroundColor: isAvailable ? '#f59e0b' : '#64748b' },
          ]}
        >
          {/* Indicador de rumbo */}
          <View
            style={[
              styles.bearingPointer,
              { transform: [{ rotate: `${taxi.heading}deg` }] },
            ]}
          >
            <Navigation size={12} color="#ffffff" />
          </View>
          <Car size={16} color="#ffffff" strokeWidth={2.5} />
        </View>

        {/* Badge de disponibilidad y número de unidad */}
        <View style={styles.badgeContainer}>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: isAvailable ? '#10b981' : '#f97316' },
            ]}
          />
          <Text style={styles.badgeText}>#{taxi.unitNumber}</Text>
        </View>
      </View>
    </Marker>
  );
});

interface SimulatedTransportMarkerProps {
  vehicle: SimulatedVehicleState;
  isSelected: boolean;
  onPress: (vehicle: SimulatedVehicleState) => void;
}

export const SimulatedTransportMarker = memo(
  ({ vehicle, isSelected, onPress }: SimulatedTransportMarkerProps) => {
    const isBus = vehicle.transportType === 'BUS';
    const isVencedor = vehicle.operator.includes('Vencedor');
    const primaryColor = isVencedor ? '#059669' : isBus ? '#2563eb' : '#7c3aed';

    return (
      <Marker
        coordinate={vehicle.currentCoordinate}
        anchor={{ x: 0.5, y: 0.5 }}
        flat={false}
        stopPropagation={true}
        onPress={(e) => {
          e?.stopPropagation?.();
          onPress(vehicle);
        }}
        tracksViewChanges={true}
      >
        <View
          pointerEvents="none"
          style={[styles.markerContainer, isSelected && styles.markerSelected]}
        >
          <View style={[styles.busIconBubble, { backgroundColor: primaryColor }]}>
            {/* Indicador de rumbo a lo largo de la carretera */}
            <View
              style={[
                styles.bearingPointer,
                { transform: [{ rotate: `${vehicle.heading}deg` }] },
              ]}
            >
              <Compass size={11} color="#ffffff" />
            </View>
            <Bus size={18} color="#ffffff" strokeWidth={2.4} />
          </View>

          {/* Etiqueta compacta flotante */}
          <View style={[styles.busLabelBubble, { borderColor: primaryColor }]}>
            <Text style={[styles.busLabelText, { color: primaryColor }]} numberOfLines={1}>
              {isVencedor ? 'Vencedor' : isBus ? 'Flecha' : 'QROvan'}
            </Text>
            {vehicle.status === 'IN_TRANSIT' && (
              <Text style={styles.busProgressText}>
                {Math.round(vehicle.progress * 100)}%
              </Text>
            )}
          </View>
        </View>
      </Marker>
    );
  }
);

interface StopMarkerProps {
  stop: StopPoint;
  routeName: string;
  onPress: (stop: StopPoint, routeName: string) => void;
}

export const StopMarker = memo(({ stop, routeName, onPress }: StopMarkerProps) => {
  const isVencedorStop = stop.id.includes('venc') || stop.operator?.includes('Vencedor');

  return (
    <Marker
      coordinate={stop.coordinate}
      anchor={{ x: 0.5, y: 0.5 }}
      stopPropagation={true}
      onPress={(e) => {
        e?.stopPropagation?.();
        onPress(stop, routeName);
      }}
      tracksViewChanges={true}
    >
      <View pointerEvents="none" style={styles.stopMarkerContainer}>
        {isVencedorStop ? (
          <View style={styles.vencedorStopBubble}>
            <Bus size={13} color="#ffffff" />
            <Text style={styles.vencedorStopText}>Vencedor Centro</Text>
          </View>
        ) : (
          <View style={[styles.stopDot, stop.isTerminal && styles.terminalDot]} />
        )}
      </View>
    </Marker>
  );
});

interface TaxiStandMarkerProps {
  stand: TaxiStand;
  onPress: (stand: TaxiStand) => void;
  isAdmin?: boolean;
  onMove?: (standId: string, coordinate: { latitude: number; longitude: number }) => void;
}

export const TaxiStandMarker = memo(({ stand, onPress, isAdmin, onMove }: TaxiStandMarkerProps) => {
  const displayName = stand.name
    .replace('Sitio Taxis ', 'Base ')
    .replace('Sitio ', 'Base ');

  return (
    <Marker
      coordinate={stand.coordinate}
      anchor={{ x: 0.5, y: 1 }}
      stopPropagation={true}
      onPress={(e) => {
        e?.stopPropagation?.();
        onPress(stand);
      }}
      draggable={isAdmin}
      onDragEnd={(e) => {
        if (isAdmin && onMove) {
          onMove(stand.id, e.nativeEvent.coordinate);
        }
      }}
      tracksViewChanges={true}
    >
      <View pointerEvents="none" style={styles.standMarkerContainer}>
        <View style={[styles.standPin, isAdmin && styles.standPinAdmin]}>
          <MapPin size={12} color="#ffffff" />
          <Text style={styles.standPinText}>{displayName}</Text>
          {isAdmin && (
            <View style={styles.adminMoveBadge}>
              <Move size={10} color="#ffffff" />
            </View>
          )}
        </View>
        <View style={[styles.standTriangle, isAdmin && styles.standTriangleAdmin]} />
      </View>
    </Marker>
  );
});

const styles = StyleSheet.create({
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  markerSelected: {
    transform: [{ scale: 1.18 }],
  },
  taxiIconBubble: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.28,
    shadowRadius: 4,
    elevation: 6,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  busIconBubble: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 7,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  bearingPointer: {
    position: 'absolute',
    top: -6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    marginTop: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 3,
    borderWidth: 0.5,
    borderColor: '#e2e8f0',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1e293b',
  },
  busLabelBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 2,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 3,
  },
  busLabelText: {
    fontSize: 9,
    fontWeight: '800',
  },
  busProgressText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#059669',
    marginLeft: 3,
  },
  stopMarkerContainer: {
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stopDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    borderWidth: 2.5,
    borderColor: '#475569',
  },
  terminalDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 3.5,
    borderColor: '#2563eb',
  },
  vencedorStopBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#059669',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 12,
    gap: 4,
    borderWidth: 2,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  vencedorStopText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#ffffff',
  },
  standMarkerContainer: {
    alignItems: 'center',
  },
  standPin: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0369a1',
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 10,
    gap: 4,
    borderWidth: 1.5,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  standPinAdmin: {
    backgroundColor: '#9333ea',
    borderColor: '#fef08a',
  },
  adminMoveBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    padding: 2,
    marginLeft: 2,
  },
  standPinText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#ffffff',
  },
  standTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 5,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#0369a1',
  },
  standTriangleAdmin: {
    borderTopColor: '#9333ea',
  },
});
