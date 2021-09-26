/*
 *
 * Copyright (c) Sun Sep 26 2021, Pexers (https://github.com/Pexers)
 *
 */

import React from 'react'
import '../../styles/Buttons.css'

import { GoArrowLeft } from 'react-icons/go'

/**
 * @param {string} position position in web page
 * @param {function} onClick handler called on button click
 */
export default function GoBackButton({ position, onClick }) {

    return (
        <button onClick={onClick}
            className={'goBackButton ' + position}>
            <h5 className='my-auto'>
                <GoArrowLeft className='buttonIcon' />
                Back
            </h5>
        </button>
    )
}