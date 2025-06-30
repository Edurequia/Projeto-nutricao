import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Link,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'))
  const navigate = useNavigate()

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        minHeight="50vh"
        px={2}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 20 }}
        >
          <Typography
            variant={isMobile ? 'h5' : isTablet ? 'h4' : 'h3'}
            textAlign="center"
            color="secondary.main"
          >
            Organize suas receitas de forma prática e rápida.
          </Typography>
        </Grid>

        <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
            <Card sx={{ p: 2, textAlign: 'center', boxShadow: 4 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="secondary.main">
                  Registre sua receita
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => navigate('/cadastrar')}
                >
                  Cadastrar
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
            <Card sx={{ p: 2, textAlign: 'center', boxShadow: 4 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="secondary.main">
                  Visualizar receitas
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={() => navigate('/listaReceitas')}
                >
                  Ver receitas
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Box
        component="footer"
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: isMobile ? 20 : 45
        }}
      >
        <Link
          component="button"
          variant="body2"
          onClick={() => console.info('Contato')}
          sx={{ mb: 1 }}
        >
          Entre em contato
        </Link>

        <Link
          component="button"
          variant="body2"
          onClick={() => console.info('Baixar ficha')}
        >
          Baixar ficha branca
        </Link>
      </Box>
    </>
  )
}

export default Home
