import React, {useEffect, useState, createRef} from "react";
import { View, Modal, Button, NativeBaseProvider, Text, Link, Box, Spacer,  Avatar, Center, VStack, HStack, FormControl, Input, InputGroup, Select, InputRightAddon, CheckIcon } from 'native-base';
import { Alert, FlatList, SafeAreaView } from 'react-native';
import AppLoading from "expo-app-loading";
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage  from "@react-native-async-storage/async-storage";
const IP_address = process.env.IP_address

const AddFamily = () =>{
    const [modalVisible, setModalVisible] = React.useState(false);
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    const [familyUserId, setFamilyUserId] = useState('');
    // const [familyIEmail, setFamilyIEmail] = useState('');
    const [familyINickname, setFamilyINickname] = useState('');
    const [domain, setDomain] = useState('')
    const idInputRef = createRef();
    const [userId, setUserId] = useState('')

    useEffect(() => {
      getData();
    }, [])

    const getData = () =>{
      try{
        AsyncStorage.getItem('userInfo')
        .then(value => {
          if(value != null){
            const UserInfo = JSON.parse(value);
            setUserId(UserInfo.user_id);
          }
        }
        )
      } catch(error){
        console.log(error);
      }
    }

    console.log(userId);
    

    let userEmail = familyUserId + "@" + domain;

    const saveFamilyInfo = () => {

        axios.post('http://' + IP_address + ':5000/usersRouter/familySave', {
      data: {
        user_id: userId,
        family_user_id: userEmail,
        nickname: familyINickname
      }
    })
            Alert.alert('가족이 추가되었습니다.');
            setModalVisible(false);
    }

    const checkIdcomp = () => {

        const callback = (arr) => {
          // console.log(arr.find(x => x.user_id === userEmail));
            if(arr.find(x => x.user_id === userEmail) == null){
              Alert.alert('이메일이 존재하지 않습니다.');
            } else {
            //   setEmailText('이메일 확인 완료');
              saveFamilyInfo();
            } 
        }
  
        axios.get('http://'+IP_address+':5000/usersRouter/find')
          .then((response) => {
            callback(response.data);
          }).catch(function (error) {
            console.log(error);
        });
    };

    return <View>
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>가족 추가하기</Modal.Header>
            <Modal.Body>
              <FormControl>
                <FormControl.Label>이메일</FormControl.Label>
                
                <InputGroup>
                <Input w={{
                  base: "50%",
                  md: "100%"
                  }} onChangeText={(userId) => setFamilyUserId(userId)}
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


                {/* <Input ref={initialRef} onChangeText={(email) => setFamilyIEmail(email)}/> */}
              </FormControl>
              <FormControl mt="3">
                <FormControl.Label>별명</FormControl.Label>
                <Input onChangeText={(nickname) => setFamilyINickname(nickname)}/>
              </FormControl>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                setModalVisible(false);
              }}>
                  Cancel
                </Button>
                <Button onPress={() => {
                checkIdcomp()
              }}>
                  Save
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
          <Button onPress={() => {
          setModalVisible(!modalVisible);
        }}>
            가족 추가하기
          </Button>
      </View>;
  }

export default function FamilyManagement() {
    return(
        <NativeBaseProvider>
            <AddFamily/>
        </NativeBaseProvider>
    )
} 