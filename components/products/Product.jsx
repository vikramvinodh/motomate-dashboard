import { BiSolidEditAlt } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { LogsFunction, fetchProdcuts, fetchUsers, getAdmin } from '../functions';
import Loading from '../others/Loading';
import { Link } from 'react-router-dom';
import Modal from '../others/Modal';
import Alert, { Error } from '../others/Alert';
import axios from 'axios';
import { DELET_USER } from '../others/Messages';

function Product() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [adminData, setAdminData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [deleteData, setDeleteData] = useState(null);

    useEffect(() => {
        fetchData();
        fetchAdmin();
    }, []);

    async function fetchData() {
        try {
            const data = await fetchProdcuts();
            setUsers(data);
            setIsLoading(false);
        } catch (error) {
            setError({ active: true, message: "Error Fetching Users: " + error });
        }
    }

    async function fetchAdmin() {
        const admin = await getAdmin();
        setAdminData(admin);
    }

    function handleClick(e, value) {
        e.preventDefault();
        setDeleteData(value);
        setShowModal(true);
    }

    async function handleDelete() {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_URL}/products/${deleteData._id}`);
            if (response.status === 200) {
                LogsFunction(`${DELET_USER} ${deleteData.username}`);
                setUsers(users.filter(user => user._id !== deleteData._id));
                setSuccess(true);
            } else {
                setError(true);
            }
        } catch (error) {
            setError({ active: true, message: "Error Deleting Product: " + error });
            console.log(error);
            
            setError(true);
        }
    }

    return (
        <div className="users-list">
            <div className="users-container">
                <div className="users-header">
                    <Link to='/products/add-product' aria-label="Create User">
                        <button className="purplebtn">+ Add</button>
                    </Link>
                </div>
                <div className="users-body">
                    {isLoading ? <Loading /> : (
                        <table className='table table-responsive'>
                            <thead>
                                <tr>
                                    <th scope='col'>SL no.</th>
                                    <th scope='col'>Photo</th>
                                    <th scope='col'>Name</th>
                                    <th scope='col'>Description</th>
                                    <th scope='col'>Price</th>
                                    {(adminData && (adminData.isadmin === 0 || adminData.isadmin === 4)) && <th scope='col'>Actions</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {users.length ? (
                                    users.map((value, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td><img src={value.image} width={50} height={50} alt="" /></td>
                                            <td className='text-capitalize'>{value.name}</td>
                                            <td className='text-capitalize'>{value.description}</td>
                                            <td>{value.price}</td>

                                            {(adminData && (adminData.isadmin === 0 || adminData.isadmin === 4)) && (
                                                value._id === adminData._id ? (
                                                    <td className='text-center'>You</td>
                                                ) : (
                                                    <td className='text-center'>
                                                        <Link to={`/products/add-product/${value._id}`} aria-label="Edit User">
                                                            <button className="greenbtn">
                                                                <BiSolidEditAlt size={15} />
                                                            </button>
                                                        </Link>
                                                        <button className='redbtn' onClick={(e) => handleClick(e, value)} aria-label="Delete User">
                                                            <MdDelete size={15} />
                                                        </button>
                                                    </td>
                                                )
                                            )}
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="5" className="text-center">No data</td></tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {showModal && <Modal setModal={setShowModal} message={'Proceed to Delete User?'} confirmAction={handleDelete} />}
            {success && <Alert message={'SuccessFully Deleted User'} />}
            {error && <Error message={'Problem Deleting User'} />}
        </div>
    );
}

export default Product;