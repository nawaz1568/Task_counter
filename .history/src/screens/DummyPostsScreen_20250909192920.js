import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import PagerView from 'react-native-pager-view';

export default function DummyPostsScreen({ navigation }) {
  const [pages, setPages] = useState([]); // array of pages
  const [loading, setLoading] = useState(true);

  const PAGE_SIZE = 10;

  useEffect(() => {
    fetch('https://dummyjson.com/posts?limit=150') // fetch all (or big chunk)
      .then((res) => res.json())
      .then((data) => {
        // split posts into pages of 10
        const chunked = [];
        for (let i = 0; i < data.posts.length; i += PAGE_SIZE) {
          chunked.push(data.posts.slice(i, i + PAGE_SIZE));
        }
        setPages(chunked);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <PagerView style={styles.pager} initialPage={0}>
      {pages.map((pageData, index) => (
        <View style={styles.page} key={index}>
          {pageData.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() =>
                navigation.navigate('DummyPostDetail', {
                  title: item.title,
                  body: item.body,
                })
              }
            >
              <Text style={styles.heading}>User ID: {item.userId}</Text>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.body}>{item.body}</Text>
            </TouchableOpacity>
          ))}
          <Text style={styles.pageNumber}>Page {index + 1}</Text>
        </View>
      ))}
    </PagerView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  pager: {
    flex: 1,
  },
  page: {
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
  heading: { fontSize: 14, fontWeight: '600', color: '#374151' },
  title: { fontSize: 18, fontWeight: '700', marginVertical: 6 },
  body: { fontSize: 16, color: '#4b5563' },
  pageNumber: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 16,
    fontWeight: '700',
    color: '#2563eb',
  },
});
