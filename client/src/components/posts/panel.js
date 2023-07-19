import React, { useState, createContext } from 'react';

import "./homepage.css"
import { Link, Outlet } from 'react-router-dom';
import { IconContext } from "react-icons/lib";
import * as IoIcons from 'react-icons/io5';
import * as FaIcons from 'react-icons/fa';
import * as FiIcons from 'react-icons/fi';
import * as BiIcons from 'react-icons/bi';
import * as MdIcons from 'react-icons/md';
import profile from "../resources/profile.png";


const ThemeContext = createContext();

const Panel = () => {
    const [theme, setTheme] = useState('dark');
    const toggleTheme = () => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    };
    return (
      <>
        <IconContext.Provider value={{ color: "black" }}>
        <ThemeContext.Provider value={theme}>
            <div className={`user-page ${theme}`}>
                <div className='side-panel'>
                    <div className='side-panel_header'>
                        <h2>BUDDEE</h2>
                    </div>
                    
                    <div className='side-panel_items'>
                        <ul className="nav-menu-items">
                        <li className='nav-text'><Link to="/panel/allposts"><IoIcons.IoHome/>Home</Link></li>
               <li className='nav-text'><Link to="/panel/createPost" ><BiIcons.BiImageAdd/>Create</Link></li> 
              <li className='nav-text'><Link to="/panel/search" ><FaIcons.FaSearch/>Search</Link></li>
              <li className='nav-text'><Link to="/panel/notifications" ><MdIcons.MdNotificationsActive/>Notifications</Link></li>
               <li className='nav-text'><img src={profile} alt="admin" id="profile" /><Link to="/panel/profile" >profile</Link></li>  
               <li className='nav-text'><Link to="/logout" ><FiIcons.FiLogOut/>Logout</Link></li>
                         

                        </ul>
                        <button className="btn-e"onClick={toggleTheme}>Toggle Theme</button>
                    </div>
                </div>
                <Outlet />
               
            </div>
            </ThemeContext.Provider>
            </IconContext.Provider>
            </>
    )
}

export default Panel