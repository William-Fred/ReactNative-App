import React, { useEffect, useState, createRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FlatList, TextInput } from "react-native-gesture-handler";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export default function LoginScreen({ navigation }) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");

  const signIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(Email, Password)
      .then((result) => {
        console.log(result);
        console.log("err");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FFF", "#111D4A"]}
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
              style={styles.textInput}
              placeholder="Email.."
              onChangeText={(Email) => setEmail(Email)}
            ></TextInput>

            <TextInput
              style={styles.textInput}
              placeholder="Password.."
              onChangeText={(Password) => setPassword(Password)}
            ></TextInput>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.loginText}>Logg in</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bottomTextContainer}>
            <TouchableOpacity>
              <Text style={styles.bottomText}>Forgott password?</Text>
            </TouchableOpacity>
            <Text style={styles.bottomText}>Dont have any accout?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text style={styles.signUpButton}>Sign up here</Text>
            </TouchableOpacity>
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
  imageStyle: {
    width: "400%",
    height: "400%",
    transform: [
      { translateX: -300 },
      { translateY: -300 },
      { rotate: "-45deg" },
    ],
    position: "absolute",
    top: "-100%",
    left: 0,
    flex: 1,
    opacity: 0.1,
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginTop: 50,
  },
  input: {
    height: "50%",
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
    color: "#333",
    fontSize: 18,
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  topSection: {
    backgroundColor: "transparent",
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
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  bottomTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  bottomText: {
    color: "#fff",
    margin: 5,
  },
  loginButton: {
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "rgba(115, 29, 6, 0.2)",
    marginTop: 20,
    width: 100,
    height: 30,
    borderWidth: 1,
    borderColor: "#fff",
  },
  loginText: {
    marginTop: 4,
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
  },
  signUpButton: {
    color: "#fff",
    margin: 5,
    textDecorationLine: "underline",
  },
});

// colors
// Yellow -EFECCA
// Blue -011936
// red- F48668
// purple- 111D4A
// grey - 797D81
