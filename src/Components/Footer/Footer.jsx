import React from 'react'
import style from './Footer.module.css'
import logo from '../../assets/tmovie.png'
import footerImg from '../../assets/footer-bg.jpg'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <>
      <div className={`footer flex flex-col justify-center items-center`} style={{
        backgroundImage: `url(${footerImg})`,
        backgroundSize: 'cover',       
        backgroundPosition: 'center',  
        backgroundRepeat: 'no-repeat',
        minHeight: '400px'    
      }}>
        <div className="footer-container flex flex-col">

          <div className="footer-logo mt-4 mb-6">
            <div className="logo flex flex-row justify-center items-center">
              <img src={logo} className='w-[70px] px-2' alt="" />
              <Link to={`/`} className={`text-white font-black text-5xl ${style.cinema}`}>MovieVibe</Link>
            </div>
          </div>


          <div className="footer-items">
            <div className="footer-items-container flex flex-row mx-auto justify-around md:gap-x-20 sm:gap-x-0  items-center">

              <div className="first-footer-items">
                <ul className='flex flex-col items-center justify-center text-white gap-y-1  '>
                  <li className={`${style.item} my-[1px] hover:text-red-600 `}><Link to={'https://github.com/MennaSayed46'}>Github</Link></li>
                  <li className={`${style.item} my-[1px] hover:text-red-600 `}><Link to={'/'}>Contact us</Link></li>
                  <li className={`${style.item} my-[1px] hover:text-red-600 `}><Link to={'/'}>Term of services</Link></li>
                  <li className={`${style.item} my-[1px] hover:text-red-600 `}><Link to={'/'}>About us</Link></li>
                </ul>
              </div>

              <div className="sec-footer-items">
                <ul className='flex flex-col items-center justify-center text-white gap-y-1 '>
                  <li className={`${style.item} my-[1px] hover:text-red-600 `}><Link to={'/'}>Live</Link></li>
                  <li className={`${style.item} my-[1px] hover:text-red-600 `}><Link to={'/'}>FAQ</Link></li>
                  <li className={`${style.item} my-[1px] hover:text-red-600 `}><Link to={'/'}>Premium</Link></li>
                  <li className={`${style.item} my-[1px] hover:text-red-600 `}><Link to={'/'}>Pravacy policy</Link></li>
                </ul>
              </div>

              <div className="third-footer-items">
                <ul className='flex flex-col items-center justify-center text-white gap-y-1'>
                  <li className={`${style.item} my-[1px] hover:text-red-600 `}><Link to={'/'}>You must watch</Link></li>
                  <li className={`${style.item} my-[1px] hover:text-red-600 `}><Link to={'/'}>Recent release</Link></li>
                  <li className={`${style.item} my-[1px] hover:text-red-600 `}><Link to={'/'}>Top IMDB</Link></li>

                </ul>
              </div>



            </div>

          </div>

        </div>

      </div>

    </>
  )
}
