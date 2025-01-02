import { Typography, Button, Box } from "@mui/material"
import { useSelector } from "react-redux"
import { ExitToApp } from "@mui/icons-material"
import { userSelector } from "../../features/auth";
import { useGetUserFavoriteListQuery } from "../../services/TMDB";
import { useEffect } from "react";
import RatedCards from "../ratedCards/RatedCards";


const Profile = () => {
  const { user } = useSelector(userSelector);
  // console.log("User", user)

  const { data: favoriteMovies, refetch: refecthFavorites } = useGetUserFavoriteListQuery({ listName: 'favorite/movies', accountId:user.id, sessionId: localStorage.getItem('session_id'), page: 1 })
  const { data: watchlistMovies, refetch: refecthWatchlisted } = useGetUserFavoriteListQuery({ listName: 'watchlist/movies', accountId:user.id, sessionId: localStorage.getItem('session_id'), page: 1 })


  // console.log('Favorite Movies: ', favoriteMovies)
  // console.log('Wtahclist Movies: ', watchlistMovies)


  useEffect(() => {
    refecthFavorites();
    refecthWatchlisted();
  },[refecthFavorites, refecthWatchlisted])



  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  }

  return (
    <Box>
        <Box display='flex' justifyContent='space-between'>
            <Typography variant="h6" gutterBottom>
                My Profile
            </Typography>
           
            <Button color="inherit" onClick={logout}>
              Logout &nbsp; <ExitToApp/>
            </Button>
        </Box>

        {!favoriteMovies?.results?.length && !watchlistMovies?.results?.length 
          ?
        <Typography variant="h5">
          Add Favorites or wathclist movies to see them here.
        </Typography>
        :

        (
          <Box>
              <RatedCards title='Favorite Movies' data={favoriteMovies}/>

              <RatedCards title='WatchList Movies' data={watchlistMovies}/>
          </Box>
        )
        
      }
    </Box>
  )
}

export default Profile