import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Timestamp } from "firebase/firestore";

export type AuthStackNavigationType = {
  Login: undefined;
  Register: undefined;
};

export type HomeNavigationStackProps = {
  HomeScreen: undefined;
  BMICalculator: undefined;
  BMIResult: {
    gender: string;
    height: number;
    weight: number;
    age: number;
    bmiResult: number;
    bmiCategory: string;
  };
  Chat: undefined;
  Profile: undefined;
  MealPlan: undefined;
  MealPlanSingleScreen: {
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
    };
    createdAt: string;
  };
};

export type HomeNavigationProps = NativeStackScreenProps<
  HomeNavigationStackProps,
  "BMIResult"
>;

export type MealPlanNavigationProps = NativeStackScreenProps<
  HomeNavigationStackProps,
  "MealPlanSingleScreen"
>;

export type BMINavigationStackProps = {
  HomeScreen: undefined;
  BMICalculator: undefined;
  BMIResult: {
    gender: string;
    height: number;
    weight: number;
    age: number;
    bmiResult: number;
    bmiCategory: string;
  };
};

export type BMINavigationProps = NativeStackScreenProps<
  BMINavigationStackProps,
  "BMIResult"
>;

//

export interface IMealPlan {
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
}

export interface IUser {
  dateOfBirth: Timestamp;
  email: string;
  fullName: string;
  imageUrl: string;
}

export interface IBmiResult {
  id: string;
  age: number;
  bmiCategory: string;
  bmiResult: number;
  createdAt: Timestamp;
  email: string;
  gender: string;
  height: number;
  weight: number;
}

export interface IUserAllergies {
  email: string;
  allergies: string[];
}

export interface IUserHealthRisks {
  email: string;
  healthRisk: string[];
}
