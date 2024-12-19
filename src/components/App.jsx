import { CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Movies from './movies/Movies';
import Actors from './actors/Actors';
import Navbar from './navbar/navbar';
import MovieInformation from './movieInformation/MovieInformation';
import Profile from './profile/Profile';
import useStyles from '../styles';


const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
        <CssBaseline/>
        <BrowserRouter>
            <Navbar/>
            <main className={classes.content}>
              <div className={classes.toolbar}/>
                <Routes>
                    <Route path='/movie/:id' element={<MovieInformation/>} />
                    <Route path='/' element={<Movies/>} />
                    <Route path='/actors/:id' element={<Actors/>} />
                    <Route path='/profile/:id' element={<Profile/>} />
                </Routes>
            </main>
        </BrowserRouter>
    </div>
  )
}

export default App

