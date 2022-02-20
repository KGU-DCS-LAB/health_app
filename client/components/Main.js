import React, { useState,createRef } from "react";
import { Heading, Box, Center, VStack,HStack,  FormControl, Link, Button, NativeBaseProvider, Input,  Select, InputGroup, CheckIcon, InputRightAddon } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import axios from 'axios';

const MainComponent = () => {
    return <Center w="100%">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
          color: "warmGray.50"
        }}>
            Health App
          </Heading>
        </Box>
      </Center>;
  };

export default function Main(){
    return (
        <NativeBaseProvider>
          <Center flex={1} px="3">
            <MainComponent />
          </Center>
        </NativeBaseProvider>
      )
}