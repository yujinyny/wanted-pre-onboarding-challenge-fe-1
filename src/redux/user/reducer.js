import { LOGIN, LOGOUT } from "./action";

const initialState = { isLogin: false };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { isLogin: true };
    case LOGOUT:
      return { isLogin: false };
    default:
      return state;
  }
};

export default reducer;
