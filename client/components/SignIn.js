import React, { Component, createRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { RadioButton } from "react-native-paper";

export default function Login() {
    const [UserId, setUserId] = useState('');
    const [UserPassword, setUserPassword] = useState('');
    const [UserPasswordchk, setUserPasswordchk] = useState('');
    const [UserName, setUserName] = useState('');
    const [UserBirthDay, setUserBirthDay] = useState(new Date());
    const [UserGender, setUserGender] = useState('male');

    const idInputRef = createRef();
    const passwordInputRef = createRef();
    const passwordchkInputRef = createRef();
    const nameInputRef = createRef();

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    }

    const handleConfirm = (date) => {
        setUserBirthDay(date);
        hideDatePicker();
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleArea}>
                <Text>SignIn Page</Text>
            </View>
            <View style={styles.formArea}>
                <TextInput
                    style={styles.textFormTop}
                    placeholder={'아이디(5자 이상, 영문, 숫자)'}
                    onChangeText={(UserId) => setUserId(UserId)}
                    ref={idInputRef}
                    returnKeyType="next"
                    onSubmitEditing={() =>
                        passwordInputRef.current && passwordInputRef.current.focus()
                    }
                    blurOnSubmit={false}
                />
                <TextInput
                    style={styles.textFormMiddle}
                    secureTextEntry={true}
                    placeholder={'비밀번호(8자 이상)'}
                    onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                    ref={passwordInputRef}
                    returnKeyType="next"
                    onSubmitEditing={() =>
                        passwordchkInputRef.current && passwordchkInputRef.current.focus()
                    }
                    blurOnSubmit={false}
                />
                <TextInput
                    style={styles.textFormBottom}
                    secureTextEntry={true}
                    placeholder={'비밀번호 확인'}
                    onChangeText={(UserPasswordchk) =>
                        setUserPasswordchk(UserPasswordchk)
                    }
                    ref={passwordchkInputRef}
                    returnKeyType="next"
                    onSubmitEditing={() =>
                        nameInputRef.current && nameInputRef.current.focus()
                    }
                    blurOnSubmit={false}
                />
            </View>
            <View style={{ flex: 0.5, justifyContent: 'center' }}>
                {UserPassword !== UserPasswordchk ? (
                    <Text style={styles.TextValidation}>
                        비밀번호가 일치하지 않습니다.
                    </Text>
                ) : null}
            </View>
            <View>
                <TextInput
                    style={styles.textFormTop}
                    placeholder={'이름'}
                    onChangeText={(UserName) => setUserName(UserName)}
                    ref={nameInputRef}
                    returnKeyType="next"
                    onSubmitEditing={() =>
                        birthDayInputRef.current && birthDayInputRef.current.focus()
                    }
                    blurOnSubmit={false}
                />
                <TouchableOpacity onPress={showDatePicker}>
                    <TextInput 
                        pointerEvents="none"
                        style={styles.textFormTop}
                        placeholder={'생년월일'}
                        editable={false}
                        value={UserBirthDay}
                        blurOnSubmit={false}
                    />
                    <DateTimePickerModal 
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                </TouchableOpacity>
                <View>
                    <RadioButton 
                        value="남자"
                        status={UserGender === 'male' ? 'checked' : 'unchecked'}
                        onPress={() => setUserGender('male')}
                    >남자</RadioButton>
                    <RadioButton 
                        value="여자"
                        status={UserGender === 'female' ? 'checked' : 'unchecked'}
                        onPress={() => setUserGender('female')}
                    />
                </View>
                <TextInput
                    style={styles.textFormTop}
                    placeholder={'거주지'}
                    onChangeText={(UserResidence) => setUserResidence(UserResidence)}
                    blurOnSubmit={false}
                />
            </View>
            <View style={{ flex: 0.75 }}>
                <View style={styles.btnArea}>
                     {/* onPress={handleSubmitButton}> */}
                    <TouchableOpacity style={styles.btn}>
                        <Text style={{ color: 'white' }}>회원가입</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flex: 3 }} />
        </View>
    );
}

const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    titleArea: {
        flex: 0.5,
        justifyContent: 'center',
        // fontSize: '10px'
    },
    formArea: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        fontSize: 16,
        color: '#000000',
        height: 50, 
        width: 300, 
        borderColor: '#000000', 
        borderWidth: 1, 
        borderRadius: 12,
        padding: 10
    },
})