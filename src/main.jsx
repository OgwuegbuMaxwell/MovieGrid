import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './components/App'
import { Provider } from 'react-redux';
import store from './app/store';


const theme = createTheme({});
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
    </Provider>
  </StrictMode>,
)


/**
Documentation

added ThemeProvider and createTheme
import { ThemeProvider, createTheme } from '@mui/material/styles';

This allow the theme we set of to work properly

* 
*/
