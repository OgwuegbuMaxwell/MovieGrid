import { Typography, Button } from "@mui/material"
import useStyles from './paginationstyles'

const Pagination = ({currentPage, setPage, totalePages}) => {
    const classes = useStyles();

    const handlePrev = () => {
        if (currentPage !== 1) {
            // setPage: Updates the page state in the parent component (Movies) 
            // when "Prev" or "Next" is clicked.
            setPage((prevPage) => prevPage -1)
        }
    }
    

    const handleNext = () => {
        if (currentPage !== totalePages) {
            setPage((prevPage) => prevPage +1)
        }
    }

    if (totalePages === 0) return null;


    /**
     
        The useGetMoviesQuery  automatically re-fetches data whenever the page, 
        genreIdOrCategoryName, or searchQuery values changes
     * 
     */

  return (
    <div className={classes.container}>
        <Button onClick={handlePrev} className={classes.button} variant="contained" color="primary" type="button">
            Prev
        </Button>

        <Typography variant="h4" className={classes.pageNumber}>
            {currentPage}
        </Typography>

        <Button onClick={handleNext} className={classes.button} variant="contained" color="primary" type="button">
            Next
        </Button>
    </div>
  )
}

export default Pagination