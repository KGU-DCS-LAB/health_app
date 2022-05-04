import React, { useState, useEffect } from "react";
import { View, Heading, Box, Center, VStack, HStack, Button, Image, Stack, Avatar, Spacer, Link, Select, CheckIcon } from 'native-base';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { StyleSheet, FlatList, Text, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import SelectDropdown from 'react-native-select-dropdown'
import AppLoading from "expo-app-loading";

const IP_address = process.env.IP_address


const NewsList = ({user, newsMenu}) => {
    const isFocused = useIsFocused(); // isFoucesd Define
    const [userData, setUserData] = useState([])
    const [keyword, setKeyword] = useState('');
    const [items, setItems] = useState([]);

    // console.log(user);
    // console.log(newsMenu);

    const getUserData = () => {
      let result = []
      axios.get('http://' + IP_address + ':5000/usersRouter/findOne/', {
        params: {
          user_id: user,
        }
      })
        .then((response) => {
          console.log(response.data);
          if (response.data.length > 0) {
            response.data.forEach((item) => {
                result.push(item);
            });
        }
        setUserData(result);
        // console.log(result);
        }).catch(function (error) {
          console.log(error);
        });
    }

    const menuSelect = () => {
      switch (newsMenu) {
        case "질병":
          return (
            setKeyword(userData.user_diseases)
          )
        case "나이":
          return(
            setKeyword(userData.birthday.split('T')[0])
          )
      }
      getNews();
    }

    const getNews = () => {
      if(newsMenu == '나이'){
        let ageGroup = ''
        if (age < 10) {
          ageGroup = '어린이'
        }
        else if (age >= 10) {
          ageGroup = parseInt(age / 10) + '0대'
        }
        setKeyword(ageGroup);
      } 
      console.log('sdfsf'+keyword);

      let result = []
      axios.get('http://' + IP_address + ':5000/newsRouter/news', {
      params: {
        keyword: keyword
      }
    })
      .then((response) => {
        console.log('=================');
        console.log(response.data);
        if (response.data.length > 0) {
          response.data.forEach((item) => {
              result.push(item);
          });
      }
      setItems(result);
      console.log(result);
      }).catch(function (error) {
        // 오류발생시 실행
        console.log(error);
      })
    }

    const [ref, setRef] = useState(null);

    //첫 렌더링에만 호출됨
    useEffect(() => {
        getUserData();
        menuSelect();
    }, [isFocused]);

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity href="#" onPress={() => navigation.navigate('NewsDetail', {
                url: item.newsUrl,
                title: item.title,
                img: item.img
              })}>
                <Box key={item.newsUrl} borderBottomWidth="1" _dark={{
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
                      <Text fontSize="xs" _dark={{
                        color: "warmGray.50"
                      }} color="coolGray.800" >
                        {item.time}
                      </Text>
                    </VStack>
                    <Spacer />
                  </HStack>
                </Box>
              </TouchableOpacity>
        );
    };

    const onFinish = () => setLoading(false);

    return (
        <View style={styles.container}>
          <AppLoading
            startAsync={getNews}
            onError={console.warn}
            onFinish={onFinish}
            /> 
            <FlatList
                data={items}
                ref={(ref) => {
                    setRef(ref);
                }}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                // extraData={selectedId}
            />
        </View>
    )
}
export default NewsList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        justifyContent: 'center',
    },
});
