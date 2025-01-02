import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

import useStyle from './actorstyles';
import { useNavigate, useParams } from "react-router-dom";
import { useGetActorsDetailsQuery, useGetActorMoviesQuery } from "../../services/TMDB";
import { useState } from "react";
import MovieList from "../movieList/MovieList";
import Pagination from "../pagination/Pagination";



const Actors = () => {
  const { id } = useParams();
  // console.log(id)
  const classes = useStyle();
  const { data, isFetching, error } = useGetActorsDetailsQuery(id)
  // console.log(data)
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const {data: movies } = useGetActorMoviesQuery({id, page});

  if (isFetching) {
    return (
      <Box display='flex' justifyContent='center'>
          <CircularProgress size='8rem'/>
      </Box>
    )
  }

  if (error) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center'>
          <Button startIcon={<ArrowBack/>} onClick={() => navigate(-1)} color="primary">
            Go Back
          </Button>
      </Box>
    )
  }



  return (
    <>
      <Grid container spacing={3}>
          <Grid item lg={5} xl={4}>
              <img className={classes.image} src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`} />
          </Grid>


          <Grid item lg={7} xl={8} style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
              <Typography variant="h3" gutterBottom>
                  {data?.name}
              </Typography>
              
              <Typography variant="h5" gutterBottom>
                  Born: {new Date(data?.birthday).toDateString()}
              </Typography>

              <Typography variant="body1" align="justify" paragraph>
                  {data?.biography || 'Sorry, No Biography yet..'}
              </Typography>

              <Box marginTop='2rem' display='flex' justifyContent='space-around'>
                  <Button variant="contained" color="primary" target="_blank" href={`https://www.imdb.com/name/${data?.imdb_id}`}>
                      IMDB
                  </Button>

                  <Button startIcon={<ArrowBack/>} onClick={() => navigate(-1)} color="primary">
                    Go Back
                  </Button>
              </Box>
          </Grid>


      </Grid>


      <Box margin='2rem 0'>
          <Typography variant="h4" gutterBottom align="center"> 
              {data?.name} Movies
          </Typography>

          {movies && <MovieList movies={movies} numberOfMovies={12}/>}

          <Pagination  currentPage={page} setPage={setPage} totalPages={movies?.total_page}/>
      </Box>
    </>
  )
}

export default Actors