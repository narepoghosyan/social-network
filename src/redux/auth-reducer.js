import { authApi, securityApi } from "../api/api";
import {stopSubmit} from "redux-form";

const SET_AUTH_DATA = 'SET-AUTH-DATA';
const GET_CAPTCHA_URL = 'GET-CAPTCHA-URL'

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaURL: null,
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_AUTH_DATA:
        case GET_CAPTCHA_URL:
            return {
                ...state,
                ...action.authData,
            }
        default: 
            return state;
    }
}

export const setAuthData = (id, email, login, isAuth) => ({type:SET_AUTH_DATA, authData: {id, email, login, isAuth}})
export const getCaptchaUrlSuccess = (captchaURL) => ({type:GET_CAPTCHA_URL, authData: {captchaURL}})
export const getAuthData = () => async (dispatch) => {
    let response = await authApi.me();
    if(response.data.resultCode === 0){
        let {id, email, login} = response.data.data;
        dispatch(setAuthData(id, email, login, true));
    }
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    let response = await authApi.login(email, password, rememberMe, captcha);
    
    if(response.data.resultCode === 0){
        dispatch(getAuthData());
    } else {
        if(response.data.resultCode === 10){
            dispatch(getCaptchaUrl())
        }

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

export const getCaptchaUrl = () => async (dispatch) => {
    let response = await securityApi.getCaptchaUrl();
    let url = response.data.url;
    dispatch(getCaptchaUrlSuccess(url))
}

export default authReducer;