import { combineReducers } from "redux";
import { user } from "./user";

//Combining
const Reducers = combineReducers({
  userState: user,
});

export default Reducers;
