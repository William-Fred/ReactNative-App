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
        tabBarActiveTintColor: "#fff",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let RouteName = route.name;
          color = "#334E58";
          if (RouteName === "Logg in") {
            iconName = focused ? "person" : "person-outline";
          }
          return (
            <Ionicons name={iconName} size={size} color={color}></Ionicons>
          );
        },
      })}
    >
      <Tab.Screen
        name="Logg in"
        component={authStack}
        options={{ tabBarStyle: { backgroundColor: "#333", display: "none" } }}
      />
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
        tabBarActiveTintColor: "#FCAF58",
        tabBarInactiveTintColor: "#fff",
        labelStyle: {
          fontSize: 15,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let RouteName = route.name;

          //check if rout name is home
          color = "#fff";
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
        options={{ tabBarStyle: { backgroundColor: "#214F4B" } }}
      />
      <Tab.Screen
        name="Cameras"
        component={CameraStackNavigator}
        options={{
          tabBarStyle: {
            backgroundColor: "#214F4B",
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        navigation={props.naviagate}
        options={{
          title: "Profile",
          tabBarStyle: { backgroundColor: "#214F4B", borderTopWidth: 0 },
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Maps"
        component={MapStackNavigator}
        options={{ tabBarStyle: { backgroundColor: "#214F4B" } }}
      />
    </Tab.Navigator>
  );
};
export { BottomTabNavigator, AuthTabNavigator };
