import { Button, Grid, TextField, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiAuth from "../../api/apiAuth";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiAuth.post('/auth/login', { email, password });
      const token = response.data.token;
      localStorage.setItem('jwtToken', token);
      navigate('/pagina-inicial');
    } catch (err: any) {
      console.error("Erro no login:", err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.status === 401) {
        setError("Credenciais inválidas. Verifique seu email e senha.");
      } else {
        setError("Ocorreu um erro. Tente novamente mais tarde.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCadastro = () => {
    navigate("/cadastro");
  };

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{
      minHeight: '100vh',
    }} >
      <Grid size={{ xs: 12, sm: 8, md: 6 }}>
        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: 4,
            border: '1px solid #ddd',
            borderRadius: 3,
            boxShadow: 2,
            backgroundColor: 'background.paper',
            maxWidth: 550,
            gap: 2,
            margin: 'auto',
          }}
        >
          <Typography textAlign='center' variant="h4" component="h1" color="secondary.main">
            Login
          </Typography>
          <TextField
            variant="standard"
            fullWidth
            type="email"
            label="Email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            variant="standard"
            fullWidth
            type="password"
            label="Senha"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          {error && (
            <Typography color="error" textAlign="center" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <Grid sx={{ mb: 2 }}>
            <Typography
              variant="subtitle1"
              textAlign='center'
              sx={{
                textDecoration: 'none',
                color: 'primary.main',
                cursor: 'pointer',
              }}
              onClick={handleCadastro}
            >
              Novo aqui? Cadastre-se
            </Typography>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;