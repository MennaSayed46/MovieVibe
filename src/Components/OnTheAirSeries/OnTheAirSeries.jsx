import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import style from './OnTheAirSeries.module.css';

export default function OnTheAirSeries() {
  const [onTheAirSeries, setOnTheAirSeries] = useState([]);
  
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

  useEffect(() => {
    const getOnTheAirSeries = async () => {
      try {
        const options = {
          method: 'GET',
          url: 'https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer  eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OGNlZGQxZGNkNTljMWU4NzYzNzFiOWFjMmJjMTczZCIsIm5iZiI6MTcyNjA1MTAxMi4yMTY2MTIsInN1YiI6IjY2OTk0YjA4ZGQ5YTgyNjk1MWMxODZmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ctyxm3cmcQoMxGe6KxGuUyLJEN3BWicz_-eKa5Zqepg'
          }
        };
        const response = await axios.request(options);
        console.log('response on the air series', response.data.results);
        setOnTheAirSeries(response.data.results);
        localStorage.setItem('onTheAirSeries', JSON.stringify(response.data.results));
      } catch (error) {
        console.log('err of on the air series:', error);
      }
    };

    getOnTheAirSeries();
  }, []);

  return (
    <>
      <div className='bg-[#0D0D0D] py-4 px-6'>
        <div className='flex flex-col sm:flex-row border-b-4 border-red-700 border-solid'>
          <div className='flex flex-col w-full sm:w-1/5 mb-4 sm:mb-0'>
            <p className={`${style.top} text-white`}>On The Air Series</p>
            <p className='text-gray-400'>Watch and enjoy the on-the-air series</p>
          </div>

          <div className="w-full sm:w-4/5 px-2">
            <Slider {...settings}>
              {onTheAirSeries.map((series, index) => (
                <div key={index} className='p-2 rounded-lg'>
                  <Link to={`/series-details/${series.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
                      alt={series.name}
                      className='w-full h-auto rounded-lg'
                    />
                    <p className='mt-2 text-white text-center'>{series.name}</p>
                  </Link>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
}
