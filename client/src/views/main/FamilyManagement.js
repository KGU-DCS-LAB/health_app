import React, {useEffect, useState} from "react";
import { View, Modal, Button, NativeBaseProvider, Text, Link, Box, Spacer,  Avatar, Center, VStack, HStack, FormControl, Input } from 'native-base';
import { Alert, FlatList, SafeAreaView } from 'react-native';
import AppLoading from "expo-app-loading";
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const IP_address = process.env.IP_address

const AddFamily = () =>{
    const [modalVisible, setModalVisible] = React.useState(false);
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    
    return <View>
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>가족 추가하기</Modal.Header>
            <Modal.Body>
              <FormControl>
                <FormControl.Label>아이디</FormControl.Label>
                <Input ref={initialRef} />
              </FormControl>
              <FormControl mt="3">
                <FormControl.Label>별명</FormControl.Label>
                <Input />
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
                setModalVisible(false);
              }}>
                  Save
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
        <HStack space="4" justifyContent="center" alignItems="center">
          <Button onPress={() => {
          setModalVisible(!modalVisible);
        }}>
            Open Modal
          </Button>
        </HStack>
      </View>;
  }

export default function FamilyManagement() {

    
  
    return(
        <NativeBaseProvider>
            <AddFamily/>
        </NativeBaseProvider>
    )
} 