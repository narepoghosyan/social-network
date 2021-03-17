import { profileApi, usersApi } from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';
const DELETE_POST = 'DELETE-POST';

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
        default:
            return state;
    }
}

export const addPostActionCreator = (post) => ({type: ADD_POST, post});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status) => ({type: SET_STATUS, status})
export const deletePostActionCreator = (postId) => ({type: DELETE_POST, postId})

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

export default profileReducer;