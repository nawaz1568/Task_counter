import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import postsData from '../data/posts.json';

export default function PostsScreen({ navigation }) {
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
      <Text style={styles.heading}>userId: {item.userId}</Text>
      <Text style={styles.heading}>ID: {item.id}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.body}>{item.body}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={postsData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f3f4f6',
  },
  card: {
    backgroundColor: '#fff', 
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  heading: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 6,
  },
  body: {
    fontSize: 16,
    color: '#4b5563',
  },
});
