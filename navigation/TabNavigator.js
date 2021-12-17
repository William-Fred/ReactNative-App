import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import {
  CameraStackNavigator,
  HomeStackNavigator,
  ProfileStackNavigator,
  authStack,
} from "./StackNavigator";
const Tab = createBottomTabNavigator();

const AuthTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="auth" component={authStack} />
    </Tab.Navigator>
  );
};
//Bottom tabs
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="login"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let RouteName = route.name;

          //check if rout name is home
          if (RouteName === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (RouteName === "Api") {
            iconName = focused ? "list" : "list-outline";
          } else if (RouteName === "Camera") {
            iconName = focused ? "camera" : "camera-outline";
          } else if (RouteName === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }
          return (
            <Ionicons name={iconName} size={size} color={color}></Ionicons>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Camera" component={CameraStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
};
export { BottomTabNavigator, AuthTabNavigator };
