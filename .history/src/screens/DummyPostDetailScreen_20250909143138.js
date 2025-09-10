import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DummyPostDetailScreen({ route }) {
  const { title, body } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fef3c7' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
  body: { fontSize: 16, lineHeight: 22 },
});
