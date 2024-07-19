import { View, TouchableOpacity, Text } from "react-native";

interface Props {
  label: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const CounterInput = ({ label, value, onIncrement, onDecrement }: Props) => {
  return (
    <View
      style={{
        marginBottom: 10,
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 10,
        width: "45%",
        height: 175,
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "bold", color: "gray" }}>
        {label}
      </Text>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 25, fontWeight: "bold", color: "#FD9206" }}>
          {value}
        </Text>
        <View
          style={{
            flexDirection: "row",
            gap: 20,
            marginTop: 15,
          }}
        >
          <TouchableOpacity
            onPress={onDecrement}
            style={{
              width: 40,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "black",
            }}
          >
            <Text style={{ fontSize: 18, color: "white" }}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onIncrement}
            style={{
              width: 40,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "black",
            }}
          >
            <Text style={{ fontSize: 18, color: "white" }}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CounterInput;
