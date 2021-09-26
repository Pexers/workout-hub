/*
 *
 * Copyright (c) Sun Sep 26 2021, Pexers (https://github.com/Pexers)
 *
 */
 
export function getLoginService() {

    return {

        getToken() {
            return sessionStorage.getItem('TOKEN')
        },

        login(token, userInfo) {
            if (token != null)
                sessionStorage.setItem('TOKEN', token)
            sessionStorage.setItem('USER_INFO', JSON.stringify(userInfo))
        },

        logout() {
            sessionStorage.removeItem('TOKEN')
            sessionStorage.removeItem('USER_INFO')
        },

        isLoggedIn() {
            return sessionStorage.getItem('TOKEN') != null
        },

        getCurrentUser() {
            const userInfo = JSON.parse(sessionStorage.getItem('USER_INFO'))
            if (userInfo)
                return userInfo
            else return {
                username: 'ERROR',
                role: 'ERROR'
            }
        }
    }
}