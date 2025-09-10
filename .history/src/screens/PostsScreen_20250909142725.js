import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

export default function PostsScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .finally(() => setLoading(false))
      .catch((err) => console.log(err));
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('AnotherDetails', {
          name: item.title,
          description: item.body,
        })
      }
    >
      <Text style={styles.heading}>User ID: {item.userId}</Text>
      <Text style={styles.heading}>Post ID: {item.id}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.body}>{item.body}</Text>
    </TouchableOpacity>
  );

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <FlatList data={posts} keyExtractor={(item) => item.id.toString()} renderItem={renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f3f4f6' },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12 },
  heading: { fontSize: 14, fontWeight: '600' },
  title: { fontSize: 18, fontWeight: '700', marginVertical: 6 },
  body: { fontSize: 16 },
});
