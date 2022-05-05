import { useNavigation } from "@react-navigation/native";
import { Avatar, Box, Heading, HStack, Spacer, VStack } from "native-base";
import { useEffect, useState, Suspense } from "react";
import { useIsFocused } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import AppLoading from "expo-app-loading";
const IP_address = process.env.IP_address

const ShortNewsCard = (props) => {
    const navigation = useNavigation();
    const [myDisease, setMyDisease] = useState();
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);
    const isFocused = useIsFocused(); 
    const [newsOk, setNewsOk] = useState(false);

    useEffect(() => {
        getData();
        setShowDiseasesNews();
    }, [isFocused, newsOk])

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
            setItems(response.data);
            console.log(response.data);
            setLoading(true);
            setNewsOk(true)
        } catch (err) {
            console.log(err);
        }
    }

    const onFinish = () => setLoading(false);

    const NewsList = () => {
        
        return(
            <>
                <NewsComponent title={items[0].title} time={items[0].time} url={items[0].newsUrl} img={items[0].img}/>
                <NewsComponent title={items[1].title} time={items[1].time} url={items[1].newsUrl} img={items[1].img}/>
                <NewsComponent title={items[2].title} time={items[2].time} url={items[2].newsUrl} img={items[2].img}/>
            </>
        )
    }

    const NewsComponent = ({title, time, url, img}) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('NewsDetail', {
                url: url,
                title: title,
                img: img
              })}>
                <Box key={url}
                    borderBottomWidth="1"
                    _dark={{
                        borderColor: "gray.600"
                    }}
                    borderColor="coolGray.200" py="2"
                >
                    <HStack space={3} justifyContent="space-between">
                        <Avatar size="48px" source={{
                            uri: img
                        }}
                        />
                        <VStack>
                        
                            <Text
                                numberOfLines={1}
                                ellipsizeMode='tail'
                                _dark={{
                                    color: "warmGray.50"
                                }} color="coolGray.800" bold >
                                { ((title).length > 30) ? 
                                        (((title).substring(0,25)) + '...') :  title }
                                {/* {title} */}
                            </Text>
                            <Spacer />
                            <Text fontSize="xs" _dark={{
                                color: "warmGray.50"
                            }} color="coolGray.800" >
                                {time}
                            </Text>
                        </VStack>
                        <Spacer />
                    </HStack>
                </Box>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.card}>
        <AppLoading
        startAsync={setShowDiseasesNews}
        onError={console.warn}
        onFinish={onFinish}
      />
            <Box pb="3">
                <HStack>
                    <Heading size="md" isTruncated>
                        건강 뉴스
                    </Heading>
                    <Spacer />
                    <TouchableOpacity onPress={() => navigation.navigate('News')}>
                        <HStack>
                            <Text>뉴스 더보기</Text>
                            <Icon name="doubleright" size={15} color="#4F8EF7" />
                        </HStack>
                    </TouchableOpacity>
                </HStack>
            </Box>
            {/* 뉴스를 한 3개만 불러와줬으면 함 */}
            {newsOk && 
                <NewsList/>
            }
        </View>
    )
}
export default ShortNewsCard;

const styles = StyleSheet.create({

    card: {
        backgroundColor: '#DAD9FF',
        marginVertical: 10,
        borderRadius: 10,
        // height: 100,
        padding: 20,
        marginHorizontal: 10,
    },

});