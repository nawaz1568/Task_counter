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
  const [page, setPage] = useState(0); // pagination offset
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const LIMIT = 20;

  // fetch with timeout helper
  const fetchWithTimeout = (url, options = {}, timeout = 5000) => {
    return Promise.race([
      fetch(url, options),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request Timeout")), timeout)
      ),
    ]);
  };

  // fetch posts with pagination
  const fetchPosts = async (pageNumber = 0, loadMore = false) => {
    try {
      if (loadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const response = await fetchWithTimeout(
        `https://jsonplaceholder.typicode.com/posts?_start=${
          pageNumber * LIMIT
        }&_limit=${LIMIT}`,
        { method: "GET" },
        5000 // 5 sec timeout
      );

      const data = await response.json();

      if (loadMore) {
        setPosts((prev) => [...prev, ...data]);
      } else {
        setPosts(data);
      }

      setPage(pageNumber);
    } catch (error) {
      console.error("Fetch error:", error.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchPosts(); // first load
  }, []);

  // Pull-to-refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPosts(0, false).then(() => setRefreshing(false));
  }, []);

  // Load more when scrolled to end
  const loadMore = () => {
    if (!loadingMore) {
      fetchPosts(page + 1, true);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.body}>{item.body}</Text>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#0000ff" />
        <Text>Loading more...</Text>
      </View>
    );
  };

  if (loading && posts.length === 0) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading posts...</Text>
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
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
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
  footer: {
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
