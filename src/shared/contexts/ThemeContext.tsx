import { useCallback, useContext, useMemo, useState } from 'react'
import { createContext } from 'react' // Corrected import
import { DarkTheme, LigthTheme } from '../themes'
import { Grid, ThemeProvider } from '@mui/system'

interface ThemeContextData {
  themeName: 'light' | 'dark'
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextData | undefined>(undefined)

export const useAppThemeContext = () => {
  return useContext(ThemeContext)
}

interface AppThemeProviderProps {
  children: React.ReactNode
}

export const AppThemeProvider: React.FC<AppThemeProviderProps> = ({
  children
}) => {
  const [themeName, setThemeName] = useState<'light' | 'dark'>('light')

  const toggleTheme = useCallback(() => {
    setThemeName(oldThemeName => (oldThemeName === 'light' ? 'dark' : 'light'))
  }, [])

  const theme = useMemo(() => {
    if (themeName === 'light') return LigthTheme
    return DarkTheme
  }, [themeName])

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <Grid
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: theme.palette.background.default,
            margin: 0,
            padding: 0
          }}
        >
          {children}
        </Grid>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
