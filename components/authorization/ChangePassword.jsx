import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router';
import Loading from '../others/Loading';
import { Error } from '../others/Alert';
import { AppContext } from '../Context';
import { LogsFunction } from '../functions';
import { CHANGE_PASSWORD } from '../others/Messages';

export default function ChangePassword() {

    const [state, setState] = useState({ oldpassword: '', newpassword: '', confpassword: '', response: '' });
    const [errorMessage, SeterrorMessage] = useState('');
    const [Alert, setAlert] = useState('');
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const { adminData } = useContext(AppContext)

    const handleChange = event => {
        setState({ ...state, [event.target.name]: event.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true)
        if (state.oldpassword === '') {
            setAlert({ show1: true })
            setLoading(false)
            return
        }

        if (state.newpassword === '') {
            setAlert({ show2: true })
            setLoading(false)
            return
        }

        if (state.confpassword === '') {
            setAlert({ show3: true })
            setLoading(false)
            return
        }

        if (state.newpassword !== state.confpassword) {
            setAlert({ show: true });
            setLoading(false)
            return
        }

        const respons = await fetch(`${import.meta.env.VITE_URL}/auth/change-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({ id: adminData._id, currentPassword: state.oldpassword, newPassword: state.newpassword })
        });


        const res = await respons.json();
        setState({ ...state, response: res.message })
        if (respons.ok) {
            LogsFunction(CHANGE_PASSWORD)
            setLoading(false)
            navigate('/')
            return
        } else {
            setLoading(false)
            SeterrorMessage(state.response)
        }
    }


    return (
        <div className="change-password">
            {
                loading ? <Loading />
                    :
                    <div className="change-password-container">
                        <h5>
                            Change Password
                        </h5>
                        <div className="card-body">
                            <form>
                                <div className="row justify-content-center">
                                    <div className="col-md-12">
                                        <label htmlFor="exampleInputEmail1" className='text-dark'>
                                            Old Password
                                            <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="password"
                                            className="input-text mt-2 mb-3"
                                            name="oldpassword"
                                            value={state.oldpassword}

                                            onChange={handleChange}
                                        />
                                        {Alert.show1 ? (
                                            <label className="text-danger mb-4">Required !</label>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                    <div className="col-md-12">
                                        <label htmlFor="exampleInputEmail1" className='text-dark'>
                                            New Password
                                            <span className="text-danger"></span>
                                        </label>
                                        <input
                                            type="password"
                                            className="input-text mt-2 mb-3"
                                            name="newpassword"
                                            value={state.newpassword}
                                            onChange={handleChange}
                                        />
                                        {Alert.show2 ? (
                                            <label className="text-danger mb-4">Required !</label>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                    <div className="col-md-12">
                                        <label htmlFor="exampleInputEmail1" className='text-dark'>
                                            Confirm Password
                                            <span className="text-danger"></span>
                                        </label>
                                        <input
                                            type="password"
                                            className="input-text mt-2 mb-3"
                                            name="confpassword"
                                            value={state.confpassword}
                                            onChange={handleChange}
                                        />
                                        {Alert.show3 ? (
                                            <label className="text-danger mb-4">Required !</label>
                                        ) : (
                                            ''
                                        )}
                                        {Alert.show ? (
                                            <label className="text-danger ">Password does not match !</label>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button type="submit" className="purplebtn" onClick={handleSubmit}>
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
            }
            {errorMessage && <Error message={errorMessage} />}
        </div>
    )
}
