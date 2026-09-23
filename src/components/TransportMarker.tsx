import React, { memo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Marker } from 'react-native-maps';
import { Car, Bus, Compass, Navigation } from 'lucide-react-native';
import { LiveVehicle, SimulatedVehicleState, StopPoint } from '../types/transport';

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
      onPress={() => onPress(taxi)}
      tracksViewChanges={false}
    >
      <View style={[styles.markerContainer, isSelected && styles.markerSelected]}>
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
    const primaryColor = isBus ? '#2563eb' : '#7c3aed';

    return (
      <Marker
        coordinate={vehicle.currentCoordinate}
        anchor={{ x: 0.5, y: 0.5 }}
        flat={false}
        onPress={() => onPress(vehicle)}
        tracksViewChanges={false}
      >
        <View style={[styles.markerContainer, isSelected && styles.markerSelected]}>
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
              {isBus ? 'Flecha Amarilla' : 'QROride'}
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
  return (
    <Marker
      coordinate={stop.coordinate}
      anchor={{ x: 0.5, y: 0.5 }}
      onPress={() => onPress(stop, routeName)}
      tracksViewChanges={false}
    >
      <View style={styles.stopMarkerContainer}>
        <View style={[styles.stopDot, stop.isTerminal && styles.terminalDot]} />
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
    transform: [{ scale: 1.15 }],
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
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.32,
    shadowRadius: 5,
    elevation: 7,
    borderWidth: 2.5,
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
    marginTop: 3,
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
    marginTop: 3,
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
    padding: 6,
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
});
