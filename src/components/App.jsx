import { CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Movies from './movies/Movies';
import Actors from './actors/Actors';
import Navbar from './navbar/navbar';
import MovieInformation from './movieInformation/MovieInformation';
import Profile from './profile/Profile';
import useStyles from '../styles';
import UseAlan from '../Alan';
import { useRef } from 'react';


const App = () => {
  const classes = useStyles();
  const alanBtnContainer = useRef();

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
                    <Route path='/approved' element={<Movies/>} />
                    <Route path='/actors/:id' element={<Actors/>} />
                    <Route path='/profile/:id' element={<Profile/>} />
                </Routes>
            </main>
            <UseAlan/>
            <div  ref={alanBtnContainer}/>
            
        </BrowserRouter>
    </div>
  )
}

export default App

