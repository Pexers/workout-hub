/*
 *
 * Copyright (c) Sun Sep 26 2021, Pexers (https://github.com/Pexers)
 *
 */

import React, { useState, useContext, useEffect } from 'react'
import '../../styles/MyPlans.css'

import { Container, Row, Col } from 'react-bootstrap'
import PageSpinner from '../sub-components/PageSpinner'
import PlanBox from '../sub-components/PlanBox'
import ActivityBox from '../sub-components/ActivityBox'
import Countdown from '../sub-components/Countdown'
import { AppContext } from '../../utils/AppProvider'

export default function MyPlans() {

    const { repo } = useContext(AppContext)

    const [plans, setPlans] = useState([])
    const [startedPlan, setStartedPlan] = useState(-1)
    const [startedActivities, setStartedActivities] = useState([])
    const [activityIdx, setActivityIdx] = useState(0)
    const [activitySetIdx, setActivitySetIdx] = useState(0)
    const [isRestTimeActive, setIsRestTimeActive] = useState(false)
    const [isLoadingActive, setIsLoadingActive] = useState(true)

    useEffect(() => {
        handleGetUserPlans()
    }, [])


    function handleGetUserPlans() {
        repo.getPlans().then((data) => {
            if (data === -1)
                return
            setPlans(data.plans)
            setIsLoadingActive(false)
        })
    }

    function handleStartPlan(planInfo, activities) {
        setStartedActivities(activities)
        setStartedPlan(planInfo)
        setIsLoadingActive(false)
    }

    const currentActivity = startedActivities[activityIdx]
    const currentSet = currentActivity ? currentActivity.sets[activitySetIdx] : null
    const reachedLastActivity = (activityIdx === startedActivities.length - 1) &&
        (activitySetIdx === currentActivity.sets.length - 1)

    return (
        <Container fluid className='px-0'>
            <PageSpinner isLoadingActive={isLoadingActive}>
                {startedPlan === -1 ?
                    <Row noGutters>
                        <Col xl={3} lg={2} md={1} />
                        <Col xl={6} lg={8} md={10} xs={12}>
                            <div className='mb-5 mt-4 mx-md-5 mx-2'>
                                {plans.map((plan, idx) =>
                                    <PlanBox key={idx} planInfo={plan} startPlan={handleStartPlan} setIsLoadingActive={setIsLoadingActive} />
                                )}
                            </div>
                        </Col>
                        <Col xl={3} lg={2} md={12} xs={12}>
                            <button className='darkButton mt-lg-4 mx-auto rounded'
                                onClick={() => {
                                    //TODO: create plan
                                }}>
                                <h4 className='my-auto'>Create plan</h4>
                            </button>
                        </Col>
                    </Row>
                    : <Row noGutters>
                        {isRestTimeActive
                            ? <Countdown duration={currentActivity.restTime * 1000} onComplete={() => setIsRestTimeActive(false)} />
                            : null}
                        <Col xs={2} md={2} lg={3} xl={2}>
                            <button className='greenButton ml-auto mt-5'
                                style={{
                                    marginTop: '12px', paddingLeft: '1px', paddingRight: '1px',
                                    paddingTop: '6px', paddingBottom: '6px', fontWeight: 'bold'
                                }}
                                onClick={() => {
                                    if (activitySetIdx !== 0)
                                        setActivitySetIdx(activitySetIdx - 1)
                                    else
                                        if (activityIdx !== 0) {
                                            setActivitySetIdx(startedActivities[activityIdx - 1].sets.length - 1)
                                            setActivityIdx(activityIdx - 1)
                                        }
                                }
                                }>
                                <h5 className='my-auto mx-3'>Previous</h5>
                            </button>
                        </Col>
                        <Col xl={8} lg={8} md={10} xs={6}>
                            <h3 className='text-center mt-5 mb-4'>{startedPlan.name}</h3>
                            <h4 className='ml-3'>Activity nº{activityIdx + 1} of {startedActivities.length}</h4>
                            <h4 className='text-center mb-5'>
                                Set nº{activitySetIdx + 1} of {currentActivity.sets.length}
                                {' | ' + (currentActivity.setsType === 'RepSets' ? currentSet.reps + ' Repetitions' : currentSet.time + ' min')}
                            </h4>
                            <Row noGutters>
                                <Col xl={5} lg={5} md={8} className='PopUpActivityDetails mx-auto'>
                                    <ActivityBox activity={currentActivity} showDetails={true} />
                                </Col>
                                <Col xl={7} lg={7}>
                                    <div className='ml-md-3 mr-md-2 mt-3 mt-lg-0'>
                                        <h4 style={{ fontFamily: 'Roboto Condensed' }}>Description:</h4>
                                        {currentActivity.description.split('\n').map(str => <p>- {str}</p>)}
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={2} md={2} lg={3} xl={2}>
                            <button className={reachedLastActivity ? 'yellowButton rounded mt-5' : 'greenButton mt-5'}
                                style={{
                                    marginTop: '12px', paddingLeft: '1px', paddingRight: '1px',
                                    paddingTop: '6px', paddingBottom: '6px', fontWeight: 'bold'
                                }}
                                onClick={() => {
                                    if (reachedLastActivity) {
                                        setStartedPlan(-1)
                                        setActivitySetIdx(0)
                                        setActivityIdx(0)
                                    }
                                    else if (activitySetIdx < (currentActivity.sets.length - 1)) {
                                        setActivitySetIdx(activitySetIdx + 1)
                                        setIsRestTimeActive(true)
                                    }
                                    else if (activityIdx < (startedActivities.length - 1)) {
                                        setActivityIdx(activityIdx + 1)
                                        setActivitySetIdx(0)
                                        setIsRestTimeActive(true)
                                    }
                                }}>
                                <h5 className='my-auto mx-3'>{reachedLastActivity ? 'End workout' : 'Next'}</h5>
                            </button>
                        </Col>
                    </Row>
                }
            </PageSpinner >
        </Container >
    );
}

