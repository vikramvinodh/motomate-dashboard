import React from 'react'
import { CiSquareRemove } from 'react-icons/ci';

function Restrected() {
    return (
        <div className='restrected text-dark text-capitalize'>
            <p>
                <CiSquareRemove />   You are not permitted
            </p>
        </div>
    )
}

export default Restrected
