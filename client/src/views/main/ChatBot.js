import React, {useState, useEffect, useCallback} from "react";
import { GiftedChat } from 'react-native-gifted-chat'
import { View, Text, Alert, VStack, HStack, Box, NativeBaseProvider } from "native-base";
import { Dimensions } from 'react-native';
const IP_address = process.env.IP_address
import axios from 'axios';

const {height, width} = Dimensions.get("window")

const ChatScreen = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: '안녕하세요! 질병 유추 챗봇입니다. \n증상을 입력해주시면 증상을 통해 가장 유사한 질병을 유추해드립니다. \n이 기능은 통계를 통한 예측으로 정확한 진단은 병원을 통해 확인하시길 바랍니다.',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/animals',
                },
            },
        ])
    }, [])

    const onSend = useCallback((messages = []) => {
        const query = messages[0].text + '';
        console.log('messages: ', query)
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        axios.post('http://'+IP_address+':5000/chatbotRouter/getAnswer', {
            data: {
                query: query
            }
        }).then((response) => {
            const text = response.data.message + '';
            console.log(response.data);
            setMessages(previousMessages => GiftedChat.append(previousMessages, [
                {
                    _id: Math.round(Math.random() * 1000),
                    text: text,
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/animals',
                    },
                },
            ]))
        }).catch(function (error) {
            console.log(error);
        });
    }, [])
    
    return (
        <View style={{ flex: 1}}>
            <GiftedChat
                    placeholder={'메세지를 입력하세요...'}
                    alwaysShowSend={true}
                    messages={messages}
                    textInputProps={{ keyboardAppearance: 'dark', autoCorrect: false }}
                    onSend={messages => onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                />
            {/* <VStack>
                <Alert w="90%" maxW="400" status="info" colorScheme="info">
                    <VStack space={2} flexShrink={1} w="100%">
                        <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
                            <HStack flexShrink={1} space={2} alignItems="center">
                                <Alert.Icon />
                                <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                                    We are going live in July!
                                </Text>
                            </HStack>
                        </HStack>
                        <Box pl="6" _text={{
                            color: "coolGray.600"
                        }}>
                            We are happy to announce that we are going live on July 28th. Get
                            ready!
                        </Box>
                    </VStack>
                </Alert>
                <GiftedChat
                    placeholder={'메세지를 입력하세요...'}
                    alwaysShowSend={true}
                    messages={messages}
                    textInputProps={{ keyboardAppearance: 'dark', autoCorrect: false }}
                    onSend={messages => onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                />
            </VStack> */}
        </View>
    )
}

export default class extends React.Component {
    render() {
        return (
        <NativeBaseProvider>
            <ChatScreen />
        </NativeBaseProvider>
        );
    }
}