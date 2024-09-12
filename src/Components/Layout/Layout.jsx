import React from 'react'
import style from './Layout.module.css'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'

export default function Layout() {
  return (
    <>
      <Navbar></Navbar>

      <div className='md:mt-10 sm:m-0'>
        <Outlet></Outlet>
      </div>

      <Footer></Footer>


    </>
  )
}
