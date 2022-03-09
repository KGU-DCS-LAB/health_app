import React, { Component, createRef, useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Text, Box, Center, VStack, FormControl, Button, Input, Pressable, IconButton, ScrollView, HStack, Radio, Stack, Icon, NativeBaseProvider, WarningOutlineIcon, Select, InputGroup, CheckIcon, InputRightAddon } from 'native-base';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from '@react-navigation/native';
import { Ionicons, AntDesign } from "@expo/vector-icons";
import axios from 'axios';
import { IP_address } from '@env'

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

    const weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    let d = this;

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


const AddDiseaseComponent = (props) => {
    const navigation = useNavigation();
    const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
    const [input, setInput] = useState('');

    const getDiseases = () => {
        let result = []
        console.log(diseases);
        if(diseases.length > 0){
            return;
        }
        axios.post('http://' + IP_address + ':5000/diseasesRouter/findName',{
            data: {
                keyword: input
            }
        }).then((response) => {
            response.data.forEach((item, idx) => {
                console.log(item);
                result.push(item.질병명);
            });
            setDiesases(result);
        }).catch(function (error) {
            console.log(error);
        })
    }

    const [diseases, setDiesases] = useState([]);
    getDiseases()

    const handleSubmitButton = () => {
        axios.post('http://' + IP_address + ':5000/usersRouter/save', {
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
                    navigation.navigate('Main');
                } else if (response.data.status === 'duplicated') {
                    console.log('이미 존재하는 아이디입니다.');
                    alert('이미 존재하는 아이디 또는 이메일입니다.');
                }
            }).catch(function (error) {
                // 오류발생시 실행
                console.log(error);
            });
    }

    return (
        <Center w="100%">
            <Box safeArea p="2" py="8" w="90%">
                <VStack space={3} mt="5">
                    <InputGroup width="100%">
                        <Input placeholder="Search" variant="filled" width="90%" borderRadius="10" py="1" px="2" borderWidth="0" 
                            value={input} onChange={(value) => setInput(value)}
                            InputLeftElement={<Icon ml="2" size="4" color="gray.400" as={<Ionicons name="ios-search" />} />} />
                        <IconButton colorScheme="indigo" key="outline" variant="outline" w="10%" _icon={{
                            as: AntDesign,
                            name: "search1"
                        }} onPress={getDiseases()} />
                    </InputGroup>
                    <View></View>
                    <ScrollView w="100%" h="70%" _contentContainerStyle={{
                        px: "20px",
                        mb: "4",
                        minW: "72"
                    }}>
                        
                        {/* <VStack space={2}>
                            {diseases.map((item, itemI) => <HStack w="100%" justifyContent="space-between" alignItems="center" key={item.title + itemI.toString()}>
                                <Checkbox isChecked={item.isCompleted} onChange={() => handleStatusChange(itemI)} value={item.title}>
                                    <Text mx="2" strikeThrough={item.isCompleted} _light={{
                                        color: item.isCompleted ? "gray.400" : "coolGray.800"
                                    }} _dark={{
                                        color: item.isCompleted ? "gray.400" : "coolGray.50"
                                    }}>
                                        {item.title}
                                    </Text>
                                </Checkbox>
                                <IconButton size="sm" colorScheme="trueGray" icon={<Icon as={Entypo} name="minus" size="xs" color="trueGray.400" />} onPress={() => handleDelete(itemI)} />
                            </HStack>)}
                        </VStack> */}
                    </ScrollView>
                    <Button mt="2" colorScheme="indigo" onPress={handleSubmitButton}>
                        회원가입
                    </Button>
                </VStack>
            </Box>
        </Center>
    )
}

const SignInComponent = (props) => {
    const [UserId, setUserId] = useState('');
    const [Domain, setDomain] = useState('')
    const [UserPassword, setUserPassword] = useState('');
    const [UserPasswordchk, setUserPasswordchk] = useState('');
    const [UserName, setUserName] = useState('');
    const [UserBirthDay, setUserBirthDay] = useState(new Date().format('yyyy-MM-dd'));
    const [UserGender, setUserGender] = useState('male');
    const [level1, setLevel1] = useState([]);
    const [level2, setLevel2] = useState([]);
    const [level3, setLevel3] = useState([]);

    const idInputRef = createRef();
    const passwordInputRef = createRef();
    const passwordchkInputRef = createRef();
    const nameInputRef = createRef();
    const birthdayputRef = createRef();
    const genderputRef = createRef();

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const getResidences = () => {
        let result2 = [];
        if (level1.length > 0) {
            return { level1: '', level2: '', level3: '' };
        }
        axios.get('http://' + IP_address + ':5000/areasRouter/getByGroupLevel1', {
        })
            .then((response) => {
                response.data.forEach((item, idx) => {
                    result2.push(item._id);
                });
                setLevel1(result2);
            }).catch(function (error) {
                // 오류발생시 실행
                console.log(error);
            });
        return { level1: '', level2: '', level3: '' };
    }

    const [UserResidence, setUserResidence] = useState(getResidences());

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
        // if (!UserId || !Domain) {
        //     alert('아이디를 입력해주세요.');
        //     return;
        // }
        // if (!UserPassword) {
        //     alert('비밀번호를 입력해주세요.');
        //     return;
        // }
        // if (UserPassword !== UserPasswordchk) {
        //     alert('비밀번호가 일치하지 않습니다.');
        //     return;
        // }
        // if (!UserName) {
        //     alert('이름을 입력해주세요.');
        //     return;
        // }
        // if (UserBirthDay === today) {
        //     alert('생년월일을 입력해주세요.');
        //     return;
        // }
        // if (!UserGender) {
        //     alert('성별을 입력해주세요.');
        //     return;
        // }
        // if (!UserResidence) {
        //     alert('거주지 입력해주세요.');
        //     return;
        // }

        props.setShowSignInComponent(false);
        props.setEmail(UserId + '@' + Domain);
        props.setPassword(UserPassword);
        props.setName(UserName);
        props.setBirthDay(UserBirthDay);
        props.setGender(UserGender);
        props.setResidence(UserResidence.level1 + ' ' + UserResidence.level2 + ' ' + UserResidence.level3);
    }

    const changeLevel1 = (item) => {
        setUserResidence((prevState) => ({
            ...prevState,
            level1: item
        }));
        let result2 = [];
        axios.post('http://' + IP_address + ':5000/areasRouter/getByGroupLevel2', {
            data: {
                level: item
            }
        })
            .then((response) => {
                response.data.forEach((item, idx) => {
                    result2.push(item._id);
                });
                setLevel2(result2);
            }).catch(function (error) {
                // 오류발생시 실행
                console.log(error);
            });
    }

    const changeLevel2 = (item) => {
        setUserResidence((prevState) => ({
            ...prevState,
            level2: item
        }));
        let result2 = [];
        axios.post('http://' + IP_address + ':5000/areasRouter/getByGroupLevel3', {
            data: {
                level: item
            }
        })
            .then((response) => {
                response.data.forEach((item, idx) => {
                    result2.push(item._id);
                });
                setLevel3(result2);
                console.log(result2);
            }).catch(function (error) {
                // 오류발생시 실행
                console.log(error);
            });
    }

    return (
        <Center w="100%">
            <Box safeArea p="2" py="8" w="90%">
                <VStack space={3} mt="5">
                    <FormControl>
                        <FormControl.Label>이메일</FormControl.Label>
                        <InputGroup>
                            <Input w={{
                                base: "50%",
                            }} onChangeText={(userId) => setUserId(userId)}
                                ref={idInputRef}
                                returnKeyType="next"
                                blurOnSubmit={false} />
                            <InputRightAddon children={"@"} w={{
                                base: "5%",
                            }} />
                            <Select selectedValue={Domain} accessibilityLabel="Choose Domain" placeholder="Choose Domain" _selectedItem={{
                                bg: "teal.600",
                                endIcon: <CheckIcon size="5" />
                            }} onValueChange={itemValue => setDomain(itemValue)}
                                w={{
                                    base: "49%",
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
                    </FormControl>
                    <FormControl>
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
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>성별</FormControl.Label>
                        <Radio.Group name="genderGroup" defaultValue="male" accessibilityLabel="pick your gneder"
                            onChange={nextValue => { setUserGender(nextValue); }}
                        >
                            <Stack direction={{
                                base: "column",
                                md: "row"
                            }}
                                alignItems="center" space={4} w="100%"
                            >
                                <Radio value="male" my={1} ref={genderputRef}>남자</Radio>
                                <Radio value="female" my={1}>여자</Radio>
                            </Stack>
                        </Radio.Group>
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>거주지</FormControl.Label>
                        {/* <HStack alignItems="center" space={1} w="100%"> */}
                        <Select selectedValue={UserResidence.level1} accessibilityLabel="시/도" placeholder="시/도" _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="5" />
                        }} onValueChange={itemValue => changeLevel1(itemValue)}
                            w={{
                                base: "30%",
                            }}>
                            {level1.map(level => (
                                <Select.Item label={level} value={level} />
                            ))}
                        </Select>
                        <Select selectedValue={UserResidence.level2} accessibilityLabel="Choose Domain" placeholder="Choose Domain" _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="5" />
                        }} onValueChange={itemValue => changeLevel2(itemValue)}
                            w={{
                                base: "30%",
                            }}>
                            {level2.map(level => (
                                <Select.Item label={level} value={level} />
                            ))}
                        </Select>
                        <Select selectedValue={UserResidence.level3} accessibilityLabel="Choose Domain" placeholder="Choose Domain" _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="5" />
                        }} onValueChange={itemValue => setUserResidence((prevState) => ({
                            ...prevState,
                            level3: itemValue
                        }))}
                            w={{
                                base: "30%",
                            }}>
                            {level3.map(level => (
                                <Select.Item label={level} value={level} />
                            ))}
                        </Select>
                        {/* </HStack> */}
                    </FormControl>
                    <Button mt="2" colorScheme="indigo" onPress={handleNextButton}>
                        다음
                    </Button>
                </VStack>
            </Box>
        </Center>
    )
}