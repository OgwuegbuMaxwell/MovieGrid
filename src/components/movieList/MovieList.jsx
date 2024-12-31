// import React from 'react'
import { Grid } from "@mui/material"
import useStyles from './movieliststyles'
import Movie from "../movie/Movie";

const MovieList = ({movies, numberOfMovies}) => {
    const classes = useStyles();


  return (
    <Grid container className={classes.moviesContainer}>
        {movies.results.slice(0, numberOfMovies).map((movie, i) => (
            <Movie key={i} movie={movie} i={i}/>
        ) )}
    </Grid>
  )
}

export default MovieList


/**
 * 
  How It Handles the Props

  1. numberOfMovies Prop in MovieList
      In the MovieList component:
          movies.results.slice(0, numberOfMovies)

          movies.results: The array of movie data.

          slice(0, numberOfMovies):
              This creates a shallow copy of the array from index 0 to numberOfMovies.
              If numberOfMovies is undefined, it is treated as if no upper limit is specified for slicing.



  2. How undefined Works in slice
      If you don't pass the numberOfMovies prop:

      <MovieList movies={data} />

      The value of numberOfMovies is undefined in the MovieList component.
      When slice(0, undefined) is called:
        JavaScript treats undefined as "the end of the array."
        The slice method returns all elements from index 0 to the end of the array.



    Best Practices for Clarity

    To make this behavior explicit and avoid confusion, you could add a 
    default value for numberOfMovies in the MovieList component:

    Using Default Props

    const MovieList = ({ movies, numberOfMovies = movies.results.length }) => {
    const classes = useStyles();

    return (
            <Grid container className={classes.moviesContainer}>
                {movies.results.slice(0, numberOfMovies).map((movie, i) => (
                    <Movie key={i} movie={movie} i={i} />
                ))}
            </Grid>
        );
    };

    Explanation:
    If numberOfMovies is not provided, it defaults to movies.results.length, 
    effectively showing all movies.


 * 
 */