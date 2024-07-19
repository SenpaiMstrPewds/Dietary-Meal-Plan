import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import { AuthStackNavigationType } from "../types/Types";

const AuthStackNavigation = () => {
  const AuthStack = createNativeStackNavigator<AuthStackNavigationType>();

  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Register"
        component={Register}
        options={{
          headerStyle: {
            backgroundColor: "white",
          },
          title: "",
          headerShadowVisible: false,
        }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigation;
