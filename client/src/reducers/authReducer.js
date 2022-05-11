import { SIGN_IN, SIGN_OUT } from "../actions/types";

const INITIAL_STATE = {
    //Capitalized syntax means 'Do not try to modify this!'
    isSignedIn: null,
    //instead of writing state=null in reducer, defining initial state like this helps other devs read the code better.
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            return { ...state, isSignedIn: true };
        case SIGN_OUT:
            return { ...state, isSignedIn: false };
        default:
            return state;
    }
};
