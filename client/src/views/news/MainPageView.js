import { AntDesign } from "@expo/vector-icons";
import { Fab, Icon } from "native-base";
import { Text, View } from "react-native";
import NewsView from "./NewsView";
// import NewsView from "./News";
import WelcomeCard from "./WelcomeCard";

const MainPageView = () => {
    return (
        <View>
            <WelcomeCard/>
            <NewsView/>
            {/* <View style={{ flex: 0.6 }}>
                <NewsComponent />
            </View> */}
            {/* <Fab renderInPortal={false} shadow={2} size="sm" onPress={() => navigation.navigate('ChatBot')} icon={<Icon color="white" as={<AntDesign name="wechat" />} size="lg" />} /> */}
        </View>
    )
}

export default MainPageView;