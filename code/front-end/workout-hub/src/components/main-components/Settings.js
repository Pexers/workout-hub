/*
 *
 * Copyright (c) Sun Sep 26 2021, Pexers (https://github.com/Pexers)
 *
 */

import React, { useState, useContext, useEffect } from 'react'
import '../../styles/Settings.css'

import { Container, Row, Col } from 'react-bootstrap'
import { FaUser, FaUserTie, FaTrashAlt, FaArrowAltCircleUp, FaArrowAltCircleDown } from 'react-icons/fa'
import UsersPanel from '../sub-components/UsersPanel'
import PopUp from '../sub-components/PopUp'
import { AppContext } from '../../utils/AppProvider'

export default function Settings() {

    const { repo, notify } = useContext(AppContext)

    const [admins, setAdmins] = useState(null)
    const [exercisers, setExercisers] = useState(null)
    const [adminNameSearch, setAdminNameSearch] = useState('')
    const [exerciserNameSearch, setExerciserNameSearch] = useState('')
    const [isPopUpOpen, setIsPopUpOpen] = useState(false)
    const [popUpContent, setPopUpContent] = useState(null)
    const [adminSearchSkip, setAdminSearchSkip] = useState(0)
    const [exerciserSearchSkip, setExerciserSearchSkip] = useState(0)

    useEffect(() => {
        handleAdminSearch('')
        handleExerciserSearch('')
    }, [])

    function getUserItem(userItem, role, idx) {
        const isThisUserAnAdmin = role === 'Admin'
        return (
            <Row noGutters>
                <>
                    <Col xs={1} className='my-0 text-md-center'>
                        {isThisUserAnAdmin
                            ? <FaUserTie className='userItemIcon ml-1 ml-md-0' />
                            : <FaUser className='userItemIcon ml-1 ml-md-0' />}
                    </Col>
                    <Col xs={5} md={6} lg={5} className='my-0' style={{ fontSize: '19px' }}>
                        <div className='ml-2 ml-md-0 textOverflow w-100'>
                            {userItem.username}
                        </div>
                    </Col>
                </>
                <Col xs={1} className='text-center'>
                    <div className='vertLine d-inline-block' style={{ height: '30px' }} />
                </Col>
                <Col xs={5} md={4} lg={5} className='text-center'>
                    <button className='mx-1 mx-md-3 whiteButton px-1 py-0 d-inline-block'
                        onClick={() => {
                            setIsPopUpOpen(true)
                            if (isThisUserAnAdmin) {
                                setPopUpContent({
                                    question: 'Are you sure you want to demote',
                                    action: 'Demote',
                                    userItem: userItem
                                })
                            }
                            else {
                                setPopUpContent({
                                    question: 'Are you sure you want to promote',
                                    action: 'Promote',
                                    userItem: userItem
                                })
                            }
                        }}>
                        {isThisUserAnAdmin
                            ? <FaArrowAltCircleDown className='userItemIconOperation' />
                            : <FaArrowAltCircleUp className='userItemIconOperation' />}
                    </button>
                    <button className='mx-md-2 whiteButton px-1 py-0 d-inline-block'
                        onClick={() => {
                            setIsPopUpOpen(true)
                            setPopUpContent({
                                question: 'Are you sure you want to delete',
                                action: 'Delete',
                                userItem: userItem
                            })
                        }}>
                        <FaTrashAlt className='userItemIconOperation' />
                    </button>
                </Col>

            </Row >
        )
    }

    function handleAdminSearch(inputSearch) {
        setAdmins(null)
        repo.getUsers(inputSearch, 'Admin', 0).then((data) => {
            if (data === -1)
                return
            setAdmins(data.users)
            setAdminSearchSkip(data.users.length)
        })
        setAdminNameSearch(inputSearch)
    }

    function handleExerciserSearch(inputSearch) {
        setExercisers(null)
        repo.getUsers(inputSearch, 'Exerciser', 0).then((data) => {
            if (data === -1)
                return
            setExercisers(data.users)
            setExerciserSearchSkip(data.users.length)
        })
        setExerciserNameSearch(inputSearch)
    }

    function handleShowMoreAdmins() {
        return repo.getUsers(adminNameSearch, 'Admin', adminSearchSkip).then((data) => {
            if (data === -1)
                return
            if (data.users.length === 0) {
                setAdminSearchSkip(0)
                return -1
            }
            let toReplaceAdmins = admins.slice()
            toReplaceAdmins = toReplaceAdmins.concat(data.users)
            setAdmins(toReplaceAdmins)
            setAdminSearchSkip(adminSearchSkip + data.users.length)
        })
    }

    function handleShowMoreExercisers() {
        return repo.getUsers(exerciserNameSearch, 'Exerciser', exerciserSearchSkip)
            .then((data) => {
                if (data === -1)
                    return
                if (data.users.length === 0) {
                    setExerciserSearchSkip(0)
                    return -1
                }
                let toReplaceExercisers = admins.slice()
                toReplaceExercisers = toReplaceExercisers.concat(data.users)
                setExercisers(toReplaceExercisers)
                setExerciserSearchSkip(exerciserSearchSkip + data.users.length)
            })
    }

    function handlePromoteUser() {
        repo.putUserRole(popUpContent.userItem._id, 'Admin')
            .then((data) => {
                if (data === -1)
                    return
                notify('success', '', 'Success! User promoted.')
                updateUsersAfterAction()
                setPopUpContent(null)
                setIsPopUpOpen(false)
            })
    }

    function handleDepromoteUser() {
        repo.putUserRole(popUpContent.userItem._id, 'Exerciser')
            .then((data) => {
                if (data === -1)
                    return
                notify('success', '', 'Success! User demoted.')
                updateUsersAfterAction()
                setPopUpContent(null)
                setIsPopUpOpen(false)
            })
    }

    function handleDeleteUser() {
        repo.deleteUser(popUpContent.userItem._id)
            .then((data) => {
                if (data === -1)
                    return
                notify('success', '', 'Success! User deleted.')
                updateUsersAfterAction()
                setPopUpContent(null)
                setIsPopUpOpen(false)
            })
    }

    function updateUsersAfterAction() {
        handleAdminSearch('')
        handleExerciserSearch('')
    }

    return (
        <>
            <Container fluid className='px-0 Settings'>
                <Row noGutters className='mt-4'>
                    <Col md={9} lg={5} xl={4} className='mx-auto'>
                        <div className='mx-3 mr-lg-4 mx-xl-0 mt-3 my-lg-0'>
                            <UsersPanel
                                title={'Admins'} placeholder={'Search by username'}
                                collection={admins} userItem={getUserItem} isItemClickable={false} role={'Admin'}
                                handleUserSearch={handleAdminSearch} handleShowMoreResults={handleShowMoreAdmins} />
                        </div>
                        <div className='mx-3 mr-lg-4 mx-xl-0 mt-3'>
                            <UsersPanel
                                title={'Exercisers'} placeholder={'Search by username'}
                                collection={exercisers} userItem={getUserItem} isItemClickable={false} role={'Exerciser'}
                                handleUserSearch={handleExerciserSearch} handleShowMoreResults={handleShowMoreExercisers} />
                        </div>
                    </Col>
                </Row>
            </Container>
            <PopUp md={10} lg={7} xl={5} isPopUpOpen={isPopUpOpen} onClose={() => setIsPopUpOpen(false)}>
                {popUpContent
                    ? <>
                        <h4 className='my-0 text-center'>
                            {popUpContent.question}
                        </h4>
                        <h4 className='mb-4 text-center'>
                            {popUpContent.userItem.username}?
                    </h4>
                        <div className='text-center mb-2'>
                            <h6 className='actionUserTxt d-inline-block mx-4 mb-0'
                                onClick={() => {
                                    switch (popUpContent.action) {
                                        case 'Promote': {
                                            handlePromoteUser()
                                            break
                                        }
                                        case 'Demote': {
                                            handleDepromoteUser()
                                            break
                                        }
                                        case 'Delete': {
                                            handleDeleteUser()
                                            break
                                        }
                                        default: ;
                                    }
                                }}>
                                {popUpContent.action}
                            </h6>
                            <button onClick={() => setIsPopUpOpen(false)} className='greenButton d-inline-block mx-4'>
                                <h5 className='my-auto'>{'Cancel'}</h5>
                            </button>
                        </div>
                    </> : null}
            </PopUp>
        </>
    );
}

