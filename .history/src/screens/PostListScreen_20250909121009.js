import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

// Mock data for instant response
const MOCK_DATA = [
  { id: 1, title: 'React Native Performance Tips', body: 'Optimize your app with these proven techniques...' },
  { id: 2, title: 'State Management Best Practices', body: 'Learn how to manage state effectively in large apps...' },
  { id: 3, title: 'Navigation Patterns', body: 'Explore modern navigation solutions for mobile apps...' },
  { id: 4, title: 'API Integration Guide', body: 'Master the art of seamless API integration...' },
  { id: 5, title: 'Testing Strategies', body: 'Comprehensive testing approaches for React Native...' },
];

// Fast fetch function with immediate response
const fastFetch = async (url) => {
  // Return mock data immediately for demo
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_DATA), 50); // Minimal delay for realism
  });
  
  // Uncomment below for actual API calls
  // const response = await fetch(url);
  // return response.json();
};

export default function PostsScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data immediately on mount
    const fetchData = async () => {
      try {
        const data = await fastFetch('https://jsonplaceholder.typicode.com/posts');
        setPosts(data);
      } catch (err) {
        setError('Failed to fetch data');
      }
    };
    
    fetchData();
  }, []);

  const refreshData = async () => {
    try {
      const data = await fastFetch('https://jsonplaceholder.typicode.com/posts');
      setPosts(data);
      setError(null);
    } catch (err) {
      setError('Failed to refresh data');
    }
  };

  const renderPost = ({ item }) => (
    <View style={styles.postCard}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postBody} numberOfLines={2}>
        {item.body}
      </Text>
      <Text style={styles.postId}>ID: {item.id}</Text>
    </View>
  );

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={refreshData}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Posts</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={refreshData}>
          <Text style={styles.refreshText}>↻</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
        showsVerticalScrollIndicator={false}
      />
      
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>← Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  refreshButton: {
    backgroundColor: '#2563eb',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  refreshText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  list: {
    flex: 1,
  },
  postCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  postBody: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 8,
  },
  postId: {
    fontSize: 12,
    color: '#9ca3af',
    fontWeight: '500',
  },
  errorText: {
    fontSize: 16,
    color: '#dc2626',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#dc2626',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: 'center',
  },
  retryText: {
    color: '#fff',
    fontWeight: '600',
  },
  backButton: {
    marginTop: 16,
    alignSelf: 'center',
  },
  backText: {
    color: '#2563eb',
    fontWeight: '500',
    fontSize: 16,
  },
});