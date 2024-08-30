import { useNavigate, useParams } from "react-router-dom"
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'
import { useState, useEffect } from 'react';
import JoditEditorComponent from '../Editor/JoditEditorComponent';
import FetchSingleBlog from "../functions/FetchSingleBlog";
import axios from "axios";
import Loading from "../others/Loading";
import { validateFields } from "./Valadation";
import { LogsFunction } from "../functions";
import { EDIT_ARTICLE } from "../others/Messages";
import { Error } from "../others/Alert";
import FetchBlogCategoryData from "../functions/FetchBlogCategory";
import FetchAuthorsData from "../functions/FetchAuthors";


function EditBlog() {
    const { id } = useParams();
    const { blogCategory } = FetchBlogCategoryData(); // Category data
    const { authors } = FetchAuthorsData(); // Category data
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState({ active: false, message: '' });
    const navigate = useNavigate()
    const [state, setState] = useState({
        newQuestion: '',
        newAnswer: '',
        currentQuestion: '',
        currentAnswer: '',
        internalQuestion: '',
        internalAnswer: '',
        faqs: [],
        internal_section: [],
        bottom_section: []
    })
    const [content, setContent] = useState('');

    //---------------------------------------------------------------------//
    // Jodit Editor Controller
    const handleEditorChange = (newContent) => {
        setContent(newContent);
    };

    const joditConfig = {
        enableDragAndDropFileToEditor: true,
    };
    //---------------------------------------------------------------------//

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    };

    const fetchData = async () => {
        try {
            const Data = await axios.get(`${import.meta.env.VITE_URL}/blogs/get-one/${id}`)
            const dataState = Data.data.data
            setState(dataState);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onAddFAQ = (e) => {
        e.preventDefault();
        const { newQuestion, newAnswer } = state;
        if (newQuestion && newAnswer) {
            const faq = { question: newQuestion, answer: newAnswer };
            setState({ ...state, faqs: [...state.faqs, faq], newQuestion: '', newAnswer: '' });
        }
    };

    const onRemoveFAQ = (e, index) => {
        e.preventDefault();
        const updatedFAQs = [...state.faqs];
        updatedFAQs.splice(index, 1);
        setState({ ...state, faqs: updatedFAQs });
    };

    function onRemoveBottomBlock(index) {
        const updatedBottom = [...state.bottom_section]
        updatedBottom.splice(index, 1);
        setState({ ...state, bottom_section: updatedBottom })
    }

    const onAddBottomBlock = () => {
        const { currentQuestion, currentAnswer } = state;
        if (currentQuestion && currentAnswer) {
            const bottomBlock = { question: currentQuestion, answer: currentAnswer };
            setState({
                ...state,
                bottom_section: [...state.bottom_section, bottomBlock],
                currentQuestion: '',
                currentAnswer: '',
            });
        }
    };

    function onRemoveInternallock(index) {
        const updatedBottom = [...state.internal_section]
        updatedBottom.splice(index, 1);
        setState({ ...state, internal_section: updatedBottom })
    }

    const onAddInternalBlock = () => {
        const { internalQuestion, internalAnswer } = state;
        if (internalQuestion && internalAnswer) {
            const internalBlock = { question: internalQuestion, answer: internalAnswer };
            setState({
                ...state,
                internal_section: [...state.internal_section, internalBlock],
                internalQuestion: '',
                internalAnswer: '',
            });
        }
    };

    async function handleSubmit(e) {
        e.preventDefault()
        const { title, faqs, slug, readTime, interested, view, smalldesc, share, bottom_section, internal_section, meta_key, meta_description, meta_title, meta_robots, author, category } = state

        const validationError = validateFields(state, content);

        if (validationError) {
            setError({ active: true, message: validationError });
            setTimeout(() => {
                setError({ active: false, message: '' })
            }, 3000);
        } else {
            const data = {
                body: content || state.body,
                title: title,
                faqs: faqs,
                slug: slug,
                readTime: readTime,
                interested: interested,
                view: view,
                smalldesc: smalldesc,
                share: share,
                bottom_section: bottom_section,
                internal_section: internal_section,
                meta_key: meta_key,
                meta_title: meta_title,
                meta_description: meta_description,
                meta_robots: meta_robots,
                category: category,
                author: author,
            }

            try {
                const res = await fetch(`${import.meta.env.VITE_URL}/blogs/${id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });

                if (res.status === 200) {
                    const response = await res.json();
                    LogsFunction(EDIT_ARTICLE + state.slug)
                    if (response.success) {
                        navigate('../blog/articles');
                    } else {
                        // Handle other response scenarios, such as server errors
                        setError({ active: true, message: "Server error: " });
                    }

                } else {
                    // Handle non-200 status codes (e.g., 400 Bad Request, 500 Internal Server Error)
                    setError({ active: true, message: "Failed to submit. Please try again later." });
                }
            } catch (error) {
                // Handle network errors or exceptions
                setError({ active: true, message: "An error occurred. Please try again later." });
            }
        }

    }

    return (
        <div className="create-blog">
            <div className="create-blog-container">
                <div className="create-blog-header">
                    <button onClick={() => navigate(-1)} className='me-3 clearbtn'>
                        <BsFillArrowLeftCircleFill fill='#0c213a' size={25} style={{ cursor: 'pointer' }} />
                    </button>
                    <h4>Edit Blog Article</h4>
                </div>
                {loading ? <Loading /> :
                    state ?
                        <div className="create-blog-body">
                            <div className="d-flex row">
                                <div className="col-lg-6">
                                    <div className="input-grp">
                                        <label className='col-3'>Title : </label>
                                        <input type='text' className='input-text ' onChange={handleChange} name='title' value={state.title} />
                                    </div>
                                    <div className="input-grp mt-3">
                                        <label className='col-3 '>Page Slug : </label>
                                        <input type='text' className='input-text ' onChange={handleChange} name='slug' value={state.slug} />
                                    </div>
                                    <div className="input-grp mt-3">
                                        <label className='col-3 '>readTime : </label>
                                        <input type='text' className='input-text ' onChange={handleChange} name='readTime' value={state.readTime} />
                                    </div>
                                    <div className="input-grp mt-3">
                                        <label className='col-3 '>interested : </label>
                                        <input type='text' className='input-text ' onChange={handleChange} name='interested' value={state.interested} />
                                    </div>
                                    <div className="input-grp mt-3">
                                        <label className='col-3 '>view : </label>
                                        <input type='text' className='input-text ' onChange={handleChange} name='view' value={state.view} />
                                    </div>
                                    <div className="input-grp mt-3">
                                        <label className='col-3 '>share : </label>
                                        <input type='text' className='input-text ' onChange={handleChange} name='share' value={state.share} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="input-grp">
                                        <label className='col-3'>Meta Robots : </label>
                                        <select className='col-9 input-text' name="meta_robots" value={state.meta_robots} onChange={handleChange}>
                                            <option value="" disabled>Select a option</option>
                                            <option value="index,follow" >Index, Follow</option>
                                            <option value="index,nofollow" >Index, NoFollow</option>
                                            <option value="noindex,follow" >NoIndex, Follow</option>
                                            <option value="noindex,nofollow" >NoIndex, NoFollow</option>
                                        </select>
                                    </div>
                                    <div className="input-grp mt-3">
                                        <label className='col-3'>Meta Key : </label>
                                        <input type='text' className='input-text ' onChange={handleChange} name='meta_key' value={state.meta_key} />
                                    </div>
                                    <div className="input-grp mt-3">
                                        <label className='col-3'>Meta Title : </label>
                                        <input type='text' className='input-text ' onChange={handleChange} name='meta_title' value={state.meta_title} />
                                    </div>
                                    <div className="input-grp mt-3">
                                        <label className='col-3'>Meta Description : </label>
                                        <textarea rows={3} type='text' className='input-text ' onChange={handleChange} name='meta_description' value={state.meta_description} />
                                    </div>
                                    <div className="input-grp mt-3">
                                        <label className='col-3 '>Card Content/small description : </label>
                                        <textarea rows={3} type='text' className='input-text ' onChange={handleChange} name='smalldesc' value={state.smalldesc} />
                                    </div>
                                </div>
                                <hr />
                                <div className='editor-container px-0' >
                                    <JoditEditorComponent
                                        value={state.body}
                                        onChange={handleEditorChange}
                                        config={joditConfig}
                                    />
                                </div>

                                <select className='input-text' name="category" onChange={handleChange} value={state.category._id}>
                                    <option value=''>Select a Category</option>
                                    {
                                        blogCategory && blogCategory.map((value, index) => {
                                            return (
                                                <option value={value._id} key={index}>{value.name}</option>
                                            )
                                        })
                                    }
                                </select>

                                <select className='input-text mt-4' name="author" onChange={handleChange} value={state.author._id}>
                                    <option value=''>Select a Author</option>
                                    {
                                        authors && authors.map((value, index) => {
                                            return (
                                                <option value={value._id} key={index}>{value.name}</option>
                                            )
                                        })
                                    }
                                </select>

                                <div>
                                    <h5 className='mt-4'>FAQ Section</h5>
                                    <div className="d-flex row my-3 align-items-center">
                                        <div className="col-lg-12">
                                            <div className="input-grp ">
                                                <input type='text' placeholder=' FAQ Question' onChange={handleChange} value={state.newQuestion} className='input-text template-input' name="newQuestion" />
                                            </div>
                                            <div className="input-grp">
                                                <textarea rows={3} placeholder='FAQ Answer' onChange={handleChange} value={state.newAnswer} className='input-text template-input' name="newAnswer" />
                                            </div>
                                        </div>
                                        <button className="greenbtn col-1" onClick={(e) => onAddFAQ(e)}>Add</button>
                                    </div>

                                    <div className="col-lg-12 input-text faq-preview m-0">
                                        {state.faqs.map((faq, index) => (
                                            <div className="d-flex justify-content-between  input-text  my-2" key={index}>
                                                <li key={index} className="list-group-item">
                                                    <strong>Q: </strong> {faq.question}
                                                    <br />
                                                    <strong>A: </strong> {faq.answer}
                                                </li>
                                                <button className="btn btn-sm btn-danger float-end" onClick={(e) => onRemoveFAQ(e, index)}>
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h5 className='mt-2 '>Bottom Block Section</h5>
                                    <div className="d-flex row my-3 align-items-center">
                                        <div className="col-lg-12">
                                            <div className="input-grp ">
                                                <input type='text' placeholder=' Bottom block Title' onChange={handleChange} className='input-text template-input' value={state.currentQuestion} name="currentQuestion" />
                                            </div>
                                            <div className="input-grp">
                                                <textarea rows={3} placeholder='Bottom block value' onChange={handleChange} className='input-text template-input' value={state.currentAnswer} name="currentAnswer" />
                                            </div>
                                        </div>
                                        <button className="greenbtn col-1" onClick={(e) => onAddBottomBlock(e)} >Add</button>
                                    </div>
                                    <div className="col-lg-12 input-text faq-preview m-0">
                                        {state.bottom_section.map((faq, index) => (
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
                                <div>
                                    <h5 className='mt-2'>Internal Block Section</h5>
                                    <div className="d-flex row my-3 align-items-center">
                                        <div className="col-lg-12">
                                            <div className="input-grp ">
                                                <input type='text' placeholder=' Internal block Title' onChange={handleChange} className='input-text template-input' name="internalQuestion" value={state.internalQuestion} />
                                            </div>
                                            <div className="input-grp">
                                                <textarea rows={3} placeholder='Internal block value' onChange={handleChange} className='input-text template-input' name="internalAnswer" value={state.internalAnswer} />
                                            </div>
                                        </div>
                                        <button className="greenbtn col-1" onClick={(e) => onAddInternalBlock(e)}>Add</button>
                                    </div>
                                    <div className="col-lg-12 input-text faq-preview m-0">
                                        {state.internal_section.map((internal, index) => (
                                            <div className="d-flex justify-content-between  input-text  my-2" key={index}>
                                                <li key={index} className="list-group-item">
                                                    <strong>Q: </strong> {internal.question}
                                                    <br />
                                                    <strong>A: </strong> {internal.answer}
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
                                <button className="purplebtn" onClick={handleSubmit}>Edit Blog </button>
                            </div>
                        </div>
                        : ''
                }
            </div>
            {
                error.active && <Error message={error.message} />
            }
        </div>
    )
}

export default EditBlog
