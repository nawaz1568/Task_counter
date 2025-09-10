import { View, Text,TouchableOpacity,  StyleSheet, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
export default function Mainpage() {
  let [count, setCount] = useState(0);
  let [count1, setCount1] = useState(0);
  function incrementCount() {
    count = count + 1;
    setCount(count);
  }
  function decrementCount() {
    count = count - 1;
    setCount(count);
  }
  function incrementCount1() {
    count1 = count1 + 1;
    setCount1(count1);
  }
  function decrementCount1() {
    count1 = count1 - 1;
    setCount1(count1);
  }

const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('count', value.toString());
  } catch (e) {
    console.log('error', e);
  }
};

  const storeData1 = async (value1) => {
    try {
      await AsyncStorage.setItem('count1', value1.toString());
    } catch (e) {
      console.log('error', e);
    }
  };

  const Onsubmit = () => {
    storeData(count);
  };
  const Onsubmit1 = () => {
    storeData1(count1);
  };

  const getstoradata = async () => {
    try {
      const value = await AsyncStorage.getItem('count');
      if (value !== null) {
        setCount(parseInt(value));
        console.log(` Get data value ${value}`);
      }
    } catch (error) {
      console.log('error:', error);
    }
  };
  useEffect(() => {
    getstoradata();
    getstoradata1();
  }, []);

  const getstoradata1 = async () => {
    try {
      const value1 = await AsyncStorage.getItem('count1');
      if (value1 !== null) {
        setCount1(parseInt(value1));
        console.log(` Get data value1 ${value1}`);
      }
    } catch (error) {
      console.log('error:', error);
    }
  };

  return (
    <View
      style={styles.container}>
          <Text style={styles.heading}>Counter with AsyncStorage</Text>
<View style={styles.row}>
  <TouchableOpacity
    style={styles.buttonfirst}
    onPress={() => {
      decrementCount();
      Onsubmit();
    }}>
    <Text style={styles.buttonText}>-</Text>
  </TouchableOpacity>

  <Text style={styles.countText}>{count}</Text>

  <TouchableOpacity
    style={styles.buttonfirst}
    onPress={() => {
      incrementCount();
      Onsubmit();
    }}>
    <Text style={styles.buttonText}>+</Text>
  </TouchableOpacity>
</View>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.buttonsecond}
          onPress={() => {
            decrementCount1();
            Onsubmit1();
          }}>
         <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>

        <Text style={styles.countText}>{count1}</Text>

        <TouchableOpacity
          style={styles.buttonsecond}
          onPress={() => {
            incrementCount1();
            Onsubmit1();
          }}>
  <Text style={styles.buttonText}>+</Text>
   
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:-90
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  buttonfirst: {
    height: 65,
    width: 65,
backgroundColor: 'red', 
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: 5,
  },
   buttonsecond: {
    height: 65,
    width: 65,
   backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: 5,
  },

  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  countText: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },

})