import React from "react";
import { View, Text } from "react-native";
import Slider from "@react-native-community/slider";

interface Props {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onValueChange: (value: number) => void;
}

const SliderInput = ({
  label,
  value,
  min,
  max,
  step,
  onValueChange,
}: Props) => {
  return (
    <View
      style={{
        marginBottom: 10,
        borderWidth: 2,
        backgroundColor: "white",
        borderColor: "black",
        borderRadius: 5,
        height: "20%",
        width: "95%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "bold", color: "gray" }}>
        {label}
      </Text>
      <Text
        style={{
          textAlign: "center",
          fontSize: 25,
          color: "#FD9206",
        }}
      >
        {value}
      </Text>
      <Slider
        style={{ width: "100%", height: 20 }}
        value={value}
        minimumValue={min}
        maximumValue={max}
        step={step}
        minimumTrackTintColor="#FD9206"
        thumbTintColor="#FD9206"
        onValueChange={onValueChange}
      />
    </View>
  );
};

export default SliderInput;
