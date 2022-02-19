import React, { useState, createRef } from "react";
import { Heading, Box, Center, VStack, FormControl, Link, Button, NativeBaseProvider, Input,  Select, InputGroup, CheckIcon, InputRightAddon } from 'native-base';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

  const FindPWComponent = () => {
    const [UserId, setUserId] = useState('');
    const navigation = useNavigation(); 
    const [domain, setDomain] = useState('')
    const [emailText, setEmailText] = useState('이메일 확인');
    const [disable, setDisable] = useState(true);
    const idInputRef = createRef();

    const sendEmail = () => {
      const user_email = UserId+"@"+domain;

      axios.post('http://192.168.35.37:5000/usersRouter/mail',{
        data:{
          user_email : user_email,
          user_id : UserId
          }
        }).then((response) => {
          if (response.data.status === 'Success') {
            Alert.alert('인증번호를 메일로 전송하였습니다.');
          }
        }).catch(function (error) {
          console.log('error');
      });
    }

    //이메일 확인
    const checkIdcomp = () => {
      let userEmail = UserId + "@" + domain;

      const callback = (arr) => {
        // console.log(arr.find(x => x.user_id === userEmail));
          if(arr.find(x => x.user_id === userEmail) == null){
            Alert.alert('이메일이 존재하지 않습니다.');
          } else {
            setEmailText('이메일 확인 완료');
            Alert.alert('이메일이 확인되었습니다.');
            setDisable(false);
          } 
      }

      axios.get('http://192.168.35.37:5000/usersRouter/find')
        .then((response) => {
          callback(response.data);
        }).catch(function (error) {
          console.log(error);
      });
  };

  const handleClick = () => {
    Alert.alert('인증번호 확인')
    navigation.navigate('ChangePW')
  }

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
              <InputGroup>
                <Input w={{
                  base: "50%",
                  md: "100%"
                  }} onChangeText={(userId) => setUserId(userId)}
                  ref={idInputRef}
                  returnKeyType="next"
                  blurOnSubmit={false} />
                  <InputRightAddon children={"@"} />
                  <Select selectedValue={domain} accessibilityLabel="Choose Domain" placeholder="Choose Domain" _selectedItem={{
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
                  </Select>
                </InputGroup>
            </FormControl>
            <Button mt="2" colorScheme="indigo" onPress={() => {checkIdcomp()}}>
              {emailText}
            </Button>
            <Button mt="2" colorScheme="indigo" isDisabled={disable} onPress={() => sendEmail()}>
              이메일로 인증번호 보내기
            </Button>
            <Input w="100%" mt="2" maxW="300px" py="0" InputRightElement={<Button size="xs" rounded="none" w="1/6" h="full" colorScheme="indigo"  isDisabled={disable} onPress={handleClick}>
            {"확인"}
          </Button>} placeholder="인증번호를 입력해주세요" />

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