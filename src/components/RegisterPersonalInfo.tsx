import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import moment from "moment";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons, Fontisto } from "@expo/vector-icons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

interface Props {
  setName: (name: string) => void;
  dateOfBirth: Date;
  setDateOfBirth: (dateOfBirth: Date) => void;
  setImageBase64: (imageBase64: string) => void;
  imageUrl: string;
}

const RegisterPersonalInfo = ({
  setName,
  dateOfBirth,
  setDateOfBirth,
  setImageBase64,
  imageUrl,
}: Props) => {
  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setDateOfBirth(currentDate);
  };

  const showMode = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: dateOfBirth,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });

    if (!result.canceled) {
      let base64Img = `data:image/jpg;base64,${result.assets?.[0].base64}`;
      setImageBase64(base64Img);
    }
  };

  return (
    <>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="email-outline" size={24} color="black" />
        <TextInput
          style={styles.input}
          placeholder="Full name"
          onChangeText={setName}
        />
      </View>

      <View
        style={{
          width: "100%",
          alignItems: "center",
          backgroundColor: "transparent",
        }}
      >
        <View style={{ width: "100%", paddingHorizontal: 22 }}>
          <Text style={{ textAlign: "left" }}>Date of Birth</Text>
        </View>
        <TouchableOpacity
          onPress={showDatepicker}
          style={styles.inputContainer}
        >
          <Fontisto name="date" size={24} color="black" />
          <Text style={styles.input}>
            {moment(dateOfBirth).format("YYYY-MM-DD")}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Text>
            {imageUrl
              ? "Image picked successfully"
              : "Pick an image from camera roll"}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "90%",
    backgroundColor: "#F4F7FF",
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
});

export default RegisterPersonalInfo;
