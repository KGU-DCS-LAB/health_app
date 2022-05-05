import React, { useState, useEffect } from "react";
import { Heading, Box, Center, VStack, HStack, Button, useColorModeValue, Stack, Avatar, Spacer, Link, Select, CheckIcon, Pressable } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { StyleSheet, FlatList, View, Text, Alert, useWindowDimensions, SafeAreaView  } from 'react-native';
const IP_address = process.env.IP_address
import AppLoading from "expo-app-loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar, Animated } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import { log } from "react-native-reanimated";
import Icon from 'react-native-vector-icons/AntDesign';
import NewsList from "./NewsList";
import { TabView, SceneMap } from "react-native-tab-view";
import { useIsFocused } from '@react-navigation/native';

export default function FamilyNewsList() {
  const [userId, setUserId] = useState('')
  const [familyId, setFamilyId] = useState('');
  const isFocused = useIsFocused();
  const [familyList, setFamliyList] = useState([]);

  useEffect(() => {
    getData();
    getUserData();
  }, [isFocused, userId])

  const getData = () => {
    try {
      AsyncStorage.getItem('userInfo')
        .then(value => {
          if (value != null) {
            const UserInfo = JSON.parse(value);
            setUserId(UserInfo.user_id);
          }
        }
        )
    } catch (error) {
      console.log(error);
    }
  }

  const getUserData = () => {
    axios.get('http://' + IP_address + ':5000/usersRouter/findOne/', {
      params: {
        user_id: userId,
      }
    })
      .then((response) => {
        console.log(response.data.user_family_list);
        // console.log(response.data.user_diseases);
        setFamliyList(response.data.user_family_list);
        // callbackMyData(response.data)
      }).catch(function (error) {
        console.log(error);
      });
  }



  const FamilyListView = () => {
    let familyArr = Object.values(familyList).map(item => item.nickname)
    const countries = ["Egypt", "Canada", "Australia", "Ireland"]
    return (
        <>
            {familyArr != null && 
        <SelectDropdown
        data={familyArr}
        onSelect={(selectedItem, index) => {
          // console.log(index)
          findFamily(index)
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem
        }}
        rowTextForSelection={(item, index) => {
          return item
        }}
      />
    }
        </>
    )
  };

  const findFamily = (index) => {
    console.log(index);

    const family_id = familyList[index].user_id;
    setFamilyId(family_id)
    console.log(family_id)
  }
  

function Tab() {
  const layout = useWindowDimensions();

  return (
      <FamilyListView
          initialLayout={{ width: layout.width }}
      />
  );
}

  const MenuView = () => {
    return (
      <View style={{ height: '100%' }}>
        <Tab/>
        <NewsList user={familyId} newsMenu='질병'/>
      </View>
    )
  }

  return (
    <>
        <MenuView/>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});