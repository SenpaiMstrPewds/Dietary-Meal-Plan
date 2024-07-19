import React from "react";
import { View } from "react-native";

const HorizontalLine = () => {
  return (
    <View
      style={{
        borderBottomColor: "#cccccc",
        borderBottomWidth: 1,
        alignSelf: "stretch",
        width: "100%",
        marginTop: 20,
        marginBottom: 20,
      }}
    />
  );
};

export default HorizontalLine;
