import { Typography, Grid, Grow, Tooltip, Rating } from "@mui/material"
import useStyles from './moviestyles'
import { Link } from "react-router-dom";

const Movie = ({movie, i}) => {
    const classes = useStyles();
  return (
    <Grid item xs={12} sm={4} md={4} lg={3} xl={2} className={classes.movie}>
        <Grow in key={i} timeout={(i + 1) * 250}>
            <Link className={classes.links} to={`/movie/${movie.id}`}>
                <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`:
                    'https://i.ibb.co/9cV7V32/Movie-Grid-Blue-Cropped.png'
                  } alt={movie.title} className={classes.image}/>
                  <Typography className={classes.title}>
                    {movie.title}
                  </Typography>

                  <Tooltip disableTouchListener title={`${movie.vote_average} / 10`}>
                    <div>
                        <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
                    </div>
                  </Tooltip>
            </Link>
        </Grow>
    </Grid>
  )
}

export default Movie