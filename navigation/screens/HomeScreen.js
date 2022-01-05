import React, { Component } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollContainer,
  ImageBackground,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
//Import sign out button
import ImageFeed from "../../components/ImageFeed";
//imports for redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//Method fetchUser from redux-actions
import { fetchUser, fetchImagePosts } from "../../redux/actions/actions";

export class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchImagePosts();
  }

  render() {
    const { currentUser } = this.props;
    console.log({ currentUser });
    if (currentUser === null) {
      return (
        <View>
          <Text>..User is null</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>{currentUser.Name} is logged in</Text>
        </View>
        <ImageFeed style={{ marginTop: 100 }} />
      </View>
    );
  }
}
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser, fetchImagePosts }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#214F4B",
  },
  // userText: {
  //   color: "transparant",
  // },
});
