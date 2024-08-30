import { useContext, useState, useEffect } from 'react';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../Context';
import Loading from '../others/Loading';
import { LogsFunction } from '../functions';
import { CREATED_PRODUCT, UPDATED_PRODUCT } from '../others/Messages';
import GalleryBtn from '../Media/GalleryBtn';

function AddProduct() {
    const { adminData } = useContext(AppContext);
    const [formState, setFormState] = useState({ price: '', name: '', description: '', image: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            setLoading(true);
            fetch(`${import.meta.env.VITE_URL}/products/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': sessionStorage.getItem('token'),
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    setFormState({
                        name: data.name || '',
                        price: data.price || '',
                        description: data.description || '',
                        image: data.image || '',
                    });
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                    alert('Failed to load product data');
                });
        }
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setError((prevError) => ({ ...prevError, [name]: '' }));
        setFormState((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { name, price, description, image } = formState;

        // Perform validation
        const errors = {};
        if (!name) {
            errors.name = 'Product Name is required';
        }
        if (!price) {
            errors.price = 'Price is required';
        } else if (isNaN(price)) {
            errors.price = 'Price must be a number';
        }
        if (!description) {
            errors.description = 'Description is required';
        }
        if (!image) {
            errors.image = 'Image URL is required';
        }

        if (Object.keys(errors).length > 0) {
            setError(errors);
            return;
        }

        setLoading(true);

        const url = id
            ? `${import.meta.env.VITE_URL}/products/${id}`
            : `${import.meta.env.VITE_URL}/products`;

        const method = id ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'auth-token': sessionStorage.getItem('token'),
            },
            body: JSON.stringify({ name, price, description, image }),
        });

        const data = await response.json();

        setLoading(false);

        if (response.status === 201) {
            LogsFunction(id ? UPDATED_PRODUCT + name : CREATED_PRODUCT + name);
            navigate('../products/product-list');
        } else {
            alert('There was a problem saving the product');
        }
    };

    return (
        <div className="create-user">
            <div className="create-user-container">
                <div className="d-flex align-items-center">
                    <button onClick={() => navigate(-1)} className="me-3 clearbtn">
                        <BsFillArrowLeftCircleFill fill="#0c213a" size={25} style={{ cursor: 'pointer' }} />
                    </button>
                    <h5 className="m-0 text-center">{id ? 'Edit Product' : 'Add Product'}</h5>
                </div>
                {loading ? (
                    <Loading />
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="input-grp">
                            <label className="col-3">Product Name:</label>
                            <input
                                type="text"
                                name="name"
                                className="input-text"
                                value={formState.name}
                                onChange={handleChange}
                            />
                            {error.name && <p className="text-danger">{error.name}</p>}
                        </div>

                        <div className="input-grp">
                            <label className="col-3">Description:</label>
                            <input
                                type="text"
                                name="description"
                                className="input-text"
                                value={formState.description}
                                onChange={handleChange}
                            />
                            {error.description && <p className="text-danger">{error.description}</p>}
                        </div>

                        <div className="input-grp">
                            <label className="col-3">Price:</label>
                            <input
                                type="text"
                                name="price"
                                className="input-text"
                                value={formState.price}
                                onChange={handleChange}
                            />
                            {error.price && <p className="text-danger">{error.price}</p>}
                        </div>

                        <GalleryBtn />

                        <div className="input-grp">
                            <label className="col-3">Add Image</label>
                            <input
                                type="text"
                                name="image"
                                placeholder="Image URL"
                                className="input-text"
                                value={formState.image}
                                onChange={handleChange}
                            />
                            {error.image && <p className="text-danger">{error.image}</p>}
                        </div>

                        <button
                            className="purplebtn mt-3"
                            type="submit"
                            disabled={adminData && adminData.isadmin === 1}
                        >
                            {id ? 'Update' : 'Submit'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default AddProduct;
