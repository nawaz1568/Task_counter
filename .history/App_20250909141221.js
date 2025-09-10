import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import PostListScreen from './src/screens/PostListScreen';
import PostDetailScreen from './src/screens/PostDetailScreen';
import CounterScreen from './src/screens/CounterScreen';
import PostsScreen from './src/screens/PostsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Posts" component={PostListScreen} options={{ title: 'Posts' }} />
        <Stack.Screen name="Details" component={PostDetailScreen} options={{ title: 'Post Details' }} />

        <Stack.Screen name="Counter" component={CounterScreen} options={{ title: 'Counter' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
