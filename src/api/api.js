import * as axios from 'axios';
import { saveProfile } from '../redux/profile-reducer';
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
    },

    savePhoto(photo){
        const formData = new FormData();
        formData.append("image", photo);
        
        return instance.put('profile/photo', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
    },

    saveProfile(profile){
        return instance.put('profile', profile)
    }
}

export const authApi = {
    me(){
        return instance.get('auth/me');
    },

    login(email, password, rememberMe, captcha = null){
        debugger;
        return instance.post('auth/login', {email, password, rememberMe, captcha});
    },

    logout(){
        return instance.delete('auth/login');
    }
}

export const securityApi = {
    getCaptchaUrl(){
        return instance.get('security/get-captcha-url')
    }
}