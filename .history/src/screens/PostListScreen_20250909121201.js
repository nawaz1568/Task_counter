import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

// Multiple fast API endpoints
const FAST_APIS = [
  'https://jsonplaceholder.typicode.com/posts?_limit=10',
  'https://httpbin.org/json',
  'https://api.github.com/users/octocat',
  'https://reqres.in/api/users?page=1'
];

// Ultra-fast fetch with Promise.race for fastest response
const ultraFastFetch = async () => {
  const fetchPromises = FAST_APIS.map(async (url, index) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        timeout: 2000, // 2 second timeout
      });
      const data = await response.json();
      return { success: true, data, source: index, url };
    } catch (error) {
      return { success: false, error: error.message, source: index, url };
    }
  });

  // Return the fastest successful response
  return Promise.race(fetchPromises.filter(p => p));
};

// Alternative: Parallel fetch with first successful response
const parallelFetch = async () => {
  try {
    const results = await Promise.allSettled([
      fetch('https://jsonplaceholder.typicode.com/posts?_limit=5').then(r => r.json()),
      fetch('https://reqres.in/api/users?page=1').then(r => r.json()),
      fetch('https://httpbin.org/json').then(r => r.json())
    ]);
    
    // Return first successful result
    const successful = results.find(r => r.status === 'fulfilled');
    return successful ? successful.value : null;
  } catch (error) {
    throw new Error('All requests failed');
  }
};

export default function InstantDataScreen({ navigation }) {
  const [data, setData] = useState(null);
  const [apiSource, setApiSource] = useState('');
  const [error, setError] = useState(null);

  // Fetch data immediately on mount
  useEffect(() => {
    fetchInstantData();
  }, []);

  const fetchInstantData = async () => {
    try {
      // Method 1: Race multiple APIs for fastest response
      const result = await ultraFastFetch();
      
      if (result.success) {
        setData(result.data);
        setApiSource(`API ${result.source + 1}`);
        setError(null);
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      // Fallback to parallel fetch
      try {
        const fallbackData = await parallelFetch();
        setData(fallbackData);
        setApiSource('Fallback API');
        setError(null);
      } catch (fallbackErr) {
        setError('All APIs failed to respond quickly');
      }
    }
  };

  const refreshData = () => {
    setData(null);
    setError(null);
    fetchInstantData();
  };

  const renderDataItem = (item, index) => {
    if (typeof item === 'object' && item !== null) {
      return (
        <View key={index} style={styles.dataCard}>
          {Object.entries(item).slice(0, 5).map(([key, value]) => (
            <View key={key} style={styles.dataRow}>
              <Text style={styles.dataKey}>{key}:</Text>
              <Text style={styles.dataValue} numberOfLines={2}>
                {typeof value === 'object' ? JSON.stringify(value) : String(value)}
              </Text>
            </View>
          ))}
        </View>
      );
    }
    return (
      <View key={index} style={styles.dataCard}>
        <Text style={styles.dataValue}>{String(item)}</Text>
      </View>
    );
  };

  const renderContent = () => {
    if (error) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={refreshData}>
            <Text style={styles.retryText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (!data) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.fetchingText}>Getting fastest API response...</Text>
        </View>
      );
    }

    // Handle different data structures
    let displayData = data;
    if (Array.isArray(data)) {
      displayData = data.slice(0, 10); // Limit to 10 items
    } else if (data.data && Array.isArray(data.data)) {
      displayData = data.data.slice(0, 10);
    } else if (typeof data === 'object') {
      displayData = [data]; // Wrap single object in array
    }

    return (
      <FlatList
        data={Array.isArray(displayData) ? displayData : [displayData]}
        renderItem={({ item, index }) => renderDataItem(item, index)}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Instant API Data</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={refreshData}>
          <Text style={styles.refreshText}>↻</Text>
        </TouchableOpacity>
      </View>
      
      {apiSource ? (
        <Text style={styles.sourceText}>Source: {apiSource}</Text>
      ) : null}

      {renderContent()}

      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>← Back</Text>
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
    marginBottom: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  refreshButton: {
    backgroundColor: '#10b981',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  refreshText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  sourceText: {
    fontSize: 14,
    color: '#10b981',
    fontWeight: '500',
    marginBottom: 16,
    textAlign: 'center',
  },
  list: {
    flex: 1,
  },
  dataCard: {
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
  dataRow: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  dataKey: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    minWidth: 80,
    textTransform: 'capitalize',
  },
  dataValue: {
    fontSize: 14,
    color: '#6b7280',
    flex: 1,
    marginLeft: 8,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fetchingText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
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