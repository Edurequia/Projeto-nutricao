import { Button, Grid } from '@mui/material'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAppThemeContext } from '../shared/contexts'
import Login from '../shared/layouts/Login';


export const AppRoutes = () => {
  const themeContext = useAppThemeContext();

  if (!themeContext) {
    return <div>Error: Theme context is missing. Please ensure AppThemeProvider is wrapping your app.</div>;
  }

  const { toggleTheme } = themeContext;

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="pagina-inicial" element={<Button variant='contained' color='primary' onClick={toggleTheme}>Botão</Button>} />

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  )
}
