import React from "react";
import { NativeBaseProvider, Fab, Icon, View } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { AntDesign } from "@expo/vector-icons";
import WelcomeCard from '../news/WelcomeCard'
// import NewsView from '../news/News';
import { ScrollView } from 'react-native';
import MyPage from './MyPage';
import BookmarkStorage from './BookmarkStorage';
import FamilyManagement from "./FamilyManagement";
import MainPageView from "../news/MainPageView";

function MainHomeScreen() {
  const navigation = useNavigation();

  return (
    // <NativeBaseProvider>
    //   <View style={{ flex: 0.4 }}>
    //     <WeatherComponent />
    //   </View>
    //   <View style={{ flex: 0.6 }}>
    //     <NewsComponent />
    //   </View>
    //   <Fab renderInPortal={false} shadow={2} size="sm" onPress={() => navigation.navigate('ChatBot')} icon={<Icon color="white" as={<AntDesign name="wechat" />} size="lg" />} />
    // </NativeBaseProvider>
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