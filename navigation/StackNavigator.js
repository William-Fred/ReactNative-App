import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import CameraScreen from "./screens/Camera";
import savePhotoScreen from "./screens/savePhotoScreen";
import ChatScreen from "./stackScreens/ChatScreen";
import ProfilePage from "./screens/ProfilePage";
import LoginScreen from "./stackScreens/LoginScreen";
import SignupScreen from "./stackScreens/SignupScreen";
import ChatUsersScreen from "./stackScreens/ChatUsersScreen";
import MapScreen from "./screens/MapScreen";
import LogOut from "../components/LogOut";
import Ionicons from "react-native-vector-icons/Ionicons";
import "firebase/compat/auth";

//create stack navigator
const Stack = createStackNavigator();

//Stack for camera views
const CameraStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Cameras"
        component={CameraScreen}
        options={{
          title: "Camera",
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "#214F4B" },
        }}
      />
      <Stack.Screen
        name="savePhoto"
        component={savePhotoScreen}
        options={{
          title: "Save photo",
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "#214F4B" },
        }}
      />
    </Stack.Navigator>
  );
};
//Stack for profilepage
const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfilePage"
        component={ProfilePage}
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: "#214F4B" },
        }}
      />
    </Stack.Navigator>
  );
};

//Map stack
const MapStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "#214F4B" },
        }}
      />
    </Stack.Navigator>
  );
};
//login and signup
const authStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{
          headerTintColor: "#fff",
          title: "",
          headerStyle: {
            backgroundColor: "#214F4B",
            borderBottomWidth: "0",
            borderColor: "#333",
          },
        }}
      />
    </Stack.Navigator>
  );
};
//Stack for Home views
const HomeStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "PicCon",
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#214F4B" },
          headerLeft: () => <LogOut />,
          headerRight: () => (
            <View style={styles.iconPosition}>
              <Ionicons
                name="ios-chatbubbles-outline"
                style={styles.topBarChatIcon}
                onPress={() => {
                  navigation.navigate("Chat");
                }}
              />
            </View>
          ),
        }}
      />
      <Stack.Screen name="ChatUsersScreen" component={ChatUsersScreen} />
      <Stack.Screen
        name="Chat"
        options={{
          title: "Chat PicCon",
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#214F4B" },
        }}
        component={ChatScreen}
      />
    </Stack.Navigator>
  );
};
export {
  CameraStackNavigator,
  HomeStackNavigator,
  ProfileStackNavigator,
  authStack,
  MapStackNavigator,
};
const styles = StyleSheet.create({
  topBarChatIcon: {
    color: "#fff",
    flexDirection: "row",
    borderColor: "#fff",
    fontSize: 25,
  },
  iconPosition: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 20,
    width: 40,
    height: 40,
    marginRight: 10,
  },
});
