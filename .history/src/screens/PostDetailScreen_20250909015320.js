import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PostDetailScreen({ route }) {
  const { post } = route.params || {};
  if (!post) return <View style={styles.center}><Text>No post data.</Text></View>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.body}>{post.body}</Text>
      <View style={styles.meta}>
        <Text>ID: {post.id}</Text>
        <Text>User ID: {post.userId}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  body: { fontSize: 16, color: '#374151', lineHeight: 22 },
  meta: { marginTop: 16, borderTopWidth: 1, borderColor: '#e5e7eb', paddingTop: 12, flexDirection: 'row', justifyContent: 'space-between' },
});