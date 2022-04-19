import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Modal, Button, NativeBaseProvider, Text, Link, Box, Spacer, HStack } from 'native-base';
import { Alert, FlatList } from 'react-native';
import axios from 'axios';
const IP_address = process.env.IP_address

export default class MyWeb extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: this.props.route.params.url
        }
    }

    render() {
        return (
            <NativeBaseProvider>
                <View style={{ flex: 1, overflow: 'hidden' }}>

                    <WebView source={{ uri: this.state.url }}
                        style={{ marginTop: 20 }} originWhitelist={['https://*']} />

                </View>
            </NativeBaseProvider>
        );
    }
}