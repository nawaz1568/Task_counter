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

  const LIMIT = 10; // fetch 10 at a time
  const BASE_URL = "http://10.31.145.36:3000/posts"; // 👈 your backend

  // fetch with timeout + retry
  const fetchWithTimeout = (url, options = {}, timeout = 10000, retries = 2) => {
    return new Promise((resolve, reject) => {
      const attempt = (n) => {
        Promise.race([
          fetch(url, options),
          new Promise((_, rej) =>
            setTimeout(() => rej(new Error("Request Timeout")), timeout)
          ),
        ])
          .then(resolve)
          .catch((err) => {
            if (n > 0) {
              console.warn("Retrying fetch...");
              setTimeout(() => attempt(n - 1), 1000);
            } else {
              reject(err);
            }
          });
      };
      attempt(retries);
    });
  };

  // fetch posts
  const fetchPosts = async (pageNumber = 0, append = false) => {
    try {
      if (pageNumber === 0) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const response = await fetchWithTimeout(
        `${BASE_URL}?_start=${pageNumber * LIMIT}&_limit=${LIMIT}`,
        { method: "GET" },
        10000, // 10s timeout
        2 // 2 retries
      );

      const data = await response.json();

      if (append) {
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
    fetchPosts(0); // load first 10 posts
  }, []);

  // Pull-to-refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPosts(0, false).then(() => setRefreshing(false));
  }, []);

  // Load more on scroll
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

  return (
    <FlatList
      data={posts}
      keyExtractor={(item, index) => item.id?.toString() || index.toString()}
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
