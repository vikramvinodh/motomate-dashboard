import { useState, useEffect } from 'react';
import axios from 'axios';

function FetchAllProperties() {
    const [properties, setProperty] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const Data = await axios.get(`${import.meta.env.VITE_URL}/properties/get-all-properties`);
                setProperty(Data.data.properties);
            } catch (error) {
                console.error("Error fetching properties:", error);
            }
        };
        fetchData();
    }, []);

    return { properties };
}

export default FetchAllProperties