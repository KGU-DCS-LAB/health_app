import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login';
import Home from './components/Home';

// const Stack = createStackNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator  initialRouteName='Home'>
        <Stack.Screen 
          name='Home'
          component={Home}
        />

        <Stack.Screen
          name='Login'
          component={Login}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}