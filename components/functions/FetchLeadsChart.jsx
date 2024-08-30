import { useState, useEffect } from 'react';
import axios from 'axios';

function fetchLeadsData() {
    const [Leads, setLeads] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const Data = await axios.get(`${import.meta.env.VITE_URL}/analytics/leads-property`)
                setLeads(Data.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching Leads:", error);
            }
        };
        fetchData();
    }, []);

    return { Leads, isLoading };
}

export default fetchLeadsData