import {
  USER_STATE_CHANGED,
  USER_POSTS_STATE_CHANGED,
} from "../constants/constants";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

//Define action methods to be called.
//Fetch all users and all posts from database
export function fetchUser() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          console.log(snapshot);
          dispatch({ type: USER_STATE_CHANGED, currentUser: snapshot.data() });
        } else {
          console.log("not exists");
        }
      });
  };
}

export function fetchImagePosts() {
  return (dispatch) => {
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
        console.log(posts);
        dispatch({
          type: USER_POSTS_STATE_CHANGED,
          posts,
        });
      });
  };
}
