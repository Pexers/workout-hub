/*
 *
 * Copyright (c) Sun Sep 26 2021, Pexers (https://github.com/Pexers)
 *
 */

import React from 'react'
import '../../styles/Countdown.css'

import ReactCountDown from 'react-countdown'
import { Container, Row, Col } from 'react-bootstrap'
import { IoMdTime } from 'react-icons/io'

/**
 * @param {Number} duration total duration in milliseconds
 * @param {function} onComplete handler called when time reaches zero
 */
export default function Countdown({ duration, onComplete }) {
    if (duration <= 0)
        onComplete()
    return (
        <Container fluid className='px-0 overlayCountDown'>
            <Row noGutters className='h-100'>
                <Col />
                <Col className='my-auto mx-auto'>
                    <h1 className='text-center mb-0' style={{ color: 'white' }}>
                        <IoMdTime className='mr-1 countdownIcon' />
                        <ReactCountDown date={Date.now() + duration} daysInHours={true} onComplete={onComplete} />
                    </h1>
                    <button className='yellowButton rounded mx-auto mt-3'
                        onClick={onComplete}>
                        <h4 className='my-auto'>Skip</h4>
                    </button>
                </Col>
                <Col>

                </Col>
            </Row>
        </Container>
    );
}
