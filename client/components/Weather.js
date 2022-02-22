import React, { useState, createRef } from "react";
import { View, Heading, Text, Box, Center, VStack, HStack, FormControl, Link, Button, NativeBaseProvider, Input, Select, InputGroup, CheckIcon, InputRightAddon, AspectRatio, Image, Stack } from 'native-base';
import { Alert } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import * as Location from "expo-location";
import { weatherAPI_KEY, kakaoAPI_KEY } from '@env'

Date.prototype.format = function (f) {
    if (!this.valueOf()) return " ";

    const weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    let d = this;
    let h;

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

const today = new Date();

const WeatherComponent = (props) => {
    const today_string = today.format('MM월 dd일 E a/p hh:mm');

    return <Center w="100%">
        <Box safeArea p="2" py="8" w="95%">
            <Box w="100%" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                borderColor: "coolGray.600",
                backgroundColor: "gray.700"
            }} _web={{
                shadow: 2,
                borderWidth: 0
            }} _light={{
                backgroundColor: "gray.50"
            }}>
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
                <Stack p="4" space={3}>
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
                    <Text fontWeight="400">
                        Bengaluru (also called Bangalore) is the center of India's high-tech
                        industry. The city is also known for its parks and nightlife.
                    </Text>
                    <HStack alignItems="center" space={4} justifyContent="space-between">
                        <HStack alignItems="center">
                            <Text color="coolGray.600" _dark={{
                                color: "warmGray.200"
                            }} fontWeight="400">
                                6 mins ago
                            </Text>
                        </HStack>
                    </HStack>
                </Stack>
            </Box>
        </Box>
    </Center>;
}

export default class extends React.Component {
    state = {
        latitude: '',
        longitude: '',
        x: '',
        y: '',
        location: '',
        SKY: '',
        T1H: '',
        PTY: ''
    }

    map = {
        Re: 6371.00877, // 지도반경
        grid: 5.0, // 격자간격 (km)
        slat1: 30.0, // 표준위도 1
        slat2: 60.0, // 표준위도 2
        olon: 126.0, // 기준점 경도
        olat: 38.0, // 기준점 위도
        xo: 210 / 5.0, // 기준점 X좌표
        yo: 675 / 5.0, // 기준점 Y좌표
        first: 0,
    }

    getLocation = async () => {
        try {
            // 위치정보 제공 동의
            const response = await Location.requestForegroundPermissionsAsync();

            const { coords } = await Location.getCurrentPositionAsync();

            this.setState({ latitude: coords.latitude, longitude: coords.longitude });
            this.getLamc();
            this.getInfo();
            this.getWeather();
        } catch (e) {
            Alert.alert("위치정보를 가져오지 못했습니다.");
        }
    }

    // 위도 경도로 행정구역 정보 얻기
    getInfo = () => {
        const API_KEY = "KakaoAK " + kakaoAPI_KEY;
        const url = "https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?input_coord=WGS84&output_coord=WGS84&x=" + this.state.longitude + "&y=" + this.state.latitude;

        axios.get(url, {
            headers: {
                Authorization: API_KEY
            }
        })
            .then((response) => {
                // console.log(response.data);
                // console.log(response.data.documents[1].address_name);
                this.setState({ location: response.data.documents[1].address_name })
            }).catch(function (error) {
                // 오류발생시 실행
                console.log(error);
            });
    }

    // 위도 경도로 x,y 좌표값 구하기
    getLamc = () => {
        let PI, DEGRAD, RADDEG;
        let re, olon, olat, sn, sf, ro;
        let slat1, slat2, alon, alat, xn, yn, ra, theta;

        if (this.map.first == 0) {
            PI = Math.asin(1.0) * 2.0;
            DEGRAD = PI / 180.0;
            RADDEG = 180.0 / PI;

            re = this.map.Re / this.map.grid;
            slat1 = this.map.slat1 * DEGRAD;
            slat2 = this.map.slat2 * DEGRAD;
            olon = this.map.olon * DEGRAD;
            olat = this.map.olat * DEGRAD;

            sn = Math.tan(PI * 0.25 + slat2 * 0.5) / Math.tan(PI * 0.25 + slat1 * 0.5);
            sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
            sf = Math.tan(PI * 0.25 + slat1 * 0.5);
            sf = Math.pow(sf, sn) * Math.cos(slat1) / sn;
            ro = Math.tan(PI * 0.25 + olat * 0.5);
            ro = re * sf / Math.pow(ro, sn);

            ra = Math.tan(PI * 0.25 + (this.state.latitude) * DEGRAD * 0.5);
            ra = re * sf / Math.pow(ra, sn);
            theta = (this.state.longitude) * DEGRAD - olon;
            if (theta > PI) theta -= 2.0 * PI;
            if (theta < -PI) theta += 2.0 * PI;
            theta *= sn;

            this.setState({ x: parseInt((ra * Math.sin(theta)) + this.map.xo + 1.5), y: parseInt((ro - ra * Math.cos(theta)) + this.map.yo + 1.5) })
        }
    }

    getWeather = () => {
        const base_date = today.format('yyyyMMdd');
        const hour = today.format('HH');
        const mins = today.format('mm');
        let base_time = today.format('HHmm');
        if(parseInt(mins) < 30){
            base_time = (parseInt(hour)-1) + '59';
        }
        const sky_url = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=" + weatherAPI_KEY + "&pageNo=1&numOfRows=1000&dataType=JSON&base_date=" + base_date + "&base_time=" + base_time + "&nx=" + this.state.x + "&ny=" + this.state.y;
        const temp_url = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey="+weatherAPI_KEY+"&pageNo=1&numOfRows=1000&dataType=JSON&base_date=" + base_date + "&base_time=" + base_time + "&nx=" + this.state.x + "&ny=" + this.state.y;

        axios.get(sky_url)
            .then((response) => {
                const value = response.data.response.body.items.item[18];
                this.setState({SKY: value.fcstValue})
            }).catch(function (error) {
                // 오류발생시 실행
                console.log(error);
            });
        
        axios.get(temp_url)
            .then((response) => {
                const value = response.data.response.body.items

                this.setState({ T1H: value.item[3].obsrValue, PTY: value.item[0].obsrValue })
            }).catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        this.getLocation();
    }

    render() {
        return <WeatherComponent state={this.state} />
    }
}