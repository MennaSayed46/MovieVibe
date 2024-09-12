
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';

import { EffectCards } from 'swiper/modules';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import style from './SeriesDetails.module.css'

export default function SeriesDetails() {
  const [detailsSeries, setDetailsSeries] = useState([]); // hasssssssssssssssssss changed
  const [imgs, setImgs] = useState([]);
  const [similiar, setSimiliar] = useState([]);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const videoKey = videos.length > 0 ? videos[0].key : '';
  let { id } = useParams();
  console.log('Movie ID:', id);
  useEffect(() => {
    const fetchMovies = async () => {
      try {


        const options = {
          method: 'GET',
          url: `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OGNlZGQxZGNkNTljMWU4NzYzNzFiOWFjMmJjMTczZCIsIm5iZiI6MTcyNjA1MTAxMi4yMTY2MTIsInN1YiI6IjY2OTk0YjA4ZGQ5YTgyNjk1MWMxODZmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ctyxm3cmcQoMxGe6KxGuUyLJEN3BWicz_-eKa5Zqepg'

          }
        };

        const response = await axios.request(options);
        console.log('Response Data of series details:', response.data);
        setDetailsSeries(response.data);
        localStorage.setItem('detailsOfSeries', JSON.stringify(response.data));

      } catch (error) {
        console.error('Error fetching movies:', error.response ? error.response.data : error.message);
        setError(error.response ? error.response.data.status_message : error.message);
      }
    };

    fetchMovies();




    //function of imgssssssss




    const fetchImgs = async () => {
      try {


        const options = {
          method: 'GET',
          url: `https://api.themoviedb.org/3/tv/${id}/images`,
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OGNlZGQxZGNkNTljMWU4NzYzNzFiOWFjMmJjMTczZCIsIm5iZiI6MTcyNjA1MTAxMi4yMTY2MTIsInN1YiI6IjY2OTk0YjA4ZGQ5YTgyNjk1MWMxODZmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ctyxm3cmcQoMxGe6KxGuUyLJEN3BWicz_-eKa5Zqepg'

          }
        };

        const response = await axios.request(options);
        console.log('imgs Data:', response.data);
        setImgs(response.data);
        localStorage.setItem('Imgs', JSON.stringify(response.data));

      } catch (error) {
        console.error('Error fetching movies:', error.response ? error.response.data : error.message);
        setError(error.response ? error.response.data.status_message : error.message);
      }
    };

    fetchImgs();


    //function of similiar

    const getSimiliar = async () => {
      try {


        const options = {
          method: 'GET',
          url: `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`,
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OGNlZGQxZGNkNTljMWU4NzYzNzFiOWFjMmJjMTczZCIsIm5iZiI6MTcyNjA1MTAxMi4yMTY2MTIsInN1YiI6IjY2OTk0YjA4ZGQ5YTgyNjk1MWMxODZmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ctyxm3cmcQoMxGe6KxGuUyLJEN3BWicz_-eKa5Zqepg'

          }
        };

        const response = await axios.request(options);
        console.log('similar Data:', response.data.results);
        setSimiliar(response.data.results);
        localStorage.setItem('Imgs', JSON.stringify(response.data.results));

      } catch (error) {
        console.error('Error fetching movies:', error.response ? error.response.data : error.message);
        setError(error.response ? error.response.data.status_message : error.message);
      }
    };

    getSimiliar();


    //function of videos

    const getVideoMovie = async () => {
      try {


        const options = {
          method: 'GET',
          url: `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`,
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OGNlZGQxZGNkNTljMWU4NzYzNzFiOWFjMmJjMTczZCIsIm5iZiI6MTcyNjA1MTAxMi4yMTY2MTIsInN1YiI6IjY2OTk0YjA4ZGQ5YTgyNjk1MWMxODZmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ctyxm3cmcQoMxGe6KxGuUyLJEN3BWicz_-eKa5Zqepg'

          }
        };

        const response = await axios.request(options);
        console.log('video Data:', response.data.results);
        setVideos(response.data.results);
        localStorage.setItem('videos', JSON.stringify(response.data.results));

      } catch (error) {
        // console.error('Error fetching movies:', error.response ? error.response.data : error.message);
        setError(error.response ? error.response.data.status_message : error.message);
      }
    };

    getVideoMovie();


  }, [id]);
  return (
    <>
    

      <div className="details-home overflow-x-hidden">
        <div className="details-container">

          {detailsSeries ? <div className="px-6 details-movie flex flex-col md:flex-row md:gap-x-64 sm:gap-x-0 justify-center items-center text-white" style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8) , rgba(0, 0, 0, 0.8) ), url(https://image.tmdb.org/t/p/w500${detailsSeries.poster_path || detailsSeries.backdrop_path})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: '480px'
          }}>

            <div className="left-side-menu">
              <p className={`${style.title} mb-3`}>{detailsSeries.name}</p>
              <div className="film-types-list flex flex-row">
                <ul className='flex flex-row gap-2 mb-3'>
                  {detailsSeries.genres?.map((genre, index) => (
                    <li key={index} className={`${style.type} rounded-lg px-2  hover:scale-105`}>
                      <Link to={`/`}>{genre.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <p className='line-clamp-4'>{detailsSeries.overview}</p>
            </div>


            <div className="right-side-menu mr-14 my-4">
              {imgs && imgs.backdrops && imgs.backdrops.length > 0 && (
                <Swiper
                  effect={'cards'}
                  grabCursor={true}
                  modules={[EffectCards]}
                  className="mySwiper"
                >
                  {imgs.backdrops.map((img, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={`https://image.tmdb.org/t/p/w500${img.file_path}`}
                        alt={`Backdrop ${index}`}
                        className="w-full h-full"
                      />
                    
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>






          </div> : ''}


        </div>
      </div>



      {/* video content */}

      {videoKey && (
        <div className="flex flex-col text-white bg-[#0D0D0D] px-6 py-4">
          <p className={`${style.title} ${style.similiar} my-2`}>Trailer</p>
          <div className="video-container w-full h-screen mx-auto " style={{ position: 'relative' }} >
            <iframe className='rounded-lg'
              src={`https://www.youtube.com/embed/${videoKey}`}
              title="Movie Trailer"
              allowFullScreen
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            ></iframe>
          </div>

        </div>

      )}

      {/* Similar content */}


      <div className="similiar overflow-x-hidden ">
        <div className="px-6 py-8 similiar-content flex flex-col md:flex-row justify-center items-center text-white bg-[#0D0D0D]">
          <p className={`${style.title} ${style.similiar}`}>Similiar</p>
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={4}
            spaceBetween={10}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination]}
            className="mySwiper"
            style={{ width: '100vw' }}
          >
            {similiar.map((similarSeries, index) => (

              <div>
                <SwiperSlide className='overflow-hidden ' key={index} style={{ width: '25vw' }}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${similarSeries.backdrop_path || similarSeries.poster_path}`}
                    alt={`Similar Movie ${index}`}
                    className='h-auto hover:scale-105 hover:mb-1'
                    style={{ width: '100%' }}

                  />
                  <p>{similarSeries.name}</p>
                  
                  <p className={`bg-transparent border-red-600 border-2 rounded-xl hover:bg-red-600 hover:border-transparent flex items-center justify-center ${style.rate}`}> Rating :{similarSeries.vote_average}</p>

                </SwiperSlide>


              </div>

            ))}
          </Swiper>
        </div>
      </div>

    </>
  )
}
