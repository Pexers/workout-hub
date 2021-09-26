/*
 *
 * Copyright (c) Sun Sep 26 2021, Pexers (https://github.com/Pexers)
 *
 */

import React, { useState, useContext } from 'react'
import '../../styles/TopBar.css'

import { Container, Row, Col } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import { RiLogoutBoxRLine, RiFileSearchLine } from 'react-icons/ri'
import { GiHamburgerMenu } from 'react-icons/gi'
import { FaUser, FaRegEdit } from 'react-icons/fa'
import { FiSettings } from 'react-icons/fi'
import { ImProfile } from 'react-icons/im'
import { BiDumbbell } from 'react-icons/bi'

import { AppContext } from '../../utils/AppProvider'

/**
 * @param {function} onLogout handler called when user clicks in log out
 */
export default function TopBar({ onLogout }) {

    const { user } = useContext(AppContext)

    const currentMenu = useLocation().pathname.split('/')[1]

    const [isToolbarOpen, setIsToolbarOpen] = useState(false)

    return (
        <div className='TopBar'>
            <Container fluid className='px-0'>
                <Row noGutters>
                    {isToolbarOpen
                        ? <Col xs={12} lg={2} className='d-lg-none'>
                            <div className='overlayToolbar'
                                onClick={() => setIsToolbarOpen(false)} />
                            <Row noGutters>
                                <Col xs={9} md={5} className='toolbar'>
                                    <Row noGutters>
                                        <Col className='toolbarBanner text-center'>
                                            Workout Hub
                                        </Col>
                                    </Row>
                                    <h5 className='mt-1'>
                                        <div className='d-md-none'>
                                            <Link to='/myPlans' onClick={() => setIsToolbarOpen(false)}>
                                                <div className='userOptionXs'>
                                                    <div className='menuXsRef'
                                                        style={currentMenu === 'myPlans' ? { color: '#2cc97f' } : {}}>
                                                        <BiDumbbell className='toolbarXsIcons ml-2 mr-2' />My plans</div>
                                                </div>
                                            </Link>
                                            <Link to='/activities' onClick={() => setIsToolbarOpen(false)}>
                                                <div className='userOptionXs'>
                                                    <div className='menuXsRef'
                                                        style={currentMenu === 'activities' ? { color: '#2cc97f' } : {}}>
                                                        <RiFileSearchLine className='toolbarXsIcons ml-2 mr-2' />Activities</div>
                                                </div>
                                            </Link>
                                            <Link to='/customActivities' onClick={() => setIsToolbarOpen(false)}>
                                                <div className='userOptionXs'>
                                                    <div className='menuXsRef'
                                                        style={currentMenu === 'customActivities' ? { color: '#2cc97f' } : {}}>
                                                        <FaRegEdit className='toolbarXsIcons ml-2 mr-2' />Custom activities</div>
                                                </div>
                                            </Link>
                                        </div>
                                        <Link to='/profile' onClick={() => setIsToolbarOpen(false)}>
                                            <div className='userOptionXs'>
                                                <div className='menuXsRef'
                                                    style={currentMenu === 'profile' ? { color: '#2cc97f' } : {}}>
                                                    <ImProfile className='toolbarXsIcons ml-2 mr-2' />Profile</div>
                                            </div>
                                        </Link>
                                        {user.role === 'Exerciser' ? null
                                            : <Link to='/settings' onClick={() => setIsToolbarOpen(false)}>
                                                <div className='userOptionXs'>
                                                    <div className='menuXsRef'
                                                        style={currentMenu === 'settings' ? { color: '#2cc97f' } : {}}>
                                                        <FiSettings className='toolbarXsIcons ml-2 mr-2' />Settings</div>
                                                </div>
                                            </Link>}
                                        <hr />
                                        <div className='userOptionXs'>
                                            <div className='menuXsRef' onClick={onLogout}>
                                                <RiLogoutBoxRLine className='toolbarXsIcons ml-2 mr-2' />Log out</div>
                                        </div>
                                    </h5>
                                </Col>
                            </Row>
                        </Col>
                        : null}
                    <Col xs={12} md={1} lg={2}>
                        <GiHamburgerMenu className='topBarHamburguerIcon d-lg-none ml-3 mt-3'
                            onClick={() => setIsToolbarOpen(!isToolbarOpen)} />
                    </Col>
                    <Col md={3} className='d-none d-md-block'>
                        <div className='text-right mr-lg-4 mr-xl-0'>
                            <h5 className='my-0 d-inline-block' style={{ color: 'white' }}>
                                <Link to='/activities' className='menuRef'
                                    style={currentMenu === 'activities' ? { color: '#2cc97f' } : {}}>Activities</Link>
                            </h5>
                        </div>
                    </Col>
                    <Col md={4} lg={2} className='d-none d-md-block'>
                        <div className='text-center'>
                            <h5 className='my-0 d-inline-block' style={{ color: 'white' }}>
                                <Link to='/myPlans' className='menuRef'
                                    style={currentMenu === 'myPlans' ? { color: '#2cc97f' } : {}}>My plans</Link>
                            </h5>
                        </div>
                    </Col>
                    <Col md={3} className='d-none d-md-block'>
                        <div className='text-left ml-lg-4 ml-xl-0'>
                            <h5 className='my-0 d-inline-block' style={{ color: 'white' }}>
                                <Link to='/customActivities' className='menuRef'
                                    style={currentMenu === 'customActivities' ? { color: '#2cc97f' } : {}}>Custom activities</Link>
                            </h5>
                        </div>
                    </Col>
                    <Col md={1} lg={2} className='text-center d-none d-lg-block'>
                        <div className='userRef'>
                            <h5 className='d-inline-block my-0'>
                                <FaUser className='topBarUserIcon mr-1' />
                                {user.username}
                            </h5>
                            <div className='w-100 d-flex justify-content-center text-left'>
                                <div className='userOptionsBox'>
                                    <h5 className='mx-2 my-1'>
                                        <div className='userOption'>
                                            <Link to='/profile'>
                                                <ImProfile className='topBarOptionsIcon mr-1' />
                                                    Profile
                                                </Link>
                                        </div>
                                        {user.role === 'Exerciser' ? null
                                            : <div className='userOption'>
                                                <Link to='/settings'>
                                                    <FiSettings className='topBarOptionsIcon mr-1' />
                                                    Settings
                                                </Link>
                                            </div>}
                                        <div className='userOption' onClick={onLogout}>
                                            <RiLogoutBoxRLine className='topBarOptionsIcon mr-1' />
                                                Log out
                                        </div>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row noGutters className='TopBarFrame' />
            </Container >
        </div>
    );
}

