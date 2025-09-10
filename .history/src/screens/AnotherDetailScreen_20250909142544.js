import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AnotherDetailScreen({ route }) {
  const { name, description } = route.params; // receive title and body

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.body}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f3f4f6', // screen background
  },
  card: {
    backgroundColor: '#fff', // white background for the card
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
  },
  body: {
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 22,
  },
});
