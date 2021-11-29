import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import InfoScreen from "./screens/InfoScreen";
import CameraScreen from "./screens/Camera";
import savePhoto from "./screens/savePhoto";
import LegendDetails from "./stackScreens/legendDetailScreen";
import ChatScreen from "./stackScreens/ChatScreen";
import ProfilePage from "./screens/ProfilePage";
import LoginScreen from "./stackScreens/LoginScreen";

const Stack = createStackNavigator();

//Stack for camera views
const CameraStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen name="savePhoto" component={savePhoto} />
    </Stack.Navigator>
  );
};
//Stack for profilepage
const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfilePage" component={ProfilePage} />
    </Stack.Navigator>
  );
};
//Stack for info views
const InfoStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Information" component={InfoScreen}></Stack.Screen>
      <Stack.Screen name="LegendDetails" component={LegendDetails} />
    </Stack.Navigator>
  );
};

//Loginstack
const LoginStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};
//Stack for Home views
const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Homes" component={HomeScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};
export {
  CameraStackNavigator,
  HomeStackNavigator,
  InfoStackNavigator,
  ProfileStackNavigator,
  LoginStackNavigator,
};
