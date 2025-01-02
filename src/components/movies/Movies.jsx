import { useGetMoviesQuery } from "../../services/TMDB";
import { Box, CircularProgress, Typography } from "@mui/material";
import MovieList from "../movieList/MovieList";
import { useSelector } from "react-redux";
import { useState } from "react";
import Pagination from "../pagination/Pagination";




const Movies = () => {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory );
  const { data, error, isFetching } = useGetMoviesQuery({genreIdOrCategoryName, page, searchQuery});
  // console.log(data)
  // console.log("genreIdOrCategoryName:", genreIdOrCategoryName, "page: ", page);
 

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
      <Pagination  currentPage={page} setPage={setPage} totalPages={data.total_page}/>
    </div>
  );
};

export default Movies