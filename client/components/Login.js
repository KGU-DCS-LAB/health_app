import React from "react";
import {  StyleSheet } from "react-native";
import { Heading, Text, Box, Center, VStack, HStack, FormControl, Link, Button, NativeBaseProvider, Input } from 'native-base';

const LoginComponent = () => {
    return <Center w="100%">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
          color: "warmGray.50"
        }}>
            Health App
          </Heading>
          {/* <Heading mt="1" _dark={{
          color: "warmGray.200"
        }} color="coolGray.600" fontWeight="medium" size="xs">
          </Heading> */}
          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>아이디</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl>
              <FormControl.Label>비밀번호</FormControl.Label>
              <Input type="password" />
              <Link _text={{
              fontSize: "xs",
              fontWeight: "500",
              color: "indigo.500"
            }} alignSelf="flex-end" mt="1">
                비밀번호 찾기
              </Link>
            </FormControl>
            <Button mt="2" colorScheme="indigo">
              로그인
            </Button>
            <HStack mt="6" justifyContent="center">
              {/* <Text fontSize="sm" color="coolGray.600" _dark={{
              color: "warmGray.200"
            }}>
                {" "}
              </Text> */}
              <Link _text={{
              color: "indigo.500",
              fontWeight: "medium",
              fontSize: "sm"
            }} href="#">
                회원가입
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Center>;
  };


export default function Login(){
    return (
        <NativeBaseProvider>
          <Center flex={1} px="3">
            <LoginComponent />
          </Center>
        </NativeBaseProvider>
      )
}

const styles = StyleSheet.create({ 
    title: {
        flex: 1,
        justifyContent: 'center',
        fontSize: 30,
        alignItems: 'center',
    }
})