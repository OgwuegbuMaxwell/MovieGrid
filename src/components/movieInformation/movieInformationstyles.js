
import { Padding } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { borderRadius, display } from "@mui/system";

// const drawerWidth = 240;

export default makeStyles((theme) => ({
    containerSpaceAround: {
        display: 'flex',
        justifyContent: 'space-around',
        margin: '10px 0 !important',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            flexWrap: 'wrap',
        }
    },

    poster: {
        borderRadius: '20px',
        boxShadow: '0.5em 1em 1em rgb(64,64,70)',
        width: '100%',
        [theme.breakpoints.down('md')]: {
            margin: '0 auto',
            width: '50%',
        },
        [theme.breakpoints.down('sm')]: {
            margin: '0 auto',
            with: '100%',
            height: '250px',
            marginBottom: '30px',
        },
    },

    genresContainer: {
        margin: '10px 0 !important',
        display: 'flex',
        justifyContent: 'space-around',
        // justifyContent: 'space-between',
        flexWrap: 'wrap',
    },

    genreImage: {
        filter: theme.palette.mode === 'dark' && 'invert(1)',
        marginRight: '10px',
    },

    links: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textDecoration: 'none',
        [theme.breakpoints.down('sm')]: {
            Padding: '0.5rem 1rem'
        }
    },

    castImage: {
        width: '100%',
        maxWidth: '7rem',
        height: '6rem',
        objectFit: 'cover',
        borderRadius: '10px',
    },

    buttonsContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column'
        }
    }


}))