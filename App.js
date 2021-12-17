import "react-native-gesture-handler";
import * as React from "react";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  BottomTabNavigator,
  AuthTabNavigator,
} from "./navigation/TabNavigator";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBa9ky8NQefKv4J7fqly7_mOfGkc_gKSD8",
  authDomain: "imageappreact.firebaseapp.com",
  projectId: "imageappreact",
  storageBucket: "imageappreact.appspot.com",
  messagingSenderId: "82655770027",
  appId: "1:82655770027:web:874c4f9601d07974e1ceee",
  measurementId: "G-DXR3C6NDL5",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
function App() {
  // Check if user is logged in
  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setLoggedIn(false);
        setLoaded(true);
      } else {
        setLoggedIn(true);
        setLoaded(true);
      }
    });
  });
  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading..</Text>
      </View>
    );
  }

  if (!loggedIn) {
    return (
      <NavigationContainer>
        <AuthTabNavigator />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
}

export default App;
