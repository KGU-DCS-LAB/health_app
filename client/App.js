

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.assa}>헬스케어</Text>
      <Button style={styles.startBtn} title="시작하기" 
        onPress={() => alert('시작')}
      />
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
  },
  startBtn:{
    borderBottomColor: '#f00'
  }
});
