import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import postsDataJson from '../data/posts.json';

export default function PostsScreen({ navigation }) {
  const [postsData, setPostsData] = useState(postsDataJson);

  // Function to delete a post
  const deletePost = (id) => {
    Alert.alert(
      'Delete Post',
      'Are you sure you want to delete this post?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setPostsData(postsData.filter((item) => item.id !== id));
          },
        },
      ]
    );
  };

  const renderRightActions = (item) => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => deletePost(item.id)}
    >
      <Text style={styles.deleteText}>Delete</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Swipeable renderRightActions={() => renderRightActions(item)}>
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
    </Swipeable>
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
    padding: 16,
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
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    borderRadius: 12,
    marginBottom: 12,
  },
  deleteText: {
    color: '#fff',
    fontWeight: '700',
  },
});
