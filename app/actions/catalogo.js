import * as actionTypes from "./actionTypes";

//import { useDispatch } from "react-redux";
import { SearchCatalogueService } from "@services";

const setCatalogo = (catalogo) => {
  return {
    type: actionTypes.CATALOGO,
    catalogo,
  };
};

//const dispatch = useDispatch();

export const getCatalogo = (search) => (dispatch) => {
  dispatch(setCatalogo(SearchCatalogueService(search)));
};
