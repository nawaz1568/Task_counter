import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PostDetailScreen({ route }) {
  const { post } = route.params || {};
  if (!post)
    return (
      <View style={styles.center}>
        <Text>No post data.</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.body}>{post.body}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f4f6", padding: 16 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4, 
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 12, color: "#111827" },
  body: { fontSize: 16, color: "#374151", lineHeight: 22 },
});
