import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress } from "@mui/material"
import { useTheme } from "@mui/styles"
import useStyle  from './sidestyles'
import { Link } from "react-router-dom";
import { useGetGenresQuery } from "../../services/TMDB";
import genreIcons from '../../assets/genres'

const blueLogo = "https://i.ibb.co/9cV7V32/Movie-Grid-Blue-Cropped.png" 
const redLogo = "https://i.ibb.co/GJCHFGG/Movie-Grid-Red-Cropped.png"


const categories = [
    {label: 'Popular', value: 'popular'},
    {label: 'Top Rated', value: 'top_rated'},
    {label: 'Upcoming', value: 'upcoming'}

]

const demoCategories = [
    {label: 'Comedy', value: 'comedy'},
    {label: 'Action', value: 'action'},
    {label: 'Horror', value: 'horror'},
    {label: 'Animation', value: 'animation'}
    

]


const Sidebar = ({setMobileOpen}) => {
    const theme = useTheme();
    const classes = useStyle();
    const {data, isFetching} = useGetGenresQuery();
    // console.log("Movies By Genres: ", data)



  return (
    <>
        <Link to='/' className={classes.imageLink}>
            <img className={classes.image}
            src={theme.palette.mode === 'light' ? blueLogo: redLogo}
            alt="MovieGrid"
            
            />
        </Link>

        <Divider/>

        <List>
            <ListSubheader>
                Categories
            </ListSubheader>

            {categories.map(({label, value}) => (
                <Link key={value} className={classes.links} to='/'>
                    <ListItem onClick={() => {}} button>
                        <ListItemIcon>
                            <img src={genreIcons[label.toLowerCase()]} className={classes.genreImage} height={30}/>
                        </ListItemIcon>
                        <ListItemText primary={label}/>
                    </ListItem>
                </Link>
            ) )}

        </List>

        <Divider/>

        <List>
            <ListSubheader>
                Genres
            </ListSubheader>

            {isFetching ? (
                <Box display="flex" justifyContent='center'>
                    <CircularProgress/>
                </Box>
            ) : 

            data.genres.map(({name, id}) => (
                <Link key={name} className={classes.links} to='/'>
                    <ListItem onClick={() => {}} button>
                        <ListItemIcon>
                            <img src={genreIcons[name.toLowerCase()]} className={classes.genreImage} height={30}/>
                        </ListItemIcon>
                        <ListItemText primary={name}/>
                    </ListItem>
                </Link>
            ) )}

        </List>
    
    </>
  )
}


export default Sidebar