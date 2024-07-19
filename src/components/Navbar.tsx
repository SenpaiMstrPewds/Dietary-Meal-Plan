import { View, Text, Image } from "react-native";
import React from "react";
import useFetchUserData from "../utilities/CurrentUser";

const Navbar = () => {
  const userData = useFetchUserData();

  return (
    <View
      style={{
        height: 70,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <View>
        <Text style={{ fontSize: 20 }}>Welcome,</Text>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {userData?.fullName}
        </Text>
      </View>
      <Image
        source={{ uri: userData?.imageUrl }}
        style={{ width: 50, height: 50, borderRadius: 100 }}
      />
    </View>
  );
};

export default Navbar;
