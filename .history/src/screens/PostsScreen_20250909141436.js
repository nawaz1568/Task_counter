import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import postsData from '../data/posts.json'; // your JSON file

export default function PostsScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.body}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={postsData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f3f4f6' },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 6 },
});
