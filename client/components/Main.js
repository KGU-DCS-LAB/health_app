import React, { useState, createRef } from "react";
import { View, Heading, Text, Box, Center, VStack, HStack, FormControl, Link, Button, NativeBaseProvider, Input, Select, InputGroup, CheckIcon, InputRightAddon, AspectRatio, Image, Stack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import axios from 'axios';
import { ScrollView } from 'react-native';
import WeatherComponent from './Weather'
import NewsComponent from './News';

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