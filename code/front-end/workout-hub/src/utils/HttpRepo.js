/*
 *
 * Copyright (c) Sun Sep 26 2021, Pexers (https://github.com/Pexers)
 *
 */
 
/**
 * @param {string} token user token
 * @param {object} history used for navigation between components
 */
export function getHttpRepo(token, history) {

    const endPoint = 'http://localhost:8000'

    return {
        // GET -------------------------------------------------------

        getActivities(search, filters, skip) {
            return fetch(`${endPoint}/activity/?search=${search}&filters=${filters}&skip=${skip}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.ok)
                    return response.json()
                return -1
            }).catch(() => {
                history.push('/server-error')
                return -1
            })
        },

        getPlans() {
            return fetch(`${endPoint}/plan`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.ok)
                    return response.json()
                return -1
            }).catch(() => {
                history.push('/server-error')
                return -1
            })
        },

        getPlanActivities(idPlan) {
            return fetch(`${endPoint}/plan/${idPlan}/activities`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.ok)
                    return response.json()
                return -1
            }).catch(() => {
                history.push('/server-error')
                return -1
            })
        },

        getUsers(search, role, skip) {
            return fetch(`${endPoint}/user/?search=${search}&role=${role}&skip=${skip}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.ok)
                    return response.json()
                return -1
            }).catch(() => {
                history.push('/server-error')
                return -1
            })
        },

        // POST -------------------------------------------------------

        postLogin(username, password) {
            return fetch(`${endPoint}/auth/login`, {
                method: 'POST',
                headers: {
                    // Token not needed for this one
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            }).then(response => {
                if (response.ok)
                    return response.json()
                return -1
            }).catch(() => {
                history.push('/server-error')
                return -2
            })
        },

        postActivityToPlan(idPlan, idActivity, info) {
            return fetch(`${endPoint}/plan/${idPlan}/activity`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ idActivity, info })
            }).then(response => {
                if (response.ok)
                    return response.json()
                return -1
            }).catch(() => {
                history.push('/server-error')
                return -1
            })
        },

        // PUT -------------------------------------------------------

        putUserRole(idUser, role) {
            return fetch(`${endPoint}/user/role`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ idUser, role })
            }).then(response => {
                if (response.ok)
                    return response.json()
                return -1
            }).catch(() => {
                history.push('/server-error')
                return -1
            })
        },

        putUserData(data) {
            return fetch(`${endPoint}/user/data`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data })
            }).then(response => {
                if (response.ok)
                    return response.json()
                return -1
            }).catch(() => {
                history.push('/server-error')
                return -1
            })
        },

        // DELETE -------------------------------------------------------

        deleteUser(idUser) {
            return fetch(`${endPoint}/user/${idUser}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.ok)
                    return response.json()
                return -1
            }).catch(() => {
                history.push('/server-error')
                return -1
            })
        },
    }
}
