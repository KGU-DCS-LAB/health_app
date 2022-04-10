import React, {useEffect, useState} from "react";
import { NativeBaseProvider, Box, Text, Pressable, Heading, IconButton, Icon, HStack, Avatar, Center } from 'native-base';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import AppLoading from "expo-app-loading";
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const IP_address = process.env.IP_address

const exam = [{
    key: 1,
    text: 'hi'
},{
    key: 2,
    text: 'hi'
},{
    key: 3,
    text: 'hi'
}]

export default function FamlilyListView() {
    return <NativeBaseProvider>
        <Box textAlign="center" bg="white" flex={1} safeAreaTop>
          <Heading my={6} textAlign="center" size="lg">
            Swipe list Example
          </Heading>
          {/* <Basic /> */}
        </Box>
      </NativeBaseProvider>;
  }
  
  function Basic() {
    const [listData, setListData] = useState(Array(20).fill('').map((_, i) => ({
        key: `${i}`,
        text: `item #${i}`
      })));
  
    const closeRow = (rowMap, rowKey) => {
      if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
      }
    };
  
    const deleteRow = (rowMap, rowKey) => {
      closeRow(rowMap, rowKey);
      const newData = [...listData];
      const prevIndex = listData.findIndex(item => item.key === rowKey);
      newData.splice(prevIndex, 1);
      setListData(newData);
    };
  
    const onRowDidOpen = rowKey => {
      console.log('This row opened', rowKey);
    };
  
    const renderItem = ({
      item,
      index
    }) => <Box>
        <Pressable onPress={() => console.log('You touched me')} >
          <HStack >
            <HStack >
              <Avatar color="white" bg={'secondary.700'}>
                {index}
              </Avatar>
              <Text>{item.text}</Text>
            </HStack>
          </HStack>
        </Pressable>
      </Box>;
  
    const renderHiddenItem = (data, rowMap) => <HStack >
        <Pressable onPress={() => closeRow(rowMap, data.item.key)} _pressed={{
        opacity: 0.5
      }}>
          <Icon as={<Ionicons name="close" />} color="white" />
        </Pressable>
        <Pressable px={4} bg="red.500" justifyContent="center" onPress={() => deleteRow(rowMap, data.item.key)} _pressed={{
        opacity: 0.5
      }}>
          <Icon as={<MaterialIcons name="delete" />} color="white" />
        </Pressable>
      </HStack>;
  
    return <Box bg="white" safeArea flex={1}>
        <SwipeListView data={listData} renderItem={renderItem} renderHiddenItem={renderHiddenItem} rightOpenValue={-130} previewRowKey={'0'} previewOpenValue={-40} previewOpenDelay={3000} onRowDidOpen={onRowDidOpen} />
      </Box>;
  }
