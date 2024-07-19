import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useRef, useState } from "react";
import updateUserHealthRisk from "../utilities/UpdateUserHealthRisk";
import useAuthStore from "../zustand/AuthStore";

const healthRisk: string[] = [
  "High Blood Pressure",
  "Diabetes",
  "Gout",
  "Chronic Kidney Disease",
  "Cardiovascular Disease",
];

const EditHealthRisks = ({
  currentHealthRisks,
}: {
  currentHealthRisks: string[];
}) => {
  const [selectedHealthRisk, setSelectedHealthRisk] =
    useState<string[]>(currentHealthRisks);

  const updatedHealthRiskRef = useRef<string[]>([]);

  const user = useAuthStore((state) => state.user);

  const toggleHealthRisk = (risk: string) => {
    const updatedHealthRisk = selectedHealthRisk?.includes(risk)
      ? selectedHealthRisk.filter((a) => a !== risk)
      : [...selectedHealthRisk, risk];
    setSelectedHealthRisk(updatedHealthRisk);
    updatedHealthRiskRef.current = updatedHealthRisk;
  };

  const handleSubmit = async () => {
    try {
      await updateUserHealthRisk(
        user ? user : "",
        updatedHealthRiskRef.current
      );
      Alert.alert("Successfully updated the health risks");
    } catch (error) {
      console.error("Error updating user health risks:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Health Risks:</Text>
      <View style={styles.allergenContainer}>
        {healthRisk.map((risk) => (
          <TouchableOpacity
            key={risk}
            style={[
              styles.allergenButton,
              selectedHealthRisk?.includes(risk) && styles.selectedAllergen,
            ]}
            onPress={() => toggleHealthRisk(risk)}
          >
            <Text style={styles.allergenText}>{risk}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text>Update Health Risk</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditHealthRisks;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  allergenContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  allergenButton: {
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    padding: 10,
    margin: 5,
  },
  selectedAllergen: {
    backgroundColor: "#64b5f6",
  },
  allergenText: {
    fontSize: 14,
  },
  submitButton: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#64b5f6",
    padding: 12,
    marginTop: 20,
    borderRadius: 20,
  },
});
