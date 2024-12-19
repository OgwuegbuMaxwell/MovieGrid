import useStyles from './navstyle'
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from '../sidebar/Sidebar';

const Navbar = () => {

    const classes = useStyles();
    const isMobile = useMediaQuery('(max-width:600px)');
    const theme = useTheme();
    const isAuthenticated = true;
    const [mobileOpen, setMobileOpen] = useState(false);

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
                                onClick={() => {}}
                                >
                        {theme.palette.mode === 'dark' ? <Brightness7/> : <Brightness4/>}
                    </IconButton>

                    {!isMobile && 'search...'}

                    <div>
                        {!isAuthenticated ? (
                            <Button color='inherit' onClick={() => {}}>
                                Login &nbsp; <AccountCircle/>
                            </Button>

                        ): (
                            <Button
                                color='inherit'
                                component={Link}
                                to={`/profile/:id`}
                                className={classes.linkButton}
                                onClick={() => {}}
                                >
                                    {!isMobile && <>My Profile &nbsp;</>}
                                    <Avatar
                                        style={{width: 30, height:30}}
                                        alt='Profile Image'
                                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIlCRi_Yvq9yMA61nV7X-pW1W58WW26ToNDr4g7KUDbPkjk4KxEfw1Fq0&s'
                                    />
                            </Button>
                        )}
                    </div>

                    {isMobile && 'search...'}

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