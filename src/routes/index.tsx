import { Routes, Route, Navigate } from 'react-router-dom'
import { useAppThemeContext } from '../shared/contexts'
import Login from '../shared/layouts/Login'
import Header from '../shared/layouts/Header'
import Home from '../shared/layouts/Home'
import { CadastroPreparacao } from '../shared/layouts/CadastroPreparacao'
import { ListaReceitas } from '../shared/layouts/ListaReceitas'
import ReceitaView from '../shared/layouts/ReceitaView'
import PaginaReceita from '../shared/layouts/PaginaReceita'
import PrivateRoute from '../shared/layouts/PrivateRoute'

export const AppRoutes = () => {
  const themeContext = useAppThemeContext()

  if (!themeContext) {
    return (
      <div>
        Error: Theme context is missing. Please ensure AppThemeProvider is
        wrapping your app.
      </div>
    )
  }

  const logo = '../images/logo.png'

  const { toggleTheme } = themeContext

  return (
    <>
      <Header logo={logo} />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/pagina-inicial" element={<Home />} />

        <Route
          path="/cadastrar"
          element={
            <PrivateRoute>
              <CadastroPreparacao />
            </PrivateRoute>
          }
        />
        <Route
          path="/listaReceitas"
          element={
            <PrivateRoute>
              <ListaReceitas />
            </PrivateRoute>
          }
        />

        <Route
          path="/receita/:id"
          element={
            <PrivateRoute>
              <PaginaReceita />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/pagina-inicial" />} />
      </Routes>
    </>
  )
}
