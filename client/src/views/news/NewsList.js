import React, { useState, useEffect } from "react";
import { View, Heading, Box, Center, VStack, HStack, Button, Image, Stack, Avatar, Spacer, Link, Select, CheckIcon } from 'native-base';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { StyleSheet, FlatList, Text, Alert, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import SelectDropdown from 'react-native-select-dropdown'
import AppLoading from "expo-app-loading";
import { useNavigation } from '@react-navigation/native';

const IP_address = process.env.IP_address
// import { IP_address } from '@env'

const NewsList = ({user, newsMenu}) => {
    const navigation = useNavigation();
    const isFocused = useIsFocused(); // isFoucesd Define
    const [userData, setUserData] = useState([])
    const [keyword, setKeyword] = useState('');
    const [items, setItems] = useState([]);
    const [userDisease, setUserDisease] = useState('')
    const [userBirth, setUserBirth] = useState('')
    // const [loading, setLoading] = useState(false);

    console.log(user);

    const getUserData = () => {
      axios.get('http://' + IP_address + ':5000/usersRouter/findOne/', {
        params: {
          user_id: user,
        }
      })
        .then((response) => {
          console.log(response.data)
          setUserData(response.data);
          setUserDisease(response.data.user_diseases);
          setUserBirth(response.data.birthday);
          menuSelect();
        }).catch(function (error) {
          console.log(error);
        });
    }

    const menuSelect = () => {
      const age = new Date().getFullYear() - userBirth.split('T')[0].split('-')[0];
      switch (newsMenu) {
        case "질병":
          return (
            setKeyword(userDisease)
          )
        case "나이":
          return(
            setKeyword((age<10) ? userDisease+"+어린이" : userDisease+ "+"+ parseInt(age/10)+"0대")
          )
        case "가족력":
          return(
            setKeyword("췌장암")
          )
      }
      console.log(userData.birthday);
      getNews();
    }

    const getNews = () => {
      console.log(userBirth);
      if (keyword < 10) {
        setKeyword(userDisease+"+어린이");
      }
      else if (keyword >= 10) {
        setKeyword(userDisease+ "+대");
      }
      console.log(keyword);

      axios.get('http://' + IP_address + ':5000/newsRouter/news', {
      params: {
        keyword: keyword
      }
    })
      .then((response) => {
        console.log('=================');
        console.log(response.data);
      setItems(response.data);
      console.log(response.data);
      }).catch(function (error) {
        // 오류발생시 실행
        console.log(error);
      })
    }

    const [ref, setRef] = useState(null);

    useEffect(() => {
        getUserData();
        menuSelect();
        getNews();
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

    // const onFinish = () => setLoading(false);

    return (
        <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </SafeAreaView>
    )
}
export default NewsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});