import React from "react";
import { NativeBaseProvider, Fab, Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from "@expo/vector-icons";
import WeatherComponent from './Weather'
import NewsComponent from './News';
import { ScrollView } from 'react-native';

export default function Main() {
  const navigation = useNavigation(); 

  return (
    <NativeBaseProvider>
      <ScrollView>
      <WeatherComponent />
      <NewsComponent/>
      </ScrollView>
      <Fab renderInPortal={false} shadow={2} size="sm" onPress={() => navigation.navigate('ChatBot')} icon={<Icon color="white" as={<AntDesign name="wechat" />} size="lg" />} />
    </NativeBaseProvider>
  )
}