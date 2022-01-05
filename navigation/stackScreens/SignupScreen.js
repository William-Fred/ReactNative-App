import React, { useState, createRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import SignUp from "../../components/SignUp";
export default function SignupScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#214F4B", "#8B9D83"]}
        style={styles.linearGradient}
      >
        <SignUp />
      </LinearGradient>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
  },
});
