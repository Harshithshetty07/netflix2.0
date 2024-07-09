import React from 'react'
import MovieList from './MovieList';
import {useSelector} from "react-redux";

const MovieContainer = () => {
  const movie = useSelector(store=>store.movie);
  
  return (
    <div className='bg-black'>
      <div className='lg:-mt-[9rem] md:mt-1 relative z-10 
    sm:mt-12 sm:z-10
    xl:-mt-[10rem] xl:relative xl:z-10' >
        <MovieList title={"Popular Movies"} movies={movie.popularMovie}/>
        <MovieList title={"Now Playing Movies"} movies={movie.nowPlayingMovies}/>
        <MovieList title={"Top Tated Movies"} movies={movie.topRatedMovies}/>
        <MovieList title={"Upcoming Movies"} movies={movie.upcomingMovies}/>
      </div>
    </div>
  )
}

export default MovieContainer