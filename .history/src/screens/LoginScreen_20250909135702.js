import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function ButtonScreen() {
  const onLogin = () => {
    Alert.alert('Login Button Pressed');
  };

  const onDummyAPI = () => {
    Alert.alert('Dummy API Button Pressed');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#2563eb', marginTop: 12 }]} onPress={onDummyAPI}>
        <Text style={styles.buttonText}>Dummy API</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9fafb' },
  button: {
    width: '80%',
    padding: 14,
    backgroundColor: '#111827',
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '600' },
});
