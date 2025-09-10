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

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await res.json();
      setPosts(data);
    } catch (e) {
      console.warn("Failed to fetch posts", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("Details", { post: item })}
    >
      <Text style={styles.cardDetail}>UserID: {item.userId}</Text>
      <Text style={styles.cardDetail}>ID: {item.id}</Text>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardBody}>{item.body}</Text>
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
        keyExtractor={(item, index) => `${item.id}-${index}`} // ✅ always unique
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        extraData={posts} // ✅ force re-render if posts change
        ListFooterComponent={
          <View style={styles.footerContainer}>
            <Text style={styles.footer}>✨ End of List ✨</Text>
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f4f6" },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  cardDetail: { fontSize: 14, color: "#4b5563", marginBottom: 4 },
  cardTitle: { fontSize: 16, fontWeight: "700", marginBottom: 6 },
  cardBody: { color: "#374151" },
  footerContainer: {
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    color: "blue", // ✅ blue color
    fontWeight: "600",
    fontSize: 16,
  },
});
