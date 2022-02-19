import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login';
import Home from './components/Home';
import SignIn from './components/SignIn';
import FindPW from './components/FindPW';
import Main from './components/Main';

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
          name='SignIn'
          component={SignIn}
        />

        <Stack.Screen
          name='Login'
          component={Login}
        />

        <Stack.Screen
          name='FindPW'
          component={FindPW}
        />

        <Stack.Screen
          name='Main'
          component={Main}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}