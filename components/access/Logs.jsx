import axios from "axios";
import { useEffect, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import Loading from "../others/Loading";
import usePagination from "../others/Paginator";

function Logs() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [userSearchQuery, setUserSearchQuery] = useState('');
    const [messageSearchQuery, setMessageSearchQuery] = useState('');

    const [itemsPerPage, setItemsPerPage] = useState(20);


    const filteredLogs = logs.filter((log) =>
        log.user.toLowerCase().includes(userSearchQuery.toLowerCase()) &&
        log.message.toLowerCase().includes(messageSearchQuery.toLowerCase())
    );

    const {
        currentPage,
        currentData,
        nextPage,
        prevPage,
        totalPages,
    } = usePagination(filteredLogs || [], itemsPerPage);


    const handleItemsPerPageChange = (e) => {
        const newItemsPerPage = parseInt(e.target.value, 10);
        setItemsPerPage(newItemsPerPage);
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/logs`, {
                headers: {
                    'auth-token': sessionStorage.getItem('token')
                }
            });

            setLogs(response.data);
            setLoading(false);

        } catch (error) {
            setError(`Error fetching logs: ${error.message} Unauthorized User`);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="access-logs">
            <div className="access-log-container">
                <div className="access-log-header">
                    <h5>Access Logs</h5>

                    <div className="d-flex">
                        <div className="search mx-4">
                            <input
                                type='text'
                                name='userSearch'
                                placeholder='Search User'
                                className='search-bar'
                                value={userSearchQuery}
                                onChange={(e) => setUserSearchQuery(e.target.value)} // Update user search query
                            />
                            <BiSearchAlt2 fill='#2c3652' size={20} className='search-icon' />
                        </div>
                        <div className="search">
                            <input
                                type='text'
                                name='messageSearch'
                                placeholder='Search Message'
                                className='search-bar'
                                value={messageSearchQuery}
                                onChange={(e) => setMessageSearchQuery(e.target.value)} // Update message search query
                            />
                            <BiSearchAlt2 fill='#2c3652' size={20} className='search-icon' />
                        </div>
                    </div>
                </div>
                <div className="access-log-body">
                    <div className="access-log-head">
                        <div className="date">Date</div>
                        <div className="time">Time</div>
                        <div className="user">User</div>
                        <div className="message">Message</div>
                    </div>
                    {error ? (
                        <div className="access-log-item">
                            {error}
                        </div>
                    ) : (
                        <>
                            {loading ? (
                                <Loading />
                            ) : (
                                <>
                                    {currentData.map((ele, index) => (
                                        <div className="access-log-item d-flex justify-content-start align-items-center" key={index}>
                                            <div className="date">{ele.date.slice(0, 10)}</div>
                                            <div className="time">{ele.date.slice(11, 19)}</div>
                                            <div className="user">{ele.user}</div>
                                            <div className="message">{ele.message.slice(0, 150)}</div>
                                        </div>
                                    ))}
                                </>
                            )}
                        </>
                    )}
                </div>
                <div className="pagination">
                    <div className="items-per-page">
                        <span>Show:</span>
                        <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                            <option value={500}>500</option>
                            <option value={1000}>1000</option>
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
    );
}

export default Logs;
