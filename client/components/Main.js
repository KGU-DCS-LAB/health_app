import React, { useState, createRef } from "react";
import { View, Heading, Text, Box, Center, VStack, HStack, FormControl, Link, Button, NativeBaseProvider, Input, Select, InputGroup, CheckIcon, InputRightAddon, AspectRatio, Image, Stack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import * as Location from "expo-location";

// const GeoLocationAPI = async () => {
//   const [latitude, setLatitude] = useState('');
//   const [longitude, setLogitude] = useState('');

//   try {
    
//     // �쐞移섏젙蹂� �궗�슜�븯�룄濡� �궗�슜�옄�뿉寃� �뿀媛� 諛쏄린
//     const response =  await Location.requestForegroundPermissionsAsync();
//     // console.log(response);

//     // const location = await Location.getCurrentPositionAsync();
//     // console.log(location);
//     const { coords } = await Location.getCurrentPositionAsync();
//     console.log(coords);
//     setLatitude(coords.latitude);
//     setLogitude(coords.longitude);     
//     console.log(latitude+' '+longitude) ;
//   } catch (e) {
//     Alert.alert("�쐞移섏젙蹂대�� 媛��졇�삱 �닔 �뾾�뒿�땲�떎.");
//   }
  
//   return (
//     <View>
//         <Text> latitude: {latitude} </Text>
//         <Text> longitude: {longitude} </Text>
//     </View>
//   )
// }

Date.prototype.format = function (f) {
  if (!this.valueOf()) return " ";

  const weekName = ["�씪�슂�씪", "�썡�슂�씪", "�솕�슂�씪", "�닔�슂�씪", "紐⑹슂�씪", "湲덉슂�씪", "�넗�슂�씪"];
  let d = this;
  let h;

  return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function ($1) {
      switch ($1) {
          case "yyyy": return d.getFullYear();
          case "yy": return (d.getFullYear() % 1000).zf(2);
          case "MM": return (d.getMonth() + 1).zf(2);
          case "dd": return d.getDate().zf(2);
          case "E": return weekName[d.getDay()];
          case "HH": return d.getHours().zf(2);
          case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
          case "mm": return d.getMinutes().zf(2);
          case "ss": return d.getSeconds().zf(2);
          case "a/p": return d.getHours() < 12 ? "�삤�쟾" : "�삤�썑";
          default: return $1;
      }
  });
}

String.prototype.string = function (len) { var s = '', i = 0; while (i++ < len) { s += this; } return s; };
String.prototype.zf = function (len) { return "0".string(len - this.length) + this; };
Number.prototype.zf = function (len) { return this.toString().zf(len); };

const MainComponent = (props) => {
  const today = new Date().format('MM�썡 dd�씪 E a/p hh:mm');
  return <Center w="100%">
    <Box safeArea p="2" py="8" w="95%">
      <Box w="47%" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
        borderColor: "coolGray.600",
        backgroundColor: "gray.700"
      }} _web={{
        shadow: 2,
        borderWidth: 0
      }} _light={{
        backgroundColor: "gray.50"
      }}>
        <Box>
          <Center w="100%" >
            <Ionicons name="partly-sunny-outline" size={150} color="black" />
            <Text fontSize='5xl'>
              湲곗삩째
            </Text>
          </Center>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              <Ionicons name="location-sharp" size={24} color="black" />
              吏��뿭�씠由�
            </Heading>
            <Text fontSize="xs" _light={{
              color: "violet.500"
            }} _dark={{
              color: "violet.400"
            }} fontWeight="500" ml="-0.5" mt="-1" >
              {today}
            </Text>
          </Stack>
          <Text> latitude: {props.latitude} </Text>
          <Text> longitude: {props.longitude} </Text>
          <Text fontWeight="400">
            Bengaluru (also called Bangalore) is the center of India's high-tech
            industry. The city is also known for its parks and nightlife.
          </Text>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Text color="coolGray.600" _dark={{
                color: "warmGray.200"
              }} fontWeight="400">
                6 mins ago
              </Text>
            </HStack>
          </HStack>
        </Stack>
      </Box>
    </Box>
  </Center>;
};

<<<<<<< HEAD
export default function Main(){
    return (
        <NativeBaseProvider>
          <Center flex={1} px="3">
            <MainComponent />
          </Center>
        </NativeBaseProvider>
      )
=======
function hello() {
  console.log("hello");
}

function Main(props) {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <MainComponent latitude={props.latitude} longitude={props.longitude} />
      </Center>
    </NativeBaseProvider>
  )
}

export default class extends React.Component {
  state = {
    latitude: '',
    longitude: ''
  }

  getLocation = async () => {
    try {
      // �쐞移섏젙蹂� �궗�슜�븯�룄濡� �궗�슜�옄�뿉寃� �뿀媛� 諛쏄린
      const response =  await Location.requestForegroundPermissionsAsync();
      console.log(response);
  
      // const location = await Location.getCurrentPositionAsync();
      // console.log(location);
      const { coords } = await Location.getCurrentPositionAsync();
      console.log(coords);
      this.setState({latitude: coords.latitude, longitude: coords.longitude})   
      console.log(this.state.latitude+' '+this.state.longitude) ;
    } catch (e) {
      Alert.alert("�쐞移섏젙蹂대�� 媛��졇�삱 �닔 �뾾�뒿�땲�떎.");
    }
  }

  componentDidMount() {
    this.getLocation();
  }

  render() {
    return <Main latitude={this.state.latitude} longitude={this.state.longitude} />
  }
>>>>>>> fb9b04a0c8edc167ad0e14b0f0b379a1255c8aac
}