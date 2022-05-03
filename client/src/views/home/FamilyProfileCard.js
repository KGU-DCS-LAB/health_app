import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Box, HStack } from "native-base";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const FamilyProfileCard = () => {
    return (
        <View style={styles.cardContainer}>
            {/* 나중에 map 함수로 치환해야 할 듯 */}
            <TouchableOpacity
                onPress={() => console.log('눌렸다')}
            >
                <View style={styles.card}>
                    <Text>가족이름</Text>
                </View>
            </TouchableOpacity >
            <TouchableOpacity
                onPress={() => console.log('눌렸다')}
            >
                <View style={styles.card}>
                    <Text>가족이름</Text>
                </View>
            </TouchableOpacity >
        </View>
    )
}

export default FamilyProfileCard;

const styles = StyleSheet.create({
    cardContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    card: {
        backgroundColor: '#dcdde1',
        marginVertical: 10,
        borderRadius: 10,
        height: 100,
        width: 170,
    },

});