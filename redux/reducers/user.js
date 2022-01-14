import {
  USER_STATE_CHANGED,
  USER_POSTS_STATE_CHANGED,
} from "../constants/constants";
//Initialstate of currentuser and posts
const initialState = {
  currentUser: null,
  posts: [],
};
//Checking whether it is the user state or post state that is being changed and then update it
export const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_STATE_CHANGED:
      return {
        ...state,
        currentUser: action.currentUser,
      };
    case USER_POSTS_STATE_CHANGED:
      return {
        ...state,
        posts: action.posts,
      };
    default:
      return state;
  }
};
