// import React from "react";
import { View, Center, Heading, VStack, HStack, Text, NativeBaseProvider, Box, Stack, CardItem, Left, Right, Body } from "native-base";
import { FontAwesome5 } from '@expo/vector-icons';
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function () {
    const [UserName, setUserName] = useState('');

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        try {
            AsyncStorage.getItem('userInfo')
                .then(value => {
                    if (value != null) {
                        const UserInfo = JSON.parse(value);
                        setUserName(UserInfo.user_name);
                    }
                }
                )
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <NativeBaseProvider>
            <Center w="100%">
                <Box w="90%" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                    borderColor: "coolGray.600",
                    backgroundColor: "gray.700"
                }} _web={{
                    shadow: 2,
                    borderWidth: 0
                }} _light={{
                    backgroundColor: "gray.50"
                }}>
                    {/* <Box h="10%"></Box> */}
                    <Center w="100%" height="200" bg="coolGray.200">
                        <Stack p="4" space={3}>
                            <FontAwesome5 name="user-circle" size={50} color="black" />
                            <Text>{UserName}님</Text>
                        </Stack>
                    </Center>
                    <CardItem header>
                        <Left>
                            <Body>
                                <Heading size="md" ml="-1">
                                    이름
                                </Heading>
                            </Body>
                        </Left>
                        <Right>
                            {UserName}
                        </Right>
                    </CardItem>
                    <Stack p="4" space={3}>
                        {/* <HStack >
                            <Box style={{alignItems:"flex-start"}}>
                                <Heading size="md" ml="-1">
                                    이름
                                </Heading>
                            </Box>
                            <Box style={{ alignItems: "flex-end" }}>
                                    <Text>{UserName}</Text>
                                </Box>
                        </HStack> */}
                        <Text fontWeight="400">
                            Bengaluru (also called Bangalore) is the center of India's high-tech
                            industry. The city is also known for its parks and nightlife.
                        </Text>
                        <HStack alignItems="center" space={4} justifyContent="space-between">
                            <HStack alignItems="center">
                                <Text color="coolGray.600" _dark={{
                                    color: "warmGray.200"
                                }} fontWeight="400">
                                    6 mins ago
                                </Text>
                            </HStack>
                        </HStack>
                    </Stack>
                </Box>
            </Center>
        </NativeBaseProvider>
    )
}