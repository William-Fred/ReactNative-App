import React, { Component } from "react";
import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  Modal,
  Pressable,
  FlatList,
  TouchableOpacity,
} from "react-native";

//apikey
const apiKey = process.env.REACT_APP_API_KEY;

class ApiCalls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      brawlId: "",
      data: [],
      dataFilled: false,
      modalVisible: false,
    };

    //modalvisible
    this.setModalVisible = (visible) => {
      this.setState({ modalVisible: visible });
    };
    //Handles textinput
    this.handleChangeText = this.handleChangeText.bind(this);
  }
  handleChangeText = (value) => {
    this.setState({
      brawlId: value,
    });
  };

  brawlIdFetch = () => {
    return fetch(
      `https://api.brawlhalla.com/player/${this.state.brawlId}/stats?api_key=` +
        apiKey
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(process.env.REACT_APP_API_KEY);
        this.setState({
          data: responseJson,
          legendData: responseJson.legends,
          dataFilled: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Shows when hits button
  renderElement() {
    const { modalVisible } = this.state;
    const { data } = this.state;
    if (this.state.dataFilled) {
      return (
        <View>
          <Text style={styles.response}>Name: {data.name}</Text>
          <Text style={styles.response}>Games: {data.games}</Text>
          <Text style={styles.response}>wins: {data.wins}</Text>
          <Text style={styles.response}>Level: {data.level}</Text>
          <Text style={styles.response}>XP: {data.xp}</Text>
          <Modal
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal closed");
              this.setModalVisible(!modalVisible);
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 300,
                  height: 600,
                }}
              >
                <Text>hello world</Text>
                <Pressable onPress={() => this.setModalVisible(!modalVisible)}>
                  <FlatList
                    data={data.legends}
                    keyExtractor={({ id }, index) => id}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate("LegendDetails", {
                            data: item,
                          })
                        }
                      >
                        <Text>
                          {item.legend_name_key}, {item.damagedealt}
                        </Text>
                      </TouchableOpacity>
                    )}
                  ></FlatList>
                  <Text>Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <Pressable
            style={styles.button}
            onPress={() => this.setModalVisible(true)}
          >
            <Text style={styles.response}>Legends</Text>
          </Pressable>
        </View>
      );
    }
  }
  //legends
  // renderLegends(){
  //     const {data} = this.state;
  //     console.log(data)
  //     if(this.state.dataFilled){
  //         return(
  //             <FlatList
  //             data={data.legends}
  //             keyExtractor={({ id }, index) => id}
  //             renderItem={({ item }) => (
  //                 <Text>{item.legend_name_key}</Text>
  //             )}
  //             ></FlatList>
  //         )
  //     }
  // }

  render() {
    return (
      <View style={{ width: "80%" }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 20 }}>Type in your brawlhalla id</Text>
          <TextInput
            style={styles.input}
            placeholder="brawlhalla id"
            onChangeText={this.handleChangeText}
            value={this.state.brawlId}
          ></TextInput>
          <View>
            <Pressable style={[styles.button]} onPress={this.brawlIdFetch}>
              <Text style={styles.buttonText}>Get brawl stats</Text>
            </Pressable>
          </View>
          <View style={styles.apiView}>{this.renderElement()}</View>
          <View></View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  apiContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  apiView: {
    backgroundColor: "black",
    height: "50%",
    width: "100%",
    borderColor: "white",
    borderWidth: 3,
    borderTopWidth: 3,
  },
  apiTextView: {
    alignItems: "center",
    justifyContent: "center",
  },
  apiText: {
    color: "white",
    fontSize: 16,
  },
  input: {
    width: "100%",
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 10,
    padding: 10,
  },
  response: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#2196F3",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});
export default ApiCalls;
