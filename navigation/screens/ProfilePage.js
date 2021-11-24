import React, { useState, UseEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
} from "react-native";

export default function ProfilePage({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

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
      <View style={styles.section_top_image}>
        <View>
          <Pressable onPress={() => setModalVisible(true)}>
            <Image
              style={styles.image}
              source={require("./../../images/nature.jpg")}
            ></Image>
          </Pressable>
        </View>
      </View>

      <View style={styles.section_top_info_container}>
        <View style={styles.section_top_info_one}>
          <View style={styles.section_top_info_two}>
            <Text style={styles.infoText}>Posts</Text>
            <Text>12</Text>
          </View>
          <View style={styles.section_top_info_two}>
            <Text style={styles.infoText}>Followers</Text>
            <Text>200</Text>
          </View>
          <View style={styles.section_top_info_two}>
            <Text style={styles.infoText}>Following</Text>
            <Text>200</Text>
          </View>
        </View>
      </View>
    </View>
    // </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  section_top_image: {
    height: "20%",
    width: "35%",
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
});
