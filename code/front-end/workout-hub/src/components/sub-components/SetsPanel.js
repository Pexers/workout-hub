/*
 *
 * Copyright (c) Sun Sep 26 2021, Pexers (https://github.com/Pexers)
 *
 */

import React, { useState, useEffect } from 'react'
import '../../styles/SetsPanel.css'
import '../../styles/Buttons.css'

import { FormControl } from 'react-bootstrap';
import { IoMdCloseCircle } from 'react-icons/io';

export default function SetsPanel({ updateSelected, setsType, title }) {

    useEffect(() => {
        setSelectedItems([])
        setWeight(0)
        setReps(0)
        setTime(0)
        updateSelected([])
    }, [setsType])

    const [selectedItems, setSelectedItems] = useState([])
    const [weight, setWeight] = useState(0)
    const [reps, setReps] = useState(0)
    const [time, setTime] = useState(0)

    return (
        <div className='SetsPanel' >
            <h5 className='setsPanelTitle'>{title || 'Insert panel title'}</h5>
            {setsType === 'RepSets' ?
                <>
                    Weight:
                    <FormControl className='ml-1 d-inline-block mr-2'
                        style={{ width: '80px', fontFamily: 'Roboto Condensed, sans-serif' }} type='number' placeholder="0"
                        value={weight}
                        onChange={(event) => {
                            const input = event.target.value
                            if (input.length <= 3 && input >= 0)
                                setWeight(input)
                        }}
                    />
                    Reps:
                    <FormControl className='ml-1 d-inline-block'
                        style={{ width: '80px', fontFamily: 'Roboto Condensed, sans-serif' }} type='number' placeholder="0"
                        value={reps}
                        onChange={(event) => {
                            const input = event.target.value
                            if (input.length <= 3 && input >= 0)
                                setReps(input)
                        }}
                    />
                </>
                : <>
                    Time:
                    <FormControl className='ml-1 d-inline-block'
                        style={{ width: '80px', fontFamily: 'Roboto Condensed, sans-serif' }} type='number' placeholder="0"
                        value={time}
                        onChange={(event) => {
                            const input = event.target.value
                            if (input.length <= 3 && input >= 0)
                                setTime(input)
                        }}
                    /> min
                </>
            }
            <button className='darkButton d-inline-block ml-3 px-3' onClick={() => {
                const toReplaceSelected = setsType === 'RepSets'
                    ? selectedItems.concat({ weight, reps })
                    : selectedItems.concat({ time })
                setSelectedItems(toReplaceSelected)
                updateSelected(toReplaceSelected)
            }}> Insert</button>
            <div className='setsItemBox mx-auto'>
                {selectedItems.length === 0
                    ? <div className='noSetsSelected text-center'>Empty</div>
                    : <div className='d-inline-block'>
                        {selectedItems.map((selected, idx) => {
                            return (
                                <div key={idx} className='selectedSetBox'
                                    onClick={() => {
                                        const toReplace = selectedItems.slice()
                                        toReplace.splice(idx, 1)
                                        setSelectedItems(toReplace)
                                        updateSelected(toReplace)
                                    }}>
                                    <IoMdCloseCircle className='removeSetButton' />
                                    {setsType === 'RepSets'
                                        ? selected.weight + 'kg | ' + selected.reps + ' reps'
                                        : selected.time + 'min'}
                                </div>
                            )
                        })}
                    </div>}
            </div>
        </div >
    );
}