import React from 'react'
import style from './Movies.module.css'
import Top from '../Top/Top'
import Trending from '../Trending/Trending'
import Upcoming from '../UpcomingMovies/UpcomingMovies'
import NowPlaying from '../NowPlaying/NowPlaying'

export default function Movies() {
  return (
    <>
      <div className={`text-white  bg-[#0D0D0D] py-4 px-6 `}>
        <p className={`${style.movies}`}> Movies </p>

        <Trending />
        <Upcoming />
        <Top />
        <NowPlaying />
      </div>



    </>
  )
}
