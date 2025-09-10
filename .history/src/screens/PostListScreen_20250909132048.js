import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from "react-native";

export default function PostListScreen() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

  // Fetch posts
  const fetchPosts = async () => {
  try {
    if (!refreshing) setLoading(true);
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    console.log("Fetched posts:", data); // ✅ Add this
    setPosts(data);
  } catch (error) {
    console.error("Fetch error:", error.message);
  } finally {
    if (!refreshing) setLoading(false);
  }
};


  useEffect(() => {
    fetchPosts();
  }, []);

  // Pull-to-refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPosts().then(() => setRefreshing(false));
  }, []);

  // Render each post
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.body}>{item.body}</Text>
    </TouchableOpacity>
  );

  // Loader for initial fetch
  if (loading && posts.length === 0) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading posts...</Text>
      </View>
    );
  }

  // No posts message
  if (!loading && posts.length === 0) {
    return (
      <View style={styles.loader}>
        <Text>No posts found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={styles.list}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
      removeClippedSubviews={true} // improves performance
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 10,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#333",
  },
  body: {
    fontSize: 14,
    color: "#666",
  },
});
