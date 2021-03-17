import {createSelector} from 'reselect';

const getUsersSelector = (state) => {
    return state.usersPage.users;
}

export const getUsers = createSelector(getUsersSelector, (users) => {
    return users.filter((u) => true)
})

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage;
}

export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount;
}

export const getPageCount = (state) => {
    return state.usersPage.pageCount;
}

export const getIsFetching = (state) => {
    return state.usersPage.isFetching;
}

export const getIsFollowingInProgress = (state) => {
    return state.usersPage.isFollowingInProgress;
}