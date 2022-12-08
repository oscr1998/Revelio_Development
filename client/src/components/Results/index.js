import React from 'react'
import Backdrop from '../Backdrop'

export default function Results({handleClose}) {
    return (
        <Backdrop onClick={handleClose}>
            <h1>Results</h1>
        </Backdrop>
    )
}
