import { useGetMoviesQuery } from "../../services/TMDB";
import { Box, CircularProgress, Typography } from "@mui/material";
import MovieList from "../movieList/MovieList";



const Movies = () => {


  const { data, error, isFetching } = useGetMoviesQuery();
  // console.log(data)

  if(isFetching) {
    return (
      <Box display='flex' justifyContent='center'>
      <CircularProgress size='4rem'/>

    </Box>
    )
  }

  if (!data.results.length) {
    return (
      <Box display='flex' alignItems='center' mt='20px'>
        <Typography>
          No Movies that match the name <br/>
          Please search for another name
        </Typography>

    </Box>
    )
  }

  if (error) return 'An error has occured.'
  

  return (
    <div>
      <MovieList movies={data} />
    </div>
  );
};

export default Movies