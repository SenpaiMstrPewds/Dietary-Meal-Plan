import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackNavigationType } from "../types/Types";
import useAuthStore from "../zustand/AuthStore";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { FIREBASE_AUTH } from "../firebase/FirebaseConfig";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const [forgotPassLoading, setForgotPassLoading] = useState<boolean>(false);

  const setUser = useAuthStore((state) => state.setUser);

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackNavigationType>>();

  const auth = FIREBASE_AUTH;

  const handleLogin = async () => {
    setLoginLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoginLoading(false);
      setUser(email);
    } catch (error) {
      setLoginLoading(false);
      Alert.alert("Email or password is incorrect!");
      console.log(error);
    }
  };

  const handleForgotPassword = async () => {
    setForgotPassLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      Toast.show({
        type: "success",
        text1: `Please check your email to reset your password.`,
      });
      setForgotPassLoading(false);
    } catch (error) {
      setForgotPassLoading(false);
      Toast.show({
        type: "error",
        text1: `Not able to reset your password.`,
      });
    }
  };

  const handleGoToRegisterScreen = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/background.jpg")}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <View
            style={{
              alignItems: "flex-start",
              width: "90%",
              paddingBottom: 10,
            }}
          >
            <Text
              style={{
                color: "#4D5C7E",
                fontSize: 35,
                fontWeight: "bold",
              }}
            >
              Welcome!
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="email-outline"
              size={24}
              color="black"
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputContainer}>
            <Feather name="lock" size={24} color="black" />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <View style={styles.forgotContainer}>
            <Text></Text>
            <TouchableOpacity
              style={styles.forgotPass}
              onPress={handleForgotPassword}
            >
              <Text style={{ color: "#FD9206" }}>
                {forgotPassLoading ? "Please wait" : "Forgot password?"}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <LinearGradient
              colors={["#FFAA21", "#FFC42C"]}
              style={{
                flex: 1,
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
            >
              <Text style={styles.buttonText}>
                {loginLoading ? "Please wait.." : "Login"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <View style={styles.registerContainer}>
            <Text>Don't have an account? </Text>
            <Text
              style={styles.registerText}
              onPress={handleGoToRegisterScreen}
            >
              Sign Up
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    backgroundColor: "#F4F7FF",
    width: "90%",
    height: 60,
    paddingLeft: 15,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
  },
  input: {
    width: "80%",
    height: 40,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  button: {
    width: "90%",
    height: 60,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    lineHeight: 40,
    fontSize: 16,
    fontWeight: "bold",
  },
  forgotContainer: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
  },
  forgotPass: {
    backgroundColor: "transparent",
  },
  registerContainer: {
    flexDirection: "row",
  },

  registerText: {
    textDecorationLine: "underline",
    color: "#FD9206",
  },
});
