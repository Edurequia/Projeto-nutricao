import { Button, Grid, TextField, Typography, Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import apiAuth from '../../api/apiAuth'
import { useAuth } from '../contexts/AuthContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const { user } = useAuth()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      navigate('/pagina-inicial', { replace: true })
    }
  }, [user, navigate])

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await apiAuth.post('/auth/login', {
        login: email,
        password
      })
      const token = response.data.token
      login(token)

      const from = location.state?.from?.pathname || '/pagina-inicial'
      navigate(from, { replace: true })
    } catch (err: any) {
      console.error('Erro no login:', err)
      if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else if (err.response?.status === 401) {
        setError('Credenciais inválidas. Verifique seu email e senha.')
      } else {
        setError('Ocorreu um erro. Tente novamente mais tarde.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Box
        width={{ xs: '100%', sm: '80%', md: '60%' }}
        maxWidth={550}
        mx="auto"
        px={2}
      >
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: 4,
            border: '1px solid #ddd',
            borderRadius: 3,
            boxShadow: 2,
            backgroundColor: 'background.paper',
            gap: 2
          }}
          noValidate
          autoComplete="off"
        >
          <Typography
            textAlign="center"
            variant="h4"
            component="h1"
            color="secondary.main"
          >
            Login
          </Typography>
          <TextField
            variant="standard"
            fullWidth
            type="email"
            label="Email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            error={!!error && !email}
            helperText={
              !email && error === 'O campo Email é obrigatório.' ? error : ''
            }
            sx={{ mb: 2 }}
          />
          <TextField
            variant="standard"
            fullWidth
            type="password"
            label="Senha"
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            error={!!error && !password}
            helperText={
              !password && error === 'O campo Senha é obrigatório.' ? error : ''
            }
            sx={{ mb: 2 }}
          />
          {error &&
            !(!email && error === 'O campo Email é obrigatório.') &&
            !(!password && error === 'O campo Senha é obrigatório.') && (
              <Typography color="error" textAlign="center" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Login
