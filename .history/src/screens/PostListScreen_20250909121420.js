import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import Header from '../components/Header';

// INSTANT DATA CACHE - loads immediately
let CACHED_POSTS = [];
let CACHE_TIMESTAMP = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Ultra-fast fetch with multiple strategies
const ultraFastFetch = async () => {
  const urls = [
    'https://jsonplaceholder.typicode.com/posts',
    'https://dummyjson.com/posts?limit=100',
    'https://reqres.in/api/users' // backup
  ];

  // Strategy 1: Return cache instantly if available
  if (CACHED_POSTS.length > 0 && (Date.now() - CACHE_TIMESTAMP) < CACHE_DURATION) {
    return CACHED_POSTS;
  }

  // Strategy 2: Race multiple APIs
  const fetchPromises = urls.map(async (url, index) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1500); // 1.5s timeout
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache',
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) throw new Error('Network error');
      
      const data = await response.json();
      
      // Normalize different API responses
      let posts = [];
      if (Array.isArray(data)) {
        posts = data;
      } else if (data.posts && Array.isArray(data.posts)) {
        posts = data.posts;
      } else if (data.data && Array.isArray(data.data)) {
        // Convert user data to post-like structure
        posts = data.data.map(user => ({
          id: user.id,
          title: `User: ${user.first_name} ${user.last_name}`,
          body: `Email: ${user.email}\nAvatar: ${user.avatar}`,
          userId: user.id
        }));
      }
      
      return { success: true, posts, source: index };
    } catch (error) {
      return { success: false, error: error.message, source: index };
    }
  });

  // Return first successful response
  try {
    const results = await Promise.allSettled(fetchPromises);
    const successful = results.find(r => r.status === 'fulfilled' && r.value.success);
    
    if (successful) {
      CACHED_POSTS = successful.value.posts.slice(0, 50); // Limit for performance
      CACHE_TIMESTAMP = Date.now();
      return CACHED_POSTS;
    }
    
    throw new Error('All requests failed');
  } catch (error) {
    // Last resort: return minimal mock data
    const emergencyData = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      title: `Emergency Post ${i + 1}`,
      body: `This is emergency content ${i + 1} loaded instantly when APIs fail.`,
      userId: 1
    }));
    
    CACHED_POSTS = emergencyData;
    CACHE_TIMESTAMP = Date.now();
    return emergencyData;
  }
};

export default function PostListScreen({ navigation }) {
  const [posts, setPosts] = useState(CACHED_POSTS); // Start with cache
  const [refreshing, setRefreshing] = useState(false);

  // IMMEDIATE fetch on mount - no loading state
  useEffect(() => {
    const fetchImmediate = async () => {
      const data = await ultraFastFetch();
      setPosts(data);
    };
    
    // If no cache, fetch immediately
    if (CACHED_POSTS.length === 0) {
      fetchImmediate();
    }
  }, []);

  // Super fast refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    
    // Clear cache to force fresh data
    CACHED_POSTS = [];
    CACHE_TIMESTAMP = 0;
    
    const data = await ultraFastFetch();
    setPosts(data);
    setRefreshing(false);
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => navigation.navigate('Details', { post: item })}
      activeOpacity={0.7}
    >
      <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.cardBody} numberOfLines={3}>{item.body}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.cardId}>ID: {item.id}</Text>
        <Text style={styles.cardUser}>User: {item.userId}</Text>
      </View>
    </TouchableOpacity>
  );

  const ListEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Getting data...</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title={`API Posts (${posts.length})`} />
      <FlatList
        data={posts}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={ListEmptyComponent}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        maxToRenderPerBatch={20}
        windowSize={10}
        initialNumToRender={15}
        getItemLayout={(data, index) => ({
          length: 120,
          offset: 120 * index,
          index,
        })}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            tintColor="#10b981"
            colors={['#10b981']}
          />
        }
      />
      
      {posts.length > 0 && (
        <TouchableOpacity style={styles.fastRefreshButton} onPress={onRefresh}>
          <Text style={styles.fastRefreshText}>⚡ Fast Refresh</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8fafc' 
  },
  listContent: { 
    padding: 16,
    paddingBottom: 80,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
  },
  cardTitle: { 
    fontSize: 18, 
    fontWeight: '700', 
    marginBottom: 8,
    color: '#1f2937',
    textTransform: 'capitalize',
  },
  cardBody: { 
    color: '#6b7280',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardId: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: '600',
  },
  cardUser: {
    fontSize: 12,
    color: '#9ca3af',
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  fastRefreshButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#10b981',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  fastRefreshText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
});