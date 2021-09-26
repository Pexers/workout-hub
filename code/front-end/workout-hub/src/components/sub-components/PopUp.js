/*
 *
 * Copyright (c) Sun Sep 26 2021, Pexers (https://github.com/Pexers)
 *
 */

import React from 'react'
import '../../styles/PopUp.css'

import { Container, Row, Col } from 'react-bootstrap'
import { IoMdCloseCircle } from 'react-icons/io'

/**
 * @param {boolean} isPopUpOpen determines wheter the popUp should be open(true) or not(false)
 * @param {object} children child components
 * @param {function} onClose handler called when popUp is closed
 */
export default function PopUp({ md, lg, xl, isPopUpOpen, onClose, children }) {
    return isPopUpOpen
        ? <Container fluid className='px-0 overlayPopUp'>
            <Row noGutters className='h-100'>
                <Col xs={0} md={md} lg={lg} xl={xl} className='my-auto mx-auto'>
                    <div className='PopUp'>
                        <IoMdCloseCircle className='closeButton popUpButton' onClick={onClose} />
                        <div className='popUpChildrenBox'>
                            {children}
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
        : null
}
