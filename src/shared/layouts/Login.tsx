import { Button, Grid, TextField, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
    
    const backgroundImageUrl =  isMobile ? "../images/background.jpeg" : "../images/background.jpeg";

    return (
        <Grid container justifyContent="center" alignItems="center" sx={{
            minHeight: '100vh',
            backgroundImage: `url(${backgroundImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }} >
          <Grid size={{xs: 12, sm: 8, md:6}}>
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
                sx={{mb: 2}}
              />
              <TextField
                variant="standard"
                fullWidth
                type="password"
                label="Senha"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{mb: 2}}
              />
              <Grid sx={{mb: 2}}>
                <Typography
                    variant="subtitle1"
                    textAlign='center'
                    sx={{
                        textDecoration: 'none',
                        color: 'primary.main',
                        cursor: 'pointer',
                    }}
                >
                    Novo aqui? Cadastre-se
                </Typography>
              </Grid>
              <Button variant="contained" color="primary" fullWidth size="large">
                Entrar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      );
  };

export default Login;