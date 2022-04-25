import { Ionicons } from "@expo/vector-icons";
import { Box, Center, Heading, Stack, Text } from "native-base";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import axios from 'axios';
import * as Location from "expo-location";
import { weatherAPI_KEY, kakaoAPI_KEY } from '@env'


const WeatherCard = (props) => {

    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [x, setX] = useState('');
    const [y, setY] = useState('');
    const [location, setLocation] = useState('');
    const [sky, setSky] = useState('');
    const [t1h, setT1h] = useState('');
    const [p1y, setP1y] = useState('');

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
    const today_string = today.format('MM월 dd일 E a/p hh:mm');
    useEffect(() => {
        console.log('useEffect');
        // async () => {

        // }
        getLocation();
    })

    let map = {
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

    const getLocation = async () => {
        console.log('getLocation0');
        try {
            // 위치정보 제공 동의
            console.log('getLocation1');
            const response = await Location.requestForegroundPermissionsAsync();

            console.log('getLocation2');
            const { coords } = await Location.getCurrentPositionAsync();
            console.log('getLocation3');
            setLatitude(coords.latitude);
            setLongitude(coords.longitude);
            console.log('latitude : ' + latitude);
            console.log('longitude : ' + longitude);
            getLamc();
            getInfo();
            getWeather();
        } catch (e) {
            console.log(e);
            Alert.alert("위치정보를 가져오지 못했습니다.");
        }
    }

    // 위도 경도로 행정구역 정보 얻기
    const getInfo = () => {
        const API_KEY = "KakaoAK " + kakaoAPI_KEY;
        const url = "https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?input_coord=WGS84&output_coord=WGS84&x=" + longitude + "&y=" + latitude;

        axios.get(url, {
            headers: {
                Authorization: API_KEY
            }
        })
            .then((response) => {
                setLocation(response.data.documents[1].address_name);
            }).catch(function (error) {
                // 오류발생시 실행
                console.log(error);
            });
    }

    // 위도 경도로 x,y 좌표값 구하기
    const getLamc = () => {
        let PI, DEGRAD, RADDEG;
        let re, olon, olat, sn, sf, ro;
        let slat1, slat2, alon, alat, xn, yn, ra, theta;

        if (map.first == 0) {
            PI = Math.asin(1.0) * 2.0;
            DEGRAD = PI / 180.0;
            RADDEG = 180.0 / PI;

            re = map.Re / map.grid;
            slat1 = map.slat1 * DEGRAD;
            slat2 = map.slat2 * DEGRAD;
            olon = map.olon * DEGRAD;
            olat = map.olat * DEGRAD;

            sn = Math.tan(PI * 0.25 + slat2 * 0.5) / Math.tan(PI * 0.25 + slat1 * 0.5);
            sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
            sf = Math.tan(PI * 0.25 + slat1 * 0.5);
            sf = Math.pow(sf, sn) * Math.cos(slat1) / sn;
            ro = Math.tan(PI * 0.25 + olat * 0.5);
            ro = re * sf / Math.pow(ro, sn);

            ra = Math.tan(PI * 0.25 + (latitude) * DEGRAD * 0.5);
            ra = re * sf / Math.pow(ra, sn);
            theta = (longitude) * DEGRAD - olon;
            if (theta > PI) theta -= 2.0 * PI;
            if (theta < -PI) theta += 2.0 * PI;
            theta *= sn;

            setX(parseInt((ra * Math.sin(theta)) + map.xo + 1.5));
            setY(parseInt((ro - ra * Math.cos(theta)) + map.yo + 1.5));
        }
    }

    const getWeather = () => {
        const base_date = today.format('yyyyMMdd');
        const hour = today.format('HH');
        const mins = today.format('mm');
        let base_time = today.format('HHmm');
        if (parseInt(mins) < 30) {
            base_time = (parseInt(hour) - 1) + '30';
        }
        const sky_url = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=" + weatherAPI_KEY + "&pageNo=1&numOfRows=1000&dataType=JSON&base_date=" + base_date + "&base_time=" + base_time + "&nx=" + x + "&ny=" + y;
        const temp_url = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=" + weatherAPI_KEY + "&pageNo=1&numOfRows=1000&dataType=JSON&base_date=" + base_date + "&base_time=" + base_time + "&nx=" + x + "&ny=" + y;

        axios.get(sky_url)
            .then((response) => {
                const value = response.data.response.body.items.item[18];
                setSky(value.fcstValue);
                console.log("1");
            }).catch(function (error) {
                // 오류발생시 실행
                console.log(error);
            });

        axios.get(temp_url)
            .then((response) => {
                const value = response.data.response.body.items
                setT1h(value.item[3].obsrValue);
                setP1y(value.item[0].obsrValue);
            }).catch(function (error) {
                console.log(error);
            });
    }

    return (
        <>
            <Box>
                <Center w="100%" >
                    {sky === '1' && <Ionicons name="sunny-outline" size={50} color="black" />}
                    {sky === '3' && <Ionicons name="partly-sunny-outline" size={50} color="black" />}
                    {sky === '4' && <Ionicons name="cloudy-outline" size={50} color="black" />}
                    <Text fontSize='lg'>
                        {t1h}°
                    </Text>
                </Center>
            </Box>

            <Stack space={2}>
                <Heading size="md" ml="-1">
                    <Ionicons name="location-sharp" size={24} color="black" />
                    {location}
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