import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>

      {/* Login Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* JSON Button */}
      <TouchableOpacity style={[styles.button, { backgroundColor: '#2563eb', marginTop: 12 }]}>
        <Text style={styles.buttonText}>JSON Button</Text>
      </TouchableOpacity>

      {/* Dummy Button */}
      <TouchableOpacity style={[styles.button, { backgroundColor: '#10b981', marginTop: 12 }]}>
        <Text style={styles.buttonText}>Dummy Button</Text>
      </TouchableOpacity>

      {/* Counter Link Button */}
      <TouchableOpacity style={[styles.button, { backgroundColor: '#f59e0b', marginTop: 12 }]}>
        <Text style={styles.buttonText}>Go to Counter Demo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9fafb',
  },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 24 },
  button: {
    width: '100%',
    padding: 14,
    backgroundColor: '#111827',
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  buttonText: { color: '#fff', fontWeight: '600' },
});
