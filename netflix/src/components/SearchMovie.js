import React, { useState } from 'react';
import axios from "axios";
import { SEARCH_MOVIE_URL, options } from '../utils/constant';
import { useDispatch, useSelector } from "react-redux";
import { setSearchMovieDetails } from '../redux/searchSlice';
import { setLoading } from '../redux/userSlice';
import MovieList from './MovieList';

const SearchMovie = () => {
    const [searchMovie, setSearchMovie] = useState("");
    const dispatch = useDispatch();
    const isLoading = useSelector(store => store.app.isLoading);
    const { movieName, searchedMovie } = useSelector(store => store.searchMovie);

    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(setLoading(true));
        try {
            const res = await axios.get(`${SEARCH_MOVIE_URL}${searchMovie}&include_adult=false&language=en-US&page=1`, options);
            const movies = res?.data?.results;
            dispatch(setSearchMovieDetails({ searchMovie, movies }));
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(setLoading(false));
        }
        setSearchMovie("");
    }

    return (
        <>
            <div className='flex justify-center pt-10 sm:pt-16 lg:pt-24 w-full'>
                <form onSubmit={submitHandler} className='w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3'>
                    <div className='flex justify-between shadow-md border-2 p-2 sm:p-3 md:p-4 border-gray-200 rounded-lg'>
                        <input 
                            value={searchMovie} 
                            onChange={(e) => { setSearchMovie(e.target.value) }} 
                            className='w-full outline-none rounded-md text-sm sm:text-base md:text-lg p-2' 
                            type="text" 
                            placeholder='Search Movies...' 
                        />
                        <button className='bg-red-800 text-white rounded-md px-2 sm:px-3 md:px-4 py-1 sm:py-2'>
                            {isLoading ? "Loading..." : "Search"}
                        </button>
                    </div>
                </form>
            </div>
            {
                searchedMovie ? (
                    <MovieList title={movieName} searchMovie={true} movies={searchedMovie} />
                ) : (
                    <h1 className='text-center text-white mt-8'>Movie Not Found!!</h1>
                )
            }
        </>
    );
}

export default SearchMovie;
