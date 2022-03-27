import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Modal, Button, NativeBaseProvider} from 'native-base';


export default class MyWeb extends Component {
  constructor(props){
    super(props)
    this.handleBookmark= this.handleBookmark.bind(this);
    this.handleBookmarkOut = this.handleBookmarkOut.bind(this);
    this.state={
     url: this.props.route.params.url,
     bookmark: 'bookmark',
     modal: false
    }
  }

  handleBookmark = () => this.setState({ bookmark : 'bookmark', modal: true })
  handleBookmarkOut = () => this.setState({ bookmark : 'bookmark-outline' })
  hideModal = () => this.setState({ modal: false });

  render() {
    const isBookmarked = this.state.bookmark;
    let bkIcon;

    if (isBookmarked == 'bookmark-outline') {
      bkIcon = <Icon name='bookmark' size={30} color="#4F8EF7" style={{alignSelf: 'flex-end'}} onPress={() => this.handleBookmarkOut()} />
    } else {
      bkIcon = <Icon name='bookmark-outline' size={30} color="#4F8EF7" style={{alignSelf: 'flex-end'}} onPress={() => this.handleBookmark()} />
    }
    // const url = route.navigation.getParam('url', 'NO-url');
    // console.log(this.state.url);

    return (
      <NativeBaseProvider>
      <View style={{flex: 1, overflow: 'hidden'}}>
      {bkIcon}
      
      <Modal isOpen={this.state.modal} onClose={this.hideModal}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>북마크 저장하기</Modal.Header>
          <Modal.Body>
          </Modal.Body>
          <Modal.Footer>
            
          </Modal.Footer>
        </Modal.Content>
      </Modal> 
      
        <WebView source={{ uri: this.state.url}}
        style={{ marginTop: 20 }}/>
        
      </View>
      </NativeBaseProvider>
    );
  }
}