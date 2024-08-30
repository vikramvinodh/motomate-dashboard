import { useState, useEffect } from 'react';
import axios from 'axios';

function FetchLogsChart() {
    const [Logs, setLogs] = useState(null);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const Data = await axios.get(`${import.meta.env.VITE_URL}/analytics/logs`)
                setLogs(Data.data);
                setloading(false);
            } catch (error) {
                console.error("Error fetching Logs:", error);
            }
        };
        fetchData();
    }, []);

    return { Logs, loading };
}

export default FetchLogsChart