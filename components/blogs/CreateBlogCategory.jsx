import { Link, useNavigate } from "react-router-dom"
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'
import { useEffect, useState } from "react"
import { validateCategoryFields, validateFields } from "./Valadation";
import { Error } from "../others/Alert";
import Loading from "../others/Loading";
import { LogsFunction } from "../functions";
import { CREATE_BLOG_CATEGORY } from "../others/Messages";

function CreateBlogCategory() {
    const [error, setError] = useState({ active: false, message: '' });
    const navigate = useNavigate()
    const [loading, setloading] = useState(false);
    const [state, setState] = useState({
        title: '',
        name: '',
        description: '',
        bottomBlock: [],
        internalBlock: [],
        currentQuestion: '',
        currentAnswer: '',
        internalQuestion: '',
        internalAnswer: '',
    })

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
        const validationError = validateCategoryFields(state);

        if (validationError) {
            setError({ active: true, message: validationError });
            return;
        }
        setloading(true)
        // Make API call to submit data
        try {
            const res = await fetch(`${import.meta.env.VITE_URL}/blog-category`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(state),
            });

            if (res.status === 200) {
                const response = await res.json();
                LogsFunction(CREATE_BLOG_CATEGORY + state.name)
                if (response.success) {
                    navigate('../blog/manage-blogs');
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


    useEffect(() => {
        setTimeout(() => {
            setError(false);
        }, 10000);
    }, [error]);

    return (
        <div className="create-blog">
            <div className="create-blog-container">
                <div className="create-blog-header">
                    <button onClick={() => navigate(-1)} className='me-3 clearbtn'>
                        <BsFillArrowLeftCircleFill fill='#0c213a' size={25} style={{ cursor: 'pointer' }} />
                    </button>
                    <h4>Create Blog Category</h4>
                </div>
                {loading ? <Loading /> :
                    <div className="create-blog-body">
                        <div className="d-flex row">
                            <div className="input-grp">
                                <label className='col-3'>Name : </label>
                                <input type='text' className='input-text ' value={state.name} name="name" onChange={handleChange} />
                            </div>
                            <div className="input-grp mt-3">
                                <label className='col-3 '>Title : </label>
                                <input type='text' className='input-text ' value={state.title} name="title" onChange={handleChange} />
                            </div>
                            <div className="input-grp mt-3">
                                <label className='col-3 '>Description : </label>
                                <textarea rows={3} type='text' className='input-text ' value={state.description} name="description" onChange={handleChange} />
                            </div>

                            <h5 className='mt-5 ms-3'>Bottom Block  Section</h5>
                            <div>
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
                                <div className=" input-text faq-preview">
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
                            </div>

                            <h5 className='mt-5 ms-3'>Internal Block  Section</h5>
                            <div>
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

                                <div className=" input-text faq-preview">
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
                            </div>
                        </div>
                        <div className="d-flex justify-content-end mt-4">
                            <button className="purplebtn" type="button" onClick={handleSubmit}>Create Blog Category</button>
                        </div>
                    </div>
                }
            </div>
            {
                error.active && <Error message={error.message} />
            }
        </div>
    )
}

export default CreateBlogCategory
