import React, { useState, createRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TextInput } from "react-native-gesture-handler";
export default function SignupScreen() {
  const [Email, setEmail] = useState("");
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [errorTextEmail, setErrorTextEmail] = useState("");
  const [errorTextUsername, setErrorTextUsername] = useState("");
  const [errorTextPassword, setErrorTextPassword] = useState("");
  const emailInputRef = createRef();
  const usernameInputRef = createRef();
  const passwordInputRef = createRef();

  const handleSubmit = () => {
    if (!Email) {
      setErrorTextEmail("Fill email");
    }
    if (!Username) {
      //   alert("Please fill username");
      setErrorTextUsername("Fill username");
    }
    if (!Password) {
      alert("Please fill password");
    }

    const User = {
      Email: Email,
      Username: Username,
      Pass: Password,
    };
    console.log(User);
    fetch("http://localhost:3117/api/User", {
      method: "POST",
      headers: {
        //Header Defination
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(User),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      })
      .catch((error) => {
        //Hide Loader
        // setLoading(false);
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#F48668", "#111D4A"]}
        style={styles.linearGradient}
      >
        <View style={styles.topSection}>
          <Text>Sign up</Text>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.input}>
            <TextInput
              placeholder="Email.."
              placeholderTextColor="#333"
              style={styles.textInput}
              ref={emailInputRef}
              onChangeText={(Email) => setEmail(Email)}
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
            ></TextInput>
            <Text>{errorTextEmail}</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Username.."
              placeholderTextColor="#333"
              ref={usernameInputRef}
              onChangeText={(Username) => setUsername(Username)}
              onSubmitEditing={() =>
                usernameInputRef.current && usernameInputRef.current.focus()
              }
            ></TextInput>
            <Text>{errorTextUsername}</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Password.."
              placeholderTextColor="#333"
              ref={passwordInputRef}
              onChangeText={(Password) => setPassword(Password)}
              onSubmitEditing={() =>
                passwordInputRef.current && passwordInputRef.current.focus()
              }
            ></TextInput>
            <Text>{errorTextPassword}</Text>
            <TouchableOpacity
              style={styles.signUpButton}
              onPress={handleSubmit}
            >
              <Text style={styles.signUpText}>Sign up!</Text>
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
    flex: 1,
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  input: {
    height: "80%",
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
    fontSize: 15,
    margin: 20,
    height: 50,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 10,
    textAlign: "center",
  },
  topSection: {
    backgroundColor: "transparent",
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
    fontSize: 14,
    color: "#fff",
  },
});
