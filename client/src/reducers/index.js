import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form"; //Rename is as formReducer so it's less confusing(optional)
import authReducer from "./authReducer";

export default combineReducers({
    auth: authReducer,
    form: formReducer
});
