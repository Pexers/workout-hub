/*
 *
 * Copyright (c) Sun Sep 26 2021, Pexers (https://github.com/Pexers)
 *
 */

import React, { useState, useEffect } from 'react'
import '../../styles/UsersPanel.css'
import '../../styles/Buttons.css'

import { Container, Row, Col, Spinner } from 'react-bootstrap'

/**
 * @param {string} title panel title
 * @param {string} placeholder placeholder of search box
 * @param {Array} collection collection of items
 * @param {function} userItem handler called when rendering item of collection
 * @param {boolean} isItemClickable determines wheter the items should be clickable(true) or not(false)
 * @param {string} role role name
 * @param {function} handleUserSearch handler for items search
 * @param {function} handleShowMoreResults handler to show more results
 */
export default function UsersPanel({
    title, placeholder, collection, userItem, isItemClickable, role,
    handleUserSearch, handleShowMoreResults }) {

    const [requestingMoreResults, setRequestingMoreResults] = useState(false)
    const [showNoMoreResults, setShowNoMoreResults] = useState(false)

    useEffect(() => {
        if (collection === null)
            setShowNoMoreResults(false)
        else if (collection.length === 0)
            setShowNoMoreResults(true)
    }, [collection])

    const titleCollection = title || 'insertTitle'
    const placeholderSearch = placeholder || 'insertPlaceholder'

    return (
        <div className='UsersPanel'>
            <Container fluid className='px-0'>
                <Row noGutters>
                    <Col>
                        <h5 className='userPanelTitle mb-0'>{titleCollection}</h5>
                        <input type='text' placeholder={placeholderSearch + '..'}
                            className='mt-2 w-100'
                            onChange={(event) => {
                                const inputSearch = event.target.value
                                if (inputSearch.length > 2 || inputSearch.length === 0) {
                                    handleUserSearch(inputSearch)
                                }
                            }}
                        />
                    </Col>
                </Row>
                <Row noGutters>
                    <Col>
                        <div className='userItemsBox'>
                            {collection === null
                                ? <div className='h-100 d-flex justify-content-center align-items-center'>
                                    <Spinner animation='border' />
                                </div>
                                : <>
                                    {collection.map((item, idx) =>
                                        <div key={idx} className='userPanelBox py-1' style={isItemClickable ? { cursor: 'pointer' } : {}}>
                                            {userItem(item, role, idx)}
                                        </div>
                                    )}
                                    {collection.length === 0 && showNoMoreResults
                                        ? <div className='noResultsFoundUsers text-center'>No results found</div>
                                        : showNoMoreResults
                                            ? <h6 className='text-center mt-2'>No more results</h6>
                                            : requestingMoreResults
                                                ? <div className='d-flex justify-content-center align-items-center mb-2'
                                                    style={{ height: '50px' }}>
                                                    <Spinner animation='border' />
                                                </div>
                                                : <button className='darkButton buttonRounded mx-auto mb-4'
                                                    onClick={() => {
                                                        setRequestingMoreResults(true)
                                                        handleShowMoreResults().then((response) => {
                                                            setRequestingMoreResults(false)
                                                            if (response === -1)
                                                                setShowNoMoreResults(true)
                                                        })
                                                    }}>
                                                    <h6 className='my-1 mx-3'>More users</h6>
                                                </button>
                                    }</>}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}