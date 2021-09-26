/*
 *
 * Copyright (c) Sun Sep 26 2021, Pexers (https://github.com/Pexers)
 *
 */

import React, { useState } from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'

import Login from './Login'
import Activities from './Activities'
import MyPlans from './MyPlans'
import CustomActivities from './CustomActivities'
import Profile from './Profile'
import Settings from './Settings'
import NotFound from './NotFound'
import ServerError from './ServerError'
import TopBar from '../sub-components/TopBar'
import TopBarClean from '../sub-components/TopBarClean'

import { NotificationContainer } from 'react-notifications'
import { getLoginService } from '../../utils/Service'
import { AppProvider } from '../../utils/AppProvider'

/**
 * @param {object} history used for navigation between components
 */
function App({ history }) {

    const service = getLoginService()
    const [isLoggedIn, setIsLoggedIn] = useState(service.isLoggedIn())

    function onLogin(token, userInfo) {
        service.login(token, userInfo)
        setIsLoggedIn(true)
    }

    function onLogout() {
        service.logout()
        setIsLoggedIn(false)
        history.push('/')
    }

    return (
        <AppProvider
            user={service.getCurrentUser()} token={service.getToken()}
            history={history}>
            <NotificationContainer />
            {isLoggedIn
                ? <>
                    <TopBar onLogout={onLogout} />
                    <Switch>
                        <Route exact path='/activities' component={Activities} />
                        <Route exact path='/myPlans' component={MyPlans} />
                        <Route path='/customActivities' component={CustomActivities} />
                        <Route exact path='/profile'>
                            <Profile onDataChange={onLogin} />
                        </Route>
                        {service.getCurrentUser().role === 'Exerciser' ? null
                            : <Route path='/settings' component={Settings} />}
                        <Route exact path='/not-found'>
                            <NotFound history={history} isLoggedIn={true} />
                        </Route>
                        <Route exact path='/server-error'>
                            <ServerError history={history} isLoggedIn={true} />
                        </Route>
                        <Route><Redirect to='/myPlans' /></Route>
                    </Switch>
                </>
                : <>
                    <TopBarClean />
                    <Switch>
                        <Route exact path='/'>
                            <Login onLogin={onLogin} />
                        </Route>
                        <Route exact path='/not-found'>
                            <NotFound history={history} isLoggedIn={false} />
                        </Route>
                        <Route exact path='/server-error'>
                            <ServerError history={history} isLoggedIn={false} />
                        </Route>
                        <Route><Redirect to='/' /></Route>
                    </Switch>
                </>
            }
        </AppProvider>
    );
}

export default withRouter(App);