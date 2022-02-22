import React, { useState, createRef } from "react";
import { View, Heading, Text, Box, Center, VStack, HStack, FormControl, Link, Button, NativeBaseProvider, Input, Select, InputGroup, CheckIcon, InputRightAddon, AspectRatio, Image, Stack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import axios from 'axios';
import { ScrollView } from 'react-native';
import WeatherComponent from './Weather'

const NewsComponent = () => {
  const user = "ellie5508"

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
        </Box>
      </Box>
    </Center>;
};


export default function Main(props) {
  return (
    <NativeBaseProvider>
    <ScrollView>
      <Center flex={1} px="3">
      <WeatherComponent />
      <NewsComponent/>
      </Center>
      </ScrollView>
    </NativeBaseProvider>
  )
}