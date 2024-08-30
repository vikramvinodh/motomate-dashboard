import { useState, useEffect } from 'react';
import axios from 'axios';

function FetchAuthorsData() {
    const [authors, setauthors] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const Data = await axios.get(`${import.meta.env.VITE_URL}/blog-author`);
                setauthors(Data.data.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching authors:", error);
            }
        };
        fetchData();
    }, []);

    return { authors, isLoading };
}

export default FetchAuthorsData
