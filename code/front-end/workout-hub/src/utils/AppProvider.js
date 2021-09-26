/*
 *
 * Copyright (c) Sun Sep 26 2021, Pexers (https://github.com/Pexers)
 *
 */
 
import React, { createContext } from 'react'
import notify from './Notifications'
import { getHttpRepo } from './HttpRepo'

export const AppContext = createContext();

/**
 * @param {object} user user object
 * @param {string} token user token
 * @param {object} history used for navigation between components
 * @param {object} children child components
 */
export function AppProvider({ user, token, history, children }) {

    const value = {
        user: user,
        repo: getHttpRepo(token, history),
        notify: notify
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

