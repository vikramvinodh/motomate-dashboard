import React from 'react';
import { BsFillPatchCheckFill } from 'react-icons/bs';
import { MdCancel } from 'react-icons/md';

/**
 * Component for displaying a success alert.
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.message - The message to display in the success alert.
 * @returns {JSX.Element} JSX element representing the success alert.
 */
function Alert({ message }) {
    return (
        <div className="green-alert">
            <BsFillPatchCheckFill fill='#03d87f' size={20} className='mx-3' />
            <p className='m-0'>{message}</p>
        </div>
    );
}

export default Alert;

/**
 * Component for displaying an error alert.
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.message - The message to display in the error alert.
 * @returns {JSX.Element} JSX element representing the error alert.
 */
export function Error({ message }) {
    return (
        <div className="red-alert">
            <MdCancel fill='#ef2020' size={20} className='mx-3' />
            <p className='m-0'>{message}</p>
        </div>
    );
}
