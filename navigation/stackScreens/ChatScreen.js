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

// //imports for redux
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// //Method fetchUser from redux-actions
// import { fetchUser, fetchImagePosts } from "../../redux/actions/actions";

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

    // const result = [];
    // result.push({
    //   receiver: this.state.receiver,
    //   username: this.props.currentUser.Name,
    //   chatMessages: [this.state.chatMessages],
    // });

    // console.log(result);
    // if (result[0].receiver === this.state.receiver) {
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

        {/* <FlatList
          data={chatMessages}
          numColumns={1}
          style={styles.list}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.ChatText}>{item.chatMessages}</Text>
            </View>
          )}
        ></FlatList> */}
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
  // if (this.state.combinedList.receiver === this.state.username)
  //   return (
  //     <KeyboardAvoidingView
  //       style={styles.container}
  //       enabled={true}
  //       behavior={behavior}
  //       keyboardVerticalOffset={keyboardVerticalOffset}
  //     >
  //       <View style={styles.chatContainer}>
  //         <Text style={styles.title}>Chatt with piccon!!</Text>
  //       </View>
  //       {/* {chatMessages} */}

  //       <FlatList
  //         data={chatMessages}
  //         style={styles.list}
  //         renderItem={({ item }) => (
  //           <View>
  //             {/* <Text>{}</Text> */}
  //             <Text style={styles.ChatText}>{item}</Text>
  //           </View>
  //         )}
  //       ></FlatList>
  //       <TextInput
  //         autoCorrect={false}
  //         style={styles.textInput}
  //         onSubmitEditing={() => {
  //           this.submitChatMessage();
  //         }}
  //         value={this.state.chatMessage}
  //         placeholder="Text message.."
  //         onChangeText={(chatMessage) => {
  //           this.setState({ chatMessage });
  //         }}
  //       ></TextInput>
  //     </KeyboardAvoidingView>
  //   );
  // }
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
