import React, { useContext, useState } from 'react';
import style from './Navbar.module.css';
import Search from '../Search/Search';
import logo from '../../assets/tmovie.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

export default function Navbar() {
  let { UserData, setUserData } = useContext(UserContext);
  let navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  //function logout
  function logOut() {
    localStorage.removeItem('userToken');
    setUserData(null);
    navigate('/login');
  };

  return (
    <>
      <nav className='fixed inset-x-0 top-0 z-30 bg-black m-0'>
        <div className='flex justify-between items-center px-3 py-2'>
          <div className="flex justify-center items-center">
            <img src={logo} alt="Logo-img" className='w-[25px] mr-1' />
            <h1 className='text-xl font-semibold text-white'>MovieVibe</h1>
          </div>

          {/*button of small screens*/}
          <div className='md:hidden'>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='text-white focus:outline-none'>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>

        {/* at big screens */}
          <div className='hidden md:flex'>
            {UserData ? (
              <ul className='flex justify-center text-white px-2 gap-x-4'>
                <li className='mx-2 hover:border-b-2 hover:border-red-600'><NavLink to={'/home'}>Home</NavLink></li>
                <li className='mx-2 hover:border-b-2 hover:border-red-600'><NavLink to={'/movies'}>Movies</NavLink></li>
                <li className='mx-2 hover:border-b-2 hover:border-red-600'><NavLink to={'/series'}>Series</NavLink></li>
              </ul>
            ) : ''}
            <ul className='flex justify-center items-center text-white px-1 gap-x-4'>
              {UserData ? (
                <li><Link to={`/login`} onClick={() => logOut()}>Logout</Link></li>
              ) : (
                <>
                  <li><Link to={`/register`}>Register</Link></li>
                  <li><Link to={`/login`}>Login</Link></li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* at small screens */}

        {isMenuOpen && (
          <div className='md:hidden'>
            {UserData ? (
              <ul className='flex flex-col items-center text-white px-2 gap-y-4'>
                <li className='hover:border-b-2 hover:border-red-600'><NavLink to={'/home'}>Home</NavLink></li>
                <li className='hover:border-b-2 hover:border-red-600'><NavLink to={'/movies'}>Movies</NavLink></li>
                <li className='hover:border-b-2 hover:border-red-600'><NavLink to={'/series'}>Series</NavLink></li>
              </ul>
            ) : ''}
            <ul className='flex flex-col items-center text-white px-1 gap-y-4'>
              {UserData ? (
                <li className='my-3'><Link to={`/login`} onClick={() => logOut()}>Logout</Link></li>
              ) : (
                <>
                  <li><Link to={`/register`}>Register</Link></li>
                  <li><Link to={`/login`}>Login</Link></li>
                </>
              )}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}
