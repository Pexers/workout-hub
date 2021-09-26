/*
 *
 * Copyright (c) Sun Sep 26 2021, Pexers (https://github.com/Pexers)
 *
 */

import React, { useState } from 'react'
import '../../styles/ActivityBox.css'

export default function ActivityBox({ activity, showDetails, children }) {

    const [showExtra, setShowExtra] = useState(false)

    return (
        <div className='ActivityBox' style={{ position: showExtra ? 'relative' : '' }}
            onMouseOver={children ? () => setShowExtra(true) : undefined}
            onMouseOut={children ? () => setShowExtra(false) : undefined}>
            <img className='activityBoxImage' src={`data:image/jpeg;base64,${activity.image ? Buffer.from(activity.image.data).toString('base64') : null}`} alt='' />
            <div className='activityBoxExtra' style={{ backgroundColor: showExtra ? 'white' : '#ffffffd5' }}>
                <div className='ml-2'>
                    <h6 className='mb-0 textOverflow' style={{ lineHeight: '25px' }}> {activity.name}</h6>
                    <h6 className='mb-0' style={{ color: '#929292', fontSize: '14px' }}>
                        {showDetails
                            ? <div style={{ lineHeight: '20px' }}>
                                Difficulty: {activity.difficulty}<br />
                                Muscles: {activity.muscles.map((muscle) => muscle.name + ' ')}
                            </div>
                            : <div className='textOverflow'>{activity.difficulty} | {activity.muscles.map((muscle) => muscle.name + ' ')}</div>}
                    </h6>
                </div>
            </div>
            <div className={showExtra ? 'activityBoxExtra' : 'd-none'}>
                {children}
            </div>
        </div>
    );
}

