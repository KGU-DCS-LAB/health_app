import React, { Component, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SSRProvider } from '@react-aria/ssr';

// �깉 肄붾뱶 �떆�옉
import MainRoute from './src/routes/main/MainRoute'

export default function App() {

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <NavigationContainer>
        <SSRProvider>
          <MainRoute/>
        </SSRProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
}

//�깉 肄붾뱶 �걹

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
});