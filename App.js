import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./screens/essentials/Home";
import Profile from "./screens/essentials/Profile";
import Biometric from "./screens/essentials/Biometric";

import ScisaVoting from "./screens/voting/college of science/COS/ScisaVoting";
import ComputerScience from "./screens/voting/college of science/ComputerScience";
import ActurialScience from "./screens/voting/college of science/ActurialScience";

import SmsVoting from "./screens/voting/school of medical sciences/SMS/SmsVoting"
import HumanBiology from "./screens/voting/school of medical sciences/HumanBiology";
import Pharmacy from "./screens/voting/school of medical sciences/Pharmacy";

import KsbVoting from "./screens/voting/knust school of business/KSB/KsbVoting";
import Marketing from "./screens/voting/knust school of business/Marketing";
import BusinessAdministration from "./screens/voting/knust school of business/BusinessAdministration";

import CoeVoting from "./screens/voting/college of engineering/COE/CoeVoting"
import GeologicalEngineering from "./screens/voting/college of engineering/GeologicalEngineering";
import MechanicalEngineering from "./screens/voting/college of engineering/MechanicalEngineering";

import VoteSRC from "./screens/srcVoting/VoteSRC";

const Stack = createStackNavigator();

function App() {
  return (
    <View style={styles.container}>
      <Stack.Navigator initialRouteName = "Biometric">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SRC VOTING"
          component={VoteSRC}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            title: "Student Profile",
            headerTintColor: "#050305",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "transparent",
              borderBottomColor: "none",
            },
          }}
        />
        <Stack.Screen
          name="Scisa Voting"
          component={ScisaVoting}
          options={{
          headerShown: false
          }}
        />
        <Stack.Screen
          name="Coe Voting"
          component={CoeVoting}
          options={{
          headerShown: false
          }}
        />
        <Stack.Screen
          name="Ksb Voting"
          component={KsbVoting}
          options={{
          headerShown: false
          }}
        />
        <Stack.Screen
          name="Sms Voting"
          component={SmsVoting}
          options={{
          headerShown: false
          }}
        />
        <Stack.Screen
          name="Biometric"
          component={Biometric}
          options={{
            title: "FingerPrint",
            headerTintColor: "#050305",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "transparent",
              borderBottomColor: "none",
            },
          }}
        />
        <Stack.Screen
          name="Computer Science"
          component={ComputerScience}
          options={{
            title: "Computer Science Voting Page",
            headerTintColor: "#050305",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "transparent",
              borderBottomColor: "none",
            },
          }}
        />
        <Stack.Screen
          name="Acturial Science"
          component={ActurialScience}
          options={{
            title: "Acturial Science Voting Page",
            headerTintColor: "#050305",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "transparent",
              borderBottomColor: "none",
            },
          }}
        />
        <Stack.Screen
          name="Human Biology"
          component={HumanBiology}
          options={{
            title: "Human Biology Voting Page",
            headerTintColor: "#050305",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "transparent",
              borderBottomColor: "none",
            },
          }}
        />
        <Stack.Screen
          name="Pharmacy"
          component={Pharmacy}
          options={{
            title: "Pharmacy Voting Page",
            headerTintColor: "#050305",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "transparent",
              borderBottomColor: "none",
            },
          }}
        />
        <Stack.Screen
          name="Business Administration"
          component={BusinessAdministration}
          options={{
            title: "Business Administration Voting Page",
            headerTintColor: "#050305",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "transparent",
              borderBottomColor: "none",
            },
          }}
        />
        <Stack.Screen
          name="Marketing"
          component={Marketing}
          options={{
            title: "Marketing Voting Page",
            headerTintColor: "#050305",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "transparent",
              borderBottomColor: "none",
            },
          }}
        />
        <Stack.Screen
          name="Geological Engineering"
          component={GeologicalEngineering}
          options={{
            title: "Geological Engineering Voting Page",
            headerTintColor: "#050305",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "transparent",
              borderBottomColor: "none",
            },
          }}
        />
        <Stack.Screen
          name="Mechanical Engineering"
          component={MechanicalEngineering}
          options={{
            title: "Mechanical Engineering Voting Page",
            headerTintColor: "#050305",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "transparent",
              borderBottomColor: "none",
            },
          }}
        />
      </Stack.Navigator>
    </View>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
