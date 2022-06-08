import streams from "../apis/streams";
import {
    SIGN_IN,
    SIGN_OUT,
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM
} from "./types";

//Action Creator

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId,
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT,
    };
};

export const createStream = formValues => async (dispatch, getState) => {
    //Add redux builtin argument getState: you can access to state and pull out some data.
    const { userId } = getState().auth; //destructure out userId 
    const response = await streams.post("/streams", {...formValues, userId});
    //^take all the form values and combine userId too

    dispatch({ type: CREATE_STREAM, payload: response.data });
    //To use async with redux-thunk.. you need to call `dispatch` manually and pass action(either object or function) in it.
    //instead of returning an object `return { type: 'FETCH_POST', payload: response }`, call dispatch and pass object in it because I'm using redux-thunk.
};

export const fetchStreams = () => async dispatch => {
    const response = await streams.get('/streams');

    dispatch({ type: FETCH_STREAMS, payload: response.data});
};

export const fetchStream = (id) => async dispatch => {
    const response = await streams.get(`/streams/${id}`);

    dispatch({ type: FETCH_STREAM, payload: response.data});
};

export const editStream = (id, formValues) => async dispatch => {
    const response = await streams.put(`streams/${id}`, formValues);

    dispatch({ type: EDIT_STREAM, payload: response.data});
};

export const deleteStream = (id) => async dispatch => {
    await streams.delete(`streams/${id}`);
    //response is not needed in delete

    dispatch({ type: DELETE_STREAM, payload: id});
    //To make sure correct stream is deleted, pass id into payload
};



