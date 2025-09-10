import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function CounterScreen() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Counter</Text>
      <View style={styles.counterBox}>
        <Text style={styles.count}>{count}</Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.btn} onPress={() => setCount((c) => c + 1)}>
          <Text style={styles.btnText}>Increment (+)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.btnOutline]} onPress={() => setCount((c) => c - 1)}>
          <Text style={[styles.btnText, styles.btnOutlineText]}>Decrement (-)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f9fafb' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 24 },
  counterBox: { width: 160, height: 160, borderRadius: 16, backgroundColor: '#fff', borderWidth: 1, borderColor: '#e5e7eb', alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  count: { fontSize: 48, fontWeight: '800' },
  row: { flexDirection: 'row', gap: 12 },
  btn: { backgroundColor: '#111827', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12 },
  btnText: { color: '#fff', fontWeight: '600' },
  btnOutline: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#111827' },
  btnOutlineText: { color: '#111827' },
});