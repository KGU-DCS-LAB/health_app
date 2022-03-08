import React from "react";
import { NativeBaseProvider } from 'native-base';
import WeatherComponent from './Weather'
import NewsComponent from './News';
import { ScrollView } from 'react-native';

export default function Main() {
  return (
    <NativeBaseProvider>
      <ScrollView>
      <WeatherComponent />
      <NewsComponent/>
      </ScrollView>
    </NativeBaseProvider>
  )
}