import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import postsData from '../data/posts.json';

export default function PostsScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={postsData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.body}>{item.body}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f3f4f6' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: { fontWeight: 'bold', fontSize: 16, marginBottom: 6 },
  body: { fontSize: 14, color: '#4b5563' },
});
