import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Modal, Button, NativeBaseProvider, Text, Link, Box, Spacer,  HStack } from 'native-base';
import { Alert, FlatList } from 'react-native';
import axios from 'axios';
const IP_address = process.env.IP_address

export default class MyWeb extends Component {
  constructor(props){
    super(props)
    this.handleBookmark= this.handleBookmark.bind(this);
    this.handleBookmarkOut = this.handleBookmarkOut.bind(this);
    this.state={
     url: this.props.route.params.url,
     title: this.props.route.params.title,
     img: this.props.route.params.img,
     bookmark: 'bookmark',
     modal: false,
     bmsName: "",
     bookmarks: []
    }
  }

  handleBookmark = () => {
    this.setState({ bookmark : 'bookmark', modal: true })
    axios.get('http://'+IP_address+':5000/bookmarkRouter/find')
    .then((response) => {
      console.log(response.data);
      this.setState({ bookmarks : response.data })
    }).catch(function (error) {
      console.log(error);
  });
  } 
  handleBookmarkOut = () => this.setState({ bookmark : 'bookmark-outline' })
  hideModal = () => this.setState({ modal: false });
  addStorage = () => {
    Alert.prompt('보관함 이름을 입력해주세요', null, (text) =>
    {this.setState({ bmsName: text }),
    axios.post('http://' + IP_address + ':5000/bookmarkRouter/save', {
      data: {
          bookmark_name: text,
      }
    })
      .then((response) => {
          if (response.data.status === 'success') {
              console.log('Successful.');
          } else if (response.data.status === 'duplicated') {
              console.log('이미 존재하는 보관함 이름');
              Alert.alert('이미 존재하는 보관함 이름입니다.');
          }
      }).catch(function (error) {
          // 오류발생시 실행
          console.log(error);
      })
      axios.get('http://'+IP_address+':5000/bookmarkRouter/find')
      .then((response) => {
      this.setState({ bookmarks : response.data })
      }).catch(function (error) {
      console.log(error);
      });
      ;}
    );
  }

saveNews = (bmN) => {
      // console.log(this.state.url);
      axios.post('http://' + IP_address + ':5000/bookmarkRouter/urlSave', {
      data: {
          bookmark_name: bmN,
          news_url: this.state.url,
          news_title: this.state.title,
          news_img: this.state.img,
      }
    })
    Alert.alert('저장되었습니다.')
    }
    

  render() {
    const isBookmarked = this.state.bookmark;
    let bkIcon;

    if (isBookmarked == 'bookmark-outline') {
      bkIcon = <Icon name='bookmark' size={30} color="#4F8EF7" style={{alignSelf: 'flex-end'}} onPress={() => this.handleBookmarkOut()} />
    } else {
      bkIcon = <Icon name='bookmark-outline' size={30} color="#4F8EF7" style={{alignSelf: 'flex-end'}} onPress={() => this.handleBookmark()} />
    }

  let bmSArr = Object.values(this.state.bookmarks).map(bmS => bmS);

    return (
      <NativeBaseProvider>
      <View style={{flex: 1, overflow: 'hidden'}}>
      {bkIcon}
      
      <Modal isOpen={this.state.modal} onClose={this.hideModal}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>북마크 저장하기</Modal.Header>
          <Modal.Body>
            <Button onPress={() => this.addStorage()} >
              보관함 추가하기
            </Button>
            <View >
            <FlatList 
            data={bmSArr} 
            keyExtractor={item => item._id}
            renderItem={({
            item
          }) => <Link href="#" onPress={() => this.saveNews(item.bookmark_name)}>
            <Box borderBottomWidth="1" _dark={{
            borderColor: "gray.600"
          }} borderColor="coolGray.200" py="2" >
                  <HStack space={3} justifyContent="space-between">
                      <Text numberOfLines={1} ellipsizeMode='tail' _dark={{
                  color: "warmGray.50"
                }} color="coolGray.800" bold >
                        {item.bookmark_name}
                      </Text>
              <Spacer />
            </HStack>
          </Box></Link>}  />
          </View>
          </Modal.Body>
          <Modal.Footer>
            
          </Modal.Footer>
        </Modal.Content>
      </Modal> 
      
        <WebView source={{ uri: this.state.url}}
        style={{ marginTop: 20 }} originWhitelist={['https://*']}/>
        
      </View>
      </NativeBaseProvider>
    );
  }
}