
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from './Trending.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCoverflow, Pagination } from 'swiper/modules';

export default function Trending() {
    const navigate = useNavigate();

   
    let results;
    let query;

    try {
        results = JSON.parse(localStorage.getItem('searchResults'));
        query = localStorage.getItem('query');
    } catch (error) {
        results = null;
        query = '';
    }

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
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const [trending, setTrending] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const options = {
                    method: 'GET',
                    url: 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OGNlZGQxZGNkNTljMWU4NzYzNzFiOWFjMmJjMTczZCIsIm5iZiI6MTcyNjA1MTAxMi4yMTY2MTIsInN1YiI6IjY2OTk0YjA4ZGQ5YTgyNjk1MWMxODZmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ctyxm3cmcQoMxGe6KxGuUyLJEN3BWicz_-eKa5Zqepg'
                    }
                };
                const response = await axios.request(options);
                console.log(response.data.results);
                setTrending(response.data.results);
                localStorage.setItem('trendingMovies', JSON.stringify(response.data.results));

            } catch (error) {
                console.log('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div>
            {results && query ? (
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
                    style={{ width: 'auto' }}
                >
                    {results.map((result, index) => (
                        <SwiperSlide key={index} style={{ width: '25vw' }}>
                            <Link to={`/details/${result.id}`}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500/${result.backdrop_path || result.poster_path}`}
                                    alt={`Similar Movie ${index}`}
                                    className='h-auto '
                                    style={{ width: '100%' }}
                                />
                                <p>{result.title}</p>
                                <p className={`bg-transparent border-red-600 border-2 rounded-xl hover:bg-red-600 hover:border-transparent flex items-center justify-center ${style.rate}`}>
                                    Rating :{Math.floor(result.vote_average)}
                                </p>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                
                <div className='bg-[#0D0D0D] py-4 px-6'>
                    <div className='flex flex-col sm:flex-row border-b-4 border-red-700 border-solid'>
                        <div className='flex flex-col w-full sm:w-1/5 mb-4 sm:mb-0'>
                            <p className={`${style.top} text-white`}>Trending Movies</p>
                            <p className='text-gray-400'>Watch and enjoy the latest trending & most-popular movies</p>
                        </div>
                        <div className="w-full sm:w-4/5 px-2">
                            <Slider {...settings}>
                                {trending?.map((trendMovie, index) => (
                                    <Link to={`/details/${trendMovie.id}`} key={index}>
                                        <div className='p-2 rounded-lg'>
                                            <img
                                                src={`https://image.tmdb.org/t/p/w500${trendMovie.poster_path}`}
                                                alt={trendMovie.title}
                                                className='w-full h-auto rounded-lg'
                                            />
                                            <p className='mt-2 text-white text-center'>{trendMovie.title}</p>
                                        </div>
                                    </Link>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

