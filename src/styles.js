import { makeStyles } from "@mui/styles";

const drawerWidth = 0;

export default makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: '100%'
    },

    toolbar: {
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
            with: '100%'
        }
    }
}))

/**
Documentation

makeStyles is imported from @mui/styles to define styles in JavaScript.
it's part of the legacy styling solution

 
makeStyles takes a callback function with theme as an argument.
The theme object comes from Material-UI's ThemeProvider and contains:

theme.mixins.toolbar: Predefined toolbar styles (e.g., height).

theme.spacing(): A function for consistent spacing.

theme.breakpoints: Media query utilities for responsive design.


Defined Styles

root:
root: {
    display: 'flex',
    height: '100%',
}
display: 'flex': Sets the root container as a flexbox for layout.
height: '100%': Makes the root container occupy the full height of its parent.


toolbar:
toolbar: {
    ...theme.mixins.toolbar,
}
theme.mixins.toolbar: Applies predefined Material-UI toolbar styles (like height and alignment).
This ensures the toolbar matches Material-UI's design guidelines.


content
content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    [theme.breakpoints.down('sm')]: {
        marginLeft: 0,
        width: '100%',
    },
}
flexGrow: 1: Allows the content area to grow and fill available space.
padding: theme.spacing(3): Adds consistent padding (based on Material-UI's spacing scale).
marginLeft: drawerWidth: Pushes the content area to the right by the drawer's width (assumes a sidebar or navigation drawer).
width: calc(100% - drawerWidth): Dynamically adjusts the width to exclude the drawer's width.



Responsive Adjustments:
[theme.breakpoints.down('sm')]: {
    marginLeft: 0,
    width: '100%',
}
Breakpoints: Ensures the content is full-width on small screens (sm is the breakpoint for small devices).
marginLeft: 0: Removes the margin when the drawer collapses.
width: '100%': Ensures the content area occupies the full width.


How to Use These Styles

Example Component

import React from 'react';
import useStyles from './styles'; // The file with makeStyles

const MyComponent = () => {
    const classes = useStyles(); // Use the hook to get class names

    return (
        <div className={classes.root}>
            <div className={classes.toolbar} />
            <main className={classes.content}>
                <h1>Hello, World!</h1>
            </main>
        </div>
    );
};

export default MyComponent;



What Happens Here
The useStyles hook generates unique class names for each style.

The classes object provides those class names, which are then applied using the className attribute.

* 
* 
*/