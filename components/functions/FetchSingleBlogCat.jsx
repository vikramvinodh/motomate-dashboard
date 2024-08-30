import { useState, useEffect } from 'react';
import axios from 'axios';

function FetchSingleBlogCat(id) {
    const [blog, setBlog] = useState(null);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const Data = await axios.get(`${import.meta.env.VITE_URL}/blog-category/get-one/${id}`)
                setBlog(Data.data.data);
                setloading(false);
            } catch (error) {
                console.error("Error fetching blog:", error);
            }
        };
        fetchData();
    }, [id]);

    return { blog, loading };
}

export default FetchSingleBlogCat
