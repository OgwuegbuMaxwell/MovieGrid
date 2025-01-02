import useStyles from './navstyle'
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7, Token } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import Search from '../search/Search';
import { fetchToken, createSessionId, moviesApi } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, userSelector } from '../../features/auth';
import { ColorModeContext } from '../../utils/ToggleColorMode';



const Navbar = () => {

    const classes = useStyles();
    const isMobile = useMediaQuery('(max-width:600px)');
    const theme = useTheme();

    const { isAuthenticated, user } = useSelector(userSelector);

    const [mobileOpen, setMobileOpen] = useState(false);

    const dispatch = useDispatch();
    const token = localStorage.getItem('request_token')
    const sessionIdFromLocalStorage = localStorage.getItem('session_id')

    const colorMode = useContext(ColorModeContext);

    useEffect(() => {
        const logInUser = async () => {
            if (token) {
                if (sessionIdFromLocalStorage) {
                    const {data: userData} = await moviesApi.get(`/account?session_id=${sessionIdFromLocalStorage}`);
                    dispatch(setUser(userData))

                } else {
                    const sessionId = await createSessionId();
                    const { data: userData } = await  moviesApi.get(`/account?session_id=${sessionId}`);
                    dispatch(setUser(userData))
                }
            }
        }

        logInUser();

    }, [token])

    return (
        <>
            <AppBar position='fixed'>
                <Toolbar className={classes.toolbar}>
                    {isMobile && (
                        <IconButton
                          color='inherit'
                          edge= 'start'
                          style={{outline: 'none'}}
                          onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
                          className={classes.menuButton}
                        >
                            <Menu/>

                        </IconButton>
                    )}

                    <IconButton color='inherit' 
                                sx={{ml:1}}
                                onClick={colorMode.toggleColorMode}
                                >
                        {theme.palette.mode === 'dark' ? <Brightness7/> : <Brightness4/>}
                    </IconButton>

                    {!isMobile && <Search/>}

                    <div>
                        {!isAuthenticated ? (
                            <Button color='inherit' onClick={fetchToken}>
                                Login &nbsp; <AccountCircle/>
                            </Button>

                        ): (
                            <Button
                                color='inherit'
                                component={Link}
                                to={`/profile/${user.id}`}
                                className={classes.linkButton}
                                onClick={() => {}}
                                >
                                    {!isMobile && <>{user.username} &nbsp;</>}
                                    <Avatar
                                        style={{width: 30, height:30}}
                                        alt='Profile Image'
                                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIlCRi_Yvq9yMA61nV7X-pW1W58WW26ToNDr4g7KUDbPkjk4KxEfw1Fq0&s'
                                    />
                            </Button>
                        )}
                    </div>

                    {isMobile && <Search/>}

                </Toolbar>
            </AppBar>

            <div>
                <nav className={classes.drawer}>
                    {isMobile ? (
                        <Drawer
                            variant='temporary'
                            anchor='right'
                            open={mobileOpen}
                            onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
                            classes={{paper: classes.drawerPaper}}
                            ModalProps={{keepMounted: true}}
                        >
                            
                            <Sidebar setMobileOpen={setMobileOpen}/>
                        </Drawer>
                    ): (
                        <Drawer classes={{paper: classes.drawerPaper}} variant='permanent' open>
                            <Sidebar setMobileOpen={setMobileOpen}/>
                        </Drawer >
                    )}

                </nav>
            </div>
        </>
    )
}

export default Navbar