import { Ionicons } from "@expo/vector-icons";
import { Box, Center, Heading, Stack, Text } from "native-base";
const today = new Date();
const WeatherCard = (props) => {
    const today_string = today.format('MM월 dd일 E a/p hh:mm');
    return (
        <>
            <Box>
                <Center w="100%" >
                    {props.state.SKY === '1' && <Ionicons name="sunny-outline" size={50} color="black" />}
                    {props.state.SKY === '3' && <Ionicons name="partly-sunny-outline" size={50} color="black" />}
                    {props.state.SKY === '4' && <Ionicons name="cloudy-outline" size={50} color="black" />}
                    <Text fontSize='lg'>
                        {props.state.T1H}°
                    </Text>
                </Center>
            </Box>

            <Stack space={2}>
                <Heading size="md" ml="-1">
                    <Ionicons name="location-sharp" size={24} color="black" />
                    {props.state.location}
                </Heading>
                <Text fontSize="xs" _light={{
                    color: "violet.500"
                }} _dark={{
                    color: "violet.400"
                }} fontWeight="500" ml="-0.5" mt="-1" >
                    {today_string}
                </Text>
            </Stack>

        </>
    )
}

export default WeatherCard;