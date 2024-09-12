import React, { useState, useEffect } from 'react';
import style from './Home.module.css';
import Series from '../Series/Series';
import Movies from '../Movies/Movies';
import mainImg from '../../assets/achtergrond_mededeling.jpg';
import Search from '../Search/Search';

export default function Home() {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {

    window.addEventListener('scroll', () => {
      let wScroll = window.scrollY;
      console.log(wScroll);
      if (wScroll > 150) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }

    })
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

  };

  return (
    <>
      <div className='home-page'>
        <div className="main-page " style={{
          backgroundImage: `url(${mainImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '400px',
          backgroundAttachment: 'fixed'
        }}>
          <div className='absolute right-0 h-full w-1/4 my-16 sm:py-0 md:py-16 capitalize'>
            <p className={`${style.watch}`}>Watch <span className={`${style.online}`}>Online</span> </p>
            <p><span className={`${style.movies}`}>Movies and </span></p>
            <p><span className={`${style.movies}`}>series </span></p>

          </div>
          <div className='flex items-center justify-center py-8 my-5'>
            <Search />
          </div>
        </div>
        <Movies />
        <Series />

        {showScrollButton && (
          <div className={`${style.top}`}>
            <i className="fa-solid fa-arrow-up text-red-600 text-lg p-2" onClick={() => scrollToTop()} />
          </div>
        )}
      </div>
    </>
  );
}
