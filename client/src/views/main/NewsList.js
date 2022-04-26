// import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Alert, VStack, HStack, Box, NativeBaseProvider } from "native-base";

export default function NewsDetail() {
    const navigation = useNavigation();
    return (
        <NativeBaseProvider>
            <View>
                <Text>Hello</Text>
            </View>
        </NativeBaseProvider>
    )
}