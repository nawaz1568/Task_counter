import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import Header from '../components/Header';

export default function PostListScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch('https://dummyjson.com/posts');
      const data = await res.json();
      setPosts(data);
    } catch (e) {
      console.warn('Failed to fetch posts', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Details', { post: item })}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardBody} numberOfLines={2}>{item.body}</Text>
    </TouchableOpacity>
  );

  if (loading && posts.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="API Posts" />
      <FlatList
        data={posts}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        ListFooterComponent={<Text style={styles.footer}>End of List</Text>}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  cardTitle: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
  cardBody: { color: '#374151' },
  footer: {
    textAlign: 'center',
    paddingVertical: 20,
    color: '#6b7280',
  },
});