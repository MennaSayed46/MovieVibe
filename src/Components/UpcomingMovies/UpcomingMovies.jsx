import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from './Upcoming.module.css';
import { Link } from 'react-router-dom';

export default function Upcoming() {
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

  const [upcomingMovies, setUpComingMovies] = useState([]);

  useEffect(() => {
    const getUpcomingMovies = async () => {
      try {

        // console.log('true');

        const options = {
          method: 'GET',
          url: 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OGNlZGQxZGNkNTljMWU4NzYzNzFiOWFjMmJjMTczZCIsIm5iZiI6MTcyNjA1MTAxMi4yMTY2MTIsInN1YiI6IjY2OTk0YjA4ZGQ5YTgyNjk1MWMxODZmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ctyxm3cmcQoMxGe6KxGuUyLJEN3BWicz_-eKa5Zqepg'
          }
        };

        const response = await axios.request(options);
        setUpComingMovies(response.data.results);

        localStorage.setItem('upcomingMovies', JSON.stringify(response.data.results));

      } catch (error) {
        console.log('Error fetching movies:', error);
      }
    };

    getUpcomingMovies();
  }, []);

  return (
    <div className='bg-[#0D0D0D] py-4 px-6 '>
      <Link to={`/details`}>
        <div className='flex flex-col sm:flex-row border-b-4 border-red-700 border-solid'>


          <div className="w-full sm:w-4/5 px-2">
            <Slider {...settings}>
              {upcomingMovies?.map((upcomingMovie, index) => (
                <Link to={`/details/${upcomingMovie.id}`}> <div key={index} className='p-2 rounded-lg'>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${upcomingMovie.poster_path}`}
                    alt={upcomingMovie.title}
                    className='w-full h-auto rounded-lg'
                  />
                  <p className='mt-2 text-white text-center'>{upcomingMovie.title}</p>
                </div></Link>
              ))}
            </Slider>
          </div>


          <div className='flex flex-col w-full sm:w-1/5 mb-4 sm:mb-0'>
            <p className={`${style.top} text-white`}>Upcoming Movies</p>
            <p className='text-gray-400'>Watch and enjoy the latest upcoming movies</p>
          </div>
        </div></Link>
    </div>
  );
}
