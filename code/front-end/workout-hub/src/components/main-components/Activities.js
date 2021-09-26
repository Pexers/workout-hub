/*
 *
 * Copyright (c) Sun Sep 26 2021, Pexers (https://github.com/Pexers)
 *
 */

import React, { useState, useContext, useEffect } from 'react'
import '../../styles/Activities.css'

import { Container, Row, Col, FormControl, FormLabel, Spinner } from 'react-bootstrap'
import ActivityBox from '../sub-components/ActivityBox'
import PopUp from '../sub-components/PopUp'
import PlanSelection from '../sub-components/PlanSelection'
import { AiOutlineSearch } from 'react-icons/ai'

import { AppContext } from '../../utils/AppProvider'
import GoBackButton from '../sub-components/GoBackButton'
import SetsPanel from '../sub-components/SetsPanel'

export default function Activities() {

    const { repo, notify } = useContext(AppContext)

    const [activities, setActivities] = useState([])
    const [activitySearch, setActivitySearch] = useState('')
    const [searchSkip, setSearchSkip] = useState(0)
    const [plans, setPlans] = useState([])
    const [isLoadingActive, setIsLoadingActive] = useState(false)
    const [isLoadingMoreResults, setIsLoadingMoreResults] = useState(false)
    const [isLoadingPlans, setIsLoadingPlans] = useState(false)
    const [detailsPopUp, setDetailsPopUp] = useState(-1)
    const [addPopUp, setAddPopUp] = useState(-1)
    const [selectedPlan, setSelectedPlan] = useState(-1)
    const [activitySetsType, setActivitySetsType] = useState('RepSets')
    const [activityRestTime, setActivityRestTime] = useState(0)
    const [activitySets, setActivitySets] = useState([])

    useEffect(() => {
        handleActivitySearch('')
    }, [])

    function handleActivitySearch(search) {
        if (search.length === 0 || search.length > 3) {
            setIsLoadingActive(true)
            repo.getActivities(search, '', 0).then((data) => {
                if (data === -1)
                    return
                const dataActivities = data.activities
                setActivities(dataActivities)
                setSearchSkip(dataActivities.length)
                setIsLoadingActive(false)
            })
        }
        setActivitySearch(search)
    }

    function handleShowMoreActivities() {
        if (activitySearch.length === 0 || activitySearch.length > 3) {
            if (searchSkip > 0) {
                setIsLoadingMoreResults(true)
                repo.getActivities(activitySearch, '', searchSkip).then((data) => {
                    if (data === -1)
                        return
                    if (data.activities.length > 0) {
                        const dataActivities = data.activities
                        let toReplaceActivities = activities.slice()
                        toReplaceActivities = toReplaceActivities.concat(dataActivities)
                        setActivities(toReplaceActivities)
                        setSearchSkip(searchSkip + dataActivities.length)
                    }
                    else
                        setSearchSkip(0)
                    setIsLoadingMoreResults(false)
                })
            }
        }
    }

    function handleGetUserPlans() {
        if (plans.length === 0) {
            setIsLoadingPlans(true)
            repo.getPlans().then((data) => {
                if (data === -1)
                    return
                setPlans(data.plans)
                setIsLoadingPlans(false)
            })
        }
    }

    function handleAddActivity() {
        if (selectedPlan !== -1) {
            setIsLoadingPlans(true)
            repo.postActivityToPlan(selectedPlan, addPopUp.activity._id,
                {
                    setsType: activitySetsType,
                    sets: activitySets,
                    restTime: activityRestTime
                }
            ).then((data) => {
                if (data === -1) {
                    notify('error', 'Please try again later', 'Failed to add activity')
                    setIsLoadingPlans(false)
                    return
                }
                notify('success', '', 'Activity was added to the plan')
                setIsLoadingPlans(false)
                setAddPopUp(-1)
                setSelectedPlan(-1)
                setActivityRestTime(0)
                setActivitySets([])
                setActivitySetsType('RepSets')
            })
        }
    }

    return (
        <>
            <Container fluid className='px-0'>
                <Row noGutters className='mt-5 mb-4'>
                    <Col className='text-right mr-1'>
                        <AiOutlineSearch style={{ fontSize: '27px', marginTop: '5px', color: '#fffff' }} />
                    </Col>
                    <Col xl={3} lg={4} md={6} xs={10}>
                        <FormControl value={activitySearch} onChange={(event) => handleActivitySearch(event.target.value)}
                            className='activitySearchBar' maxLength={40} type='text' placeholder='Activity name..' />
                    </Col>
                    <Col />
                </Row>
                {isLoadingActive
                    ? <div className='d-flex justify-content-center align-items-center'
                        style={{ color: '#4b4e5b', height: '290px' }} >
                        <Spinner animation='border' />
                    </div >
                    : <Row noGutters className='mx-md-4 mx-lg-5'>
                        {activities.map((activity, idx) =>
                            <Col key={idx} xl={3} md={4} style={{ height: '290px' }}>
                                <div className='mx-4 mx-md-2 mx-lg-4'>
                                    <ActivityBox activity={activity} showDetails={false} >
                                        <div className='text-center'>
                                            <button onClick={() => {
                                                handleGetUserPlans()
                                                setAddPopUp({ activity })
                                            }} className='d-inline-block darkButton mr-1' style={{ padding: '5px' }}>
                                                <div className='my-auto mx-3'>Add</div>
                                            </button>
                                            <button onClick={() => setDetailsPopUp({ activity })}
                                                className='d-inline-block whiteButton ml-1' style={{ padding: '5px' }}>
                                                <div className='my-auto mx-2'>Details</div>
                                            </button>
                                        </div>
                                    </ActivityBox>
                                </div>
                            </Col>
                        )}
                    </Row>}
                {searchSkip === 0 ? null :
                    isLoadingMoreResults
                        ? <div className='d-flex justify-content-center align-items-center' style={{ color: '#4b4e5b' }} >
                            <Spinner animation='border' />
                        </div >
                        : <button className='darkButton buttonRounded mx-auto mb-4'
                            onClick={handleShowMoreActivities}>
                            <h6 className='my-1 mx-3'>More activities</h6>
                        </button>}
            </Container>
            <PopUp md={10} lg={10} xl={8} isPopUpOpen={detailsPopUp !== -1} onClose={() => setDetailsPopUp(-1)}>
                {detailsPopUp === -1 ? null
                    : <Row noGutters>
                        <Col xl={5} lg={5} md={8} className='PopUpActivityDetails mx-auto'>
                            <ActivityBox activity={detailsPopUp.activity} showDetails={true} />
                        </Col>
                        <Col xl={7} lg={7}>
                            <div className='ml-md-3 mr-md-2 mt-3 mt-lg-0'>
                                <h4 style={{ fontFamily: 'Roboto Condensed' }}>Description:</h4>
                                {detailsPopUp.activity.description.split('\n').map(str => <p>- {str}</p>)}
                            </div>
                        </Col>
                    </Row>}
            </PopUp>
            <PopUp md={10} lg={10} xl={5} isPopUpOpen={addPopUp !== -1} onClose={() => {
                setAddPopUp(-1)
                setSelectedPlan(-1)
                setActivityRestTime(0)
                setActivitySets([])
                setActivitySetsType('RepSets')
            }}>
                {isLoadingPlans
                    ? <div className='d-flex justify-content-center align-items-center' style={{ color: '#4b4e5b' }} >
                        <Spinner animation='border' />
                    </div >
                    : <div className='mt-3 mb-2'>
                        {selectedPlan === -1
                            ? <div className='mt-3 mb-2'>
                                <h4 className='ml-5'>Choose a plan:</h4>
                                <PlanSelection md={10} lg={10} xl={9} plans={plans} selectPlan={(idPlan) => setSelectedPlan(idPlan)} />
                            </div>
                            : <div className='mb-2'>
                                <GoBackButton position='mb-4' onClick={() => { setSelectedPlan(-1) }} />
                                <Row noGutters>
                                    <Col>
                                        <FormLabel>
                                            <h5 className='mb-0' style={{ fontFamily: 'Roboto Condensed, sans-serif' }}>Sets type</h5>
                                        </FormLabel><br />
                                        <FormControl as="select" custom style={{ width: '200px' }}
                                            onChange={(event) => setActivitySetsType(event.target.value)}>
                                            <option value='RepSets'>Repetion sets</option>
                                            <option value='TimedSets'>Timed sets</option>
                                        </FormControl>
                                    </Col>
                                    <Col>
                                        <FormLabel>
                                            <h5 className='mb-0' style={{ fontFamily: 'Roboto Condensed, sans-serif' }}>Rest time</h5>
                                        </FormLabel><br />
                                        <FormControl className='ml-2 d-inline-block'
                                            style={{ width: '80px', fontFamily: 'Roboto Condensed, sans-serif' }} type='number' placeholder="0"
                                            value={activityRestTime}
                                            onChange={(event) => {
                                                const input = event.target.value
                                                if (input.length <= 3 && input >= 0)
                                                    setActivityRestTime(input)
                                            }}
                                        /> seconds
                                    </Col>
                                </Row>
                                <Row noGutters className='mt-3'>
                                    <Col />
                                    <Col xl={9}>
                                        <SetsPanel title='Activity sets' setsType={activitySetsType}
                                            updateSelected={(sets) => setActivitySets(sets)} />
                                    </Col>
                                    <Col />
                                </Row>
                                <button onClick={handleAddActivity} className='mt-4 mx-auto darkButton' >
                                    <h5 className='my-auto mx-3' style={{ padding: '4px' }}>Add</h5>
                                </button>
                            </div>
                        }
                    </div>
                }
            </PopUp>
        </>
    );
}

