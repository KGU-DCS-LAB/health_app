import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Avatar, Box, FlatList, Heading, HStack, Spacer, Text, VStack } from "native-base";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const FamilyProfileCard = () => {


    const [userFamliyList, setUserFamliyList] = useState([]);

    console.log(userFamliyList);

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        try {
            AsyncStorage.getItem('userInfo')
                .then(value => {
                    if (value != null) {
                        const UserInfo = JSON.parse(value);
                        console.log(UserInfo);
                        setUserFamliyList(UserInfo.user_family_list);
                        // setUserFamliyList([1, 2, 3, 4]);
                    }
                }
                )
        } catch (error) {
            console.log(error);
        }
    }

    const FamilyCard = () => {
        return (
            <View style={styles.card}>
                <HStack space={3} justifyContent="space-between">
                    <Avatar size="48px" source={{
                        uri: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                    }}>
                        RS
                    </Avatar>
                    <VStack>
                        <Text _dark={{
                            color: "warmGray.50"
                        }} color="coolGray.800" bold>
                            이름
                        </Text>
                        <Text color="coolGray.600" _dark={{
                            color: "warmGray.200"
                        }}>
                            별명
                        </Text>
                    </VStack>
                    <Spacer />
                    <Text fontSize="xs" _dark={{
                        color: "warmGray.50"
                    }} color="coolGray.800" alignSelf="flex-start">
                        보기
                    </Text>
                </HStack>
            </View>
        )
    }

    const NoFamilyCard = () => {
        return (
            <View style={styles.card}>
                                    <Heading size="md" isTruncated>
                        가족을 추가해보세요!
                    </Heading>
            </View>
        )
    }

    return (
        userFamliyList.length>0?userFamliyList.map((family) => <FamilyCard />):<NoFamilyCard/>
    )
}

export default FamilyProfileCard;

const styles = StyleSheet.create({

    card: {
        backgroundColor: '#FAE0D4',
        marginVertical: 10,
        borderRadius: 10,
        // height: 100,
        padding: 20,
        marginHorizontal: 10,
    },

});