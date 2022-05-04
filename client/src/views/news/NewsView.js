import React, { useState, useEffect } from "react";
import { Heading, Box, Center, VStack, HStack, Button, useColorModeValue, Stack, Avatar, Spacer, Link, Select, CheckIcon, Pressable } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { StyleSheet, FlatList, View, Text, Alert, useWindowDimensions, SafeAreaView  } from 'react-native';
const IP_address = process.env.IP_address
import AppLoading from "expo-app-loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar, Animated } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import { log } from "react-native-reanimated";
import Icon from 'react-native-vector-icons/AntDesign';
import NewsList from "./NewsList";
import { TabView, SceneMap } from "react-native-tab-view";

export default function NewsView() {
  const navigation = useNavigation();
  const [userId, setUserId] = useState('')
  const [userName, setUserName] = useState('')
  const [userBirth, setUserBirth] = useState('')
  const [myDisease, setMyDisease] = useState();
  const [myFH, setMyFH] = useState();
  const [familyDisease, setFamilyDisease] = useState();
  const [familyAge, setFamilyAge] = useState();
  const [userData, setUserData] = useState();
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    getData();
    // getFamilyList();
    // setShowDiseasesNews()
  }, [])

  const getData = () => {
    try {
      AsyncStorage.getItem('userInfo')
        .then(value => {
          if (value != null) {
            const UserInfo = JSON.parse(value);
            // console.log(UserInfo);
            setUserId(UserInfo.user_id);
            setUserName(UserInfo.user_name);
            // setMyDisease(UserInfo.user_diseases)
            // setKeyword(UserInfo.user_diseases);
            // setUserBirth(UserInfo.birthday.split('T')[0]);
          }
        }
        )
    } catch (error) {
      console.log(error);
    }
  }

  // const [dataArr, setDataArr] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [myNews, setMyNews] = useState(true);
  // const [familyNews, setFamilyNews] = useState(false);
  // const [familyList, setFamliyList] = useState([]);
  // const [myNewsColor, setMyNewsColor] = useState("blue");
  // const [familyNewsColor, setFamilyNewsColor] = useState("gray");
  // const [newsMenu1, setNewsMenu1] = useState('blue')
  // const [newsMenu2, setNewsMenu2] = useState('gray')
  // const [newsMenu3, setNewsMenu3] = useState('gray')
  const [newsMenu, setNewsMenu] = useState('');

  // const callback = (data) => {
  //   setDataArr(data);
  // }

  // let newsArr = Object.values(dataArr).map(news => news);

  // const DisplayNews = () => {
  //   // console.log(newsArr);
  //   return (
  //     <View>
  //       <FlatList
  //         data={newsArr}
  //         keyExtractor={item => item.newsUrl}
  //         renderItem={
  //           ({ item }) => (
  //             <TouchableOpacity href="#" onPress={() => navigation.navigate('NewsDetail', {
  //               url: item.newsUrl,
  //               title: item.title,
  //               img: item.img
  //             })}>
  //               <Box key={item.newsUrl} borderBottomWidth="1" _dark={{
  //                 borderColor: "gray.600"
  //               }} borderColor="coolGray.200" py="2" >
  //                 <HStack space={3} justifyContent="space-between">
  //                   <Avatar size="48px" source={{
  //                     uri: item.img
  //                   }} />
  //                   <VStack>
  //                     <Text numberOfLines={1} ellipsizeMode='tail' _dark={{
  //                       color: "warmGray.50"
  //                     }} color="coolGray.800" bold >
  //                       {item.title}
  //                     </Text>
  //                     <Text fontSize="xs" _dark={{
  //                       color: "warmGray.50"
  //                     }} color="coolGray.800" >
  //                       {item.time}
  //                     </Text>
  //                   </VStack>
  //                   <Spacer />
  //                 </HStack>
  //               </Box>
  //             </TouchableOpacity>
  //           )}
  //       />
  //     </View>
  //   )
  // }

  // console.log(Object.values(dataArr).map(news => (news.time)));

  // const setShowDiseasesNews = async () => {
  //   // setNewsMenu('질병')
  //   // setNewsMenu1('blue')
  //   // setNewsMenu2('gray')
  //   // setNewsMenu3('gray')
  //   try {
  //     const response = await axios.get('http://' + IP_address + ':5000/newsRouter/news', {
  //       params: {
  //         keyword: myDisease
  //       }
  //     })
  //     setKeyword(myDisease)
  //     callback(response.data);
  //     setLoading(true);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // const setShowFamliyDiseasesNews = async (disease) => {
  //   setNewsMenu('가족질병')
  //   setNewsMenu1('blue')
  //   setNewsMenu2('gray')
  //   setNewsMenu3('gray')
  //   setKeyword(disease)
  //   try {
  //     const response = await axios.get('http://' + IP_address + ':5000/newsRouter/news', {
  //       params: {
  //         keyword: disease
  //       }
  //     })
  //     callback(response.data);
  //     setLoading(true);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // const setShowAgeNews = (userAge) => {
  //   console.log(userAge);
  //   setNewsMenu('나이')
  //   const age = new Date().getFullYear() - userAge.split('-')[0]
  //   setNewsMenu1('gray')
  //   setNewsMenu2('blue')
  //   setNewsMenu3('gray')
  //   setKeyword(userAge)
  //   // console.log(age%10);
  //   let ageGroup = ''
  //   if (age < 10) ageGroup = '어린이';
  //   else if (age >= 10) ageGroup = parseInt(age / 10) + '0대'
  //   axios.get('http://' + IP_address + ':5000/newsRouter/news', {
  //     params: {
  //       keyword: ageGroup
  //     }
  //   })
  //     .then((response) => {
  //       callback(response.data);
  //     }).catch(function (error) {
  //       // 오류발생시 실행
  //       console.log(error);
  //     })

  // }

  const setShowFHistoryNews = () => {
    // setNewsMenu1('gray')
    // setNewsMenu2('gray')
    // setNewsMenu3('blue')
    // setKeyword('췌장암')
    // axios.get('http://' + IP_address + ':5000/newsRouter/news', {
    //   params: {
    //     keyword: '췌장암'
    //   }
    // })
    //   .then((response) => {
    //     callback(response.data);
    //   }).catch(function (error) {
    //     // 오류발생시 실행
    //     console.log(error);
    //   })
  }
  // const onFinish = () => setLoading(false);

  // const showMyNews = () => {
  //   // setDataArr('');
  //   setShowDiseasesNews();
  //   setMyNews(true)
  //   setKeyword(myDisease)
  //   setFamilyNews(false)
  //   setFamilyNewsColor('gray')
  //   setMyNewsColor('blue')
  // }

  // const showFamilyNews = () => {
  //   findFamily(0)
  //   console.log('asdasdasdasdasd');
  //   // setDataArr('');
  //   setMyNews(false)
  //   setFamilyNews(true)
  //   setKeyword(familyDisease)
  //   setFamilyNewsColor('blue')
  //   setMyNewsColor('gray')
  //   setNewsMenu1('blue')
  //   setNewsMenu2('gray')
  //   callbackFamilyNews()
  // }

  // function callbackFamilyNews() {
  //   setShowFamliyDiseasesNews(familyDisease);
  // }

  // function callbackMyData(data) {
  //   setUserData(data);
  //   setFamliyList(data.user_family_list);
  //   setMyDisease(data.user_diseases);
  //   setShowDiseasesNews();
  // }

  // const getFamilyList = () => {
  //   axios.get('http://' + IP_address + ':5000/usersRouter/findOne/', {
  //     params: {
  //       user_id: userId,
  //     }
  //   })
  //     .then((response) => {
  //       // console.log(response.data.user_family_list);
  //       // console.log(response.data.user_diseases);

  //       callbackMyData(response.data)
  //     }).catch(function (error) {
  //       console.log(error);
  //     });
  // }



  // const FamilyListView = () => {
  //   let familyArr = Object.values(familyList).map(item => item.nickname)
  //   const countries = ["Egypt", "Canada", "Australia", "Ireland"]
  //   return (
  //     <SelectDropdown
  //       data={familyArr}
  //       onSelect={(selectedItem, index) => {
  //         // console.log(index)
  //         findFamily(index)
  //       }}
  //       buttonTextAfterSelection={(selectedItem, index) => {
  //         return selectedItem
  //       }}
  //       rowTextForSelection={(item, index) => {
  //         return item
  //       }}
  //     />
  //   )
  // };

  // const callbackFamily = (data) => {
  //   setFamilyDisease(data.user_diseases);
  //   setFamilyAge(data.birthday.split('T')[0])
  // }

  // const findFamily = (index) => {
  //   console.log(index);

  //   const family_id = familyList[index].user_id;
  //   // console.log(family_id);

  //   axios.get('http://' + IP_address + ':5000/usersRouter/findOne/', {
  //     params: {
  //       user_id: family_id
  //     }
  //   })
  //     .then((response) => {
  //       console.log(response.data);
  //       // console.log(response.data.user_diseases);
  //       // console.log(response.data.birthday.split('T')[0]);
  //       callbackFamily(response.data)
  //     }).catch(function (error) {
  //       console.log(error);
  //     });
  // }


  // const ShowFamilyNewsList = () => {

  //   return (
  //     <View>
  //       <Box alignSelf="center">
  //         <HStack space={3} mt="3" mb="3">
  //           <Button mt="2" colorScheme={newsMenu1} onPress={() => { setShowFamliyDiseasesNews(familyDisease) }}>
  //             질병
  //           </Button>
  //           <Button mt="2" colorScheme={newsMenu2} onPress={() => { setShowAgeNews(familyAge) }}>
  //             나이
  //           </Button>
  //         </HStack>
  //       </Box>
  //       <View>
  //         <TouchableOpacity onPress={() => navigation.navigate('NewsList', {
  //           keyword: keyword
  //         })}>
  //           <HStack>
  //             <Text>뉴스 더보기</Text>
  //             <Icon name="doubleright" size={15} color="#4F8EF7" />
  //           </HStack>
  //         </TouchableOpacity>
  //       </View>
  //       <NewsList user={userId} newsMenu={newsMenu}/>
  //     </View>
  //   )
  // }

const FirstRoute = () => {
  // setNewsMenu('질병')
  return (
<NewsList user={userId} newsMenu={newsMenu}/>
  )
}

const SecondRoute = () => {
  // setNewsMenu('나이')
  return (
<NewsList user={userId} newsMenu={newsMenu}/>
  )
}
  

function Tab() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: '질병' },
    { key: 'second', title: '나이' },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <NewsList user={userId} newsMenu={route.title}/>
      case 'second':
        return <NewsList user={userId} newsMenu={route.title}/>
    }
  };

  // const renderScene = SceneMap({
  //   first: FirstRoute,
  //   second: SecondRoute,
  // });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderLabel={() => 
          setNewsMenu(routes[index].title)
        }
    />
  );
}

  const MenuView = () => {
    return (
      <View style={{ height: '100%' }}>
        <Tab/>
      </View>
    )
  }

  return (
    <>
        <MenuView/>
        {/* <NewsList user={userId} newsMenu={newsMenu}/> */}
    </>
    // <Center w="100%" >
    //   {/* <AppLoading
    //     startAsync={setShowDiseasesNews}
    //     onError={console.warn}
    //     onFinish={onFinish}
    //   /> */}
    //   <View safeArea p="1" w="100%" maxW="290" py="8">
    //     <Heading size="sm" color="coolGray.800" _dark={{
    //       color: "warmGray.50"
    //     }} fontWeight="semibold">
    //       {userName}님을 위한 건강 뉴스
    //     </Heading>
    
        
        /* <HStack space={3} mt="5">
          <Button mt="2" w="50%" colorScheme={myNewsColor} onPress={() => showMyNews()}>
            나의 뉴스
          </Button>
          <Button mt="2" w="50%" colorScheme={familyNewsColor} onPress={() => showFamilyNews()}>
            가족 뉴스
          </Button>
        </HStack> */
        /* {myNews &&
          <Box>
            <Box alignSelf="center">
              <HStack space={3} mt="3" mb="3">
                <Button mt="2" colorScheme={newsMenu1} onPress={() => { setShowDiseasesNews() }}>
                  질병
                </Button>
                <Button mt="2" colorScheme={newsMenu2} onPress={() => { setShowAgeNews(userBirth) }}>
                  나이
                </Button>
                <Button mt="2" colorScheme={newsMenu3} onPress={() => { setShowFHistoryNews() }}>
                  가족력
                </Button>
              </HStack>
            </Box>
            <View>
              <TouchableOpacity onPress={() => navigation.navigate('NewsList', {
                keyword: keyword
              })}>
                <HStack>
                  <Text>뉴스 더보기</Text>
                  <Icon name="doubleright" size={15} color="#4F8EF7" />
                </HStack>
              </TouchableOpacity>
            </View>
            <NewsList user={userId} newsMenu={newsMenu}/>
          </Box>
        }
        {familyNews &&
          <View>
            <FamilyListView />
            <ShowFamilyNewsList />
          </View>
        } */
        /* <TouchableOpacity>
        <Text>더보기</Text>
        </TouchableOpacity> */
    //   </View>
    // </Center>
  )
}

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