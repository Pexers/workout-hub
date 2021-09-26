/*
 *
 * Copyright (c) Sun Sep 26 2021, Pexers (https://github.com/Pexers)
 *
 */

import React from 'react'
import '../../styles/PlanSelection.css'

import { Row, Col } from 'react-bootstrap'
import { AiOutlinePlusCircle } from 'react-icons/ai'

export default function PlanSelection({ md, lg, xl, plans, selectPlan }) {

    return (
        <Row noGutters className='mt-3'>
            <Col />
            <Col xl={xl} lg={lg} md={md} xs={11} className='PlanSelection'>
                {plans.map((plan, idx) => {
                    return (
                        <div key={idx} className='planForSelection mx-auto mt-2 mb-1' onClick={() => {
                            selectPlan(plan._id)
                        }} >
                            <Row noGutters>
                                <Col xs={2} md={1}>
                                    <div className='my-2 ml-2'>
                                        <AiOutlinePlusCircle style={{ fontSize: '30px' }} />
                                    </div>
                                </Col>
                                <Col xs={10} md={8}>
                                    <h4 className='ml-3 mt-2 mb-0'>
                                        <div className='textOverflow'>
                                            {plan.name}
                                        </div>
                                    </h4>
                                </Col>
                            </Row>
                        </div >
                    )
                })}
            </Col>
            <Col />
        </Row>
    );
}

