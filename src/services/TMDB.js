import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tmdbApiKey = import.meta.env.VITE_TMDB_KEY;

const page = 1;

export const tmdbApi = createApi({
    reducerPath: 'tmdbApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://api.themoviedb.org/3'}),
    endpoints: (builder) => ({

        // Get movies by genres
        getGenres: builder.query({
            query: () => `genre/movie/list?api_key=${tmdbApiKey}`
        }),

        // Get movies by type
        getMovies: builder.query({
            query: () => `/movie/popular? page=${page}&api_key=${tmdbApiKey}`
        }),
    }),
});


export const { useGetMoviesQuery, useGetGenresQuery } = tmdbApi;



