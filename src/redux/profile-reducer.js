import { profileApi, usersApi } from "../api/api";
import {stopSubmit} from 'redux-form';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';
const DELETE_POST = 'DELETE-POST';
const SAVE_PHOTO = 'SAVE-PHOTO'

let initialState = {
    posts: [
        {id: 1, message: 'How are you?', likesCount: 3},
        {id: 2, message: 'It\'s my first post', likesCount: 4},
      ],
    profile: null,
    status: ''
};

const profileReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_POST:
            let newPost = {
                id: 5,
                message: action.post,
                likesCount: 0
              }

              return {
                  ...state,
                  posts: [...state.posts, newPost],
              }    
        case SET_USER_PROFILE:
            return {...state, profile: action.profile} 
        case SET_STATUS:
            return {...state, status: action.status} 
        case DELETE_POST:
            return {...state, posts: state.posts.filter(p => p.id != action.postId)}
        case SAVE_PHOTO:
            return {...state, profile: {...state.profile, photos: action.photos}}
        default:
            return state;
    }
}

export const addPostActionCreator = (post) => ({type: ADD_POST, post});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status) => ({type: SET_STATUS, status})
export const deletePostActionCreator = (postId) => ({type: DELETE_POST, postId})
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO, photos})

export const getUserProfile = (userId) => async (dispatch) => {
    let response = await usersApi.getProfile(userId);
    
    dispatch(setUserProfile(response.data));
}

export const getStatus = (userId) => async (dispatch) => {
    let response = await profileApi.getStatus(userId);
    
    dispatch(setStatus(response.data))
}

export const updateStatus = (status) => async (dispatch) => {
    let response = await profileApi.updateStatus(status);
    
    if(response.data.resultCode === 0){
        dispatch(setStatus(status))
    }
}

export const savePhoto = (photo) => async (dispatch) => {
    let response = await profileApi.savePhoto(photo);
    if(response.data.resultCode === 0){
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export const saveProfile = (profile) => async (dispatch, getState) => {
    let response = await profileApi.saveProfile(profile);
    let userId = getState().auth.id
    if(response.data.resultCode === 0){
        dispatch(getUserProfile(userId))
    } else {
        dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}))
        return Promise.reject(response.data.messages[0])
    }
}

export default profileReducer;