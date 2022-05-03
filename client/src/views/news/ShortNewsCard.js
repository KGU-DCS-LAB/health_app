import { useNavigation } from "@react-navigation/native";
import { Avatar, Box, HStack, Spacer, VStack } from "native-base";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';



const ShortNewsCard = (props) => {
    const navigation = useNavigation();
    const [dataArr, setDataArr] = useState([]);
    const [myDisease, setMyDisease] = useState();

    useEffect(() => {
        getData();
        setShowDiseasesNews()
    }, [])

    const callback = (data) => {
        setDataArr(data);
    }

    const getData = () => {
        try {
            AsyncStorage.getItem('userInfo')
                .then(value => {
                    if (value != null) {
                        const UserInfo = JSON.parse(value);
                        setMyDisease(UserInfo.user_diseases)
                    }
                }
                )
        } catch (error) {
            console.log(error);
        }
    }

    const setShowDiseasesNews = async () => {
        try {
            const response = await axios.get('http://' + IP_address + ':5000/newsRouter/news', {
                params: {
                    keyword: myDisease
                }
            })
        } catch (err) {
            console.log(err);
        }
    }

    const NewsComponent = () => {
        return (
            <TouchableOpacity onPress={() => console.log('뉴스 눌렸다')}>
                <Box
                    borderBottomWidth="1"
                    _dark={{
                        borderColor: "gray.600"
                    }}
                    borderColor="coolGray.200" py="2"
                >
                    <HStack space={3} justifyContent="space-between">
                        <Avatar size="48px" source={{
                            uri: undefined
                        }} 
                        />
                        <VStack>
                            <Text
                             numberOfLines={1}
                             ellipsizeMode='tail' 
                             _dark={{
                                color: "warmGray.50"
                            }} color="coolGray.800" bold >
                                기사제목
                            </Text>
                            <Text fontSize="xs" _dark={{
                                color: "warmGray.50"
                            }} color="coolGray.800" >
                                기사시간
                            </Text>
                        </VStack>
                        <Spacer />
                    </HStack>
                </Box>
            </TouchableOpacity>
        )
    }

    return (
        <View>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('NewsView', {
                    // keyword: keyword
                })}>
                    <HStack>
                        <Text>뉴스 더보기</Text>
                        <Icon name="doubleright" size={15} color="#4F8EF7" />
                    </HStack>
                </TouchableOpacity>
            </View>
            <NewsComponent/>
            <NewsComponent/>
            <NewsComponent/>
        </View>
    )
}
export default ShortNewsCard;