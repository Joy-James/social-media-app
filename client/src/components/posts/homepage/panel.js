import React, {  createContext} from 'react';

import "./homepage.css"
import { Link, Outlet } from 'react-router-dom';
import { IconContext } from "react-icons/lib";
import * as IoIcons from 'react-icons/io5';
import * as FaIcons from 'react-icons/fa';
import * as FiIcons from 'react-icons/fi';
import * as BiIcons from 'react-icons/bi';
import * as MdIcons from 'react-icons/md';
import profile from "../../resources/profile.png";
import twitter from "../../resources/Twitter_bird_logo_classic_round_sticker___Zazzle-removebg-preview.png"

export const ThemeContext = createContext();

const Panel = () => {
   
  
    return (
      <>
     
        <IconContext.Provider value={{ color: "black" }}>
       
            <div className={`user-page `}>
                <div className='side-panel'>
                    <div className='side-panel_header'>
                        <h2><img src={twitter} alt='bird' className='twitter'/>BUDDEE</h2>
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
                    
                    </div>
                </div>
                <Outlet />
               
            </div>
            </IconContext.Provider>
            
           
            </>
    )
}

export default Panel