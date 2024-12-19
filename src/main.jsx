import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './components/App'


const theme = createTheme({});
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
  </StrictMode>,
)


/**
Documentation

added ThemeProvider and createTheme
import { ThemeProvider, createTheme } from '@mui/material/styles';

This allow the theme we set of to work properly

* 
*/
