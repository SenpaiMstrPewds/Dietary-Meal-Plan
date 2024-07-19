import { View, Text, TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";
import { MealPlanNavigationProps } from "../types/Types";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { OPENAI_APIKEY } from "../EnvironmentVariables";
import useFetchCurrentBmiData from "../utilities/CurrentBmiResult";
import useFetchUserHealthRisk from "../utilities/CurrentUserHealthRisk";
import useFetchUserAllergies from "../utilities/CurrentUserAllergies";
import HorizontalLine from "./HorizontalLine";

interface Props {
  mealPlan: {
    _id: string;
    name: string;
    image: string;
    calories: string;
    description: string;
    ingredients: string[];
    mealType: string;
    bmiRange: {
      min: number;
      max: number;
      _id: string;
    };
    allergies: string[];
    healthRisks: string[];
    createdAt: string;
    updatedAt: string;
  };
}

const MealPlanCard = ({ mealPlan }: Props) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [generatedRecommendedText, setGeneratedRecommendedText] =
    useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const navigation = useNavigation<MealPlanNavigationProps["navigation"]>();

  const bmiResultData = useFetchCurrentBmiData();
  const healthRisk = useFetchUserHealthRisk();
  const allergies = useFetchUserAllergies();

  const handleNavigate = () => {
    navigation.navigate("MealPlanSingleScreen", {
      _id: mealPlan._id,
      name: mealPlan.name,
      image: mealPlan.image,
      calories: mealPlan.calories,
      description: mealPlan.description,
      ingredients: mealPlan.ingredients,
      mealType: mealPlan.mealType,
      bmiRange: {
        min: mealPlan.bmiRange.min,
        max: mealPlan.bmiRange.max,
      },
      createdAt: mealPlan.createdAt,
    });
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    console.log('Recommendation window closed');
  };

  // * start here openAI
  const openai = axios.create({
    baseURL: "https://api.openai.com/v1/chat/completions",
  });

  const apiKey = OPENAI_APIKEY;

  const instructions = `Your responses should focus exclusively if the user inputs are recommended base on health risk, allergy and bmi. 
  You will also explain why the food mentioned is recommended, if it is not recommended because of the sade health, allergy and bmi, then you will need to explain why it is not recommended.
  It's essential to remind users to consult with a dietitian for more precise advice on their individual dietary needs. This is the only subject you are authorized to address.`;

  const handleGenerateAIAnswer = async () => {
    setModalVisible(true);
    setLoading(true);

    const prompt = `${instructions}\n \n 
    Meal Name: ${mealPlan.name} 
    \n BMI: ${bmiResultData?.bmiResult} 
    \n Health Risk: ${healthRisk?.healthRisk} 
    \n Allergies: ${allergies?.allergies.map((item) => item)}`;

    const data = {
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      messages: [{ role: "user", content: prompt }],
    };

    try {
      const response = await openai.post("", data, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      });

      let reply = response.data.choices[0].message.content.trim();

      setGeneratedRecommendedText(reply);

      console.log(reply);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching AI reply:", error);
      setLoading(false);
    }
  };
  // * end here openAI

  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        width: "90%",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "black",
        height: 65,
        marginBottom: 3,
        marginTop: 5,
      }}
      onPress={handleNavigate}
    >
      <View style={{ paddingLeft: 10, flexWrap: "wrap", width: "65%" }}>
        <Text style={{ paddingLeft: 5, flexWrap: "wrap", width: "100%" }}>
          {mealPlan.name}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          width: "35%",
          backgroundColor: "#73A065",
          alignItems: "center",
          justifyContent: "center",
          height: 65,
        }}
        onPress={handleGenerateAIAnswer}
      >
        <Text style={{ color: "white", width: "100%", textAlign: "center" }}>
          Recommendation Information
        </Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 50,
              padding: 20,
            }}
          >
            <Text>Recommendation Information</Text>
            <HorizontalLine />
            {loading ? (
              <Text>Generating. Please wait..</Text>
            ) : (
              <Text>{generatedRecommendedText}</Text>
            )}
            <TouchableOpacity
              onPress={handleCloseModal}
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "blue",
                padding: 10,
                borderRadius: 10,
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              <Text style={{ color: "#ffffff" }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

export default MealPlanCard;
