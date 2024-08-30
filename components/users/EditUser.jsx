import { useCallback, useContext, useEffect, useState } from 'react'
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../Context'
import Loading from '../others/Loading'
import { LogsFunction } from '../functions'
import { EDIT_USER } from '../others/Messages'

function EditUser() {
    const { adminData } = useContext(AppContext)
    const { id } = useParams()
    const [formState, setformState] = useState({ isadmin: '', userStatus: '', email: '', username: '' })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({})
    const navigate = useNavigate()

    const fetchData = useCallback(async () => {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_URL}/auth/userdata/${id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
        });
        const data = await response.json();

        setformState({
            username: data.user.username,
            email: data.user.email,
            isadmin: data.user.isadmin,
            userStatus: data.user.userStatus
        });
        setLoading(false);
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [id]);

    const handleChange = event => {
        const { name, value } = event.target;
        setError(prevError => ({ ...prevError, [name]: '' }));
        setformState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async event => {
        event.preventDefault();

        const { email, username, isadmin, userStatus } = formState;

        // Perform validation
        const errors = {};
        if (!username) {
            errors.username = "Full Name is required";
        }
        if (!email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Invalid email address";
        }
        if (isadmin === '') {
            errors.isadmin = "Select one option";
        }

        if (Object.keys(errors).length > 0) {
            setError(errors);
            return;
        }

        setLoading(true);

        const respons = await fetch(`${import.meta.env.VITE_URL}/auth/updateprofile/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({ id, username, isadmin, userStatus })
        });

        if (respons.ok) {
            setLoading(false)
            LogsFunction(EDIT_USER + username)
            navigate('../users')
        } else {
            setLoading(false)
            return errors.top = "Error Creating User";
        }
    }

    return (
        <div className="create-user">
            <div className="create-user-container">
                <div className="d-flex align-items-center  ">
                    <button onClick={() => navigate(-1)} className='me-3 clearbtn'>
                        <BsFillArrowLeftCircleFill fill='#0c213a' size={25} style={{ cursor: 'pointer' }} />
                    </button>
                    <h5 className=" m-0 text-center">Edit User</h5>
                </div>
                <center>{error.top && <p className="text-danger">{error.top}</p>}</center>
                {loading ? <Loading /> :

                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="input-grp">
                            <label className='col-3' >Full Name :</label>
                            <input type="text" name="username" value={formState.username} className='input-text' onChange={handleChange} />
                        </div>

                        <center>{error.username && <p className="text-danger">{error.username}</p>}</center>

                        <div className="input-grp">
                            <label className='col-3' >Email :</label>
                            <input type="text" disabled name="email" value={formState.email} className='input-text' onChange={handleChange} />

                        </div>
                        <center>{error.email && <p className="text-danger">{error.email}</p>}</center>
                        {/* <div className="input-grp">
                            <label className='col-3' >Password :</label>
                            <input type="password" name="password" value={} className='input-text' onChange={handleChange} />

                        </div>
                        <center>{error.password && <p className="text-danger">{error.password}</p>}</center> */}

                        <div className="input-grp">
                            <label className='col-3' >Is Admin? :</label>
                            <select className='input-text' name="isadmin" value={formState.isadmin} onChange={handleChange}>
                                <option disabled value="">Select option</option>
                                <option value="0" >Admin</option>
                                {/* <option value="1" >viewer</option> */}
                                <option value="2" >Sales</option>
                                <option value="3">Publisher</option>
                                <option value="4">Digital marketing</option>
                            </select>
                        </div>
                        <center>{error.isadmin && <p className="text-danger">{error.isadmin}</p>}</center>

                        <div className="input-grp">
                            <label className='col-3' >Status  :</label>
                            <select className='input-text' name="userStatus" value={formState.userStatus} onChange={handleChange}>
                                <option disabled value="">Select option</option>
                                <option value="active" >Active</option>
                                <option value="inactive">InActive</option>
                            </select>
                        </div>

                        <button className="purplebtn mt-3" type='submit' disabled={adminData && adminData.isadmin === 1 ? true : false}>Submit</button>
                    </form>

                }

            </div>
        </div>
    )
}

export default EditUser;
