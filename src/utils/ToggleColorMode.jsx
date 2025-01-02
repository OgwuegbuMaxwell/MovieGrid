import { useState, useMemo, createContext}from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'

export const ColorModeContext = createContext();

const ToggleColorMode = ( {children} ) => {

    const [mode, setMode] = useState(() => {
        return localStorage.getItem('themeMode') || 'light'
    });

    const toggleColorMode = () => {
        // setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
        setMode((prevMode) => {
            const newMode = prevMode === 'light' ? 'dark' : 'light'
            localStorage.setItem('themeMode', newMode)
            return newMode;
        })
    }

    const theme = useMemo(() => createTheme({
        palette: {
            mode,
        }
    }), [mode])

  return (
    <ColorModeContext.Provider value={{mode, setMode, toggleColorMode}}>
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default ToggleColorMode