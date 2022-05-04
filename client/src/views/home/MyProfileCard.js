import AsyncStorage from "@react-native-async-storage/async-storage";
import { Avatar, Divider, Heading, HStack, Spacer, VStack } from "native-base";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const MyProfileCard = () => {

    const [userName, setUserName] = useState('');

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
        <View style={styles.card}>
            <HStack alignItems="center">
                <VStack alignItems="center">
                    <Heading size="md" isTruncated>
                        <Text>환영합니다. {userName}님.</Text>
                    </Heading>
                    <Divider/>
                    <Text fontSize="xl">오늘의 건강은 어떠신가요?</Text>
                </VStack>
                <Spacer />
                <Avatar bg="indigo.500" alignSelf="center" size="lg" source={{
                    uri: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                }}>
                    RS
                </Avatar>
            </HStack>
        </View>
    )
}

export default MyProfileCard;

const styles = StyleSheet.create({

    card: {
        backgroundColor: '#D9E5FF',
        marginVertical: 10,
        borderRadius: 10,
        height: 100,
        padding: 20,
        marginHorizontal:10,
    },

});