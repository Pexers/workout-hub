/*
 *
 * Copyright (c) Sun Sep 26 2021, Pexers (https://github.com/Pexers)
 *
 */

import React, { useState, useContext } from 'react'
import '../../styles/Login.css'
import '../../styles/Buttons.css'

import { FormControl, FormGroup, FormLabel, Container, Row, Col, Spinner } from 'react-bootstrap'
import { MdSend } from 'react-icons/md'
import GoBackButton from '../sub-components/GoBackButton'
import { AppContext } from '../../utils/AppProvider'

/**
 * @param {object} history used for navigation between components
 */
export default function Login({ onLogin }) {

  const { repo, notify } = useContext(AppContext)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [register, setRegister] = useState(false)
  const [forgotPassword, setForgotPassword] = useState(false)
  const [isLoadingActive, setIsLoadingActive] = useState(false)

  function handleLogin() {
    if (isInputValid()) {
      setIsLoadingActive(true)
      repo.postLogin(username, password).then(data => {
        if (data === -1) {
          notify('error', 'Please verify if credentials are correct.', 'Failed to log in.')
          setIsLoadingActive(false)
          return
        }
        if (data === -2)
          return
        onLogin(data.token, data.user)
      })
    }
    else {
      notify('warning', 'Please fulfill empty fields.', 'Failed to log in.')
    }
  }

  function handleOperationToShow() {
    switch (true) {
      case isLoadingActive:
        return <div className='d-flex justify-content-center align-items-center'
          style={{ height: '400px' }}>
          <Spinner animation='border' />
        </div>
      case register:
        return <>
          <GoBackButton position='mt-3' onClick={() => {
            setUsername('')
            setRegister(false)
          }} />
          <h4 className='text-center' style={{ marginTop: '2.5em', fontWeight: 'bold' }}>Work in progress</h4>
        </>
      case forgotPassword:
        return <>
          <GoBackButton position='mt-3' onClick={() => {
            setUsername('')
            setForgotPassword(false)
          }} />
          <h4 className='text-center' style={{ marginTop: '2.5em', fontWeight: 'bold' }}>Reset Password</h4>
          <FormLabel><h4 className='mb-0 mt-3'>Work in progress</h4></FormLabel >
          <FormControl value={username} onChange={(event) => setUsername(event.target.value)}
            type='text' placeholder='Work in progress..' />
          <button className='darkButton mt-5 mx-auto'
            onClick={() => {
              if (username === '')
                notify('warning', 'Please fulfill empty fields.', 'Work in progress.')
              else {
                //TODO:
              }
            }}>
            <h5 className='my-auto'>Send <MdSend className='buttonIcon' /></h5>
          </button>
        </>
      default:
        return <>
          <FormGroup className='mt-4'>
            <FormLabel><h4 className='my-0'>Username</h4></FormLabel >
            <FormControl value={username} onChange={(event) => setUsername(event.target.value)}
              type='text' placeholder='Username..' />
            <FormLabel><h4 className='mb-0 mt-4'>Password</h4></FormLabel >
            <FormControl value={password} onChange={(event) => setPassword(event.target.value)}
              type='password' placeholder='Password..' />
          </FormGroup>
          <h6 className='forgotPassword ml-auto mt-3'
            onClick={() => {
              setUsername('')
              setPassword('')
              setForgotPassword(true)
            }}>Forgot Password?</h6>
          <button onClick={handleLogin} className='mt-3 darkButton mx-auto'>
            <h5 className='my-auto mx-2'>Log in</h5>
          </button>
          <h6 className='text-center mt-4 mb-2'>Don't have an account?</h6>
          <button onClick={() => {
            setUsername('')
            setPassword('')
            setRegister(true)
          }} className='whiteButton mx-auto'>
            <div className='my-auto mx-1' style={{ fontSize: '17px' }}>Register</div>
          </button>
        </>
    }
  }

  function isInputValid() {
    function isNullOrBlank(str) {
      return !str || str.trim().length === 0
    }
    return !isNullOrBlank(username) && !isNullOrBlank(password)
  }

  return (
    <Container fluid className='Login h-100 px-0'>
      <Row noGutters className='h-75 mt-5'>
        <Col />
        <Col xs={11} md={6} lg={4} xl={3} className='my-auto mx-auto mx-lg-0 '>
          <div className='loginBox' style={{ height: '400px' }}>
            {handleOperationToShow()}
          </div>
        </Col>
        <Col />
      </Row>
    </Container>
  );
}

