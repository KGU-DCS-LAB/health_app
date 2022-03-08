import React, { useState, Component } from "react";
import { View, Heading, Box, Center, VStack, HStack,  Button, Image, Stack, Avatar, Spacer, Link } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import axios from 'axios';
import { StyleSheet, FlatList, Text } from 'react-native';
import Swiper from 'react-native-swiper'
import { ScrollView } from 'react-native';

export default function NewsComponent(){
    const user = "ellie5508"
    
    const [dataArr, setDataArr] = useState('');

    const arr = [1,2,3,4,5];
    
    const callback = (data) => {
      setDataArr(data);
    }

 

    let newsArr = Object.values(dataArr).map(news => news);

    function display(){
      return(
<Box>
      <Heading fontSize="xl" p="4" pb="3">
        질병 뉴스 
      </Heading>
      <FlatList data={newsArr} renderItem={({
      item
    }) => <Link href={item.newsUrl}>
      <Box borderBottomWidth="1" _dark={{
      borderColor: "gray.600"
    }} borderColor="coolGray.200" py="2">
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
          </Box>
    </Link>}  />
    </Box>
      )
    }
    // console.log(Object.values(dataArr).map(news => (news.time)));

    window.onload = function() {
      axios.get('http://192.168.35.37:5000/newsRouter/news')
        .then((res) => {
          callback(res.data);
        }).catch(function (error) {
          console.log(error);
      });
    };

    const setShowNews = () => {
       // axios.get('http://'+IP_address+':5000/usersRouter/find')
        axios.get('http://192.168.35.37:5000/newsRouter/news')
        .then((res) => {
          callback(res.data);
        }).catch(function (error) {
          console.log(error);
      });
    }

  return <Center w="100%">
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

// class SwiperComponent extends Component {
//     render() {
//       return (
//         <Swiper showsButtons={true}>
//           <View style={styles.slide1}>
//             <Text style={styles.text}>Hello Swiper</Text>
//           </View>
//           <View style={styles.slide2}>
//             <Text style={styles.text}>Beautiful</Text>
//           </View>
//           <View style={styles.slide3}>
//             <Text style={styles.text}>And simple</Text>
//           </View>
//         </Swiper>
//       )
//     }
//   }
//   AppRegistry.registerComponent('myproject', () => SwiperComponent)

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