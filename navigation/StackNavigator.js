import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import CameraScreen from "./screens/Camera";
import savePhoto from "./screens/savePhoto";
import ChatScreen from "./stackScreens/ChatScreen";
import ProfilePage from "./screens/ProfilePage";
import LoginScreen from "./stackScreens/LoginScreen";
import SignupScreen from "./stackScreens/SignupScreen";
import ChatUsersScreen from "./stackScreens/ChatUsersScreen";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

//create stack navigator
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

const authStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};
//Stack for Home views
const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ChatUsersScreen" component={ChatUsersScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};
export {
  CameraStackNavigator,
  HomeStackNavigator,
  ProfileStackNavigator,
  authStack,
};
