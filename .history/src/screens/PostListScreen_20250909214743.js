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
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../components/Header";

export default function PostListScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Key to store posts in AsyncStorage
  const STORAGE_KEY = "@posts_data";

  // Fetch posts from API
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=10&_page=1"
      );
      const data = await res.json();

      // Update state
      setPosts(data);

      // Save to local storage
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      console.log("✅ Data saved to AsyncStorage");
    } catch (e) {
      console.error("❌ Failed to fetch posts:", e);
    } finally {
      setLoading(false);
    }
  };

  // Load posts from AsyncStorage
  const loadFromStorage = async () => {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      if (json != null) {
        const storedData = JSON.parse(json);
        setPosts(storedData);
        console.log("📦 Loaded posts from AsyncStorage:", storedData.length);
      } else {
        console.log("⚠️ No posts found in AsyncStorage");
      }
    } catch (e) {
      console.error("❌ Failed to load posts from storage:", e);
    }
  };

  useEffect(() => {
    // First show cached data
    loadFromStorage();

    // Then fetch fresh data in background
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
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardBody} numberOfLines={2}>
        {item.body}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title="API Posts" />
      {loading && posts.length === 0 ? (
        <ActivityIndicator size="large" color="blue" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListFooterComponent={<Text style={styles.footer}>End of List</Text>}
        />
      )}
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
zz