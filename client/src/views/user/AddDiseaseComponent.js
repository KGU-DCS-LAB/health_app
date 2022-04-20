import React, { Component, createRef, useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, FlatList } from "react-native";
import { Text, Box, Center, VStack, FormControl, Spinner, Heading, Button, Input, Checkbox, Pressable, IconButton, ScrollView, HStack, Radio, Stack, Icon, NativeBaseProvider, WarningOutlineIcon, Select, InputGroup, CheckIcon, InputRightAddon } from 'native-base';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from '@react-navigation/native';
import { Ionicons, AntDesign, Entypo } from "@expo/vector-icons";
import axios from 'axios';
import { IP_address } from '@env'
import { LogBox } from 'react-native';


const AddDiseaseComponent = (props) => {
    const navigation = useNavigation();
    const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
    const [input, setInput] = useState('');
    const [diseases, setDiseases] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getDiseases = () => {
        let result = []
        if (diseases.length > 0) {
            return;
        }
        axios.get('http://' + IP_address + ':5000/diseasesRouter/findName', {
        }).then((response) => {
            response.data.forEach((item, idx) => {
                const disease = { num: item.번호, name: item.질병명, checked: false }
                result.push(disease);
            });
            setDiseases(result);
        }).catch(function (error) {
            console.log(error);
        })
    }

    const handleStatusChange = (index) => {
        setIsLoading(true);
        const temp = diseases.map((item, itemI) => item.num !== index ? item : {
            ...item,
            checked: !item.checked
        });
        setDiseases(temp);
        setIsLoading(false);
    };

    const handleSubmitButton = () => {
        axios.post('http://' + IP_address + ':5000/usersRouter/save', {
            data: {
                user_id: props.Email,
                password: props.Password,
                user_name: props.Name,
                birthday: props.BirthDay,
                gender: props.Gender,
                residence: props.Residence
            }
        })
            .then((response) => {
                if (response.data.status === 'success') {
                    setIsRegistraionSuccess(true)
                    console.log('Registration Successful. Please Login to proceed');
                    navigation.navigate('Main');
                } else if (response.data.status === 'duplicated') {
                    console.log('이미 존재하는 아이디입니다.');
                    alert('이미 존재하는 아이디 또는 이메일입니다.');
                }
            }).catch(function (error) {
                // 오류발생시 실행
                console.log(error);
            });
    }

    getDiseases();

    const renderItem = ({ item }) => (
        <Checkbox isChecked={item.checked} onChange={() => handleStatusChange(item.num)} value={item.name}>
            <Text mx="2" strikeThrough={item.checked} _light={{
                color: item.checked ? "gray.400" : "coolGray.800"
            }} _dark={{
                color: item.checked ? "gray.400" : "coolGray.50"
            }}>
                {item.name}
            </Text>
        </Checkbox>
    );

    return (
        <Center w="100%">
            <Box safeArea p="2" py="8" w="90%">
                <VStack space={3} mt="5">
                    <InputGroup width="100%">
                        <Input placeholder="Search" variant="filled" width="90%" borderRadius="10" py="1" px="2" borderWidth="0"
                            value={input} onChange={(value) => setInput(value)}
                            InputLeftElement={<Icon ml="2" size="4" color="gray.400" as={<Ionicons name="ios-search" />} />} />
                        <IconButton colorScheme="indigo" key="outline" variant="outline" w="10%" _icon={{
                            as: AntDesign,
                            name: "search1"
                        }} onPress={getDiseases()} />
                    </InputGroup>
                    <View></View>
                    {/* <ScrollView w="100%" h="70%" _contentContainerStyle={{
                        px: "20px",
                        mb: "4",
                        minW: "72"
                    }}>
                        {isLoading ?
                            <HStack space={2} justifyContent="center">
                                <Spinner accessibilityLabel="Loading posts" />
                                <Heading color="primary.500" fontSize="md">
                                    Loading
                                </Heading>
                            </HStack>
                            :
                            <VStack space={2}>
                                {diseases.map((item, itemI) =>
                                    <HStack w="100%" justifyContent="space-between" alignItems="center" key={item.num}>
                                        <Checkbox isChecked={item.checked} onChange={() => handleStatusChange(item.num)} value={item.name}>
                                            <Text mx="2" strikeThrough={item.checked} _light={{
                                                color: item.checked ? "gray.400" : "coolGray.800"
                                            }} _dark={{
                                                color: item.checked ? "gray.400" : "coolGray.50"
                                            }}>
                                                {item.name}
                                            </Text>
                                        </Checkbox>
                                    </HStack>
                                )}
                            </VStack>
                        }
                    </ScrollView> */}
                    <View>
                        {isLoading ?
                            <HStack space={2} justifyContent="center">
                                <Spinner accessibilityLabel="Loading posts" />
                                <Heading color="primary.500" fontSize="md">
                                    Loading
                                </Heading>
                            </HStack>
                            :
                            <VStack space={2}>
                                <FlatList
                                    data={diseases}
                                    renderItem={renderItem}
                                    keyExtractor={item => item.num}
                                />
                            </VStack>
                        }
                    </View>
                    <Button mt="2" colorScheme="indigo" onPress={handleSubmitButton}>
                        회원가입
                    </Button>
                </VStack>
            </Box>
        </Center>
    )
}

export default AddDiseaseComponent;