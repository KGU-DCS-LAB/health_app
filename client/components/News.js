import React, { useState, Component } from "react";
import { View, Heading, Text, Box, Center, VStack, HStack, FormControl, Link, Button, NativeBaseProvider, Input, Select, InputGroup, CheckIcon, InputRightAddon, AspectRatio, Image, Stack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import axios from 'axios';
import { StyleSheet, AppRegistry } from 'react-native';
import Swiper from 'react-native-swiper'

export default function NewsComponent(){
    const user = "ellie5508"
    // const [viewNews, setViewNews] = useState();

    const callback = (data) => {
        console.log(data);
      }

    const setShowNews = () => {
       // axios.get('http://'+IP_address+':5000/usersRouter/find')
        axios.get('http://192.168.35.37:5000/newsRouter/news')
        .then((response) => {
          callback(response.data);
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
        <Box>
          
        </Box>
        {/* <SwiperComponent/> */}
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
  }
  });