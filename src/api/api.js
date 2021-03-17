import * as axios from 'axios';
import { follow, unfollow } from '../redux/users-reducer';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '15ee598e-2b17-4d5b-a28b-e5d411f5a1cf'
    }
})

export const usersApi = {
    getUsers(currentPage, pageCount){
        return instance.get(`users?page=${currentPage}&count=${pageCount}`)
        .then(response => {
            return response.data
        })
    },

    follow(userId){
        return instance.post(`follow/${userId}`)
    },

    unfollow(userId){
        return instance.delete(`follow/${userId}`)
    },

    getProfile(userId){
        return profileApi.getProfile(userId);
    }
}

export const profileApi = {
    getProfile(userId){
        return instance.get('profile/' + userId)
    },

    getStatus(userId){
        return instance.get('profile/status/' + userId)
    },

    updateStatus(status){
        return instance.put('profile/status', {status: status})
    }
}

export const authApi = {
    me(){
        return instance.get('auth/me');
    },

    login(email, password, rememberMe){
        return instance.post('auth/login', {email, password, rememberMe});
    },

    logout(){
        return instance.delete('auth/login');
    }
}