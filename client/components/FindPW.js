import React, { Component, useState } from "react";
import { Heading, Box, Center, VStack, FormControl, Link, Button, NativeBaseProvider, Input } from 'native-base';
import { Alert, View } from 'react-native';

  const FindPWComponent = () => {
    const [UserEmail, setUserEmail] = useState('');
    const [emailText, setEmailText] = useState('이메일 확인');
    const [disable, setDisable] = useState(true);
    const [sendNum, setsendNum] = useState('');

    const checkIdcomp = () => {
      if(UserEmail == "a"){
        setEmailText('이메일 확인 완료');
        Alert.alert('이메일이 확인되었습니다.');
        setDisable(false);
      } else {
        Alert.alert('이메일이 존재하지 않습니다.');
      }
  };

    return <Center w="100%">
        <Box safeArea p="2" w="90%" maxW="290" py="8">
          <Heading size="lg" color="coolGray.800" _dark={{
          color: "warmGray.50"
        }} fontWeight="semibold">
            비밀번호 찾기
          </Heading>
          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>이메일</FormControl.Label>
              <Input  onChangeText={(UserEmail) => setUserEmail(UserEmail)}/>
            </FormControl>
            <Button mt="2" colorScheme="indigo" onPress={() => {checkIdcomp()}}>
              {emailText}
            </Button>
            <Button mt="2" colorScheme="indigo" isDisabled={disable}>
              이메일로 인증번호 보내기
            </Button>
          </VStack>
        </Box>
      </Center>;
  };

export default function FindPW(){
    return (
        <NativeBaseProvider>
          <Center flex={1} px="3">
            <FindPWComponent />
          </Center>
        </NativeBaseProvider>
      )
}