import React, { useState, createRef, useCallback, useRef } from "react";
import { View, Heading, Text, Box, Center, VStack, HStack, FormControl, Link, Button, NativeBaseProvider, Input, Select, InputGroup, CheckIcon, InputRightAddon, AspectRatio, Image, Stack } from 'native-base';
import Carousel from 'react-native-snap-carousel';
import WeatherCard from "../../components/main/WeatherCard";
import HealthCard from "../../components/main/HealthCard";
import { StyleSheet } from "react-native";

const WelcomeCard = (props) => {

    const exampleItems = [
        { card: <WeatherCard /> },
        { card: <HealthCard /> },
    ]

    const renderItem = useCallback(({ item, index }) => (
        <View style={styles.card}>
            {item.card}
        </View>
    ), []);


    const CustomCarousel = () => {
        const [activeIndex, setActiveIndex] = useState(0);
        const [carouselItems, setCarouselItems] = useState(exampleItems);
        const ref = useRef(null);
        return (
            <>
                {/* <Center w="100%"> */}
                    {/* <Box > */}
                        <Carousel
                            layout="default"
                            ref={ref}
                            data={carouselItems}
                            sliderWidth={350}
                            itemWidth={350}
                            renderItem={renderItem}
                            onSnapToItem={(index) => setActiveIndex(index)}
                        />
                    {/* </Box> */}
                {/* </Center> */}
            </>
        )
    }

    return (
        <Box alignItems="center">
            <CustomCarousel />
        </Box>
    );
}

export default class extends React.Component {
    render() {
        return <WelcomeCard state={this.state} />
    }
}

const styles = StyleSheet.create({

    card: {
        backgroundColor: '#dcdde1',
        marginVertical: 10,
        borderRadius: 10,
        height:200,
    },

});