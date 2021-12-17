import { USER_STATE_CHANGED } from "../constants/constants";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

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
