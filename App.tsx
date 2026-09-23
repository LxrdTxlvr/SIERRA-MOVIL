import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TransportMap } from './src/components/TransportMap';

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <TransportMap />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
});
