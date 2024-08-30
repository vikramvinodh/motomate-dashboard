import React, { createContext, useState, useEffect } from 'react';
import { getAdmin } from "./functions";

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [adminData, setAdminData] = useState(null)

    async function Admin() {
        const admin = await getAdmin();
        setAdminData(admin)
    }

    useEffect(() => {
        Admin();
    }, []);


    const values = {
        collapsed,
        setCollapsed,
        adminData,
        Admin
    };

    return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };


