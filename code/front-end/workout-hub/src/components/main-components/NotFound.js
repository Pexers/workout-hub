/*
 *
 * Copyright (c) Sun Sep 26 2021, Pexers (https://github.com/Pexers)
 *
 */

import React from 'react'
import '../../styles/NotFound.css'

/**
 * @param {object} history used for navigation between components
 * @param {boolean} isLoggedIn determines wheter the current user is logged in(true) or not(false)
 */
export default function NotFound({ history, isLoggedIn }) {

    return (
        <>
            <div className='NotFound text-center'>
                <div className='d-inline-block' style={{ fontSize: '100px' }}>404</div>
                <div className='d-inline-block' style={{ fontSize: '50px' }}>Page not found!</div>
            </div>
            {isLoggedIn
                ? <button className='darkButton mx-auto'
                    onClick={() => history.push('/myPlans')}>
                    <h5 className='my-auto'>Go to My plans page</h5>
                </button>
                : <button className='darkButton mx-auto'
                    onClick={() => history.push('/')}>
                    <h5 className='my-auto'>Go to Log in page</h5>
                </button>
            }
        </>
    );
}