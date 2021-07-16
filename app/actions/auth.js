import * as actionTypes from "./actionTypes";

const onLogin = (data) => {
  return {
    type: actionTypes.LOGIN,
    data,
  };
};

const updateProfile = (data) => {
  return {
    type: actionTypes.UPDATE_PROFILE,
    data,
  };
};

export const authentication = (login, callback) => (dispatch) => {
  //call api and dispatch action case
  setTimeout(() => {
    let data = {
      success: login,
    };
    dispatch(onLogin(data));
    if (typeof callback === "function") {
      callback({ success: true });
    }
  }, 500);
};

export const onUpdateProfile = (profile) => (dispatch) => {
  dispatch(updateProfile(profile));
};
