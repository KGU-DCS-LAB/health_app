import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';


export default class Home extends Component {
    render() {
      return(
        <View style={styles.container}>
          <Text style={styles.assa}>헬스케어</Text>
          <Button style={styles.startBtn} title="시작하기" 
            onPress={() => this.goLoginScreen()}
          />
          <StatusBar style="auto" />
        </View>
      );
  
      
    }
  
    goLoginScreen() {
      this.props.navigation.navigate('Login');
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    assa:{
      color: '#f00',
      fontSize: 20
    },
    startBtn:{
      borderBottomColor: '#f00'
    }
  });
  