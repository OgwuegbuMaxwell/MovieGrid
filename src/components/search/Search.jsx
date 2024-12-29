import { TextField, InputAdornment } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import useStyles from './searchstyles';
import { useState } from "react";
import { searchMovie } from "../../features/currentGenreCategory";
import { useLocation } from "react-router-dom";


const Search = () => {
    const classes = useStyles();
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const location = useLocation()
    // console.log(location);
    // console.log(query);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            dispatch(searchMovie(query));
        }
    };

    if (location.pathname !== '/' ) return null;


  return (
    <div className={classes.searchContainer}>
        <TextField 
            onKeyPress={handleKeyPress}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            variant="standard"
            InputProps={{
                className: classes.input,
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon/>
                    </InputAdornment>
                )
            }}

        >

        </TextField>
        
    </div>
  )
}

export default Search


