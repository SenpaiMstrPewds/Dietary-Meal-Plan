import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { MealPlanNavigationProps } from "../types/Types";

const MealPlanSingleScreen = ({ route }: MealPlanNavigationProps) => {
  const {
    _id,
    name,
    image,
    calories,
    description,
    ingredients,
    mealType,
    bmiRange,
    createdAt,
  } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text>{calories} calories</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

export default MealPlanSingleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    width: 400,
    height: 400,
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00205C",
    paddingVertical: 10,
  },

  description: {
    fontSize: 16,
    color: "#777",
    marginTop: 10,
    textAlign: "justify",
  },
});
