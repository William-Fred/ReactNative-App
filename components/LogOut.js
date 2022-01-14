import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
export default function LogOut() {
  const onSignOut = () => {
    firebase.auth().signOut();
  };
  return (
    <View>
      <Ionicons
        name="log-out-outline"
        color="#fff"
        style={styles.signOutIcon}
        onPress={onSignOut}
      ></Ionicons>
    </View>
  );
}
<ion-icon name="log-out-outline"></ion-icon>;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  signOutIcon: {
    fontSize: 35,
    marginLeft: 10,
  },
});
