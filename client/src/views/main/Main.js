import React from "react";
import { NativeBaseProvider, Fab, Icon, View } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { AntDesign } from "@expo/vector-icons";
import { ScrollView } from 'react-native';
import MyPage from './MyPage';
import BookmarkStorage from './BookmarkStorage';
import FamilyManagement from "./FamilyManagement";
import MainPageView from "../home/MainPageView";

function MainHomeScreen() {
  const navigation = useNavigation();

  return (
    <MainPageView navigation={navigation}/>
  )
}

const Drawer = createDrawerNavigator();

export default function Main() {

  return (
    <Drawer.Navigator initialRouteName="MainHome">
      <Drawer.Screen name="MainHome" component={MainHomeScreen} />
      <Drawer.Screen name="MyPage" component={MyPage} />
      <Drawer.Screen name="BookmarkStorage" component={BookmarkStorage} />
      <Drawer.Screen name="FamilyManagement" component={FamilyManagement} />
    </Drawer.Navigator>
  )
}