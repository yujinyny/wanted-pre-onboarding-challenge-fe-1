import { createStore } from "redux";
import authReducer from "./auth/reducer";

const store = createStore(authReducer);

export default store;
