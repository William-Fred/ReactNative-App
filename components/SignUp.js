import React, { useState, createRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  Button,
  Platform,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
export default function SignUp() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const signUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(Email, Password)
      .then((result) => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            Name,
            Email,
          });
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const keyboardVerticalOffset =
    Platform.OS === "ios" ? 90 : 0 && Platform.OS === "web";
  const behavior =
    Platform.OS === "ios"
      ? "height"
      : "height" && Platform.OS === "android"
      ? "padding"
      : "padding";
  return (
    <KeyboardAvoidingView
      style={styles.container}
      enabled={true}
      behavior={behavior}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View style={styles.topSection}>
        <Text style={styles.title}>Sign up</Text>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.input}>
          <TextInput
            style={styles.textInput}
            placeholder="name..."
            placeholderTextColor="#fff"
            onChangeText={(Name) => setName(Name)}
          ></TextInput>

          <TextInput
            style={styles.textInput}
            placeholder="email..."
            placeholderTextColor="#fff"
            onChangeText={(Email) => setEmail(Email)}
          ></TextInput>

          <TextInput
            style={styles.textInput}
            placeholder="password..."
            placeholderTextColor="#fff"
            secureTextEntry={true}
            onChangeText={(Password) => setPassword(Password)}
          ></TextInput>

          <TouchableOpacity style={styles.signUpButton} onPress={signUp}>
            <Text style={styles.signUpText}>Sign up!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  input: {
    height: "60%",
    width: "80%",
    // borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    // shadowColor: "rgba(121, 125, 129, 0.1) ",
    shadowOffset: { width: 2, height: 2 },
    borderRadius: 50,
  },
  textInput: {
    color: "#333",
    width: "70%",
    fontSize: 15,
    margin: 20,
    height: 50,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 10,
    textAlign: "center",
  },
  topSection: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.05,
  },
  signUpButton: {
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "rgba(115, 29, 6, 0.2)",
    marginTop: 20,
    width: 100,
    height: 30,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#fff",
  },
  signUpText: {
    marginTop: 4,
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  title: {
    width: "100%",
    height: "20%",
    textAlign: "center",
    padding: 40,
    color: "#fff",
    fontSize: 30,
    backgroundColor: "transparent",
  },
});
