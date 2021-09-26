/*
 *
 * Copyright (c) Sun Sep 26 2021, Pexers (https://github.com/Pexers)
 *
 */

import React from 'react'

/**
 * @param {object} history used for navigation between components
 * @param {boolean} isLoggedIn determines wheter the current user is logged in(true) or not(false)
 */
export default function ServerError({ isLoggedIn, history }) {

    return (
        <>
            <div className='text-center'>
                <div className='d-inline-block' style={{ fontSize: '100px' }}>500</div>
                <div className='d-inline-block' style={{ fontSize: '50px' }}>Server error</div>
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