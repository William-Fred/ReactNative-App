import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TextInput } from "react-native-gesture-handler";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#F48668", "#111D4A"]}
        style={styles.linearGradient}
      >
        <View style={styles.topSection}>
          <Image
            style={styles.image}
            source={require("./../../images/nature.jpg")}
          ></Image>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.input}>
            <TextInput
              placeholder="Username.."
              placeholderTextColor="#fff"
              style={styles.textInput}
            ></TextInput>
            <TextInput
              style={styles.textInput}
              placeholder="Password.."
              placeholderTextColor="#fff"
            ></TextInput>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    // height: "100%",
    // width: "100%",
    flex: 1,
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  input: {
    height: "40%",
    width: "80%",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255, 0.2)",
    shadowColor: "rgba(121, 125, 129, 0.1) ",
    shadowOffset: { width: 2, height: 2 },
    borderRadius: 50,
  },
  textInput: {
    color: "white",
    fontSize: 20,
  },
  topSection: {
    backgroundColor: "rgba(1, 25, 54, 0.1)",
    alignItems: "center",
    flex: 0.2,
  },
  image: {
    marginTop: 25,
    height: 170,
    width: 170,
    borderRadius: 150,
    borderWidth: 2,
    borderColor: "rgba(255,255,255, 0.2)",
    borderBottomColor: "rgba(255,255,255, 0.2)",
    shadowColor: "rgba(121, 125, 129, 1) ",
    shadowOffset: { width: 2, height: 2 },
  },
});

// colors
// Yellow -EFECCA
// Blue -011936
// red- F48668
// purple- 111D4A
// grey - 797D81
