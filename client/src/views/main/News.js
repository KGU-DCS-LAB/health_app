import React, { useState, useEffect } from "react";
import { View, Heading, Box, Center, VStack, HStack,  Button, Image, Stack, Avatar, Spacer, Link } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { StyleSheet, FlatList, Text, Alert } from 'react-native';
const IP_address = process.env.IP_address
import AppLoading from "expo-app-loading";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function NewsComponent(){
    const navigation = useNavigation(); 
    const [user, setUser] = useState('')

    useEffect(() => {
      getData();
    }, [])

    const getData = () =>{
      try{
        AsyncStorage.getItem('userInfo')
        .then(value => {
          if(value != null){
            const UserInfo = JSON.parse(value);
            setUser(UserInfo.user_name);
          }
        }
        )
      } catch(error){
        console.log(error);
      }
    }
    
    const [dataArr, setDataArr] = useState('');
    const [loading, setLoading] = useState(false);

    const callback = (data) => {
      setDataArr(data);
    }

    let newsArr = Object.values(dataArr).map(news => news);
  
    function display(){
      return(
    <Box mt="3" flex={1}>
      <FlatList data={newsArr} renderItem={({
      item
    }) => <Link href="#" onPress={() => navigation.navigate('NewsDetail', {
            url: item.newsUrl
          })} >
      <Box borderBottomWidth="1" _dark={{
      borderColor: "gray.600"
    }} borderColor="coolGray.200" py="2" >
            <HStack space={3} justifyContent="space-between">
              <Avatar size="48px" source={{
          uri: item.img
        }} />
              <VStack>
                <Text numberOfLines={1} ellipsizeMode='tail' _dark={{
            color: "warmGray.50"
          }} color="coolGray.800" bold >
                  {item.title}
                </Text>
                <Text fontSize="xs" _dark={{
          color: "warmGray.50"
        }} color="coolGray.800" >
                {item.time}
              </Text>
              </VStack>
              <Spacer />
              
            </HStack>
          </Box></Link>}  />
    </Box>
      )
    }
  
    // console.log(Object.values(dataArr).map(news => (news.time)));

    const setShowNews = async () => {
      try{
        const response = await axios.get('http://'+IP_address+':5000/newsRouter/news')
        callback(response.data);
        setLoading(true);
      } catch(err) {
        console.log(err);
      }
    }
    const onFinish = () => setLoading(false);

  return <Center w="100%">
  <AppLoading
        startAsync={setShowNews}
        onError={console.warn}
        onFinish={onFinish}
      />
      <Box safeArea p="1" w="100%" maxW="290" py="8">
      <View style={{borderBottomColor: 'black', borderBottomWidth: 3,}}/>
        <Heading mt='5' size="sm" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }} fontWeight="semibold">
          {user}님을 위한 건강 뉴스
        </Heading>
        <Box alignSelf="center">
        <HStack space={3} mt="5">
        <Button mt="2"  w="50%" colorScheme="indigo" >
            나의 뉴스
          </Button>
          <Button mt="2" w="50%" colorScheme="indigo" >
            가족 뉴스
          </Button>
        </HStack>
        <Box alignSelf="center">
        <HStack space={3} mt="3" mb="3">
        <Button mt="2"  style={styles.catSelectBtn} onPress={() => {setShowNews()}}>
            질병
          </Button>
          <Button mt="2" style={styles.catSelectBtn}>
            나이
          </Button>
          <Button mt="2"  style={styles.catSelectBtn} >
            가족력
          </Button>
        </HStack>
        </Box>
        {display()}
        </Box>
      </Box>
    </Center>
}

const styles = StyleSheet.create({
    catSelectBtn: {
      backgroundColor: "#512da8",
    },
    wrapper: {},
  slide1: {
    flex: 1,
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  });