import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import useFetchUserData from "../utilities/CurrentUser";
import moment from "moment";
import useFetchCurrentBmiData from "../utilities/CurrentBmiResult";
import { FIREBASE_AUTH } from "../firebase/FirebaseConfig";
import useAuthStore from "../zustand/AuthStore";
import { signOut } from "firebase/auth";
import HorizontalLine from "../components/HorizontalLine";
import useFetchUserAllergies from "../utilities/CurrentUserAllergies";
import useFetchUserHealthRisk from "../utilities/CurrentUserHealthRisk";
import { AntDesign } from "@expo/vector-icons";
import EditHealthRisks from "../components/EditHealthRisks";
import EditAllergies from "../components/EditAllergies";

const Profile = () => {
  const [isAllergiesEditOpen, setIsAllergiesEditOpen] =
    useState<boolean>(false);
  const [isHealthRiskEditOpen, setIsHealthRiskEditOpen] =
    useState<boolean>(false);

  const toggleHealthRiskEdit = () => {
    setIsHealthRiskEditOpen(!isHealthRiskEditOpen);
  };

  const toggleAllegiesEdit = () => {
    setIsAllergiesEditOpen(!isAllergiesEditOpen);
  };

  const userData = useFetchUserData();

  const bmiResult = useFetchCurrentBmiData();
  const currentAllergies = useFetchUserAllergies();
  const currentHealthRisks = useFetchUserHealthRisk();

  const auth = FIREBASE_AUTH;
  const clearUser = useAuthStore((state) => state.clearUser);
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        Alert.alert("Successfully logout!");
        clearUser();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={{
          flex: 1,
          width: "100%",
          paddingHorizontal: 20,
        }}
      >
        <View style={styles.coverPhotoContainer}>
          <Image
            source={{ uri: userData?.imageUrl }}
            style={styles.coverPhoto}
          />
          <Text style={styles.profileName}>{userData?.fullName}</Text>
          <Text style={styles.profileEmail}>{userData?.email}</Text>
        </View>

        <HorizontalLine />

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Basic Info</Text>

          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Age: </Text>
            <Text style={styles.infoValue}>
              {bmiResult?.age ? bmiResult.age : "Please go to BMI Calculator"}
            </Text>
          </View>

          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Weight:</Text>
            <Text style={styles.infoValue}>
              {bmiResult?.weight
                ? bmiResult?.weight + "kg"
                : "Please go to BMI Calculator"}
            </Text>
          </View>

          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Height:</Text>
            <Text style={styles.infoValue}>
              {bmiResult?.height
                ? bmiResult.height + "cm"
                : "Please go to BMI Calculator"}
            </Text>
          </View>

          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Gender</Text>
            <Text style={[styles.infoValue, { textTransform: "capitalize" }]}>
              {bmiResult?.gender
                ? bmiResult.gender
                : "Please go to BMI Calculator"}
            </Text>
          </View>

          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Birthday</Text>
            <Text style={styles.infoValue}>
              {moment(userData?.dateOfBirth.toDate()).format("YYYY-MM-DD")}
            </Text>
          </View>

          <HorizontalLine />

          <Text style={styles.infoTitle}>Health</Text>

          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>BMI: </Text>
            <Text style={styles.infoValue}>
              {bmiResult?.bmiResult
                ? bmiResult.bmiResult
                : "Please go to BMI Calculator"}
            </Text>
          </View>

          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>BMI Category: </Text>
            <Text style={styles.infoValue}>
              {bmiResult?.bmiCategory
                ? bmiResult.bmiCategory
                : "Please go to BMI Calculator"}
            </Text>
          </View>

          <View style={styles.infoColumn}>
            <View style={styles.titleContainer}>
              <Text style={styles.infoLabel}>Allergies: </Text>
              <TouchableOpacity onPress={toggleAllegiesEdit}>
                <AntDesign name="edit" size={24} color="black" />
              </TouchableOpacity>
            </View>
            {isAllergiesEditOpen ? (
              <EditAllergies
                currentAllergies={currentAllergies?.allergies || [""]}
              />
            ) : (
              <Text style={styles.infoValue}>
                {currentAllergies &&
                  currentAllergies?.allergies.map((allergen, index) => (
                    <Text key={allergen}>
                      {allergen}
                      {index === currentAllergies.allergies.length - 1
                        ? ""
                        : ", "}
                    </Text>
                  ))}
              </Text>
            )}
          </View>

          <View style={styles.infoColumn}>
            <View style={styles.titleContainer}>
              <Text style={styles.infoLabel}>Health Risks: </Text>
              <TouchableOpacity onPress={toggleHealthRiskEdit}>
                <AntDesign name="edit" size={24} color="black" />
              </TouchableOpacity>
            </View>
            {isHealthRiskEditOpen ? (
              <EditHealthRisks
                currentHealthRisks={currentHealthRisks?.healthRisk || [""]}
              />
            ) : (
              <Text style={styles.infoValue}>
                {currentHealthRisks !== undefined
                  ? currentHealthRisks?.healthRisk?.map((risks, index) => (
                      <Text key={risks}>
                        {risks}
                        {index === currentHealthRisks.healthRisk.length - 1
                          ? ""
                          : ", "}
                      </Text>
                    ))
                  : "There is no health risks"}
              </Text>
            )}
          </View>
        </View>
        <TouchableOpacity
          onPress={handleLogout}
          style={{
            backgroundColor: "#FD9206",
            paddingVertical: 10,
            borderRadius: 10,
            marginTop: 30,
            width: "100%",
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 18,
              textAlign: "center",
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  coverPhotoContainer: {
    alignItems: "center",
  },
  coverPhoto: {
    width: 200,
    height: 200,
    objectFit: "contain",
    borderRadius: 100,
    marginTop: 10,
  },
  editButton: {
    position: "absolute",
    top: 160,
    right: 20,
    backgroundColor: "blue",
    padding: 5,
    borderRadius: 5,
  },
  editButtonText: {
    color: "white",
  },
  profileName: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  profileEmail: {
    fontSize: 16,
    color: "gray",
  },
  infoContainer: {
    width: "100%",
  },
  titleContainer: {
    flexDirection: "row",
  },
  infoTitle: {
    fontSize: 18,
    color: "#303234",
    paddingBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
  },
  infoColumn: {
    flex: 1,
    paddingBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  infoValue: {
    fontSize: 16,
  },
});

export default Profile;
