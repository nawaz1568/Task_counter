import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

export default function DummyPostsScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0); 
  const [hasMore, setHasMore] = useState(true);

  const PAGE_SIZE = 10;

  const fetchPosts = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://dummyjson.com/posts?limit=${PAGE_SIZE}&skip=${page * PAGE_SIZE}`
      );
      const data = await res.json();
 
      if (data.posts.length > 0) {
        setPosts((prev) => [...prev, ...data.posts]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('DummyPostDetail', {
          title: item.title,
          body: item.body,
        })
      }
    >
      <Text style={styles.heading}>User ID: {item.userId}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.body}>{item.body}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        onEndReached={fetchPosts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator size="large" style={{ marginVertical: 16 }} />
          ) : !hasMore ? (
            <Text style={styles.endText}>No more posts</Text>
          ) : null
        }
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
  heading: { fontSize: 14, fontWeight: '600', color: '#374151' },
  title: { fontSize: 18, fontWeight: '700', marginVertical: 6 },
  body: { fontSize: 16, color: '#4b5563' },
  endText: {
    textAlign: 'center',
    color: '#6b7280',
    paddingVertical: 12,
    fontSize: 16,
  },
});
