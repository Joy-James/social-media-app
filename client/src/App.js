import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import Login from './components/login/login';
import Signup from './components/signup/signup';
import Posts from './components/posts/posts';
import LandingPage from './components/landingpage/landingpage';
function App() {

  const router = createBrowserRouter([
    {
    path: '/',
   element:< LandingPage/>, 
    children: [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Signup/>,
    },
    {
      path:"/posts",
      element:<Posts/>
    }
  ]}])
  return (
    <div className="App">
      
            <RouterProvider router={router} />
        
      
    </div>
  );
}

export default App;
