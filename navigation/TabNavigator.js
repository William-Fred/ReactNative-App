import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import {
  CameraStackNavigator,
  HomeStackNavigator,
  ProfileStackNavigator,
  authStack,
  MapStackNavigator,
} from "./StackNavigator";
const Tab = createBottomTabNavigator();

const AuthTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Auth"
      barStyle={{ backgroundColor: "white" }}
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let RouteName = route.name;
          color = "#334E58";
          if (RouteName === "Auth") {
            iconName = focused ? "person" : "person-outline";
          }
          return (
            <Ionicons name={iconName} size={size} color={color}></Ionicons>
          );
        },
      })}
    >
      <Tab.Screen name="Auth" component={authStack} />
    </Tab.Navigator>
  );
};
//Bottom tabs
const BottomTabNavigator = (props) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let RouteName = route.name;

          //check if rout name is home
          if (RouteName === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (RouteName === "Cameras") {
            iconName = focused ? "camera" : "camera-outline";
          } else if (RouteName === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (RouteName === "Maps") {
            iconName = focused ? "map" : "map-outline";
          }
          return (
            <Ionicons name={iconName} size={size} color={color}></Ionicons>
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{ tabBarStyle: { backgroundColor: "#333" } }}
      />
      <Tab.Screen name="Cameras" component={CameraStackNavigator} />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        navigation={props.naviagate}
      ></Tab.Screen>
      <Tab.Screen name="Maps" component={MapStackNavigator} />
    </Tab.Navigator>
  );
};
export { BottomTabNavigator, AuthTabNavigator };
