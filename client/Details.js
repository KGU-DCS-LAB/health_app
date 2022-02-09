import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Details() {
  return (
    <View style={styles.container}>
      <Text style={styles.assa}>detail</Text>
      <StatusBar style="auto" />
    </View>
  );
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
  }
});
