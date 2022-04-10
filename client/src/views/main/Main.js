import React from "react";
import { NativeBaseProvider, Fab, Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { AntDesign } from "@expo/vector-icons";
import WeatherComponent from './Weather'
import NewsComponent from './News';
import { ScrollView } from 'react-native';
import MyPage from './MyPage';
import BookmarkStorage from './BookmarkStorage';
import FamilyManagement from "./FamilyManagement";

function MainScreen() {
  const navigation = useNavigation(); 
  
  return (
    <NativeBaseProvider>
      <WeatherComponent />
      <NewsComponent/>
      <Fab renderInPortal={false} shadow={2} size="sm" onPress={() => navigation.navigate('ChatBot')} icon={<Icon color="white" as={<AntDesign name="wechat" />} size="lg" />} />
    </NativeBaseProvider>
  )
}

const Drawer = createDrawerNavigator();

export default function Main() {

  return (
      <Drawer.Navigator initialRouteName="Main">
        <Drawer.Screen name="Main" component={MainScreen} />
        <Drawer.Screen name="MyPage" component={MyPage} />
        <Drawer.Screen name="BookmarkStorage" component={BookmarkStorage} />
        <Drawer.Screen name="FamilyManagement" component={FamilyManagement} />
      </Drawer.Navigator>
  )
}