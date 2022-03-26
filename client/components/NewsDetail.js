import React, { Component, useState } from 'react';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { Modal, Text, TouchableHighlight, View, Button} from 'react-native'


export default class MyWeb extends Component {
  render() {
    this.state = {
        url: this.props.route.params.url,
    };
    
    // const url = route.navigation.getParam('url', 'NO-url');
    // console.log(this.state.url);
    return (
      <View style={{flex: 1, overflow: 'hidden'}}>
      <Button title="뉴스 저장하기" onPress = {() => {this.toggleModal(true)}}/>

        <WebView source={{ uri: this.state.url}}
        style={{ marginTop: 20 }}/>
        
      </View>
      
    );
  }
}