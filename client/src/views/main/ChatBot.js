import React, {useState, useEffect, useCallback} from "react";
import { GiftedChat } from 'react-native-gifted-chat'
import { View, Text, Alert, VStack, HStack, Box, NativeBaseProvider } from "native-base";
const IP_address = process.env.IP_address
import axios from 'axios';

const ChatScreen = () => {
    const [messages, setMessages] = useState([]);
    const [symptoms, setSymptoms] = useState([]);
    const [replies, setReplies] = useState([]);

    const getSymptoms = () => {
        let result = [];
        axios.get('http://' + IP_address + ':5000/symptomsRouter/find', {
            }).then((response) => {
                response.data.map((item, idx) => {
                    const symptom = {
                        title: item.body_part,
                        value: idx
                    }
                    result.push(symptom);
                });
                setReplies(result);
            }).catch(function (error) {
                console.log(error);
            });
    }

    const getDetail = (title) => {
        let result = [];
        axios.post('http://' + IP_address + ':5000/symptomsRouter/findOne', {
                data : {bodyPart: title}
            }).then((response) => {
                response.data.symptoms.map((item, idx) => {
                    const symptom = {
                        title: item,
                        value: idx
                    }
                    result.push(symptom);
                });
                setSymptoms(result);
            }).catch(function (error) {
                console.log(error);
            });
        // if(symptoms.find(x => x.body_part === title)){
        //     console.log(x);
        // }
    }

    useEffect(() => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, 
                [{
                    _id: Math.round(Math.random() * 1000),
                    text: '증상을 선택헤주세요.',
                    createdAt: new Date(),
                    quickReplies: {
                        type: 'radio', // or 'checkbox',
                        keepIt: false,
                        values: symptoms,
                    },
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/animals',
                    },
                }]
            )
        );
    }, [symptoms]);

    useEffect(() => {
        let msg = {
            _id: Math.round(Math.random() * 1000),
            text: '증상을 선택해주세요.',
            createdAt: new Date(),
            user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/animals',
            }
        }
        msg.quickReplies = {
            type: 'radio', // or 'checkbox',
            keepIt: true,
            values: replies,
        }
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, [msg])
        );
    },[replies]);

    useEffect(() => {
        setMessages([
            {
                _id: 2,
                text: '증상 입력 방법을 선택하세요.',
                createdAt: new Date(),
                quickReplies: {
                    type: 'radio', // or 'checkbox',
                    keepIt: true,
                    values: [
                        {
                            title: '키보드로 입력',
                            value: 'input',
                        },
                        {
                            title: '버튼으로 선택',
                            value: 'button',
                        }
                    ],
                },
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/animals',
                },
            },
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
        axios.post('http://' + IP_address + ':5000/chatbotRouter/getAnswer', {
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


    onQuickReply = useCallback((quickReply) => {
        let message = quickReply[0].value;

        let msg = {
            _id: Math.round(Math.random() * 1000),
            text: message,
            createdAt: new Date(),
            user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/animals',
            }
        }
        if (quickReply[0].value == "input") {
            msg.text = '증상을 입력해주세요.'
            setMessages(previousMessages => 
                GiftedChat.append(previousMessages, [msg])
            );
        } else if (quickReply[0].value == "button") {
            getSymptoms();
        } else {
            console.log("1");
            getDetail(quickReply[0].title);
        }
    }, [])

    return (
        <View style={{ flex: 1}}>
            <GiftedChat
                    placeholder={'메세지를 입력하세요...'}
                    alwaysShowSend={true}
                    messages={messages}
                    textInputProps={{ keyboardAppearance: 'dark', autoCorrect: false }}
                    onSend={messages => onSend(messages)}
                    onQuickReply={quickReply => onQuickReply(quickReply)}
                    user={{
                        _id: 1,
                    }}
                />
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