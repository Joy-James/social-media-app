// import React, { Children } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import Login from './components/login/login';
import Signup from './components/signup/signup';
import Panel from './components/posts/panel';
import LandingPage from './components/landingpage/landingpage';
import Header from './components/posts/header';
import CreatePost from './components/posts/pages/uploads/upload';
import UserProfile from './components/posts/profile/userProfile';
import Logout from './components/posts/logout';
import Search from './components/posts/search';
import Notification from './components/posts/notification';

function App() {

  const router = createBrowserRouter([
    {
    path: '/',
   element:< LandingPage/>, 
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Signup/>,
    },
    {
      path: "/logout",
      element: <Logout/>,
    },
    {
      path:"/panel",
      element:<Panel/>,
      children: [
        {
          path: "/panel/allposts",
          element: <Header/>  
        },
       
        {
          path: "/panel/createPost",
          element: <CreatePost/>  
        },

          {
           path: "/panel/profile",
           element: <UserProfile/>  
       },
       {
        path: "/panel/search",
        element: <Search/>  
    },
    {
      path: "/panel/notifications",
      element: <Notification/>  
  },
   ]
      
      
    }
  ])
  return (
    <div className="App">
      
            <RouterProvider router={router} />
        
      
    </div>
  );
}

export default App;
