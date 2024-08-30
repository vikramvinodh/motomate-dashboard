import { useState, useEffect } from 'react';
import axios from 'axios';

function FetchFooter() {
    const [footer, setfooter] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const Data = await axios.get(`${import.meta.env.VITE_URL}/footer/data`);
                setfooter(Data.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching footer:", error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    return { footer, isLoading };
}

export default FetchFooter
