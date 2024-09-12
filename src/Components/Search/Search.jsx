
import React, { useState } from 'react';
import axios from 'axios';
import style from './Search.module.css';

export default function Search() {
  const [query, setQuery] = useState(''); //serchTerm Value
  const [results, setResults] = useState([]);  

  const handleSearch = async (e) => {
    e.preventDefault(); 
    try {
      const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/search/multi?include_adult=false&language=en-US&page=1&query=${query}`,
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OGNlZGQxZGNkNTljMWU4NzYzNzFiOWFjMmJjMTczZCIsIm5iZiI6MTcyNjA1MTAxMi4yMTY2MTIsInN1YiI6IjY2OTk0YjA4ZGQ5YTgyNjk1MWMxODZmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ctyxm3cmcQoMxGe6KxGuUyLJEN3BWicz_-eKa5Zqepg' 
        }
      };
      const response = await axios.request(options);
      console.log('Search response:', response.data); 
      setResults(response.data.results); 
      localStorage.setItem('searchResults', JSON.stringify(response.data.results));
    } catch (error) {
      console.log('Error fetching search results:', error);
    }
  };

  return (
    <>
      <div className={`search ${style.search} text-white`}>
        <form onSubmit={handleSearch} className="flex items-center max-w-sm w-screen ">
          <label htmlFor="simple-search" className="sr-only">Search</label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2" />
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-black border p-2 border-white text-white text-sm rounded-lg block w-full ps-10"
              placeholder="Search for movies, series, etc..."
              value={query}
              onChange={(e) => setQuery(e.target.value)} 
              required
            />
          </div>
          <button
            type="submit"
            className="p-2.5 ms-2 text-sm font-medium text-white bg-red-700 rounded-lg border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300"
          >
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </form>

       
      </div>
    </>
  );
}

