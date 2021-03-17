import { authApi } from "../api/api";
import {stopSubmit} from "redux-form";

const SET_AUTH_DATA = 'SET-AUTH-DATA';

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_AUTH_DATA:
            return {
                ...state,
                ...action.authData,
            }
        default: 
            return state;
    }
}

export const setAuthData = (id, email, login, isAuth) => ({type:SET_AUTH_DATA, authData: {id, email, login, isAuth}})
export const getAuthData = () => async (dispatch) => {
    let response = await authApi.me();
    if(response.data.resultCode === 0){
        let {id, email, login} = response.data.data;
        dispatch(setAuthData(id, email, login, true));
    }
}

export const login = (email, password, rememberMe) => async (dispatch) => {
    let response = await authApi.login(email, password, rememberMe);
    
    if(response.data.resultCode === 0){
        dispatch(getAuthData());
    } else {
        let message = response.data.messages.length? response.data.messages[0] : 'Some error';
        dispatch(stopSubmit("login", {_error: message}))
    }
}

export const logout = () => async (dispatch) => {
    let response = await authApi.logout();
    
    if(response.data.resultCode === 0){
        dispatch(setAuthData(null, null, null, false))
    }
}

export default authReducer;