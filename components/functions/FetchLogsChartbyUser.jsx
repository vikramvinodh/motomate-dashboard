import { useState, useEffect } from 'react';
import axios from 'axios';

function FetchLogsChartbyUser() {
    const [LogsByuser, setLogsByuser] = useState(null);
    const [isloading, setisloading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const Data = await axios.get(`${import.meta.env.VITE_URL}/analytics/logs/user`)
                setLogsByuser(Data.data);
                setisloading(false);
            } catch (error) {
                console.error("Error fetching LogsByuser:", error);
            }
        };
        fetchData();
    }, []);

    return { LogsByuser, isloading };
}

export default FetchLogsChartbyUser