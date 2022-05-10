const INITIAL_STATE = {
    //Capitalized syntax means 'Do not try to modify this!'
    isSignedIn: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SIGN_IN":
            return { ...state, isSignedIn: true };
        case "SIGN_OUT":
            return { ...state, isSignedIn: false };
        default:
            return state;
    }
};
