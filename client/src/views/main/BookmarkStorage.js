import React, {useEffect, useState} from "react";
import { View, Modal, Button, NativeBaseProvider, Text, Link, Box, Spacer,  Avatar, Center, VStack, HStack } from 'native-base';
import { Alert, FlatList, SafeAreaView } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
const IP_address = process.env.IP_address

export default function BookmarkStorage() {
  const navigation = useNavigation(); 
    const [dataArr, setDataArr] = useState('');
    const [modal, setModal] = useState(false);
    const [storageName, setStorageName] = useState('');
    const [oneDataArr, setOneDataArr] = useState('');
    
    const callback = (data) => {
        setDataArr(data);
    }

    const hideModal = () => {
      setModal(false);
    }

    const showNewsList = (name) => {
      setModal(true);
      axios.get('http://'+IP_address+':5000/bookmarkRouter/findOne/',{
        params: {
          bookmark_name: name
        }
      })
    .then((response) => {
      setOneDataArr(response.data);
    }).catch(function (error) {
      console.log(error);
    });
    }

    // useEffect(() => {   
    //   getStorageData()
    // }, []);


    // const getStorageData = async () => {
    //   try{
    //     const response = await axios.get('https://'+IP_address+':5000/bookmarkRouter/find')
    //     callback(response.data);
    //     setLoading(true);
    //   } catch(err) {
    //     console.log(err);
    //   }
    // }


    let bmSArr = Object.values(dataArr).map(bmS => bmS);
    let newsArr = Object.values(oneDataArr).map(news => news)[2];

    const Display = () => {
      return(
    <View >
    { newsArr.map((item) => (
      <Link href="#" keyExtractor={(item) => item._id} onPress={() => navigation.navigate('NewsDetail', {
            url: item.url,
            title: item.title,
            img: item.img
          })} >
      <Box  borderBottomWidth="1" _dark={{
      borderColor: "gray.600"
    }} borderColor="coolGray.200" py="2" >
            <HStack space={3} justifyContent="space-between">
              <Avatar size="48px" source={{
          uri: item.img
        }} />
              <VStack>
                <Text numberOfLines={1} ellipsizeMode='tail' _dark={{
            color: "warmGray.50"
          }} color="coolGray.800" bold >
                  {item.title}
                </Text>
              </VStack>
              <Spacer />
            </HStack>
          </Box></Link>
    ))}
    </View>
      )
    }

    const addStorage = () => {
      Alert.prompt('????????? ????????? ??????????????????', null, (text) =>
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
                console.log('?????? ???????????? ????????? ??????');
                Alert.alert('?????? ???????????? ????????? ???????????????.');
            }
        }).catch(function (error) {
            // ??????????????? ??????
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
      <Button onPress={() => addStorage()}>????????? ????????????</Button>

      <FlatList 
      data={bmSArr} 
      keyExtractor= {(item) => {
                  return item._id;
      }}
      renderItem={({
      item
    }) => <Link href="#" onPress={() => showNewsList(item.bookmark_name)} >
      <Box key={item.bookmark_info._id} borderBottomWidth="1" _dark={{
      borderColor: "gray.600"
    }} borderColor="coolGray.200" py="2" >
              <VStack>
                <Text numberOfLines={1} ellipsizeMode='tail' _dark={{
            color: "warmGray.50"
          }} color="coolGray.800" bold >
                  {item.bookmark_name}
                </Text>
              </VStack>
          </Box></Link>}  />

          <Modal isOpen={modal} onClose={() => hideModal()}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>????????? ??????</Modal.Header>
          <Modal.Body>
            <View >
            {newsArr != null && <Display/>}
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