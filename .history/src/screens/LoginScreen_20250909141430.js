import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Login button function
  const onLogin = () => {
    Alert.alert('Login', `Email: ${email}\nPassword: ${password}`);
    navigation.navigate('Posts'); // Navigate to Posts screen
  };

  // Go to Counter Demo button function
  const goToCounter = () => {
    navigation.navigate('Counter'); // Navigate to Counter screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>

      {/* Text Inputs */}
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

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={onLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

{/* JSON Button */}
<TouchableOpacity
  style={[styles.button, { backgroundColor: '#2563eb', marginTop: 12 }]}
  onPress={() => navigation.navigate('PostsScreen')} 
>
  <Text style={styles.buttonText}>JSON Button</Text>
</TouchableOpacity>


      {/* Dummy Button */}
      <TouchableOpacity style={[styles.button, { backgroundColor: '#10b981', marginTop: 12 }]}>
        <Text style={styles.buttonText}>Dummy Button</Text>
      </TouchableOpacity>

      {/* Go to Counter Demo Button */}
      <TouchableOpacity style={[styles.button, { backgroundColor: '#f59e0b', marginTop: 12 }]} onPress={goToCounter}>
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
});
