/*
 *
 * Copyright (c) Sun Sep 26 2021, Pexers (https://github.com/Pexers)
 *
 */

import React, { useState, useContext } from 'react'
import '../../styles/Profile.css'
import '../../styles/Buttons.css'

import { Container, Row, Col, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { AppContext } from '../../utils/AppProvider'

export default function Profile({ onDataChange }) {

    const { repo, notify } = useContext(AppContext)

    const [user, setUser] = useState(useContext(AppContext).user)
    const [isEditingData, setIsEditingData] = useState(false)
    const [isEditingPassword, setIsEditingPassword] = useState(false)
    const [sex, setUserSex] = useState(user.sex)
    const [age, setUserAge] = useState(user.age)
    const [weight, setUserWeight] = useState(user.weight)
    const [height, setUserHeight] = useState(user.height)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [retypePassword, setRetypePassword] = useState('')


    function handleUpdateUserData() {
        repo.putUserData({ sex, age, weight, height }).then((data) => {
            if (data === -1) {
                notify('error', '', 'Failed to update data')
                return
            }
            notify('success', '', 'Data was updated')
            onDataChange(null, data.user)
            setUser(data.user)
            handleResetDataInputs(data.user)
        })
    }

    function handleUpdateUserPassword() {
        if (newPassword !== '') {
            if (newPassword !== retypePassword) {
                notify('error', "Passwords don't match", 'Failed to update password')
                return
            }
            repo.putUserData({ oldPassword, newPassword }).then((data) => {
                if (data === -1) {
                    notify('error', '', 'Failed to update password')
                    return
                }
                notify('success', '', 'Password was updated')
                handleResetPasswordInputs()
            })
        }
    }

    function handleResetDataInputs(dataUser) {
        setUserSex(dataUser.sex)
        setUserAge(dataUser.age)
        setUserHeight(dataUser.height)
        setUserWeight(dataUser.weight)
        setIsEditingData(false)
    }

    function handleResetPasswordInputs() {
        setOldPassword('')
        setNewPassword('')
        setRetypePassword('')
        setIsEditingPassword(false)
    }

    return (
        <Container fluid className='Profile'>
            <Row noGutters className='mt-4'>
                <Col />
                <Col xs={11} md={8} lg={6} xl={4} className='mt-5 mb-4'>
                    <div className='profileBox'>
                        <FormGroup className='mt-4 '>
                            <Row noGutters>
                                <Col xs={6} md={3} className='text-center'>
                                    <FormLabel><h5 className='mt-2 userDataName'>Sex:</h5></FormLabel ><br />
                                    <FormLabel><h5 className='mt-2 userDataName'>Age:</h5></FormLabel ><br />
                                    <FormLabel><h5 className='mt-2 userDataName'>Weight (kg):</h5></FormLabel ><br />
                                    <FormLabel><h5 className='mt-2 userDataName d-inline-block'>Height (m):</h5></FormLabel >
                                </Col>
                                <Col xs={6} md={4}>
                                    <FormControl as='select' className='mt-2' custom disabled={!isEditingData} value={sex}
                                        onChange={(event) => setUserSex(event.target.value)}>
                                        <option>Male</option>
                                        <option>Female</option>
                                    </FormControl>
                                    <FormControl className='mt-2' disabled={!isEditingData} value={age}
                                        onChange={(event) => setUserAge(event.target.value)}
                                        type='number' placeholder='Age..' />
                                    <FormControl className='mt-2' disabled={!isEditingData} value={weight}
                                        onChange={(event) => setUserWeight(event.target.value)}
                                        type='number' placeholder='Height..' />
                                    <FormControl className='mt-2' disabled={!isEditingData} value={height}
                                        onChange={(event) => setUserHeight(event.target.value)}
                                        type='text' placeholder='Height..' />
                                </Col>
                                <Col xs={12} md={5}>
                                    <button onClick={() => setIsEditingData(true)}
                                        className={'greenButton mx-auto ' + (isEditingData ? 'd-none' : '')}
                                        style={{
                                            paddingLeft: '1px', paddingRight: '1px',
                                            paddingTop: '6px', paddingBottom: '6px', fontWeight: 'bold'
                                        }}>
                                        <h5 className='my-auto mx-3'>Edit</h5>
                                    </button>
                                    <button onClick={() => handleResetDataInputs(user)}
                                        className={'greenButton mx-auto ' + (isEditingData ? '' : 'd-none')}
                                        style={{
                                            paddingLeft: '1px', paddingRight: '1px',
                                            paddingTop: '6px', paddingBottom: '6px', fontWeight: 'bold'
                                        }}>
                                        <h5 className='my-auto mx-3'>Cancel</h5>
                                    </button>
                                    <button onClick={handleUpdateUserData}
                                        className={'darkButton mx-auto mt-2 ' + (isEditingData ? '' : 'd-none')}
                                        style={{
                                            paddingLeft: '1px', paddingRight: '1px',
                                            paddingTop: '6px', paddingBottom: '6px', fontWeight: 'bold'
                                        }}>
                                        <h5 className='my-auto mx-3'>Save</h5>
                                    </button>
                                </Col>
                            </Row>
                            <div className='horizontalLine my-4' />
                            <Row noGutters>
                                <Col xs={12} md={7}>
                                    {isEditingPassword ?
                                        <>
                                            <FormLabel><h5 className='mb-0 userDataName'>Old Password:</h5></FormLabel >
                                            <FormControl className='' value={oldPassword} type='password'
                                                onChange={(event) => setOldPassword(event.target.value)} />
                                            <FormLabel><h5 className='mt-1 mb-0 userDataName'>New Password:</h5></FormLabel >
                                            <FormControl className='' value={newPassword} type='password'
                                                onChange={(event) => setNewPassword(event.target.value)} />
                                            <FormLabel><h5 className='mt-1 mb-0 userDataName'>Re-type New Password:</h5></FormLabel >
                                            <FormControl className='mb-2' value={retypePassword} type='password'
                                                onChange={(event) => setRetypePassword(event.target.value)} />
                                        </>
                                        : <>
                                            <FormLabel><h5 className='mb-0 userDataName'>Password:</h5></FormLabel >
                                            <FormControl className='' disabled={true} value={'randomText'} type='password' />
                                        </>
                                    }
                                </Col>
                                <Col xs={12} md={5}>
                                    <button onClick={() => setIsEditingPassword(true)}
                                        className={'greenButton mx-auto ' + (isEditingPassword ? 'd-none' : '')}
                                        style={{
                                            paddingLeft: '1px', paddingRight: '1px',
                                            paddingTop: '6px', paddingBottom: '6px', fontWeight: 'bold'
                                        }}>
                                        <h5 className='my-auto mx-3'>Edit</h5>
                                    </button>
                                    <button onClick={handleResetPasswordInputs}
                                        className={'greenButton mx-auto ' + (isEditingPassword ? '' : 'd-none')}
                                        style={{
                                            paddingLeft: '1px', paddingRight: '1px',
                                            paddingTop: '6px', paddingBottom: '6px', fontWeight: 'bold'
                                        }}>
                                        <h5 className='my-auto mx-3'>Cancel</h5>
                                    </button>
                                    <button onClick={handleUpdateUserPassword}
                                        className={'darkButton mx-auto mt-2 ' + (isEditingPassword ? '' : 'd-none')}
                                        style={{
                                            paddingLeft: '1px', paddingRight: '1px',
                                            paddingTop: '6px', paddingBottom: '6px', fontWeight: 'bold'
                                        }}>
                                        <h5 className='my-auto mx-3'>Save</h5>
                                    </button>
                                </Col>
                            </Row>
                        </FormGroup>
                    </div>
                </Col>
                <Col />
            </Row>
        </Container>
    );
}

