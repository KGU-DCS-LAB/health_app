import React, { Component, createRef, useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Text, Box, Center, VStack, FormControl, Button, Input, Pressable, Radio, Stack, Icon, NativeBaseProvider, WarningOutlineIcon, Select, InputGroup, CheckIcon, InputRightAddon } from 'native-base';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import axios from 'axios';

export default function SignIn() {
    const [showSignInComponent, setShowSignInComponent] = useState(true);
    const [UserEmail, setUserEmail] = useState('');
    const [UserPassword, setUserPassword] = useState('');
    const [UserName, setUserName] = useState('');
    const [UserBirthDay, setUserBirthDay] = useState('');
    const [UserGender, setUserGender] = useState('');
    const [UserResidence, setUserResidence] = useState('');

    return (
        <NativeBaseProvider>
            <Center flex={1} px="3">
                {showSignInComponent ? <SignInComponent 
                setShowSignInComponent={setShowSignInComponent}
                setEmail={setUserEmail} 
                setPassword={setUserPassword} setName={setUserName} setBirthDay={setUserBirthDay}
                setGender={setUserGender} setResidence={setUserResidence}
                 /> : null}
                {!showSignInComponent ? <AddDiseaseComponent
                Email={UserEmail} Password={UserPassword} Name={UserName} BirthDay={UserBirthDay}
                Gender={UserGender} Residence={UserResidence}
                 /> : null}
            </Center>
        </NativeBaseProvider>
    );
}

Date.prototype.format = function (f) {
    if (!this.valueOf()) return " ";

    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;

    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function ($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
}

String.prototype.string = function (len) { var s = '', i = 0; while (i++ < len) { s += this; } return s; };
String.prototype.zf = function (len) { return "0".string(len - this.length) + this; };
Number.prototype.zf = function (len) { return this.toString().zf(len); };


function AddDiseaseComponent(props) {
    const navigation = useNavigation();
    const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

    const handleSubmitButton = () => {
        // const baseUrl = 'https://192.168.43.58:5000';
        axios.post('http://172.30.1.36:5000/usersRouter/save', {
            data: {
                user_id: props.Email,
                password: props.Password,
                user_name: props.Name,
                birthday: props.BirthDay,
                gender: props.Gender,
                residence: props.Residence
            }
        })
            .then((response) => {
                if (response.data.status === 'success') {
                    setIsRegistraionSuccess(true)
                    console.log('Registration Successful. Please Login to proceed');
                } else if (response.data.status === 'duplicated') {
                    console.log('이미 존재하는 아이디입니다.');
                    alert('이미 존재하는 아이디 또는 이메일입니다.');
                }
                navigation.navigate('Main');
            }).catch(function (error) {
                // 오류발생시 실행
                console.log(error);
            });
    }

    return (
        <Center w="100%">
            <Box safeArea p="2" py="8" w="90%" maxW="290">
                <VStack space={3} mt="5">
                    <Input placeholder="Search" variant="filled" width="100%" borderRadius="10" py="1" px="2" borderWidth="0" 
                        InputLeftElement={<Icon ml="2" size="4" color="gray.400" as={<Ionicons name="ios-search" />} />} />
                    <View></View> 
                    {/* 질병 리스트 들어옴 */}
                    <Button mt="2" colorScheme="indigo" onPress={handleSubmitButton}>
                        회원가입
                    </Button>
                </VStack>
            </Box>
        </Center>
    )
}

function SignInComponent(props) {
    const [UserId, setUserId] = useState('');
    const [Domain, setDomain] = useState('')
    const [UserPassword, setUserPassword] = useState('');
    const [UserPasswordchk, setUserPasswordchk] = useState('');
    const [UserName, setUserName] = useState('');
    const [UserBirthDay, setUserBirthDay] = useState(new Date().format('yyyy-MM-dd'));
    const [UserGender, setUserGender] = useState('male');
    const [UserResidence, setUserResidence] = useState('');

    const idInputRef = createRef();
    const passwordInputRef = createRef();
    const passwordchkInputRef = createRef();
    const nameInputRef = createRef();
    const birthdayputRef = createRef();
    const genderputRef = createRef();

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    }

    const handleConfirm = (date) => {
        setUserBirthDay(date.format('yyyy-MM-dd'));
        hideDatePicker();
    }

    const handleNextButton = () => {
        const today = new Date().format('yyyy-MM-dd');
        if (!UserId || !Domain) {
            alert('아이디를 입력해주세요.');
            return;
        }
        if (!UserPassword) {
            alert('비밀번호를 입력해주세요.');
            return;
        }
        if (UserPassword !== UserPasswordchk) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        if (!UserName) {
            alert('이름을 입력해주세요.');
            return;
        }
        if (UserBirthDay === today) {
            alert('생년월일을 입력해주세요.');
            return;
        }
        if (!UserGender) {
            alert('성별을 입력해주세요.');
            return;
        }
        if (!UserResidence) {
            alert('거주지 입력해주세요.');
            return;
        }

        props.setShowSignInComponent(false);
        props.setEmail(UserId+'@'+Domain);
        props.setPassword(UserPassword);
        props.setName(UserName);
        props.setBirthDay(UserBirthDay);
        props.setGender(UserBirthDay);
        props.setResidence(UserResidence);
    }

    return (
        <Center w="100%">
            <Box safeArea p="2" py="8" w="90%" maxW="290">
                <VStack space={3} mt="5">
                    <FormControl>
                        <FormControl.Label>이메일</FormControl.Label>
                        <InputGroup>
                            <Input w={{
                                base: "50%",
                                md: "100%"
                            }} onChangeText={(userId) => setUserId(userId)}
                            ref={idInputRef}
                            returnKeyType="next"
                            blurOnSubmit={false} />
                            <InputRightAddon children={"@"} />
                            <Select selectedValue={Domain} accessibilityLabel="Choose Domain" placeholder="Choose Domain" _selectedItem={{
                                bg: "teal.600",
                                endIcon: <CheckIcon size="5" />
                            }}  onValueChange={itemValue => setDomain(itemValue)}
                            w={{
                                base: "48%",
                                md: "100%"
                            }}>
                                <Select.Item label="google.com" value="google.com" />
                                <Select.Item label="naver.com" value="naver.com" />
                                <Select.Item label="daum.net" value="daum.net" />
                            </Select>
                        </InputGroup>
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>비밀번호</FormControl.Label>
                        <Input
                            onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                            ref={passwordInputRef}
                            type="password"
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                passwordchkInputRef.current && passwordchkInputRef.current.focus()
                            }
                            blurOnSubmit={false}
                        />
                    </FormControl>
                    <FormControl isInvalid>
                        <FormControl.Label>비밀번호 확인</FormControl.Label>
                        <Input
                            onChangeText={(UserPasswordchk) => setUserPasswordchk(UserPasswordchk)}
                            ref={passwordchkInputRef}
                            type="password"
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                nameInputRef.current && nameInputRef.current.focus()
                            }
                            blurOnSubmit={false}
                        />
                        {UserPassword !== UserPasswordchk ? (
                            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                비밀번호가 일치하지 않습니다.
                            </FormControl.ErrorMessage>
                        ) : null}
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>이름</FormControl.Label>
                        <Input
                            onChangeText={(UserName) => setUserName(UserName)}
                            ref={nameInputRef}
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                birthdayputRef.current && birthdayputRef.current.focus()
                            }
                            blurOnSubmit={false}
                        />
                        <Pressable onPress={showDatePicker}>
                            <FormControl.Label>생년월일</FormControl.Label>
                            <Input
                                ref={birthdayputRef}
                                value={UserBirthDay}
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    genderputRef.current && genderputRef.current.focus()
                                }
                                editable={false}
                                blurOnSubmit={false}
                            />
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                headerTextIOS={'생년월일'}
                                mode="date"
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                            />
                        </Pressable>
                        <FormControl.Label>성별</FormControl.Label>
                        <Radio.Group name="genderGroup" defaultValue="male" accessibilityLabel="pick your gneder"
                            onChangeText={(UserGender) => setUserGender(UserGender)}
                        >
                            <Stack direction={{
                                base: "column",
                                md: "row"
                            }}
                                alignItems="center" space={4} w="75%" maxW="300px"
                            >
                                <Radio value="male" my={1} ref={genderputRef}>남자</Radio>
                                <Radio value="female" my={1}>여자</Radio>
                            </Stack>
                        </Radio.Group>
                        <FormControl.Label>거주지</FormControl.Label>
                        <Input
                            onChangeText={(UserResidence) => setUserResidence(UserResidence)}
                            returnKeyType="next"
                            blurOnSubmit={false}
                        />
                    </FormControl>
                    <Button mt="2" colorScheme="indigo" onPress={handleNextButton}>
                        다음
                    </Button>
                </VStack>
            </Box>
        </Center>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        // backgroundColor: 'white',
        alignItems: "center"
    },
    titleArea: {
        flex: 1,
        justifyContent: 'center',
        fontSize: 30
    },
    formArea: {
        // flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        marginBottom: 10,
        fontSize: 16,
        // color: '#000000',
        height: 50,
        width: 300,
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 12,
        padding: 10
    },
    btnArea: {
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 12,
        padding: 10
    }
});