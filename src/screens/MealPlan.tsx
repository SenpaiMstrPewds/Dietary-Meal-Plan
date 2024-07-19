import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import MealPlanCard from "../components/MealPlanCard";
import useFetchCurrentBmiData from "../utilities/CurrentBmiResult";
import { IMealPlan } from "../types/Types";
import useFetchUserAllergies from "../utilities/CurrentUserAllergies";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../EnvironmentVariables";

const MealPlan = () => {
  type GroupedDays = { [day: number]: IMealPlan[] };

  const bmiResultData = useFetchCurrentBmiData();
  const currentAllergiers = useFetchUserAllergies();

  const { data: mealPlanData } = useQuery<IMealPlan[]>({
    queryKey: ["MealPlan"],
    queryFn: () => fetch(`${API_URL}/api/food`).then((res) => res.json()),
  });

  console.log(currentAllergiers);

  const groupMealPlansByDay = () => {
    const groupedDays: GroupedDays = {};

    mealPlanData?.forEach((mealPlan, index) => {
      const dayOfWeek = index % 7;
      if (!groupedDays[dayOfWeek]) {
        groupedDays[dayOfWeek] = [];
      }

      const isInBmiRange =
        bmiResultData &&
        bmiResultData.bmiResult >= mealPlan.bmiRange.min &&
        bmiResultData.bmiResult <= mealPlan.bmiRange.max;

      const containsAllergy = mealPlan.allergies.some((allergy) =>
        currentAllergiers?.allergies.includes(allergy)
      );

      if ((isInBmiRange || !bmiResultData) && !containsAllergy) {
        groupedDays[dayOfWeek].push(mealPlan);
      }
    });

    return groupedDays;
  };

  const daysWithMealPlans = groupMealPlansByDay();

  return (
    <View>
      <ScrollView>
        {Object.keys(daysWithMealPlans).map((day, index) => (
          <TouchableOpacity
            key={index}
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>{getDayName(parseInt(day))}</Text>
            {daysWithMealPlans[parseInt(day)].map((mealPlan, key) => (
              <MealPlanCard mealPlan={mealPlan} key={key} />
            ))}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const getDayName = (day: number) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
};

export default MealPlan;
