import Login from '../../views/main/Login';
import Home from '../../views/main/Home';
import SignIn from '../../views/main/SignIn';
import FindPW from '../../views/main/FindPW';
import Main from '../../views/main/Main';
import ChangePW from '../../views/main/ChangePW';
import NewsDetail from '../../views/main/NewsDetail';
import ChatBot from '../../views/main/ChatBot';
import BookmarkStorage from '../../views/main/BookmarkStorage';
import { createStackNavigator } from '@react-navigation/stack';
import FamilyManagement from '../../views/main/FamilyManagement';

const Stack = createStackNavigator();

const MainRoute = () =>{
    return (
        <Stack.Navigator  initialRouteName='Home' screenOptions={{ headerShown: false }} >
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

            <Stack.Screen
            name='ChangePW'
            component={ChangePW}
            />

            <Stack.Screen
            name='NewsDetail'
            component={NewsDetail}
            />

            <Stack.Screen
            name='ChatBot'
            component={ChatBot}
            />

            <Stack.Screen
            name='BookmarkStorage'
            component={BookmarkStorage}
            />

            <Stack.Screen
            name='FamilyManagement'
            component={FamilyManagement}
            />
        </Stack.Navigator>
    )
}
export default MainRoute;