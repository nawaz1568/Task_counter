import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    padding: 20,
  },
  button: {
    width: '80%',
    padding: 14,
    backgroundColor: '#111827',
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
