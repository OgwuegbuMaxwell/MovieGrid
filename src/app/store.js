import { configureStore } from "@reduxjs/toolkit";
import { tmdbApi } from "../services/TMDB";
import genreOrCategory from "../features/currentGenreCategory";



export default configureStore({
    reducer: {
        [tmdbApi.reducerPath]: tmdbApi.reducer,
        currentGenreOrCategory: genreOrCategory,
    },

    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(tmdbApi.middleware),
})



/**
    The store in Redux is a central place where your application’s state and 
    logic are managed. In the  code above, the store is configured using 
    Redux Toolkit, which simplifies Redux setup. 

    Break down of what this store is now used for and its components.


    What the Store is Used For
        The store is now being used to:

        Manage State for API Requests (via tmdbApi):

        The tmdbApi.reducer handles all API-related state (e.g., fetched data, loading state, errors, and caching) for endpoints defined in TMDB.js.
        The state for these endpoints will be stored in the Redux store under the key tmdbApi.
        Manage Current Genre or Category State:

        The currentGenreOrCategory slice (from currentGenreCategory) is used to track and manage the current genre or category selected by the user.
        This part of the state is responsible for filtering movies or fetching movies by specific genres or categories.
        
        Provide Middleware for Enhanced Functionality:
        The middleware includes:
        Default Middleware: Handles common Redux tasks like immutability checks.
        tmdbApi.middleware: Automatically enables caching, data fetching, and invalidation for API requests defined in TMDB.



    Store Components Explained
    1. Reducers
        Reducers are pure functions that specify how the state should change 
        based on dispatched actions. The reducer property in the store 
        combines multiple reducers into one.

        reducer: {
            [tmdbApi.reducerPath]: tmdbApi.reducer,  // Handles API-related state (e.g., movies, genres)
            currentGenreOrCategory: genreOrCategory // Manages the selected genre or category
        },

        [tmdbApi.reducerPath]: tmdbApi.reducer:
            Automatically handles API states like loading, success, and error for TMDB endpoints.
            Adds the tmdbApi slice of state in the Redux store.
            
            currentGenreOrCategory: genreOrCategory:
            Stores and manages the current genre or category selected by the user.


    2. Middleware
        Middleware in Redux intercepts actions before they reach reducers. It is used here for:

        RTK Query Middleware (tmdbApi.middleware):
        Enables automatic caching and invalidation of API requests.
        Ensures API requests and responses are efficiently handled.

        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(tmdbApi.middleware),


    
    How It can be Used in the Application

    Access API Data in Components
    Use RTK Query hooks like useGetMoviesQuery or useGetGenresQuery to 
    fetch data and automatically access the cached data from the Redux store.

    import { useGetMoviesQuery } from "../services/TMDB";

    const Movies = () => {
        const { data, error, isFetching } = useGetMoviesQuery();

        if (isFetching) return <div>Loading...</div>;

        return (
            <div>
                {data.results.map((movie) => (
                    <div key={movie.id}>{movie.title}</div>
                ))}
            </div>
        );
    };


 */