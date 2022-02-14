import React, { Component, createRef, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Colors, RadioButton } from "react-native-paper";

Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";
 
    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;
     
    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
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
};
 
String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};

export default function Login() {
    const [UserId, setUserId] = useState('');
    const [UserPassword, setUserPassword] = useState('');
    const [UserPasswordchk, setUserPasswordchk] = useState('');
    const [UserName, setUserName] = useState('');
    const [UserBirthDay, setUserBirthDay] = useState(new Date());
    const [UserGender, setUserGender] = useState('male');
    const [UserResidence, setUserResidence] = useState('');
    const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

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
        setUserBirthDay(date.format('yyyy-MM-dd'));
        hideDatePicker();
    }

    const handleSubmitButton = () => {
        const today = new Date().format('yyyy-MM-dd');
        if(!UserId) {
            alert('아이드를 입력해주세요.');
            return;
        }
        if(!UserPassword) {
            alert('비밀번호를 입력해주세요.');
            return;
        }
        if(UserPassword !== UserPasswordchk) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        if(!UserName) {
            alert('이름을 입력해주세요.');
            return;
        }
        if(UserBirthDay === today) {
            alert('생년월일을 입력해주세요.');
            return;
        }
        if(!UserGender) {
            alert('성별을 입력해주세요.');
            return;
        }
        if(!UserResidence) {
            alert('거주지 입력해주세요.');
            return;
        }

        const dataToSend = {
            user_id: UserId,
            password: UserPassword,
            user_name: UserName,
            birthday: UserBirthDay,
            gender: UserGender,
            residence: UserResidence
        };
        
        let formBody = [];

        for (let key in dataToSend) {
            const encodedKey = encodeURIComponent(key);
            const encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');

        fetch('http://127.0.0.1:5000/usersRouter/find', {
            method: 'POST',
            headers: {
                //Header Defination
                // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                Accept: 'application/json',
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                'user_id': UserId,
                'password': UserPassword,
                'user_name': UserName,
                'birthday': UserBirthDay,
                'gender': UserGender,
                'residence': UserResidence
            }),
            credentials: 'include',
        })
        .then((response) => {response.json(); console.log('1', response);})
        .then((responseJson) => {
            //Hide Loader
            // setLoading(false);
            // setErrortext2('');
            console.log(responseJson.status);
            // If server response message same as Data Matched
            // if (responseJson.status === 'success') {
            //     setIsRegistraionSuccess(true);
            //     console.log('Registration Successful. Please Login to proceed');
            // } else if (responseJson.status === 'duplicate') {
            //     // setErrortext2('이미 존재하는 아이디입니다.');
            //     console.log('이미 존재하는 아이디입니다.');
            // }
            console.log('2')
        })
        .catch((error) => {
            //Hide Loader
            // setLoading(false);
            console.error(error);
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleArea}>
                <Text style={{ fontSize: 50 }}>SignIn Page</Text>
            </View>
            <View style={styles.formArea}>
                <TextInput
                    style={styles.textInput}
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
                    style={styles.textInput}
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
                    style={styles.textInput}
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
            <View style={{ flex: 0.5, justifyContent: 'center', marginBottom: 10  }}>
                {UserPassword !== UserPasswordchk ? (
                    <Text style={styles.TextValidation, {color: Colors.red600}}>
                        비밀번호가 일치하지 않습니다.
                    </Text>
                ) : null}
            </View>
            <View style={styles.formArea}>
                <TextInput
                    style={styles.textInput}
                    placeholder={'이름'}
                    onChangeText={(UserName) => setUserName(UserName)}
                    ref={nameInputRef}
                    returnKeyType="next"
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
                        underlineColorAndroid="transparent"
                    />
                    <DateTimePickerModal 
                        isVisible={isDatePickerVisible}
                        headerTextIOS={'생년월일'}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                </TouchableOpacity>
                <RadioButton.Group 
                    onValueChange={newValue => setUserGender(newValue)} 
                    value={UserGender}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <RadioButton 
                            value="male"
                        />
                        <Text>남자</Text>
                        <RadioButton 
                            value="female"
                        />
                        <Text>여자</Text>
                    </View>
                </RadioButton.Group>
                <TextInput
                    style={styles.textInput}
                    placeholder={'거주지'}
                    onChangeText={(UserResidence) => setUserResidence(UserResidence)}
                    blurOnSubmit={false}
                />
            </View>
            <View style={{ flex: 0.75 }}>
                <View style={styles.btnArea}>
                     {/* onPress={handleSubmitButton}> */}
                    <TouchableOpacity style={styles.btn}  onPress={handleSubmitButton}>
                        <Text style={{ color: 'black' }}>회원가입</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
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
        // flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        marginBottom:  10,
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
})