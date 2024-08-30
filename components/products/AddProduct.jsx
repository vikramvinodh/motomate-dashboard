import { useContext, useState } from 'react'
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../Context'
import Loading from '../others/Loading'
import { LogsFunction } from '../functions'
import { CREATED_USER } from '../others/Messages'

function AddProduct() {
    const { adminData } = useContext(AppContext)
    const [formState, setformState] = useState({ isadmin: '', userStatus: 'active', email: '', username: '', password: '' })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({})
    const navigate = useNavigate()

    const handleChange = event => {
        const { name, value } = event.target;
        setError(prevError => ({ ...prevError, [name]: '' }));
        setformState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async event => {
        event.preventDefault();

        const { email, password, username, isadmin, userStatus } = formState;

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
        if (!password) {
            errors.password = "Password is required";
        }
        if (isadmin === '') {
            errors.isadmin = "Select one option";
        }

        if (Object.keys(errors).length > 0) {
            setError(errors);
            return;
        }

        setLoading(true);

        const respons = await fetch(`${import.meta.env.VITE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': sessionStorage.getItem('token')
            },

            body: JSON.stringify({ email, password, username, isadmin, userStatus })
        });
        const data = await respons.json();

        if (data.success === 'true') {
            setLoading(false)
            LogsFunction(CREATED_USER + username)
            navigate('../users')
        } else {
            setLoading(false)
            return alert("'There was a problem creating User'")
        }
    }

    return (
        <div className="create-user">
            <div className="create-user-container">
                <div className="d-flex align-items-center  ">
                    <button onClick={() => navigate(-1)} className='me-3 clearbtn'>
                        <BsFillArrowLeftCircleFill fill='#0c213a' size={25} style={{ cursor: 'pointer' }} />
                    </button>
                    <h5 className=" m-0 text-center">Add Product</h5>
                </div>
                {loading ? <Loading /> :

                    <form onSubmit={handleSubmit}>
                        <div className="input-grp">
                            <label className='col-3' >Product Name :</label>
                            <input type="text" name="username" className='input-text' onChange={handleChange} />
                        </div>

                        <center>{error.username && <p className="text-danger">{error.username}</p>}</center>
                        <div className="input-grp">
                            <label className='col-3' >Description :</label>
                            <input type="password" name="password" className='input-text' onChange={handleChange} />

                        </div>
                        <div className="input-grp">
                            <label className='col-3' >Price :</label>
                            <input type="password" name="password" className='input-text' onChange={handleChange} />

                        </div>
                        <center>{error.password && <p className="text-danger">{error.password}</p>}</center>
                        <div className="input-grp">
                            <label htmlFor="" className='col-3'>Add Image</label>
                            <input type='text' placeholder='add image' className='input-text'/>
                        </div>

                        <button className="purplebtn mt-3" type='submit' disabled={adminData && adminData.isadmin === 1 ? true : false}>Submit</button>
                    </form>

                }

            </div>
        </div>
    )
}

export default AddProduct;
