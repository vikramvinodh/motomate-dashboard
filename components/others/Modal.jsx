import React, { useEffect, useRef } from 'react';
import { FaXmark } from 'react-icons/fa6';

function Modal({ setModal, message, confirmAction, handleInputChange }) {
    const buttonRef = useRef(null);

    useEffect(() => {
        buttonRef.current.click();
    }, []);

    const handleChange = (event) => {
        handleInputChange(event.target.value);
    };

    return (
        <div>
            <button
                type="button"
                ref={buttonRef}
                style={{ display: 'none' }}
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#Modal"
            >
                Launch demo modal
            </button>

            <div className="modal fade " id="Modal" tabIndex="-1" data-bs-backdrop="false" data-bs-keyboard="false" aria-hidden="true" aria-labelledby="ModalLabel">
                <div className="modal-dialog">
                    <div className="modal-content text-dark">
                        <button onClick={() => setModal(false)} className='closebtn'>
                            <FaXmark size={15} fill='#0c213a' />
                        </button>
                        <div className="modal-body">
                            {message}
                        </div>
                        {handleInputChange && (
                            <div className="input-grp">
                                <label className='ml-20'>  Name : </label>
                                <input type='text' className='input-text ' name='heading' onChange={handleChange} />
                            </div>
                        )}
                        <div className="modal-footer">
                            <button className="greenbtn" onClick={() => { confirmAction(); setModal(false); }}>
                                Submit
                            </button>
                            <button className="redbtn" onClick={() => setModal(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
