import React, {useState, useEffect, useCallback} from "react";
import { GiftedChat } from 'react-native-gifted-chat'
import { View, Text, Alert, VStack, HStack, Box, NativeBaseProvider } from "native-base";
const IP_address = process.env.IP_address
// import { IP_address } from '@env'
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";

const ChatScreen = () => {
    const navigation = useNavigation();
    const [messages, setMessages] = useState([]);
    const [selectedSymptom, setSelectedSymptom] = useState([]);
    const [symptoms, setSymptoms] = useState([]);
    const [bodyPart, setBodypart] = useState([]);
    const [isTextInput, setIsTextInput] = useState(true);
    const [diseases, setDiseases] = useState([]);

    const getSymptoms = () => {
        console.log(IP_address);
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
                setBodypart(result);
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
                        contentType: "symptom",
                        title: item,
                        value: idx
                    }
                    result.push(symptom);
                });
                setSymptoms(result);
            }).catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        let result = [];
        if(selectedSymptom.length === 0){
            return;
        }
        axios.post('http://' + IP_address + ':5000/diseasesRouter/findBySymptoms', {
            data: { symptoms: selectedSymptom }
        }).then((response) => {
            const size = response.data[0].usingAnd.length;
            // console.log(size);
            if(size !== 0){
                response.data[0].usingAnd.map((item, idx) => {
                    const disease = {
                        contentType: "disease",
                        title: item.?????????,
                        value: item.??????
                    }
                    result.push(disease);
                });
                setDiseases(result);
            } else {
                response.data[1].usingOr.map((item, idx) => {
                    const disease = {
                        contentType: "disease",
                        title: item.?????????,
                        value: item.??????
                    }
                    result.push(disease);
                });
                setDiseases(result);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }, [selectedSymptom])

    useEffect(() => {
        if (!diseases){
            setMessages(previousMessages =>
                GiftedChat.append(previousMessages, 
                    [{
                        _id: Math.round(Math.random() * 1000),
                        text: '???????????? ????????? ????????????.',
                        createdAt: new Date(),
                        user: {
                            _id: 2,
                            name: 'React Native',
                            avatar: 'https://placeimg.com/140/140/animals',
                        },
                    }]
                )
            );
        } else {
            let result = [];
            // diseases.map((item, idx) => {
            //     console.log(item.title);
            //     const symptom = {
            //         contentType: "disease",
            //         title: item.title,
            //         value: item.value
            //     }
            //     result.push(symptom);
            // });
            setMessages(previousMessages =>
                GiftedChat.append(previousMessages, 
                    [{
                        _id: Math.round(Math.random() * 1000),
                        text: '???????????? ????????? ????????? ????????????. ?????? ????????? ???????????? ?????? ????????? ??????????????????.',
                        createdAt: new Date(),
                        quickReplies: {
                            type: 'radio', 
                            keepIt: true,
                            values: diseases,
                        },
                        user: {
                            _id: 2,
                            name: 'React Native',
                            avatar: 'https://placeimg.com/140/140/animals',
                        },
                    }]
                )
            );
        }
    }, [diseases])


    useEffect(() => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, 
                [{
                    _id: Math.round(Math.random() * 1000),
                    text: '????????? ??????????????????.',
                    createdAt: new Date(),
                    quickReplies: {
                        type: 'checkbox', 
                        keepIt: true,
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
            text: '?????? ????????? ??????????????????.',
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
            values: bodyPart,
        }
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, [msg])
        );
    },[bodyPart]);

    useEffect(() => {
        setMessages([
            {
                _id: 2,
                text: '?????? ?????? ????????? ???????????????.',
                createdAt: new Date(),
                quickReplies: {
                    type: 'radio', // or 'checkbox',
                    keepIt: true,
                    values: [
                        {
                            title: '???????????? ??????',
                            value: 'input',
                        },
                        {
                            title: '???????????? ??????',
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
                text: '???????????????! ?????? ?????? ???????????????. \n????????? ?????????????????? ????????? ?????? ?????? ????????? ????????? ?????????????????????. \n??? ????????? ????????? ?????? ???????????? ????????? ????????? ????????? ?????? ??????????????? ????????????.',
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
            // console.log(response.data);
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
        // console.log(quickReply);
        if (quickReply[0].contentType === "symptom") {
            let result = [];
            quickReply.map((item, idx) => {
                const symptom = item.title;
                result.push(symptom);
            });
            setSelectedSymptom(result);
        }else if (quickReply[0].value == "input") {
            setIsTextInput(true);
            msg.text = '????????? ??????????????????.'
            setMessages(previousMessages => 
                GiftedChat.append(previousMessages, [msg])
            );
        } else if (quickReply[0].value == "button") {
            console.log("button");
            console.log(IP_address);
            setIsTextInput(false);
            getSymptoms();
        } else if (quickReply[0].contentType === "disease"){
            navigation.navigate('NewsDetail', {
                url: quickReply[0].value
              })
        } else {
            getDetail(quickReply[0].title);
        }
    }, [])

    return (
        <View style={{ flex: 1}}>
            <GiftedChat
                    placeholder={'???????????? ???????????????...'}
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