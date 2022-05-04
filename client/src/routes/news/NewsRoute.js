import React, { useState, useCallback, useRef } from 'react';
import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import NewsMainView from '../../views/news/NewsView';

const NewsMainScreen = (props) => {
  return (
      <NewsMainView navigation={props.navigation}
      />
  );
}

function FamilyNewsScreen() {
  return (
    <NewsMainView/>
  );
}


const Drawer = createDrawerNavigator();

const MyDrawer = (props) => {
  return (
    <Drawer.Navigator drawerContent={props => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Home" onPress={() => props.navigation.navigate("MainHome")} />
          </DrawerContentScrollView>
        )
      }}>
      <Drawer.Screen name="NewsMain" component={NewsMainScreen}/>
      <Drawer.Screen name="FamilyNews" component={FamilyNewsScreen} />
    </Drawer.Navigator>
  );
}

const NewsRoute = (props) =>{
    return (
        <MyDrawer/>
    )
}
export default NewsRoute;