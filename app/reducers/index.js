import { combineReducers } from "redux";
import AuthReducer from "./auth";
import ApplicationReducer from "./application";
import ProductReducer from "./product";

export default combineReducers({
    auth: AuthReducer,
    application: ApplicationReducer,
    product: ProductReducer
});
