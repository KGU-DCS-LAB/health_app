// import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Alert, VStack, HStack, Box, NativeBaseProvider } from "native-base";
import { AsyncStorage, TouchableOpacity } from "react-native";

export default function() {
    const navigation = useNavigation();
    return (
        <NativeBaseProvider>
            <View>
                <Text>Hello</Text>
                <TouchableOpacity
                    onPress={
                        () => {AsyncStorage.clear(); navigation.replace('Home')}
                    }
                >
                    <Text>로그아웃</Text>
                </TouchableOpacity>
            </View>
        </NativeBaseProvider>
    )
}