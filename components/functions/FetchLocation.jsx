import { useState, useEffect } from 'react';
import axios from 'axios';

function FetchLocationData() {
    const [location, setlocation] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const Data = await axios.get(`${import.meta.env.VITE_URL}/location/countries`);
                setlocation(Data.data.countries);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching Location:", error);
            }
        };
        fetchData();
    }, []);

    return { location, isLoading };
}

export default FetchLocationData