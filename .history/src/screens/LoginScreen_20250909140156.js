import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    Alert.alert('Entered Values', `Email: ${email}\nPassword: ${password}`);
    navigation.navigate('Posts');
  };

  const onJSONButton = () => {
    // Example JSON data
    const sampleData = { name: 'John Doe', email: 'john@example.com', age: 30 };
    Alert.alert('JSON Button Pressed', JSON.stringify(sampleData, null, 2));
  };

  const onDummyButton = () => {
    Alert.alert('Dummy Button Pressed', 'This is a dummy button action.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      {/* Existing Login Button */}
      <TouchableOpacity style={styles.button} onPress={onLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* JSON Button */}
      <TouchableOpacity style={[styles.button, { backgroundColor: '#2563eb', marginTop: 12 }]} onPress={onJSONButton}>
        <Text style={styles.buttonText}>JSON Button</Text>
      </TouchableOpacity>

      {/* Dummy Button */}
      <TouchableOpacity style={[styles.button, { backgroundColor: '#10b981', marginTop: 12 }]} onPress={onDummyButton}>
        <Text style={styles.buttonText}>Dummy Button</Text>
      </TouchableOpacity>

      {/* Existing Counter Link */}
      <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Counter')}>
        <Text style={styles.linkText}>Go to Counter Demo</Text>
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
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    padding: 14,
    backgroundColor: '#111827',
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  buttonText: { color: '#fff', fontWeight: '600' },
  link: { marginTop: 20 },
  linkText: { color: '#2563eb', fontWeight: '500' },
});
