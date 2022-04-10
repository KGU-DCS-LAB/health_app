import React, {useEffect, useState, createRef} from "react";
import { Modal, Button, NativeBaseProvider, Link, Box, Spacer,  Avatar, Center, VStack, HStack, FormControl, Input, InputGroup, Select, InputRightAddon, CheckIcon } from 'native-base';
import {StyleSheet,Text,TouchableOpacity,TouchableHighlight,View,Alert
} from 'react-native';
import AppLoading from "expo-app-loading";
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage  from "@react-native-async-storage/async-storage";
import { SwipeListView } from 'react-native-swipe-list-view';

const IP_address = process.env.IP_address

const FamilyList = () => {
        const [listData, setListData] = useState(
            Array(20)
                .fill('')
                .map((_, i) => ({ key: `${i}`, text: `item #${i}` }))
        );
    
        const closeRow = (rowMap, rowKey) => {
            if (rowMap[rowKey]) {
                rowMap[rowKey].closeRow();
            }
        };
    
        const deleteRow = (rowMap, rowKey) => {
            closeRow(rowMap, rowKey);
            const newData = [...listData];
            const prevIndex = listData.findIndex(item => item.key === rowKey);
            newData.splice(prevIndex, 1);
            setListData(newData);
        };
    
        const onRowDidOpen = rowKey => {
            console.log('This row opened', rowKey);
        };
    
        const renderItem = data => (
            <TouchableHighlight
                onPress={() => console.log('You touched me')}
                style={styles.rowFront}
                underlayColor={'#AAA'}
            >
                <View>
                    <Text>I am {data.item.text} in a SwipeListView</Text>
                </View>
            </TouchableHighlight>
        );
    
        const renderHiddenItem = (data, rowMap) => (
            <View style={styles.rowBack}>
                <Text>Left</Text>
                <TouchableOpacity
                    style={[styles.backRightBtn, styles.backRightBtnLeft]}
                    onPress={() => closeRow(rowMap, data.item.key)}
                >
                    <Text style={styles.backTextWhite}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.backRightBtn, styles.backRightBtnRight]}
                    onPress={() => deleteRow(rowMap, data.item.key)}
                >
                    <Text style={styles.backTextWhite}>Delete</Text>
                </TouchableOpacity>
            </View>
        );
    
        return (
            <View style={styles.container}>
                <SwipeListView
                    data={listData}
                    renderItem={renderItem}
                    renderHiddenItem={renderHiddenItem}
                    leftOpenValue={75}
                    rightOpenValue={-150}
                    previewRowKey={'0'}
                    previewOpenValue={-40}
                    previewOpenDelay={3000}
                    onRowDidOpen={onRowDidOpen}
                />
            </View>
        );
        
}
const componentMap = {
    FamilyList,
};
const FamilyListView = () => {
    const [mode, setMode] = useState('FamilyList');
    const renderExample = () => {
        const Component = componentMap[mode];
        return <Component />;
    };

    return (
        <View style={styles.container}>
            {renderExample()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
});


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
          <FamilyListView/>
      </View>;
  }

export default function FamilyManagement() {
    return(
        <NativeBaseProvider>
            <AddFamily/>
        </NativeBaseProvider>
    )
} 