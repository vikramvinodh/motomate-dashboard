import { Link } from "react-router-dom"
import { FiEdit2 } from 'react-icons/fi'
import { BiSearchAlt2, BiSolidEditAlt, BiTrash } from 'react-icons/bi'
import { FaBook, FaEye } from 'react-icons/fa'
import Loading from "../others/Loading"
import { useState } from "react"
import Modal from "../others/Modal"
import Alert, { Error } from "../others/Alert"
import { useEffect } from "react"
import axios from "axios"
import { AppContext } from "../Context"
import { useContext } from "react"
import { LogsFunction } from "../functions"
import { DELET_ARTICLE, DELET_BLOG_CATEGORY } from "../others/Messages"

function ManageBlogs() {
    const [activeCategory, setActiveCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState('')
    const [blogCategory, setblogCategory] = useState(null);
    const [loading, setloading] = useState(true);
    const { adminData } = useContext(AppContext)

    const fetchData = async () => {
        try {
            const Data = await axios.get(`${import.meta.env.VITE_URL}/blog-category`);
            setblogCategory(Data.data.data);
            setloading(false);
        } catch (error) {
            setError({ active: true, message: "Error Fetching Blog Category: " + error });
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const [success, setsuccess] = useState(false)
    const [error, setError] = useState({ active: false, message: '' });

    const [showmodal, setShowmodal] = useState(false)
    const [showModalArticle, setShowmodalArticle] = useState(false)

    const [deleteData, setDeletedata] = useState(null)
    const [deleteArticle, setDeleteArticle] = useState(null)

    function handleSearch(item) {
        setSearchTerm(item)
    }

    function handleClear(value) {
        setActiveCategory(value)
        setSearchTerm('')
        let searchbar = document.getElementById('search')
        searchbar.value = ''
    }

    async function HandleDelete(e) {

        if (deleteData.blogs.length > 0) {
            setError({ active: true, message: "Cannot delete category With Blogs" });
            return
        }

        try {
            const res = await fetch(`${import.meta.env.VITE_URL}/blog-category/${deleteData._id}`, {
                method: "DELETE",
            });

            if (res.status === 200) {
                const response = await res.json();
                LogsFunction(DELET_BLOG_CATEGORY + deleteData.name)
                if (response.success) {
                    setblogCategory(blogCategory.filter(category => category._id !== deleteData._id))
                    setsuccess(true)
                } else {
                    // Handle other response scenarios, such as server errors
                    setError({ active: true, message: "Server error: " + response.message });
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

    async function HandleDeleteArticle() {
        try {
            const res = await fetch(`${import.meta.env.VITE_URL}/blogs/${deleteArticle._id}`, {
                method: "DELETE",
            });

            if (res.status === 200) {
                const response = await res.json();
                if (response.success) {
                    fetchData()
                    LogsFunction(DELET_ARTICLE + deleteArticle.title)
                    setActiveCategory(null)
                    setsuccess(true)
                } else {
                    // Handle other response scenarios, such as server errors
                    setError({ active: true, message: "Server error: " + response.message });
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

    function handleClickDelete(e, value, courseCat) {
        e.preventDefault();
        if (courseCat) {
            setDeletedata(value);
            setShowmodal(true);
        } else {
            setDeleteArticle(value)
            setShowmodalArticle(true)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setsuccess(false)
        }, 10000);
    }, [success])

    useEffect(() => {
        setTimeout(() => {
            setError(false)
        }, 10000);
    }, [error])


    return (
        <>
            {
                loading ? <Loading />
                    :
                    <div className="manage-blogs">
                        <div className="blog-container">
                            <div className="blog-board col-lg-4 col-sm-12">
                                <div className="blog-board-header">
                                    <p>Blog Categories ({blogCategory ? blogCategory.length : 0})</p>
                                    <Link to="category">
                                        <button className='greenbtn'>+ New</button>
                                    </Link>
                                </div>
                                <div className="blog-board-body">
                                    {
                                        blogCategory && blogCategory.map((value, index) => {
                                            return (
                                                <div className="blog-board-item" key={index}
                                                    onClick={() => handleClear(value)}>
                                                    <div className="d-flex align-items-center">
                                                        {value.name}
                                                    </div>

                                                    <div className="d-flex">
                                                        <Link to={`edit-category/${value._id}`}>
                                                            <button className="greenbtn">
                                                                <FiEdit2 fill='white' size={10} />
                                                            </button>
                                                        </Link>
                                                        {adminData && adminData.isadmin > 0 ? "" :
                                                            <button className="redbtn" onClick={(e) => handleClickDelete(e, value, true)} >
                                                                <BiTrash size={15} />
                                                            </button>
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="article-board col-lg-8 mx-3 col-sm-12">
                                <div className="article-board-header">
                                    <p> {activeCategory && activeCategory.name} Articles  </p>
                                    <div className="search">
                                        <input type='text' name='search' placeholder='Search' id='search' className='search-bar'
                                            onChange={(e) => handleSearch(e.target.value)}
                                        />
                                        <BiSearchAlt2 fill='#2c3652' size={20} className='search-icon' />

                                    </div>
                                </div>
                                <div className="article-board-body">
                                    {
                                        activeCategory && activeCategory.blogs
                                            .filter(blog =>
                                                blog.title.toLowerCase().includes(searchTerm.toLowerCase()))
                                            .map((value, index) => {
                                                return (
                                                    <div className="course-board-item" key={index}>
                                                        <div className="d-flex align-items-center">
                                                            <div className="category-icon">
                                                                <FaBook fill='#1761fd' size={20} />
                                                            </div>
                                                            <p className="m-0">{value.title.slice(0, 40) + '...'}</p>
                                                        </div>
                                                        <div className="d-flex">
                                                            <Link to={`/blog/edit-article/${value._id}`}>
                                                                <button className="greenbtn">
                                                                    <BiSolidEditAlt size={15} />
                                                                </button>
                                                            </Link>
                                                            <a href={`${import.meta.env.VITE_VIEW}/blog/${value.slug}`} target="__blank">
                                                                <button className="purplebtn">
                                                                    <FaEye size={15} />
                                                                </button>
                                                            </a>
                                                            {adminData && adminData.isadmin > 0 ? "" :
                                                                <button className="redbtn">
                                                                    <BiTrash size={15} onClick={(e) => handleClickDelete(e, value, false)} />
                                                                </button>
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            }).reverse()
                                    }
                                </div>

                            </div>
                        </div>
                        {
                            showmodal && <Modal setModal={setShowmodal} message={'Proceed to Delete Category?'} confirmAction={HandleDelete} />
                        }
                        {
                            showModalArticle && <Modal setModal={setShowmodalArticle} message={'Proceed to Delete Article?'} confirmAction={HandleDeleteArticle} />
                        }
                        {
                            success && <Alert message={'SuccessFully Deleted'} />
                        }
                        {
                            error.active && <Error message={error.message} />
                        }
                    </div >
            }
        </>
    )
}

export default ManageBlogs
