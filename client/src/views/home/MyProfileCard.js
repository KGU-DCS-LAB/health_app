import { StyleSheet, Text, View } from "react-native";

const MyProfileCard = () => {
    return (
        <View style={styles.card}>
            <Text>OOO님 환영합니다.</Text>
        </View>
    )
}

export default MyProfileCard;

const styles = StyleSheet.create({

    card: {
        backgroundColor: '#dcdde1',
        marginVertical: 10,
        borderRadius: 10,
        height: 100,
    },

});