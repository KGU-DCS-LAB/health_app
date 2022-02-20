import React, { useState,createRef } from "react";
import { Heading, Box, Center, VStack,HStack,  FormControl, Link, Button, NativeBaseProvider, Input,  Select, InputGroup, CheckIcon, InputRightAddon } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import axios from 'axios';

const ChangeComponent = () => {
  const [UserPW, setUserPW] = useState('');
  const [UserPWConfirm, setUserPWConfirm] = useState('');
  const navigation = useNavigation(); 
  const userId = useNavigationParam('user_id');
  console.log(userId);

  const handleClick = () => {
    if(UserPW == UserPWConfirm){
      axios.post('http://192.168.35.37:5000/usersRouter/modifyPw',{
        data:{
          user_id : userId,
          user_pw : UserPW
          }
        }).then((response) => {
          if (response.data.status === 'Success') {
            Alert.alert('비밀번호 변경 완료')
            navigation.navigate('Login')
          }
        }).catch(function (error) {
          console.log(error);
      });
    } else {
      Alert.alert('변경할 비밀번호와 비밀번호 확인이 일치하지 않습니다.')
    }
  }

  return <Center w="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading size="lg" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }} fontWeight="semibold">
          비밀번호 변경
        </Heading>
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>변경할 비밀번호</FormControl.Label>
            <Input type="password" onChangeText={(password) => setUserPW(password)}/>
          </FormControl>
          <FormControl>
            <FormControl.Label>비밀번호 확인</FormControl.Label>
            <Input type="password" onChangeText={(password) => setUserPWConfirm(password)}/>
          </FormControl>
          <Button mt="2" colorScheme="indigo" onPress={handleClick}>
            확인
          </Button>
        </VStack>
      </Box>
    </Center>;
};

export default function ChangePW(){
    return (
        <NativeBaseProvider>
          <Center flex={1} px="3">
            <ChangeComponent />
          </Center>
        </NativeBaseProvider>
      )
}