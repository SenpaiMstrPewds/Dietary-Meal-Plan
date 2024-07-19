import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Chat from "../components/Chat";
import Profile from "../screens/Profile";

import HomeStackNavigation from "./HomeStackNavigation";

const BottomTabNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconName: any;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "AI Chat") {
            iconName = focused ? "chatbox" : "chatbox-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={focused ? "#FD9206" : "black"}
            />
          );
        },
        tabBarStyle: {
          height: 60,
          backgroundColor: "white",
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigation}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="AI Chat"
        component={Chat}
        options={{ headerTitle: "Chatbot" }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerTitle: "Profile" }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
