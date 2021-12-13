export const GET_USERS = "GET_USERS";
export const SET_USER_NAME = "SET_USER_NAME";
export const SET_PASSWORD = "SET_PASSWORD";
export const LOGGED_IN_USER = "LOGGED_IN_USER";
export const SET_LOGIN_STATE = "SET_LOGIN_STATE";

export const setUsername = (username) => (dispatch) => {
  dispatch({
    type: SET_USER_NAME,
    payload: username,
  });
};

export const setPassword = (password) => (dispatch) => {
  dispatch({
    type: SET_PASSWORD,
    payload: password,
  });
};

const setLoginState = (loginData) => {
  return {
    type: SET_LOGIN_STATE,
    payload: loginData,
  };
};

export const loggedInUser = (user) => {
  return (dispatch) => {
    fetch("http://localhost:3117/api/User/Loggin", {
      method: "POST",
      headers: {
        //Header Defination
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({ username: user.username, pass: user.pass }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (
          responseJson[0].Username === user.username &&
          responseJson[0].Pass === user.pass
        ) {
          //   dispatch(setLoginState({ ...json, user_id: user.username }));
          //   console.log(user_id);
          console.log(responseJson);
        }

        // if (
        //   responseJson[0].Username === username &&
        //   responseJson[0].Pass === password
        // ) {
        //   navigation.navigate("Home");
        // }
        // setUserLoggedIn(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  };
};
export const getUser = () => {
  return (dispatch) => {
    fetch("http://localhost:3117/api/User", {
      method: "GET",
      headers: {
        //Header Defination
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        dispatch({
          type: GET_USERS,
          payload: responseJson,
        });
        console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  };
};
