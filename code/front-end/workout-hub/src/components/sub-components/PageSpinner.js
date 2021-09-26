/*
 *
 * Copyright (c) Sun Sep 26 2021, Pexers (https://github.com/Pexers)
 *
 */

import React from 'react'

import { Spinner } from 'react-bootstrap'

/**
 * @param {object} children child components
 * @param {boolean} isLoadingActive determines wheter the spinner should be active(true) or not(false)
 */
export default function PageSpinner({ children, isLoadingActive }) {
    return (
        isLoadingActive
            ? <div className='d-flex justify-content-center align-items-center' style={{ color: '#4b4e5b', minHeight: '70vh' }} >
                <Spinner animation='border' /></div >
            : <div className='mb-3'>
                {children}
            </div>
    );
}

