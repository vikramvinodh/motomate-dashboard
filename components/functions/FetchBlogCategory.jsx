import { useState, useEffect } from 'react';
import axios from 'axios';

function FetchBlogCategoryData() {
    const [blogCategory, setblogCategory] = useState(null);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const Data = await axios.get(`${import.meta.env.VITE_URL}/blog-category`);
                setblogCategory(Data.data.data);
                setloading(false);
            } catch (error) {
                console.error("Error fetching blogCategory:", error);
            }
        };
        fetchData();
    }, []);

    return { blogCategory, loading };
}

export default FetchBlogCategoryData
