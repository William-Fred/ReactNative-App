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
import io from "socket.io-client/dist/socket.io";
import "firebase/compat/auth";

const SOCKET_URL = "http://172.20.10.2:3000";

export default class ChatScreen extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      connected: false,
      chatMessage: "",
      chatMessages: [],
      username: "",
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
    this.setState({
      chatMessage: "",
    });
    console.log(this.state);
  }

  //Creating an event for chat messages with socket.on. Event is named "chat message"
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
    const behavior =
      Platform.OS === "ios"
        ? "height"
        : "height" && Platform.OS === "android"
        ? "padding"
        : "padding";

    const chatMessages = this.state.chatMessages.map((chatMessage, index) => (
      <View>
        <Text style={styles.ChatText} key={index}>
          {chatMessage}
        </Text>
      </View>
    ));

    return (
      <KeyboardAvoidingView
        style={styles.container}
        enabled={true}
        behavior={behavior}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <View style={styles.chatContainer}>
          <Text style={styles.title}>Chatt with piccon!!</Text>
        </View>
        {chatMessages}
        <TextInput
          autoCorrect={false}
          style={styles.textInput}
          onSubmitEditing={() => {
            this.submitChatMessage();
          }}
          value={this.state.chatMessage}
          placeholder="Text message.."
          placeholderTextColor="#fff"
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
    backgroundColor: "#214F4B",
  },
  ChatText: {
    color: "#fff",
    fontSize: 20,
  },
  textInput: {
    position: "absolute",
    left: 0,
    bottom: 4,
    right: 0,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#fff",
    color: "#fff",
  },
  chatContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 30,
    fontStyle: "italic",
    textDecorationLine: "underline",
  },
  list: {
    marginTop: 20,
  },
});
