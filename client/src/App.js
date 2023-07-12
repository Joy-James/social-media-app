import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import Login from './components/login/login';
import Signup from './components/signup/signup';
import Homepage from './components/posts/homepage';
import LandingPage from './components/landingpage/landingpage';
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
      path:"/homepage",
      element:<Homepage/>
    }
  ])
  return (
    <div className="App">
      
            <RouterProvider router={router} />
        
      
    </div>
  );
}

export default App;
