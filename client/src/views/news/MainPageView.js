import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { Fab, Icon } from "native-base";
import { ScrollView, Text, View } from "react-native";
import NewsView from "./NewsView";
// import NewsView from "./News";
import WelcomeCard from "./WelcomeCard";

const MainPageView = () => {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1 }}>
            <WelcomeCard />
            <NewsView />
            <Fab renderInPortal={false} shadow={2} size="sm" onPress={() => navigation.navigate('ChatBot')} icon={<Icon color="white" as={<AntDesign name="wechat" />} size="lg" />} />
        </View>
    )
}

export default MainPageView;