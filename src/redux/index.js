import { createStore } from "redux";
import userReducer from "./auth/reducer";

const store = createStore(userReducer);

export default store;
