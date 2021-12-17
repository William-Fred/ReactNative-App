import React, { useState, createRef, useEffect } from "react";
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
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
export default function SignupScreen({ navigation }) {
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
              style={styles.textInput}
              placeholder="name"
              onChangeText={(Name) => setName(Name)}
            ></TextInput>

            <TextInput
              style={styles.textInput}
              placeholder="email"
              onChangeText={(Email) => setEmail(Email)}
            ></TextInput>

            <TextInput
              style={styles.textInput}
              placeholder="password"
              secureTextEntry={true}
              onChangeText={(Password) => setPassword(Password)}
            ></TextInput>

            <TouchableOpacity style={styles.signUpButton} onPress={signUp}>
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
// const handleSubmit = () => {
//   if (!Email) {
//     setErrorTextEmail("Fill email");
//   }
//   if (!Username) {
//     //   alert("Please fill username");
//     setErrorTextUsername("Fill username");
//   }
//   if (!Password) {
//     alert("Please fill password");
//   }

//   const User = {
//     Email: Email,
//     Username: Username,
//     Pass: Password,
//   };
//   console.log(User);
//   fetch("http://localhost:3117/api/User", {
//     method: "POST",
//     headers: {
//       //Header Defination
//       Accept: "application/json",
//       "Content-Type": "application/json; charset=utf-8",
//     },
//     body: JSON.stringify(User),
//   })
//     .then((response) => response.json())
//     .then((responseJson) => {
//       console.log(responseJson);
//     })
//     .catch((error) => {
//       //Hide Loader
//       // setLoading(false);
//       console.error(error);
//     });
// };
