import React from 'react'
import style from './Series.module.css'
import TrendingSeries from '../TrendingSeries/TrendingSeries'
import TopRatedSeries from '../TopRatedSeries/TopRatedSeries'
import PopularSeries from '../PopularSeries/PopularSeries'
import AiringTodaySeries from '../AiringTodaySeries/AiringTodaySeries'
import OnTheAirSeries from '../OnTheAirSeries/OnTheAirSeries'



export default function Series() {
  return (
    <>
      <div className={`text-white  bg-[#0D0D0D] py-4 px-6 `}>
        <p className={`${style.series}`}> Series Tv </p>

        <TrendingSeries />
        <TopRatedSeries />
        <PopularSeries />
        <AiringTodaySeries />
        <OnTheAirSeries />
      </div>

    </>
  )
}
