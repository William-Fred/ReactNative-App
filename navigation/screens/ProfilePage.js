import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  FlatList,
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { connect } from "react-redux";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
function ProfilePage(props, { navigation }) {
  const { currentUser, posts } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  useEffect(() => {
    getUserPosts();
  }, []);
  const getUserPosts = () => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .orderBy("creation", "asc")
      .get()
      .then((snapshot) => {
        let posts = snapshot.docs.map((images) => {
          const data = images.data();
          const id = images.id;
          return { id, ...data };
        });
        setUserPosts(posts);
      });
  };
  console.log(userPosts);
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Pressable
            onPress={() =>
              navigation.navigate("Camera", setModalVisible(!modalVisible))
            }
          >
            <Text style={styles.modalText}>Pick profile picture</Text>
          </Pressable>
          <Pressable onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.closeButton}>Cancel</Text>
          </Pressable>
        </View>
      </Modal>
      {/* <View> */}
      <View style={styles.first}>
        <LinearGradient colors={["#214F4B", "#8B9D83"]} style={styles.linear}>
          <Pressable onPress={() => setModalVisible(true)}>
            <Image
              style={styles.image}
              source={require("./../../images/nature.jpg")}
            ></Image>
          </Pressable>
          <Text style={styles.userText}>{currentUser.Name}</Text>
          <Text style={styles.userText}>{currentUser.Email}</Text>
          <Pressable style={styles.button} onPress={getUserPosts}>
            <Text style={styles.buttonText}>Get latest images</Text>
          </Pressable>
        </LinearGradient>
      </View>
      <View style={styles.mainFeed}>
        <FlatList
          numColumns={3}
          horizontal={false}
          data={userPosts}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => props.navigation.navigate("Maps")}>
              <Image
                style={styles.feedImage}
                source={{ uri: item.downloadURL }}
              />
            </TouchableOpacity>
          )}
        ></FlatList>
      </View>
    </View>
    // </View>
  );
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
});

export default connect(mapStateToProps, null)(ProfilePage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#214F4B",
  },
  first: {
    marginTop: 40,
    width: "100%",
    backgroundColor: "#214F4B",
    justifyContent: "center",
    alignItems: "center",
  },
  linear: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  section_top_image: {
    width: "100%",
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  section_top_info_container: {
    height: "20%",
    width: "65%",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  section_top_info_one: {
    flexDirection: "row",
  },
  section_top_info_two: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
  },

  feedImage: {
    height: 120,
    width: 120,
    aspectRatio: 1 / 1,
    margin: 5,
    borderWidth: 1,
    borderColor: "#fff",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "white",
    marginTop: 5,
    marginBottom: 10,
  },
  modalView: {
    margin: 20,
    marginTop: 250,
    backgroundColor: "rgba(255, 255,255, 0.8)",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#333",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  modalText: {
    fontSize: 20,
    borderBottomWidth: 1,
    borderColor: "black",
    color: "rgba(8,83,151, 0.8)",
  },
  closeButton: {
    fontSize: 20,
    borderRadius: 5,
    color: "rgba(8,83,151, 0.8)",
    marginTop: 10,
  },
  mainFeed: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8B9D83",
  },
  button: {
    marginTop: 10,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 20,
    backgroundColor: "#214F4B",
    opacity: 0.6,
  },
  buttonText: {
    margin: 3,
    fontSize: 18,
    color: "#fff",
  },
  userText: {
    color: "#fff",
  },
});
