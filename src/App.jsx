import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Details from './Components/Details/Details'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';


// import required modules
import { EffectCards } from 'swiper/modules';
import SeriesDetails from './Components/SeriesDetails/SeriesDetails'
import Movies from './Components/Movies/Movies'
import Series from './Components/Series/Series'

import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import UserContextProvider from './Context/UserContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import Forget from './Components/Forget/Forget'
import Reset from './Components/Reset/Reset'
import NewPass from './Components/newPass/newPass'
import Notfound from './Components/Notfound/Notfound';





function App() {

  let routers = createBrowserRouter([
    {
      path: '/', element: <Layout></Layout>, children: [
        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: 'home', element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: 'movies', element:<ProtectedRoute> <Movies /></ProtectedRoute> },
        { path: 'register', element: <Register /> },
        { path: 'login', element: <Login /> },
        { path: 'forget', element: <Forget /> },
        { path: 'newPass', element: <NewPass /> },
       
        { path: 'reset', element: <Reset /> },
        { path: 'series', element: <ProtectedRoute><Series /></ProtectedRoute> },
        { path: 'details/:id', element: <ProtectedRoute><Details /></ProtectedRoute> },
        { path: 'series-details/:id', element: <ProtectedRoute><SeriesDetails /></ProtectedRoute> },
        { path: '*', element: <Notfound /> },


      ]
    }
  ])



  return (

    <>
      <UserContextProvider>
        <RouterProvider router={routers}>
          
        </RouterProvider>

      </UserContextProvider>



    </>
  )
}

export default App
