/*
 *
 * Copyright (c) Sun Sep 26 2021, Pexers (https://github.com/Pexers)
 *
 */

import React, { useState, useContext } from 'react'
import '../../styles/PlanBox.css'

import ActivityBox from '../sub-components/ActivityBox'
import { Row, Col, Spinner } from 'react-bootstrap'
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from 'react-icons/md'
import { FaRegEdit } from 'react-icons/fa'
import { BsThreeDots } from 'react-icons/bs'

import { AppContext } from '../../utils/AppProvider'

export default function PlanBox({ planInfo, startPlan, setIsLoadingActive }) {

    const { repo } = useContext(AppContext)

    const [activities, setActivities] = useState(-1)
    const [showExtra, setShowExtra] = useState(false)

    function handleGetPlanActivities(toStart) {
        repo.getPlanActivities(planInfo._id).then((data) => {
            if (data === -1)
                return
            let activity
            const activities = planInfo.activities.map((planActivity) => {
                activity = data.activities.find(act => planActivity.idActivity === act._id)
                Object.assign(planActivity, activity)
                return planActivity
            })
            setActivities(activities)
            if (toStart)
                startPlan(planInfo, activities)
        })
    }

    return (
        <div className='PlanBox'>
            <Row noGutters className='mb-2'>
                <Col xs={2} md={1}>
                    <div className='mt-2 ml-2 planArrowIcon' onClick={() => {
                        if (activities === -1) {
                            handleGetPlanActivities(false)
                            setShowExtra(true)
                        }
                        else
                            setShowExtra(!showExtra)
                    }}>
                        {showExtra
                            ? <MdKeyboardArrowDown style={{ fontSize: '36px', color: '#4b4e5b' }} />
                            : <MdKeyboardArrowRight style={{ fontSize: '36px', color: '#4b4e5b' }} />}
                    </div>
                </Col>
                <Col xs={10} md={8}>
                    <h4 className='mt-2 mb-0'>
                        <div className={showExtra ? '' : 'textOverflow'}>
                            {planInfo.name}
                        </div>
                    </h4>
                    <div className={showExtra ? 'd-block' : 'd-none d-md-block'}
                        style={{ color: '#929292', fontSize: '14px' }}>
                        <div className={showExtra ? '' : 'textOverflow mb-0'}>
                            {planInfo.description}
                        </div>
                    </div>
                </Col>
                <Col xs={8} md={1}>
                    <button onClick={() => { }} className='mr-2 ml-auto darkButton'
                        style={{
                            marginTop: '15px', paddingLeft: '7px', paddingRight: '5px',
                            paddingTop: '2px', paddingBottom: '4px', borderRadius: '5px'
                        }}>
                        <FaRegEdit style={{ fontSize: '18px' }} />
                    </button>
                </Col>
                <Col xs={4} md={2}>
                    <button className='ml-1 greenButton mb-2'
                        style={{
                            marginTop: '12px', paddingLeft: '1px', paddingRight: '1px',
                            paddingTop: '6px', paddingBottom: '6px', fontWeight: 'bold'
                        }}
                        onClick={() => {
                            setIsLoadingActive(true)
                            if (activities === -1)
                                handleGetPlanActivities(true)
                            else
                                startPlan(planInfo, activities)
                        }}>
                        <h5 className='my-auto mx-3'>Start</h5>
                    </button>
                </Col>
            </Row>
            {
                activities === -1
                    ? showExtra
                        ? <div className='d-flex justify-content-center align-items-center' style={{ color: '#4b4e5b', minHeight: '7vh' }} >
                            <Spinner animation='border' />
                        </div >
                        : <></>
                    : activities.length === 0
                        ? <> You have no activities in this plan! </>
                        : <div className={showExtra ? 'ml-md-5' : 'd-none'}>
                            {activities.map((activity, idx) =>
                                <Row key={idx} noGutters className='my-3'>
                                    <Col md={1} xs={12}>
                                        <h6 className='ml-2 mt-1 mb-1 mb-md-0 text-center activityNumberCircle'>
                                            {idx + 1}
                                        </h6>
                                    </Col>
                                    <Col md={5} xs={8} className='mx-auto mx-md-0 mb-2'>
                                        <ActivityBox activity={activity} />
                                    </Col>
                                    <Col md={5} xs={12} className='mt-1 ml-md-3 text-center'>
                                        {activity.sets.map((set, idx) =>
                                            idx > 1
                                                ? (idx === 2
                                                    ? <div key={idx}>[ <BsThreeDots key={idx} style={{ fontSize: '22px', color: '#4b4e5b' }} /> ]</div>
                                                    : null)
                                                : <div key={idx} style={{ fontSize: '15px' }}>
                                                    ---- Set nº{idx + 1} ----<br />
                                                    {activity.setsType === 'RepSets'
                                                        ? <>Weight: {set.weight} | Reps: {set.reps}<br /></>
                                                        : <>Time: {set.time}min<br /></>}
                                                </div>
                                        )}
                                        {activity.sets.length > 2 ? null
                                            : <BsThreeDots className='invisible' style={{ fontSize: '22px' }} />}
                                        <button onClick={() => { }} className='whiteButton mt-2 mx-auto' style={{ padding: '2px' }}>
                                            <div className='my-auto mx-3'>Details</div>
                                        </button>
                                    </Col>
                                </Row>
                            )}
                        </div>
            }</div >
    );
}

