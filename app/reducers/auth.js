import * as actionTypes from "@actions/actionTypes";
const initialState = {
  login: {
    success: true,
  },
  user: {
    lang: "es",
  },
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        login: action.data,
      };
    case actionTypes.UPDATE_PROFILE:
      return {
        // ...state,
        login: {
          success: {
            profile: action.data,
            success: true,
          },
        },
      };
    default:
      return state;
  }
};
