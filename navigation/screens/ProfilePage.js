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
} from "react-native";
import { connect } from "react-redux";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
function ProfilePage(props, { navigation }) {
  const { currentUser, posts } = props;
  // console.log({ currentUser, posts });
  const [modalVisible, setModalVisible] = useState(false);
  // // useEffect(() => {
  //   props.posts.id;
  // }, [props]);
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
      <View>
        <View>
          <Pressable onPress={() => setModalVisible(true)}>
            <Image
              style={styles.image}
              source={require("./../../images/nature.jpg")}
            ></Image>
          </Pressable>
        </View>
      </View>
      <View style={styles.mainFeed}>
        <Text>{currentUser.Name}</Text>
        <Text>{currentUser.Email}</Text>
        <FlatList
          numColumns={5}
          horizontal={false}
          data={posts}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => props.navigation.navigate("Maps")}>
              <Image
                style={{ height: 100, width: 100, aspectRatio: 1 / 1 }}
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
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
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
  infoText: {
    color: "black",
    marginLeft: 11,
    fontSize: 17,
    fontWeight: "bold",
    textDecorationLine: "underline",
    marginTop: 5,
  },
  textUnder: {
    marginLeft: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "white",
    marginTop: 5,
    marginLeft: 10,
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
    justifyContent: "center",
    alignItems: "center",
  },
});
