import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 
    createApi: A function from Redux Toolkit Query (RTK Query) used to 
    create a slice of the Redux store specifically for API interactions.

    fetchBaseQuery: A lightweight wrapper around the fetch function,
     allowing you to define a baseUrl for API requests.

 * 
 */


const tmdbApiKey = import.meta.env.VITE_TMDB_KEY;
// tmdbApiKey: The API key for authenticating requests to The Movie Database (TMDB).

// const page = 1;

export const tmdbApi = createApi({
    reducerPath: 'tmdbApi', // Unique identifier for this API slice
    baseQuery: fetchBaseQuery({baseUrl: 'https://api.themoviedb.org/3'}), // Base URL for API requests
    endpoints: (builder) => ({
        // Define endpoints for interacting with the API

        // Get movies by genres
        getGenres: builder.query({
            query: () => `genre/movie/list?api_key=${tmdbApiKey}`
        }),

        // Get movies by type
        getMovies: builder.query({
            query: ({genreIdOrCategoryName, page, searchQuery}) => {
                // console.log("genreIdOrCategoryName:", genreIdOrCategoryName, "page: ", page);

                // Get movies by search
                if (searchQuery) {
                    // console.log(`/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`)
                    return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`
                    

                }
                
                // get movies by category
                if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
                    return `/movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`
                }

                // get movies by genre
                if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
                    return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`
                }

                // Get popular movies
                return `/movie/popular? page=${page}&api_key=${tmdbApiKey}`

            }
        }),


        // Get movie details
        getMovieDetail: builder.query({
            query: (id) => `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`
        }),


        // Get recommendation movies
        getRecommendationMovies: builder.query({
            query: ({movie_id, list}) => `/movie/${movie_id}/${list}?api_key=${tmdbApiKey}`
        }),


        // Get actor details
        getActorsDetails: builder.query({
            query: (id) => `/person/${id}?api_key=${tmdbApiKey}`
        }),


        // Get actor movie list
        getActorMovies: builder.query({
            query: ({id, page}) => `/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApiKey}`
        }),
        


    }),
});


export const { useGetMoviesQuery, useGetGenresQuery, useGetMovieDetailQuery, useGetRecommendationMoviesQuery, useGetActorsDetailsQuery, useGetActorMoviesQuery } = tmdbApi;



/**
 Redux Toolkit Query automatically generates hooks for each endpoint:
 useGetMoviesQuery: A hook for fetching popular movies.
 useGetGenresQuery: A hook for fetching movie genres.
 * 
 */



 /**
    How createApi Works

    1. Endpoints Mapping
        When you define endpoints in the createApi function, you give each endpoint 
        a unique key/name (e.g., getMovies, getGenres). These keys are the 
        identifiers for the endpoints.

        For example:
        endpoints: (builder) => ({
            getMovies: builder.query({
                query: () => `/movie/popular?page=${page}&api_key=${tmdbApiKey}`,
            }),
            getGenres: builder.query({
                query: () => `genre/movie/list?api_key=${tmdbApiKey}`,
            }),
        }),

        getMovies: The unique key for fetching movies.
        getGenres: The unique key for fetching genres.



    2. Hook Naming Convention
        RTK Query uses a naming convention to generate hooks for the endpoints:

        1. For queries (created with builder.query):

            Hook name: use<EndpointName>Query
            Example:
            For the endpoint getMovies, it generates useGetMoviesQuery.
            For the endpoint getGenres, it generates useGetGenresQuery.

        2. For mutations (created with builder.mutation):
            Hook name: use<EndpointName>Mutation
            Example:
            For an endpoint named addMovie, it generates useAddMovieMutation.
            So, the hook names are dynamically created based on the endpoint names you define in createApi.


    3. Type-Safe Matching
        The hooks are tied to their respective endpoints:

        useGetMoviesQuery is linked to the getMovies endpoint.
        useGetGenresQuery is linked to the getGenres endpoint.
  * 
  */