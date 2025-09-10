import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true); 

  const onLogin = () => {
    Alert.alert('Login', `Email: ${email}\nPassword: ${password}`);
    navigation.navigate('Posts');
  };

  const goToCounter = () => {
    navigation.navigate('Counter');
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
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secureTextEntry}
          style={styles.passwordInput}
        />
        <TouchableOpacity
          onPress={() => setSecureTextEntry(!secureTextEntry)}
          style={styles.eyeIcon}
        >
          <Icon name={secureTextEntry ? 'eye-off' : 'eye'} size={22} color="#6b7280" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={onLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#2563eb', marginTop: 12 }]}
        onPress={() => navigation.navigate('Post')}
      >
        <Text style={styles.buttonText}>JSON</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#10b981', marginTop: 12 }]}
        onPress={() => navigation.navigate('DummyPosts')}
      >
        <Text style={styles.buttonText}>Dummy API</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#f50bbeff', marginTop: 12 }]}
        onPress={goToCounter}
      >
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  passwordInput: {
    flex: 1,
    padding: 12,
  },
  eyeIcon: {
    paddingHorizontal: 12,
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
