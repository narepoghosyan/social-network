import { usersApi } from "../api/api";
import { updateObjectsInArray } from "../utils/object-helpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
const TOGGLE_IS_FOLLOWING = 'TOGGLE-IS-FOLLOWING'

let initialState = {
    users: [],
    totalUsersCount: 0,
    pageCount: 10,
    currentPage: 1,
    isFetching: true,
    isFollowingInProgress: [],
    fake: 1
}

const usersReducer = (state = initialState, action) => {
    switch(action.type){
        case FOLLOW:
            return {
                ...state,
                users: updateObjectsInArray(state.users, action.userId, "id", {followed: true}) 
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectsInArray(state.users, action.userId, "id", {followed: false}) 
            }
        case SET_USERS:
            return {...state, users: action.users};
        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.count};
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.page};
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching};
        case TOGGLE_IS_FOLLOWING:
                return {
                    ...state, isFollowingInProgress: action.isFetching ? [...state.isFollowingInProgress, action.userId] :
                    state.isFollowingInProgress.filter(id=>id != action.userId)
                }
        default: 
            return state;
    }
}

export const followSuccess = (userId) => ({type: FOLLOW, userId});
export const unfollowSuccess = (userId) => ({type: UNFOLLOW, userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setTotalUsersCount = (count) => ({type: SET_TOTAL_USERS_COUNT, count});
export const setCurrentPage = (page) => ({type: SET_CURRENT_PAGE, page});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const toggleFollowingProgress = (isFetching, userId) => ({type:TOGGLE_IS_FOLLOWING, isFetching, userId})

export const requestUsers = (page, pageCount) => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));
        
        let data = await usersApi.getUsers(page, pageCount);
        dispatch(setUsers(data.items))
        dispatch(setTotalUsersCount(data.totalCount))
        dispatch(toggleIsFetching(false));
    }
}

const followUnfollowFlow = async (dispatch, userId, apiName, actionCreator) => {
    dispatch(toggleFollowingProgress(true, userId))
    let response = await apiName(userId);
    if(response.data.resultCode === 0){
        dispatch(actionCreator(userId))
        dispatch(toggleFollowingProgress(false, userId))
    }
}

export const follow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersApi.follow.bind(usersApi), followSuccess)
    }
}

export const unfollow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersApi.unfollow.bind(usersApi), unfollowSuccess)
    }
}

export default usersReducer;
