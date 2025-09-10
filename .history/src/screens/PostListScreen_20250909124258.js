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
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const LIMIT = 20;

  // fetch with timeout
  const fetchWithTimeout = (url, options = {}, timeout = 5000) => {
    return Promise.race([
      fetch(url, options),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request Timeout")), timeout)
      ),
    ]);
  };

  const fetchPosts = async (pageNumber = 0, loadMore = false) => {
    try {
      if (!loadMore) setLoading(true);
      else setLoadingMore(true);
      setError(null);

      const url = `https://jsonplaceholder.typicode.com/posts?_start=${
        pageNumber * LIMIT
      }&_limit=${LIMIT}`;

      let response;
      try {
        response = await fetchWithTimeout(url, { method: "GET" }, 5000); // 5s timeout
      } catch (err) {
        console.warn("First attempt failed, retrying quickly...");
        response = await fetchWithTimeout(url, { method: "GET" }, 5000);
      }

      if (!response.ok) throw new Error("Network error");
      const data = await response.json();

      if (loadMore) {
        setPosts((prev) => [...prev, ...data]);
        setPage(pageNumber);
      } else {
        setPosts(data);
        setPage(pageNumber);
      }
    } catch (err) {
      console.error("Fetch error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchPosts(0, false);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPosts(0, false).then(() => setRefreshing(false));
  }, []);

  const loadMore = () => {
    if (!loadingMore) {
      fetchPosts(page + 1, true);
    }
  };

  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity style={styles.card}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.body}>{item.body}</Text>
      </TouchableOpacity>
    ),
    []
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

  if (error && posts.length === 0) {
    return (
      <View style={styles.loader}>
        <Text style={{ color: "red" }}>Failed: {error}</Text>
        <TouchableOpacity
          style={styles.retryBtn}
          onPress={() => fetchPosts(0, false)}
        >
          <Text style={{ color: "#fff" }}>Retry</Text>
        </TouchableOpacity>
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
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
      removeClippedSubviews={true}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 10 },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 6, color: "#333" },
  body: { fontSize: 14, color: "#666" },
  footer: { padding: 15, justifyContent: "center", alignItems: "center" },
  retryBtn: {
    marginTop: 10,
    backgroundColor: "blue",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
});
