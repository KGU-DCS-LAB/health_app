import { Text } from "native-base";

const HealthCard = (props) => {
    return (
        <Text fontWeight="400">
            천식폐질환가능지수: {props.state.getAsthmaIdxV2}
            뇌졸중가능지수: {props.state.getStrokeIdxV2}
            식중독지수: {props.state.getFoodPoisoningIdxV2}
            꽃가루농도위험지수(참나무): {props.state.getOakPollenRiskIdxV2}
            꽃가루농도위험지수(소나무): {props.state.getPinePollenRiskIdxV2}
            꽃가루농도위험지수(잡초류): {props.state.getWeedsPollenRiskndxV2}
            감기가능지수: {props.state.getColdIdxV2}
        </Text>
    )
}

export default HealthCard;