import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

// Import local JSON
import dat

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [jsonPosts, setJsonPosts] = useState([]);

  // Login function
  const onLogin = () => {
    Alert.alert('Login', `Email: ${email}\nPassword: ${password}`);
    navigation.navigate('Posts');
  };

  // Go to Counter function
  const goToCounter = () => {
    navigation.navigate('Counter');
  };

  // JSON button function
  const fetchJSON = () => {
    // Since it's local, we can directly set the imported JSON
    setJsonPosts(postsData);
    Alert.alert('JSON Loaded', `Loaded ${postsData.length} posts`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>

      {/* Inputs */}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      {/* Buttons */}
      <TouchableOpacity style={styles.button} onPress={onLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#2563eb', marginTop: 12 }]} onPress={fetchJSON}>
        <Text style={styles.buttonText}>JSON Button</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#10b981', marginTop: 12 }]}>
        <Text style={styles.buttonText}>Dummy Button</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#f59e0b', marginTop: 12 }]} onPress={goToCounter}>
        <Text style={styles.buttonText}>Go to Counter Demo</Text>
      </TouchableOpacity>

      {/* Display JSON posts */}
      {jsonPosts.length > 0 && (
        <FlatList
          data={jsonPosts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.postItem}>
              <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
              <Text>{item.body}</Text>
            </View>
          )}
          style={{ marginTop: 20, width: '100%' }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9fafb', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 24 },
  input: { width: '100%', borderWidth: 1, borderColor: '#d1d5db', borderRadius: 12, padding: 12, marginBottom: 12, backgroundColor: '#fff' },
  button: { width: '100%', padding: 14, backgroundColor: '#111827', borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600' },
  postItem: { backgroundColor: '#fff', padding: 12, marginBottom: 10, borderRadius: 8, borderWidth: 1, borderColor: '#e5e7eb' },
});
