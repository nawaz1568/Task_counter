import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import postsData from '../data/posts.json';

export default function PostsScreen({ navigation }) {
  const PAGE_SIZE = 15;
  const [page, setPage] = useState(1);
  const [data, setData] = useState(postsData.slice(0, PAGE_SIZE));
  const [loading, setLoading] = useState(false);

  // Load more data when reaching end
  const loadMore = () => {
    if (loading) return;

    const start = page * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    if (start >= postsData.length) return; // No more data

    setLoading(true);

    // Simulate async loading
    setTimeout(() => {
      setData((prev) => [...prev, ...postsData.slice(start, end)]);
      setPage((prev) => prev + 1);
      setLoading(false);
    }, 500);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('AnotherDetails', {
          name: item.title,
          description: item.body,
        })
      }
    >
      <Text style={styles.heading}>userId: {item.userId}</Text>
      <Text style={styles.heading}>ID: {item.id}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.body}>{item.body}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ActivityIndicator size="small" color="#000" /> : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f3f4f6',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  heading: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 6,
  },
  body: {
    fontSize: 16,
    color: '#4b5563',
  },
});
