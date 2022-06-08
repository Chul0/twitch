import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form"; //Rename is as formReducer so it's less confusing(optional)
import authReducer from "./authReducer";
import streamReducers from "./streamReducers";

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    streams: streamReducers
});
