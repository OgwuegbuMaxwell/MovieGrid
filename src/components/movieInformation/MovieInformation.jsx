import { Modal, Typography, Button, ButtonGroup, Grid, Box, CircularProgress, useMediaQuery, Rating } from "@mui/material"
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack, Grade } from "@mui/icons-material"

import { Link, useParams } from "react-router-dom"
import { useGetMovieDetailQuery, useGetRecommendationMoviesQuery, useGetUserFavoriteListQuery } from "../../services/TMDB"
import useStyles from './movieInformationstyles'

import genreIcons from '../../assets/genres';
import { useDispatch, useSelector } from "react-redux"
import { selectGenreOrCategory } from "../../features/currentGenreCategory"

import MovieList from '../movieList/MovieList'
import { useEffect, useState } from "react"

import axios from "axios"
import { userSelector } from "../../features/auth"
 

const MovieInformation = () => {
    const { user } = useSelector(userSelector)
    console.log(user)
    const { id } = useParams();
    const {data, isFetching, error} = useGetMovieDetailQuery(id);
    // console.log("Movie Information", data)
    const classes = useStyles();
    const dispatch = useDispatch();
    const {data: recommendations, isFetching: isRecommendationFetching} = useGetRecommendationMoviesQuery({list:'recommendations', movie_id:id})
    // console.log("Movie Recommendations: ", recommendations)

    const [openModal, setOpenModal] = useState(false);


    const { data: favoriteMovies, isFetching: isFavoriteMviesFething } = useGetUserFavoriteListQuery({ listName: 'favorite/movies', accountId:user.id, sessionId: localStorage.getItem('session_id'), page: 1 })
    const { data: watchlistMovies, isFetching: isWatchlistMoviesFething  } = useGetUserFavoriteListQuery({ listName: 'watchlist/movies', accountId:user.id, sessionId: localStorage.getItem('session_id'), page: 1 })


    useEffect(() => {
        if (favoriteMovies?.results) {
            setIsMovieFavorited(!!favoriteMovies?.results?.find((movie) => movie?.id === data?.id ))
        }
        
    },[favoriteMovies, data])

    useEffect(() => {
        if (watchlistMovies?.results) {
            setIsMovieWatchlisted(!!watchlistMovies?.results?.find((movie) => movie?.id === data?.id ))

        }
    },[watchlistMovies, data])



    const [isMoveiFavorited, setIsMovieFavorited] = useState(false)
    const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false)





    const addToFavorite = async () => {
        try {

            const url = `https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${import.meta.env.VITE_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`
            
            // Post request to add/remove the movie from favorites
            await axios.post(url, {
                media_type: 'movie',
                media_id: id,
                favorite: !isMoveiFavorited,
            });


        // Update local state directly
        setIsMovieFavorited((prevState) => !prevState);
        } catch (error) {
        console.error("Failed to update favorite:", error);
        }
    };


  const addToWatchlist = async () => {

    try {

        const url = `https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${import.meta.env.VITE_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`

        await axios.post(url, {
            media_type: 'movie',
            media_id: id,
            watchlist: !isMovieWatchlisted,
        })
        setIsMovieWatchlisted((prevState) => !prevState)
    } catch (error) {
        console.error("Failed to update watchlist:", error);

    }

    
  }

  

  if (isFetching) {
    return(
      <Box display='flex' justifyContent='center' alignItems='center'>
          <CircularProgress  size='8rem'/>
      </Box>
    )
  }

  if (error) {
    <Box display='flex' justifyContent='center' alignItems='center'>
      <Link to='/'>Something has gone wrong - Go Back</Link>
    </Box>
  }




  return (
    <Grid container className={classes.containerSpaceAround}>
        <Grid item sm={12} lg={4} style={{display:'flex', marginBottom: '30px'}}>
            <img  className={classes.poster} src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`} alt={data?.title}/>
        </Grid>

        <Grid item container direction='column' lg={7}>
            <Typography variant="h4" align="center" gutterBottom>
                {data?.title} ({data?.release_date.split('-')[0]})
            </Typography>

            <Typography variant="h5" align="center" gutterBottom>
                {data?.tagline} 
            </Typography>

            <Grid item className={classes.containerSpaceAround}>
                <Box display='flex' align='center'>
                  <Rating  readonly value={data?.vote_average / 2}/>
                  
                  <Typography variant="subtitle1" gutterBottom style={{marginLeft: '10px'}}>
                      {data?.vote_average } / 10
                  </Typography>
                </Box>
                <Typography variant="h6" align="center" gutterBottom style={{fontSize: '16px'}}>
                    {data?.runtime}min | Language: {data?.spoken_languages[0].name}
                </Typography>
            </Grid>


            <Grid item className={classes.genresContainer}>
                {data?.genres?.map((genre) => (
                  <Link key={genre.name} className={classes.links} to='/' onClick={() => dispatch(selectGenreOrCategory(genre.id))}>
                      <img src={genreIcons[genre.name.toLowerCase()]} className={classes.genreImage} height={30}/>
                      <Typography color="textPrimary" variant="subtitle1">
                          {genre?.name}
                      </Typography>
                  </Link>
                ))}
            </Grid>


            <Typography variant="h5" gutterBottom style={{marginTop: '10px'}}>
                  OverView
            </Typography>

            <Typography style={{marginBottom: '2rem'}}>
                  {data?.overview}
            </Typography>

            <Typography variant="h5" gutterBottom >
                  Top Cast
            </Typography>
            <Grid item container spacing={2}>
                {data && data.credits.cast.map((character, i) => (
                  character.profile_path && (
                      <Grid item key={i} xs={4} md={2} component={Link} to={`/actors/${character.id}`} style={{textDecoration: 'none'}}>
                          <img className={classes.castImage}  src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`} alt={character.name} />
                          <Typography color='textPrimary'>
                              {character.name}
                          </Typography>
                          <Typography color='textSecondary'>
                              {character.character.split('/')[0]}
                          </Typography>
                      </Grid>
                  )
                )).slice(0,6)}
            </Grid>


            <Grid item container style={{marginTop: '2rem'}}>
                <div className={classes.buttonsContainer}>
                    <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
                        <ButtonGroup size="small" variant="outlined">
                            <Button target="_blank" rel="noopener noreferrer" href={data?.homepage} endIcon={<Language/>}>
                                Website
                            </Button>
                            <Button target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${data?.imdb_id}`} endIcon={<MovieIcon/>}>
                                IMDB
                            </Button>
                            <Button onClick={() => setOpenModal(true)} rel="noopener noreferrer" href="#" endIcon={<Theaters/>}>
                                Trailer
                            </Button>
                        </ButtonGroup>
                    </Grid>

                    <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
                        <ButtonGroup size="medium" variant="outlined">
                            {isFavoriteMviesFething ? (
                                <Button>
                                    <CircularProgress size={16} />
                                </Button>
                            ) : (
                                <Button
                                    onClick={addToFavorite}
                                    endIcon={isMoveiFavorited ? <Favorite /> : <FavoriteBorderOutlined />}
                                >
                                    {isMoveiFavorited ? 'Unfavorite' : 'Favorite'}
                                </Button>
                            )}
                            {/* <Button onClick={addToFavorite} endIcon={isMoveiFavorited ? <FavoriteBorderOutlined/> : <Favorite/>}>
                                {isMoveiFavorited? 'Unfavorite': 'Favorite'}
                            </Button> */}

                            {isWatchlistMoviesFething ? (
                                <Button>
                                    <CircularProgress size={16} />
                                </Button>
                            ): (
                                <Button onClick={addToWatchlist} endIcon={isMovieWatchlisted ? <Remove/> : <PlusOne/>}>
                                    Watchlist
                                </Button>
                            )}

                            {/* <Button onClick={addToWatchlist} endIcon={isMovieWatchlisted ? <Remove/> : <PlusOne/>}>
                                Watchlist
                            </Button> */}

                            <Button endIcon={<ArrowBack/>} sx={{borderColor: 'primary.main'}}>
                                <Typography style={{textDecoration: 'none'}} component={Link} to='/' color="inherit" variant="subtitle2">
                                    Back
                                </Typography>
                            </Button>
                        </ButtonGroup>

                    </Grid>

                </div>

            </Grid>



        </Grid>


        <Box marginTop='5rem' width='100%'>
              <Typography variant="h4" gutterBottom align="center">
                  You might also like
              </Typography>

              {recommendations
              ? <MovieList  movies={recommendations} numberOfMovies={12}/>
              :
              <Box>Sorry no movie was found</Box>
              }
        </Box>


        <Modal
          closeAfterTransition
          className={classes.modal}
          open={openModal}
          onClose={() => setOpenModal(false)}
        >

          {
            data?.videos?.results?.length > 0 && (
              <iframe
                autoPlay 
                className={classes.video}
                frameBorder='0'
                title="Trailer"
                src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
                allow="autoPlay"
              >

              </iframe>
            )
          }


        </Modal>



    </Grid>
    
  )
}

export default MovieInformation