import {
  GET_USERS,
  SET_USER_NAME,
  SET_PASSWORD,
  SET_LOGIN_STATE,
} from "./actions";

const initialState = {
  user_id: "",
  username: "",
  password: "",
  email: "",
  isLoggedIn: false,
  users: [],
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case SET_USER_NAME:
      return {
        ...state,
        username: action.payload,
      };
    case SET_PASSWORD: {
      return {
        ...state,
        password: action.payload,
      };
    }
    case SET_LOGIN_STATE: {
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true,
      };
    }
    default: {
      return state;
    }
  }
}
export default userReducer;
