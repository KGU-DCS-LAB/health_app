import React, {Component, useState} from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login';
import Home from './components/Home';
import SignIn from './components/SignIn';
import FindPW from './components/FindPW';
import Main from './components/Main';
import ChangePW from './components/ChangePW';
import NewsDetail from './components/NewsDetail';
import ChatBot from './components/ChatBot';

const Stack = createStackNavigator();

export default function App() {

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <NavigationContainer>
        <Stack.Navigator  initialRouteName='Home' screenOptions={{ headerShown: false }} >
          <Stack.Screen 
            name='Home'
            component={Home}
          />

          <Stack.Screen
            name='SignIn'
            component={SignIn}
          />

          <Stack.Screen
            name='Login'
            component={Login}
          />

          <Stack.Screen
            name='FindPW'
            component={FindPW}
          />

          <Stack.Screen
            name='Main'
            component={Main}
          />

          <Stack.Screen
            name='ChangePW'
            component={ChangePW}
          />

          <Stack.Screen
            name='NewsDetail'
            component={NewsDetail}
          />

          <Stack.Screen
            name='ChatBot'
            component={ChatBot}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
});