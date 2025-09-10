import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AnotherDetailScreen({ route }) {
  const { name, description } = route.params; // example fields

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,

  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
  },
});
