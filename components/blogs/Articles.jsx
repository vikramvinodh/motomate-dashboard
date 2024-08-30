import { Link } from 'react-router-dom'
import { BiSearchAlt2, BiSolidEditAlt } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import { FaEye } from 'react-icons/fa'
import { Fetchblogs, LogsFunction } from '../functions'
import { useState } from 'react'
import FetchBlogCategoryData from '../functions/FetchBlogCategory'
import Loading from '../others/Loading'
import usePagination from '../others/Paginator'
import Modal from '../others/Modal'
import Alert, { Error } from '../others/Alert'
import { useEffect } from 'react'
import { DELET_ARTICLE } from '../others/Messages'


function Articles() {
    const [isLoading, setIsLoading] = useState(false);
    const [blogs, Setblogs] = useState(null)
    const { blogCategory, loading } = FetchBlogCategoryData();
    const [selectedBlogs, setSelectedBlogs] = useState(sessionStorage.getItem('selectedBlogsList') || '');
    const [success, setsuccess] = useState(false)
    const [error, setError] = useState({ active: false, message: '' });
    const [showmodal, setShowmodal] = useState(false)
    const [deleteData, setDeletedata] = useState(null)


    // Define the number of items per page
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const [filteredBlogs, setFilteredBlogs] = useState([]);

    function handleSearch(item) {
        const filteredResult = blogs.filter((article) =>
            article.slug.includes(item.toLowerCase())
        );
        setFilteredBlogs(filteredResult);
    }

    const {
        currentPage,
        currentData,
        nextPage,
        prevPage,
        totalPages,
    } = usePagination(blogs || [], itemsPerPage);

    const handleCategory = (event) => {
        setIsLoading(true);
        const blogsValue = event.target.value
        const pagesData = async () => {
            try {
                const pagesData = await Fetchblogs(blogsValue, 30);
                sessionStorage.setItem('selectedBlogsList', blogsValue);
                setSelectedBlogs(blogsValue)
                const data = pagesData
                Setblogs(data);
            } catch (error) {
                setError({ active: true, message: "Error Fetching Articles: " + error });
            }
            setIsLoading(false);
        };
        pagesData();
    }

    useEffect(() => {
        // Retrieve the selected pattern from local storage
        const selectedBlogs = sessionStorage.getItem('selectedBlogsList')
        if (selectedBlogs) {
            handleCategory({ target: { value: selectedBlogs } });
        }
    }, []);

    const handleItemsPerPageChange = (e) => {
        const newItemsPerPage = parseInt(e.target.value, 10);
        setItemsPerPage(newItemsPerPage);
    };

    async function HandleDelete() {
        try {
            const res = await fetch(`${import.meta.env.VITE_URL}/blogs/${deleteData._id}`, {
                method: "DELETE",
            });

            if (res.status === 200) {
                const response = await res.json();
                LogsFunction(DELET_ARTICLE + deleteData.slug)
                if (response.success) {
                    Setblogs(blogs.filter(blog => blog._id !== deleteData._id))
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

    function handleClickDelete(e, value) {
        e.preventDefault();
        setDeletedata(value);
        setShowmodal(true);
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
                    <div className="articles">
                        <div className="articles-list-container">
                            <div className="articles-list-header">
                                <div className='d-flex align-items-center'>
                                    <select className='input-text' onChange={handleCategory} value={selectedBlogs}>
                                        <option value="">Select a Category</option>
                                        {
                                            blogCategory && blogCategory.map((value, index) => {
                                                return (
                                                    <option value={value.id} key={index}>{value.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <div className="search">
                                        <input type='text' placeholder='Search slug' name='search' className='search-bar'
                                            onChange={(e) => handleSearch(e.target.value)} />
                                        <BiSearchAlt2 fill='#2c3652' size={20} className='search-icon' />
                                    </div>
                                </div>
                                <Link to={'/blog/create-blog'}>
                                    <button className="purplebtn">+ Add</button>
                                </Link>
                            </div>
                            <div className="articles-list-body">
                                {
                                    isLoading ? <Loading /> :
                                        <table className="table table-responsive">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Title ({blogs && blogs.length ? blogs.length : 0}) </th>
                                                    <th>Page Slug</th>
                                                    <th>Author</th>
                                                    <th>Updated At</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    (filteredBlogs.length > 0 ? filteredBlogs : currentData).map((value, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{value.BlogArticleid}</td>
                                                                <td>{value.title} </td>
                                                                <td>{value.slug}</td>
                                                                <td>{value.author ? value.author : 'null'}</td>
                                                                <td>{value.updatedAt}</td>
                                                                <td width={220}>
                                                                    <Link to={`/blog/edit-article/${value._id}`}>
                                                                        <button className="greenbtn">
                                                                            <BiSolidEditAlt size={15} />
                                                                        </button>
                                                                    </Link>
                                                                    <Link to={`${import.meta.env.VITE_VIEW}/blog/${value.slug}`} target='__blank'>
                                                                        <button className="purplebtn">
                                                                            <FaEye size={15} />
                                                                        </button>
                                                                    </Link>
                                                                    <button className="redbtn" onClick={(e) => handleClickDelete(e, value)} >
                                                                        <MdDelete size={15} />
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                }
                            </div>
                            <div className="pagination">
                                <div className="items-per-page">
                                    <span>Show:</span>
                                    <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                        <option value={50}>50</option>
                                    </select>
                                    <span>items per page</span>
                                </div>
                                <div className='pagination-btn'>
                                    <button onClick={prevPage} disabled={currentPage === 1}>
                                        Previous
                                    </button>
                                    <span>
                                        Page {currentPage} of {totalPages}
                                    </span>
                                    <button onClick={nextPage} disabled={currentPage === totalPages}>
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
            }
            {
                showmodal && <Modal setModal={setShowmodal} message={'Proceed to Delete Blog?'} confirmAction={HandleDelete} />
            }
            {
                success && <Alert message={'SuccessFully Deleted Blog'} />
            }
            {
                error.active && <Error message={error.message} />
            }
        </>
    )
}

export default Articles
