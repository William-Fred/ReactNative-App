import React, { Component } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from "react-native";
import { Constants } from "expo";
import io from "socket.io-client/dist/socket.io";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
const SOCKET_URL = "http://193.10.195.200:3000";

export default class ChatScreen extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.route);
    this.state = {
      reciever: this.props.route.params,
      connected: false,
      chatMessage: "",
      chatMessages: [],
    };
  }

  //Connecting socket with local ip
  connectSocket = () => {
    this.socket = io(SOCKET_URL, {
      transports: ["websocket"],
      reconnectionAttempts: 15,
    });
    this.setState({ connected: true });
  };

  //Subbmitting chattmessages and then clears the state after the message is sent
  submitChatMessage() {
    this.socket.emit("chat message", this.state.chatMessage);
    this.setState({ chatMessage: "" });
    console.log(this.state);
  }

  //Creating an event for chat messages and
  componentDidMount() {
    this.connectSocket();
    this.socket.on("chat message", (message) => {
      this.setState({ chatMessages: [...this.state.chatMessages, message] });
    });
    console.log(this.state);
  }

  render() {
    const keyboardVerticalOffset =
      Platform.OS === "ios" ? 90 : 0 && Platform.OS === "web";
    const chatMessages = this.state.chatMessages.map((chatMessage) => (
      <Text key={chatMessage}>{chatMessage}</Text>
    ));

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="height"
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        {/* <Text>Chatting with {this.state.reciever.users.Name}</Text> */}
        {chatMessages}
        <TextInput
          autoCorrect={false}
          style={styles.textInput}
          onSubmitEditing={() => {
            this.submitChatMessage();
          }}
          value={this.state.chatMessage}
          placeholder="Text message.."
          onChangeText={(chatMessage) => {
            this.setState({ chatMessage });
          }}
        ></TextInput>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
  },
  ChatText: {
    borderColor: "#fff",
    borderWidth: 3,
    borderRadius: 50,
  },
  textInput: {
    position: "absolute",
    left: 0,
    bottom: 4,
    right: 0,
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
  },
});
