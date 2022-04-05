import React, {useEffect, useState} from "react";
import { View, Modal, Button, NativeBaseProvider, Text, Link, Box, Spacer,  HStack } from 'native-base';
import { Alert, FlatList } from 'react-native';
import axios from 'axios';
const IP_address = process.env.IP_address

export default function BookmarkStorage() {
    const [dataArr, setDataArr] = useState('');
    const [modal, setModal] = useState(false);
    const [storageName, setStorageName] = useState('');
    
    const callback = (data) => {
        setDataArr(data);
    }

    const hideModal = () => {
      setModal(false);
    }

    
    const showNewsList = () => {
      setModal(true);
    }

    axios.get('http://'+IP_address+':5000/bookmarkRouter/find')
    .then((response) => {
        callback(response.data);
    }).catch(function (error) {
      console.log(error);
    });

    let bmSArr = Object.values(dataArr).map(bmS => bmS);

    const addStorage = () => {
      Alert.prompt('보관함 이름을 입력해주세요', null, (text) =>
      {setStorageName(text),
      axios.post('http://' + IP_address + ':5000/bookmarkRouter/save', {
        data: {
            bookmark_name: text,
        }
      })
        .then((response) => {
            if (response.data.status === 'success') {
                console.log('Successful.');
            } else if (response.data.status === 'duplicated') {
                console.log('이미 존재하는 보관함 이름');
                Alert.alert('이미 존재하는 보관함 이름입니다.');
            }
        }).catch(function (error) {
            // 오류발생시 실행
            console.log(error);
        })
        axios.get('http://'+IP_address+':5000/bookmarkRouter/find')
        .then((response) => {
          setDataArr(response.data);
        }).catch(function (error) {
        console.log(error);
        });
        ;}
      );
    }

    return(
        <NativeBaseProvider>
      <View >
      <Button onPress={() => addStorage()}>보관함 추가하기</Button>
      <FlatList data={bmSArr} renderItem={({
      item
    }) => <Link href="#" key={item._id} onPress={() => showNewsList()}>
      <Box borderBottomWidth="1" _dark={{
      borderColor: "gray.600"
    }} borderColor="coolGray.200" py="2" >
            <HStack space={3} justifyContent="space-between">
                <Text numberOfLines={1} ellipsizeMode='tail' _dark={{
            color: "warmGray.50"
          }} color="coolGray.800" bold >
                  {item.bookmark_name}
                </Text>
              <Spacer />
            </HStack>
          </Box></Link>}  />
          <Modal isOpen={modal} onClose={() => hideModal()}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>저장된 뉴스</Modal.Header>
          <Modal.Body>
            <Button>
              뉴스
            </Button>
            <View >
            
          </View>
          </Modal.Body>
          <Modal.Footer>
            
          </Modal.Footer>
        </Modal.Content>
      </Modal> 
    </View>
    
        </NativeBaseProvider>
    )
} 