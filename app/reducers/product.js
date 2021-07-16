import * as actionTypes from "@actions/actionTypes";
const initialState = {
  product: null,
  catalogo: null
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.PRODUCT:
      return {
        ...state,
        product: action.product,
      };
    case actionTypes.CATALOGO:
      return {
        ...state,
        catalogo: action.catalogo,
      };
    default:
      return state;
  }
};