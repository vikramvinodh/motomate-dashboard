import { useState, useEffect } from 'react';
import axios from 'axios';

function FetchBlogChart() {
    const [blogChart, setblogChart] = useState(null);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const Data = await axios.get(`${import.meta.env.VITE_URL}/analytics/blog`)
                setblogChart(Data.data);
                setloading(false);
            } catch (error) {
                console.error("Error fetching blogChart:", error);
            }
        };
        fetchData();
    }, []);

    return { blogChart, loading };
}

export default FetchBlogChart
