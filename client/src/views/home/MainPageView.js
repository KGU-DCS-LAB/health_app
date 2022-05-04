import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { Box, Fab, Icon } from "native-base";
import { ScrollView, Text, View } from "react-native";
import NewsView from "../news/NewsView";
import ShortNewsCard from "../news/ShortNewsCard";
// import MyProfileCard from "../news/MyProfileCard";
// import NewsView from "./News";
// import WelcomeCard from "../news/WelcomeCard";
import FamilyProfileCard from "./FamilyProfileCard";
import MyProfileCard from "./MyProfileCard";
import WelcomeCard from "./WelcomeCard";

const MainPageView = () => {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <MyProfileCard />
                <WelcomeCard />
                <ShortNewsCard />
                {/* 질병관련소식 카드가 있으면 좋을듯 함 */}
                <FamilyProfileCard />
            </ScrollView>
            <Fab renderInPortal={false} shadow={2} size="sm" onPress={() => navigation.navigate('ChatBot')} icon={<Icon color="white" as={<AntDesign name="wechat" />} size="lg" />} />
        </View>
    )
}

export default MainPageView;