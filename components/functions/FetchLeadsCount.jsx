import { useState, useEffect } from 'react';
import axios from 'axios';

function fetchLeadsCount() {
    const [LeadsCount, setLeadsCount] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const Data = await axios.get(`${import.meta.env.VITE_URL}/analytics/leads`)
                setLeadsCount(Data.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching LeadsCount:", error);
            }
        };
        fetchData();
    }, []);

    return { LeadsCount, isLoading };
}

export default fetchLeadsCount