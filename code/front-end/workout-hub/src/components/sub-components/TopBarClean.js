/*
 *
 * Copyright (c) Sun Sep 26 2021, Pexers (https://github.com/Pexers)
 *
 */

import React from 'react'
import '../../styles/TopBar.css'

import { Container, Row, Col } from 'react-bootstrap'

export default function TopBarClean() {
    return (
        <Container fluid className='px-0'>
            <Row noGutters className='TopBar' />
            <Row noGutters className='TopBarFrame' />
        </Container>
    );
}

