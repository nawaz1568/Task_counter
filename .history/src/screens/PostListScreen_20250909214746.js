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
import Header from "../components/Header";

export default function PostListScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async (pageNumber = 1, isRefresh = false) => {
    if (loading) {
      console.log("⏳ Skipping fetch — already loading");
      return;
    }
    try {
      console.log(`📡 Fetching page: ${pageNumber}, refresh: ${isRefresh}`);
      setLoading(true);

      const url = `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNumber}`;
      console.log("➡️ Request URL:", url);

      const res = await fetch(url);
      console.log("✅ Response status:", res.status);
a
      const data = await res.json();
      console.log("📦 Data received:", data.length, "items");

      if (data.length < 10) {
        console.log("⚠️ No more data left to fetch");
        setHasMore(false);
      }

      setPosts((prev) => {
        const updated = isRefresh ? data : [...prev, ...data];
        console.log("📝 Updated posts length:", updated.length);
        return updated;
      });

      setPage(pageNumber);
    } catch (e) {
      console.error("❌ Failed to fetch posts:", e);
    } finally {
      setLoading(false);
      console.log("✅ Fetch completed");
    }
  };

  useEffect(() => {
    console.log("🚀 Initial fetch");
    fetchPosts(1, true);
  }, []);

  const onRefresh = useCallback(async () => {
    console.log("🔄 Refresh triggered");
    setRefreshing(true);
    setHasMore(true);
    await fetchPosts(1, true);
    setRefreshing(false);
    console.log("✅ Refresh completed");
  }, []);

  const loadMore = () => {
    if (!loading && hasMore) {
      console.log("⬇️ Load more triggered, current page:", page);
      fetchPosts(page + 1);
    } else {
      console.log("🚫 Load more skipped, loading:", loading, "hasMore:", hasMore);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        console.log("👉 Navigating to details of post ID:", item.id);
        navigation.navigate("Details", { post: item });
      }}
    >
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardBody} numberOfLines={2}>
        {item.body}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title="API Posts" />
      <FlatList
        data={posts}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator size="small" color="blue" style={{ margin: 20 }} />
          ) : !hasMore ? (
            <Text style={styles.footer}>End of List</Text>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f4f6" },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  cardTitle: { fontSize: 16, fontWeight: "700", marginBottom: 6 },
  cardBody: { color: "#374151" },
  footer: {
    textAlign: "center",
    paddingVertical: 20,
    color: "blue",
    fontWeight: "600",
  },
});
