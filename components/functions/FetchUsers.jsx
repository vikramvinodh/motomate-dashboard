import { useState, useEffect } from 'react';
import { fetchUsers } from '../functions';

function FetchUsersData() {
    const [users, setusers] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const Data = await fetchUsers();
                setusers(Data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchData();
    }, []);

    return { users, isLoading, setusers };
}

export default FetchUsersData
