import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';

export default class MyWeb extends Component {
  render() {
    this.state = {
        url: this.props.route.params.url,
    };
    // const url = route.navigation.getParam('url', 'NO-url');
    // console.log(this.state.url);
    return (
      <WebView source={{ uri: this.state.url}}
        style={{ marginTop: 20 }}
      />
    );
  }
}