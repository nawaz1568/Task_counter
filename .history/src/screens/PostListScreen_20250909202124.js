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
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort(); // cancel request after 5s
    console.warn("⏳ API request timed out!");
  }, 5000);

  try {
    setLoading(true);
    console.log(`📡 Fetching page: ${pageNumber}`);

    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNumber}`,
      { signal: controller.signal }
    );
    clearTimeout(timeout);

    if (!res.ok) throw new Error("API error " + res.status);

    const data = await res.json();
    console.log("📦 Data received:", data.length);

    setPosts((prev) => (isRefresh ? data : [...prev, ...data]));
    setPage(pageNumber);

    if (data.length < 10) setHasMore(false);
  } catch (err) {
    console.error("❌ Fetch failed:", err.message);
  } finally {
    setLoading(false);
  }
};



useEffect(() => {
  let mounted = true; // flag to avoid double calls

  const load = async () => {
    console.log("🚀 Initial fetch triggered");
    await fetchPosts(1, true);
  };

  if (mounted) {
    load();
  }

  return () => {
    mounted = false; // cleanup
  };
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
