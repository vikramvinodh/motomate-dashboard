import { Link, useNavigate, useParams } from "react-router-dom"
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'
import { useState } from "react"
import FetchSingleBlogAuth from "../functions/FetchSingleBlogAuth";
import { useEffect } from "react";
import axios from "axios";
import Loading from "../others/Loading";
import { validateAuthorFields } from "./Valadation";
import { Error } from "../others/Alert";
import { LogsFunction } from "../functions";
import { EDIT_AUTHOR } from "../others/Messages";

function CreateBlogAuthor() {
    const { id } = useParams();
    const [state, setState] = useState({})
    const [error, setError] = useState({ active: false, message: '' });
    const [loading, setloading] = useState(true);
    const navigate = useNavigate()

    const fetchData = async () => {
        try {
            const Data = await axios.get(`${import.meta.env.VITE_URL}/blog-author/get-one/${id}`)
            setState(Data.data.data);
            setloading(false);
        } catch (error) {
            setError({ active: true, message: "Error Fetching Blogs: " + error });
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    function onRemoveInternallock(index) {
        const updatedBottom = [...state.internalBlock]
        updatedBottom.splice(index, 1);
        setState({ ...state, internalBlock: updatedBottom })
    }

    const onAddInternalBlock = () => {
        const { internalQuestion, internalAnswer } = state;
        if (internalQuestion && internalAnswer) {
            const internalBlock = { question: internalQuestion, answer: internalAnswer };
            setState({
                ...state,
                internalBlock: [...state.internalBlock, internalBlock],
                internalQuestion: '',
                internalAnswer: '',
            });
        }
    };


    function onRemoveBottomBlock(index) {
        const updatedBottom = [...state.bottomBlock]
        updatedBottom.splice(index, 1);
        setState({ ...state, bottomBlock: updatedBottom })
    }

    const onAddBottomBlock = () => {
        const { currentQuestion, currentAnswer } = state;
        if (currentQuestion && currentAnswer) {
            const bottomBlock = { question: currentQuestion, answer: currentAnswer };
            setState({
                ...state,
                bottomBlock: [...state.bottomBlock, bottomBlock],
                currentQuestion: '',
                currentAnswer: '',
            });
        }
    };

    async function handleSubmit() {
        const { name, description, linkdin, facebook, twitter, bottomBlock, internalBlock, designation, since_year } = state
        const validationError = validateAuthorFields(state);

        if (validationError) {
            setError({ active: true, message: validationError });
            return;
        }

        setloading(true)
        const formData = new FormData();
        formData.append('name', name);
        formData.append('designation', designation);
        formData.append('description', description);
        formData.append('linkdin', linkdin);
        formData.append('facebook', facebook);
        formData.append('twitter', twitter);
        formData.append('bottomBlock', JSON.stringify(bottomBlock));
        formData.append('internalBlock', JSON.stringify(internalBlock));
        formData.append('since_year', since_year);

        try {
            const res = await fetch(`${import.meta.env.VITE_URL}/blog-author/${id}`, {
                method: "PATCH",
                body: formData,
            });

            if (res.status === 200) {
                const response = await res.json();
                LogsFunction(EDIT_AUTHOR + name)
                if (response.success) {
                    navigate('../blog/manage-authors');
                } else {
                    setloading(false)
                    setError({ active: true, message: "Server error: " + response.message });
                }

            } else if (res.status === 400) {
                // Handle specific status code (e.g., 400 Bad Request)
                const response = await res.json();
                setloading(false)
                setError({ active: true, message: "Bad Request: " + response.message });
            } else {
                // Handle other status codes (e.g., 500 Internal Server Error)
                setloading(false)
                setError({ active: true, message: "Failed to submit. Please try again later." });
            }
        } catch (error) {
            // Handle network errors or exceptions
            setloading(false)
            setError({ active: true, message: "An error occurred. Please try again later." });
        }
    }


    return (
        <div className="create-blog">
            <div className="create-blog-container">
                <div className="create-blog-header">
                    <button onClick={() => navigate(-1)} className='me-3 clearbtn'>
                        <BsFillArrowLeftCircleFill fill='#0c213a' size={25} style={{ cursor: 'pointer' }} />
                    </button>
                    <h4>Edit Blog Author</h4>
                </div>
                {loading ? <Loading /> :
                    <div className="create-blog-body">
                        <div className="d-flex row">
                            <div className="input-grp">
                                <label className='col-3'>Name : </label>
                                <input type='text' className='input-text ' value={state.name} name="name" onChange={handleChange} />
                            </div>
                            <div className="input-grp mt-3">
                                <label className='col-3 '>Designation : </label>
                                <input type='text' className='input-text ' value={state.designation} name="designation" onChange={handleChange} />
                            </div>
                            <div className="input-grp mt-3">
                                <label className='col-3 '>Description : </label>
                                <textarea rows={3} type='text' className='input-text ' value={state.description} name="description" onChange={handleChange} />
                            </div>
                            <div className="input-grp">
                                <label className='col-3'>Linkedin : </label>
                                <input type='text' className='input-text ' value={state.linkdin} name="linkdin" onChange={handleChange} />
                            </div>
                            <div className="input-grp mt-3">
                                <label className='col-3'>Facebook : </label>
                                <input type='text' className='input-text ' value={state.facebook} name="facebook" onChange={handleChange} />
                            </div>
                            <div className="input-grp mt-3">
                                <label className='col-3'>Twitter : </label>
                                <input type='text' className='input-text ' value={state.twitter} name="twitter" onChange={handleChange} />
                            </div>
                            <div className="input-grp mt-3">
                                <label className='col-3'>Since year : </label>
                                <input type='text' className='input-text ' value={state.since_year} name="since_year" onChange={handleChange} />
                            </div>
                            <h5 className='mt-5 ms-3'>Bottom Block  Section</h5>
                            <div className="d-flex row my-3 align-items-center">
                                <div className="col-lg-12">
                                    <div className="input-grp ">
                                        <input type='text' placeholder=' Bottom block title' className='input-text template-input' name='currentQuestion' value={state.currentQuestion} onChange={handleChange} />
                                    </div>
                                    <div className="input-grp">
                                        <textarea rows={3} placeholder='Bottom block value' className='input-text template-input' name='currentAnswer' value={state.currentAnswer} onChange={handleChange} />
                                    </div>
                                </div>
                                <button className="greenbtn col-1" onClick={(e) => onAddBottomBlock(e)}>Add</button>
                            </div>
                            {
                                <div className=" input-text faq-preview mx-2">
                                    {state.bottomBlock.map((faq, index) => (
                                        <div className="d-flex justify-content-between  input-text  my-2" key={index}>
                                            <li key={index} className="list-group-item">
                                                <strong>Q: </strong> {faq.question}
                                                <br />
                                                <strong>A: </strong> {faq.answer}
                                            </li>
                                            <button className="btn btn-sm btn-danger float-end" onClick={(e) => onRemoveBottomBlock(e, index)}>
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            }

                            <h5 className='mt-5 ms-3'>Internal Block  Section</h5>
                            <div className="d-flex row my-3 align-items-center">
                                <div className="col-lg-12">
                                    <div className="input-grp ">
                                        <input type='text' placeholder=' Bottom block title' className='input-text template-input' name='internalQuestion' value={state.internalQuestion} onChange={handleChange} />
                                    </div>
                                    <div className="input-grp">
                                        <textarea rows={3} placeholder='Bottom block value' className='input-text template-input' name='internalAnswer' value={state.internalAnswer} onChange={handleChange} />
                                    </div>
                                </div>
                                <button className="greenbtn col-1" onClick={(e) => onAddInternalBlock(e)}>Add</button>
                            </div>
                            {
                                <div className=" input-text faq-preview mx-2">
                                    {state.internalBlock.map((faq, index) => (
                                        <div className="d-flex justify-content-between  input-text  my-2" key={index}>
                                            <li key={index} className="list-group-item">
                                                <strong>Q: </strong> {faq.question}
                                                <br />
                                                <strong>A: </strong> {faq.answer}
                                            </li>
                                            <button className="btn btn-sm btn-danger float-end" onClick={(e) => onRemoveInternallock(e, index)}>
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            }
                        </div>
                        <div className="d-flex justify-content-end mt-4">
                            <button type="button" className="purplebtn" onClick={handleSubmit}>Edit Blog Author</button>
                        </div>
                    </div>
                }

            </div>
            {
                error.active && <Error message={error.message} />
            }
        </div >
    )
}

export default CreateBlogAuthor
