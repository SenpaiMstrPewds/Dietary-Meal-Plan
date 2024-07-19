import { useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import updateUserAllergies from "../utilities/UpdateUserAllergies";
import useAuthStore from "../zustand/AuthStore";

const allergens: string[] = [
  "Dairy",
  "Eggs",
  "Fish",
  "Crustacean shellfish",
  "Tree nuts",
  "Peanuts",
  "Wheat",
  "Soybeans",
  "Sesame",
];

const EditAllergies = ({
  currentAllergies,
}: {
  currentAllergies: string[];
}) => {
  const [selectedAllergies, setSelectedAllergies] =
    useState<string[]>(currentAllergies);

  const updatedAllergiesRef = useRef<string[]>([]);

  const user = useAuthStore((state) => state.user);

  const toggleAllergy = (allergen: string) => {
    const updatedAllergies = selectedAllergies?.includes(allergen)
      ? selectedAllergies.filter((a) => a !== allergen)
      : [...selectedAllergies, allergen];
    setSelectedAllergies(updatedAllergies);
    updatedAllergiesRef.current = updatedAllergies;
  };

  const handleSubmit = async () => {
    try {
      await updateUserAllergies(user ? user : "", updatedAllergiesRef.current);
      Alert.alert("Successfully updated Allergies.");
    } catch (error) {
      console.error("Error updating user allergies:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Allergies:</Text>
      <View style={styles.allergenContainer}>
        {allergens.map((allergen) => (
          <TouchableOpacity
            key={allergen}
            style={[
              styles.allergenButton,
              selectedAllergies?.includes(allergen) && styles.selectedAllergen,
            ]}
            onPress={() => toggleAllergy(allergen)}
          >
            <Text style={styles.allergenText}>{allergen}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text>Update Allergies</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditAllergies;

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
