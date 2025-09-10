import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import postsData from '../../data/posts.json';

export default function PostsScreen({ navigation }) {
  const PAGE_SIZE = 15;
  const [page, setPage] = useState(1);
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const currentData = postsData.slice(start, end);

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
        data={currentData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />


      <View style={styles.pagination}>
        <TouchableOpacity
          style={[styles.button, page === 1 && styles.disabledButton]}
          disabled={page === 1}
          onPress={() => setPage(page - 1)}
        >
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>

        <Text style={styles.pageNumber}>Page {page}</Text>

        <TouchableOpacity
          style={[
            styles.button,
            end >= postsData.length && styles.disabledButton,
          ]}
          disabled={end >= postsData.length}
          onPress={() => setPage(page + 1)}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
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
    padding: 12,
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
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#9ca3af',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  pageNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#374151',
  },
});
