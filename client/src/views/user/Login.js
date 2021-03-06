import React, { useState,createRef, useEffect } from "react";
import { Heading, Box, Center, VStack,HStack,  FormControl, Link, Button, NativeBaseProvider, Input,  Select, InputGroup, CheckIcon, InputRightAddon } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage  from "@react-native-async-storage/async-storage";

const IP_address = process.env.IP_address
// import { IP_address } from '@env';

const LoginComponent = () => {
    const navigation = useNavigation(); 
    const [UserId, setUserId] = useState('');
    const [UserPassword, setUserPassword] = useState('');
    const [domain, setDomain] = useState('')
    const idInputRef = createRef();

    
    useEffect(() => {
      getData();
    }, [])

    const getData = () =>{
      try{
        AsyncStorage.getItem('userInfo')
        .then(value => {
          if(value != null){
            navigation.navigate('Main')
          }
        })
      } catch(error){
        console.log(error);
      }
    }

    const userLogin = () => {
      let userEmail = UserId + "@" + domain;

      const callback = (arr) => {
        const user = arr.find(x => x.user_id === userEmail && x.password == UserPassword)
          if(user == null){
            Alert.alert('이메일 또는 비밀번호가 잘못 입력되었습니다.');
          } else {
            setDate(user);
          }
      }

      // axios.get('http://192.168.0.65:5000/usersRouter/find')
      axios.get('http://'+IP_address+':5000/usersRouter/find')
        .then((response) => {
          callback(response.data);
        }).catch(function (error) {
          console.log(error);
      });
  };

  const setDate = async (user) => {
      try{
        await AsyncStorage.setItem('userInfo', JSON.stringify(user), () => {
          // console.log(JSON.stringify(user));
          console.log('유저정보 저장 완료')
        });
        navigation.navigate('Main')
      } catch(error){
        console.log(error);
      }
    
}

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
              <FormControl.Label>이메일</FormControl.Label>
              <InputGroup>
                <Input w={{
                  base: "50%",
                  md: "100%"
                  }} onChangeText={(userId) => setUserId(userId)}
                  ref={idInputRef}
                  returnKeyType="next"
                  blurOnSubmit={false} />
                  <InputRightAddon children={"@"} />
                  {/* <Select selectedValue={domain} accessibilityLabel="Choose Domain" placeholder="Choose Domain" _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5" />
                }}  onValueChange={itemValue => setDomain(itemValue)}
               w={{
                    base: "48%",
                    md: "100%"
                    }}>
                    <Select.Item label="google.com" value="google.com" />
                    <Select.Item label="naver.com" value="naver.com" />
                    <Select.Item label="daum.net" value="daum.net" />
                  </Select> */}
                  <Input w={{
                  base: "48%",
                  md: "100%"
                  }} onChangeText={itemValue => setDomain(itemValue)}
                  returnKeyType="next"
                  blurOnSubmit={false} />
                </InputGroup>
            </FormControl>
            <FormControl>
              <FormControl.Label>비밀번호</FormControl.Label>
              <Input type="password" onChangeText={(userPass) => setUserPassword(userPass)}/>
              <Link _text={{
              fontSize: "xs",
              fontWeight: "500",
              color: "indigo.500"
            }} alignSelf="flex-end" mt="1" href="#" onPress={() => navigation.navigate('FindPW')} >
                비밀번호 찾기
              </Link>
            </FormControl>
            <Button mt="2" colorScheme="indigo"  onPress={() => {userLogin()}}>
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
            }} href="#" onPress={() => navigation.navigate('SignIn')}>
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