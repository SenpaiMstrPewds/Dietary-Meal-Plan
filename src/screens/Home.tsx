import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../components/Navbar";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { HomeNavigationProps } from "../types/Types";
import "moment-timezone";

const Home = () => {
  const navigation = useNavigation<HomeNavigationProps["navigation"]>();

  const navigateToScreen = (screenName: any) => {
    navigation.navigate(screenName);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Navbar />
      <View style={styles.headerContainer}>
        <View style={styles.headerLeftContainer}>
          <Text style={styles.dailyActivities}>Your Daily Activities</Text>
          <Text style={styles.explore}>Explore</Text>
        </View>
        <View style={styles.headerRightContainer}>
          <Text style={styles.month}>
            {moment.tz("Asia/Manila").format("MMMM")}
          </Text>
          <Text style={styles.day}>
            {moment().tz("Asia/Manila").format("DD")}
          </Text>
        </View>
      </View>

      {/*  */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigateToScreen("BMICalculator")}
        >
          <View style={styles.iconContainer}>
            <Image
              source={{
                uri: "https://play-lh.googleusercontent.com/nJK-fZz2-tohIAUcowkz4HIVzzyerGZbVXPFYhE8EBP60pUrAGR-8DCRgzo7yo7jQpXE",
              }}
              style={styles.icon}
            />
          </View>
          <Text style={styles.buttonText}>BMI Calculation</Text>
          <Entypo name="controller-play" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigateToScreen("MealPlan")}
        >
          <View style={styles.iconContainer}>
            <Image
              source={{
                uri: "https://media.istockphoto.com/id/1075455848/vector/plate-fork-and-knife-line-icon-concept-plate-fork-and-knife-vector-linear-illustration.jpg?s=612x612&w=0&k=20&c=lgmsPGkx7_sPw-n1rkwiRCkn-t6lK-Bi8-uyXR4n8xU=",
              }}
              style={styles.icon}
            />
          </View>
          <Text style={styles.buttonText}>Meal Planning</Text>
          <Entypo name="controller-play" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {/*  */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: "white",

    height: "100%",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeftContainer: {
    alignItems: "center",
  },
  headerRightContainer: {
    backgroundColor: "#FD9206",

    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  dailyActivities: {
    fontSize: 14,
  },
  explore: {
    fontSize: 35,
    fontWeight: "bold",
  },
  month: {
    fontSize: 18,
    color: "white",
  },
  day: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  //
  buttonsContainer: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  iconContainer: {
    marginRight: 15,
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  buttonText: {
    flex: 1,
    fontSize: 18,
  },
});

export default Home;
