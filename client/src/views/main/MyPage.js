// import React from "react";
import { View, Text, Alert, VStack, HStack, Box, NativeBaseProvider } from "native-base";

export default function() {
    return (
        <NativeBaseProvider>
            <View>
                <Text>Hello</Text>
            </View>
        </NativeBaseProvider>
    )
}