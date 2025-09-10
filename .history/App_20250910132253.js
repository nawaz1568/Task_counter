import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/';
import PostListScreen from './src/screens/PostListScreen';
import PostDetailScreen from './src/screens/PostDetailScreen';
import CounterScreen from './src/screens/CounterScreen';
import PostsScreen from './src/screens/PostsScreen';
import AnotherDetailScreen from './src/screens/AnotherDetailScreen';
import DummyPostsScreen from './src/screens/DummyPostsScreen';
import DummyPostDetailScreen from './src/screens/DummyPostDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Posts" component={PostListScreen} options={{ title: 'Posts' }} />
        <Stack.Screen name="Details" component={PostDetailScreen} options={{ title: 'Post Details' }} />
        <Stack.Screen name="AnotherDetails" component={AnotherDetailScreen} options={{ title: 'Another Detail' }} />
        <Stack.Screen name="Post" component={PostsScreen} options={{ title: 'Post' }} />
        <Stack.Screen name="Counter" component={CounterScreen} options={{ title: 'Counter' }} />
         <Stack.Screen name="DummyPosts" component={DummyPostsScreen} options={{ title: 'Dummy Posts' }} />
        <Stack.Screen name="DummyPostDetail" component={DummyPostDetailScreen} options={{ title: 'Post Detail' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
