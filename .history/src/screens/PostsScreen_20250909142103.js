
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import postsData from '../data/posts.json';

export default function PostsScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('AnotherDetails', {
          name: item.title,        // must match keys in AnotherDetailScreen
          description: item.body,  // must match keys in AnotherDetailScreen
        })
      }
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text numberOfLines={2}>{item.body}</Text>
    </TouchableOpacity>
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
  },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 6 },
});
