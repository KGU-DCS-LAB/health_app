import Login from '../../views/user/Login';
import Home from '../../views/main/Home';
import SignIn from '../../views/user/SignIn';
import FindPW from '../../views/main/FindPW';
import Main from '../../views/main/Main';
import ChangePW from '../../views/main/ChangePW';
import NewsDetail from '../../views/news/NewsDetail';
import ChatBot from '../../views/main/ChatBot';
import BookmarkStorage from '../../views/main/BookmarkStorage';
import FamilyManagement from '../../views/main/FamilyManagement';
import { createStackNavigator } from '@react-navigation/stack';
import DiseaseDetail from '../../views/main/DiseaseDetail'
import NewsView from '../../views/news/NewsView';
// import NewsList from '../../views/news/NewsList'
import NewsRoute from '../news/NewsRoute'

const Stack = createStackNavigator();

const NewsScreen = ({navigation}) => {
    return (
        <NewsRoute navigation={navigation}/>
    )
}

const MainRoute = () => {
    return (
        <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }} >
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
                name='DiseaseDetail'
                component={DiseaseDetail}
            />

            <Stack.Screen
                name='BookmarkStorage'
                component={BookmarkStorage}
            />

            <Stack.Screen
                name='FamilyManagement'
                component={FamilyManagement}
            />

            {/* <Stack.Screen
                name='NewsList'
                component={NewsList}
            /> */}

            <Stack.Screen
                name='NewsView'
                component={NewsView}
            />

            <Stack.Screen
                name="News"
                component={NewsScreen}
                
            />
        </Stack.Navigator>
    )
}
export default MainRoute;