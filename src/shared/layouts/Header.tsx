'use client'

import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  Grid,
  IconButton,
  Link,
  Toolbar,
  useMediaQuery,
  useTheme
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

type LogoClienteProps = {
  logo: string
}

const LogoCliente = ({ logo }: LogoClienteProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Link href="/">
      <Box
        component="img"
        src={logo}
        alt="Logo"
        sx={{
          width: isMobile ? 60 : 90,
          height: isMobile ? 60 : 90,
          borderRadius: '50%',
          objectFit: 'cover',
          cursor: 'pointer',
          marginTop: 1
        }}
      />
    </Link>
  )
}

const LoginButton = () => {
  const navigate = useNavigate()

  return (
    <Button color="inherit" size="large" onClick={() => navigate('/login')}>
      Login
    </Button>
  )
}

type HeaderProps = LogoClienteProps

const Header = (props: HeaderProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const DrawerMenu = (
    <Box
      sx={{ width: 150, p: 2 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <LoginButton />
    </Box>
  )

  return (
    <AppBar
      position="sticky"
      sx={{ zIndex: 100, boxShadow: '0 4px 6px rgba(0,0,0,0.4)' }}
    >
      <Toolbar
        disableGutters
        sx={{
          minHeight: isMobile ? 72 : 96
        }}
      >
        <Container maxWidth="lg">
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid>
              <LogoCliente {...props} />
            </Grid>

            <Grid>
              <Box
                sx={{
                  textAlign: 'center',
                  fontSize: isMobile ? 22 : 36
                }}
              >
                Gerenciador de Receitas
              </Box>
            </Grid>

            <Grid>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {isMobile ? (
                  <>
                    <IconButton color="inherit" onClick={toggleDrawer(true)}>
                      <MenuIcon />
                    </IconButton>
                    <Drawer
                      anchor="right"
                      open={drawerOpen}
                      onClose={toggleDrawer(false)}
                    >
                      {DrawerMenu}
                    </Drawer>
                  </>
                ) : isAuthenticated ? (
                  <>
                    <Box sx={{ mr: 2 }}>Olá, {user?.nome || 'Usuário'}</Box>
                    <Button color="inherit" size="large" onClick={handleLogout}>
                      Sair
                    </Button>
                  </>
                ) : (
                  <LoginButton />
                )}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  )
}

export default Header
