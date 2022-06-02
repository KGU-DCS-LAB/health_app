import { Text, View } from "native-base";
import { useEffect, useState } from "react";
import { HealthWthrIdxAPI_KEY } from '@env'
import axios from 'axios';

const HealthCard = (props) => {

    console.log(HealthWthrIdxAPI_KEY)

    const [asthmaIdxV2, setAsthmaIdxV2] = useState('');
    const [strokeIdxV2, setStrokeIdxV2] = useState('');
    const [foodPoisoningIdxV2, setFoodPoisoningIdxV2] = useState('');
    const [oakPollenRiskIdxV2, setOakedPollenRiskIdxV2] = useState('');
    const [pinePollenRiskIdxV2, setPinePollenRiskIdxV2] = useState('');
    const [weedsPollenRiskndxV2, setWeedsPollenRiskndxV2] = useState('');
    const [coldIdxV2, setColdIdxV2] = useState('');

    useEffect(() => {
        getHealthWthrIdx();
    })

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

    const getHealthWthrIdx = () => {
        const base_date = today.format('yyyyMMdd');
        const hour = today.format("HH");
        const month = parseInt(today.format('MM'));
        let url_type = ['getAsthmaIdxV2', 'getStrokeIdxV2', 'getFoodPoisoningIdxV2'];
        if (month > 3 && month < 7) {
            url_type = url_type.concat('getOakPollenRiskIdxV2');
            url_type = url_type.concat('getPinePollenRiskIdxV2');
        }
        if (month > 7 && month < 11) {
            url_type = url_type.concat('getWeedsPollenRiskndxV2');
        }
        if (month > 8 || month < 5) {
            url_type = url_type.concat('getColdIdxV2');
        }
        const areaNo = '1162060500';
        let base_time = '';
        if (parseInt(hour) < 6) {
            base_time = (parseInt(base_date) - 1) + '18';
        } else {
            base_time = base_date + '06';
        }
        let url = '';
        let code;
    
        url_type.map((type) => {
            url = 'http://apis.data.go.kr/1360000/HealthWthrIdxServiceV2/' + type + '?serviceKey=' + HealthWthrIdxAPI_KEY + '&numOfRows=10&pageNo=1&dataType=JSON&areaNo=' + areaNo + '&time=' + base_time;
            axios.get(url)
                .then((response) => {
                    // const value = response.data.response.body.items.item[18];
                    // this.setState({ SKY: value.fcstValue })
                    const items = response.data.response.body.items.item[0];
                    // console.log(items);
                    if (parseInt(hour) < 6) {
                        code = items.tomorrow;
                    } else {
                        code = items.today;
                    }
                    switch (type) {
                        case 'getAsthmaIdxV2':
                            setAsthmaIdxV2(code);
                            // this.setState({ getAsthmaIdxV2: code });
                            break;
                        case 'getStrokeIdxV2':
                            setStrokeIdxV2(code);
                            // this.setState({ getStrokeIdxV2: code });
                            break;
                        case 'getFoodPoisoningIdxV2':
                            setFoodPoisoningIdxV2(code);
                            // this.setState({ getFoodPoisoningIdxV2: code });
                            break;
                        case 'getOakPollenRiskIdxV2':
                            setOakedPollenRiskIdxV2(code);
                            // this.setState({ getOakPollenRiskIdxV2: code });
                            break;
                        case 'getPinePollenRiskIdxV2':
                            setPinePollenRiskIdxV2(code);
                            // this.setState({ getPinePollenRiskIdxV2: code });
                            break;
                        case 'getWeedsPollenRiskndxV2':
                            setWeedsPollenRiskndxV2(code);
                            // this.setState({ getWeedsPollenRiskndxV2: code });
                            break;
                        case 'getColdIdxV2':
                            setColdIdxV2(code);
                            // this.setState({ getColdIdxV2: code });
                            break;
                    }
                }).catch(function (error) {
                    // 오류발생시 실행
                    console.log(error);
                });
        })
    }


    return (
        <View fontWeight="400">
            <Text>천식폐질환가능지수: {asthmaIdxV2}</Text>
            <Text>뇌졸중가능지수: {strokeIdxV2}</Text>
            <Text>식중독지수: {foodPoisoningIdxV2}</Text>
            <Text>꽃가루농도위험지수(참나무): {oakPollenRiskIdxV2}</Text>
            <Text>꽃가루농도위험지수(소나무): {pinePollenRiskIdxV2}</Text>
            <Text>꽃가루농도위험지수(잡초류): {weedsPollenRiskndxV2}</Text>
            <Text>감기가능지수: {coldIdxV2}</Text>
        </View>
    )
}

export default HealthCard;