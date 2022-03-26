import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';


export default class MyWeb extends Component {
  constructor(props){
    super(props)
    this.handleBookmark= this.handleBookmark.bind(this);
    this.handleBookmarkOut = this.handleBookmarkOut.bind(this);
  this.state={
    url: this.props.route.params.url,
    bookmark: 'bookmark-outline'
   }
  }

  handleBookmark(){
    this.setState({
      bookmark : 'bookmark'
    })
  }

  handleBookmarkOut(){
    this.setState({
      bookmark : 'bookmark-outline'
    })
  }

  render() {
    const isBookmarked = this.state.bookmark;
    let bkIcon;
    if (isBookmarked == 'bookmark-outline') {
      bkIcon = <Icon name='bookmark' size={30} color="#4F8EF7" style={{alignSelf: 'flex-end'}} onPress={() => this.handleBookmark()} />
    } else {
      bkIcon = <Icon name='bookmark-outline' size={30} color="#4F8EF7" style={{alignSelf: 'flex-end'}} onPress={() => this.handleBookmarkOut()} />
    }
    // const url = route.navigation.getParam('url', 'NO-url');
    // console.log(this.state.url);

    return (
      <View style={{flex: 1, overflow: 'hidden'}}>
      {bkIcon}
        <WebView source={{ uri: this.state.url}}
        style={{ marginTop: 20 }}/>
        
      </View>
      
    );
  }
}