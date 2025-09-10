import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import PagerView from 'react-native-pager-view';

export default function DummyPostsScreen({ navigation }) {
  const [pages, setPages] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const pagerRef = useRef(null);

  const PAGE_SIZE = 10;

  useEffect(() => {
    fetch('https://dummyjson.com/posts?limit=150')
      .then((res) => res.json())
      .then((data) => {
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

  const goToPage = (page) => {
    if (pagerRef.current && page >= 0 && page < pages.length) {
      pagerRef.current.setPage(page);
      setCurrentPage(page);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <PagerView
        style={styles.pager}
        initialPage={0}
        ref={pagerRef}
        onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
      >
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
            <Text style={styles.pageNumber}>Page {index + 1} / {pages.length}</Text>
          </View>
        ))}
      </PagerView>

      {/* Navigation buttons */}
      <View style={styles.navButtons}>
        <TouchableOpacity
          style={[styles.navButton, currentPage === 0 && styles.disabled]}
          disabled={currentPage === 0}
          onPress={() => goToPage(currentPage - 1)}
        >
          <Text style={styles.navText}>◀ Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, currentPage === pages.length - 1 && styles.disabled]}
          disabled={currentPage === pages.length - 1}
          onPress={() => goToPage(currentPage + 1)}
        >
          <Text style={styles.navText}>Next ▶</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  navButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#2563eb',
    borderRadius: 8,
  },
  navText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  disabled: {
    backgroundColor: '#9ca3af',
  },
});
