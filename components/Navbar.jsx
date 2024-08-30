import React, { useContext, useEffect, useState } from "react";
import { BiMenuAltLeft, BiSolidLockAlt } from 'react-icons/bi';
import { BsPersonCircle } from 'react-icons/bs';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoIosExit } from 'react-icons/io';
import { AppContext, AppProvider } from "./Context";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const slug = location.pathname.split('/');
    const { collapsed, setCollapsed, adminData } = useContext(AppContext);

    const handleLogOut = () => {
        sessionStorage.clear();
        navigate('/login');
    };

    const removeHyphen = (string) => {
        if (string) {
            return string.replace(/-/g, ' ')
        } else {
            return string
        }
    }

    return (
        <nav className="navbar ">
            <div className="container-fluid d-flex justify-content-between align-items-center ">
                <div className='d-flex align-items-center'>
                    <button onClick={() => setCollapsed(!collapsed)} className="darkbtn me-5">
                        <BiMenuAltLeft fill="white" size={25} >
                            Collapse
                        </BiMenuAltLeft>
                    </button>
                    <h5 className='m-0 text-capitalize'>{removeHyphen(slug[2]) || slug[1] || 'Home'}</h5>
                </div>
                <div className='d-flex align-items-center dropstart '>
                    <button className='clearbtn' data-bs-toggle="dropdown" aria-expanded="false" id="dropdown">
                        <BsPersonCircle size={30} fill='#2c3652' className='me-2' />
                    </button>
                    <p className='m-0 text-muted text-capitalize'>{adminData?.username || 'username'}</p>
                    <div className="dropdown-menu dropdown" aria-labelledby="dropdown">
                        <Link to='change-password' className="dropdown-item" ><BiSolidLockAlt size={20} className='me-3' />Change Password</Link>
                        <button className="dropdown-item" onClick={handleLogOut} ><IoIosExit size={20} className='me-3' />Log Out</button>
                    </div>
                </div>

            </div>
        </nav>
    )
}

export default Navbar;
