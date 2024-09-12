import React from 'react';
import style from './Notfound.module.css';

export default function Notfound() {
  return (
    <div>
      <div className={` ${style.found} h-screen w-full flex justify-center items-center bg-[#0d0d0d] flex-col text-white gap-3 `}>
        <p className='text-red-600 text-9xl'>ERROR 404</p>
        <p className={`${style.page} text-white text-3xl`}>Page not found</p>
        <p className={`${style.apologise} text-white text-3xl`}>Sorry, we couldn’t find this page</p>
      </div>
      <p>dgefgfe</p>
    </div>
  );
}
