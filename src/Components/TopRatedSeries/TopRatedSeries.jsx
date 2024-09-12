import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import style from './TopRatedSeries.module.css'

export default function TopRatedSeries() {
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
  const [topRatedSeries, setTopRatedSeries] = useState([]);
  useEffect(() => {
    const getTopRatedSeries = async () => {
      try {
        const options = {
          method: 'GET',
          url: 'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OGNlZGQxZGNkNTljMWU4NzYzNzFiOWFjMmJjMTczZCIsIm5iZiI6MTcyNjA1MTAxMi4yMTY2MTIsInN1YiI6IjY2OTk0YjA4ZGQ5YTgyNjk1MWMxODZmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ctyxm3cmcQoMxGe6KxGuUyLJEN3BWicz_-eKa5Zqepg'
          }
        };
        const response = await axios.request(options);
        console.log('response top rated sereis', response.data.results);
        setTopRatedSeries(response.data.results);
        localStorage.setItem('topRatedSeries', JSON.stringify(response.data.results));

      } catch (error) {
        console.log('Error fetching movies:', error);
      }
    };

    getTopRatedSeries();
  }, []);
  return (
    <>
      <div className='bg-[#0D0D0D] py-4 px-6 '>

        <div className='flex flex-col sm:flex-row border-b-4 border-red-700 border-solid'>

          <div className='flex flex-col w-full sm:w-1/5 mb-4 sm:mb-0'>
            <p className={`${style.top} text-white`}>Top Rated Series</p>
            <p className='text-gray-400'>Watch and enjoy top rated series</p>
          </div>



          <div className="w-full sm:w-4/5 px-2">
            <Slider {...settings}>
              {topRatedSeries?.map((topRated, index) => (
                <Link to={`/series-details/${topRated.id}`}>
                  <div key={index} className='p-2 rounded-lg'>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${topRated.poster_path}`}
                      alt={topRated.title}
                      className='w-full h-auto rounded-lg'
                    />
                    <p className='mt-2 text-white text-center'>{topRated.name}</p>

                  </div></Link>


              ))}
            </Slider>
          </div>





        </div>



      </div>


    </>
  )
}
