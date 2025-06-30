import React, { createContext, useContext, useState, useEffect } from 'react'
import apiAuth from '../../api/apiAuth'

interface AuthContextType {
  isAuthenticated: boolean
  token: string | null
  user: any | null
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<any | null>(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken')
    if (storedToken) {
      setToken(storedToken)
    }
  }, [])

  useEffect(() => {
    if (token) {
      // Set up axios interceptor
      const interceptor = apiAuth.interceptors.request.use(
        config => {
          config.headers.Authorization = `Bearer ${token}`
          return config
        },
        error => {
          return Promise.reject(error)
        }
      )

      // Clean up interceptor on unmount or token change
      return () => {
        apiAuth.interceptors.request.eject(interceptor)
      }
    }
  }, [token])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiAuth.get('/usuario/me') // ajuste o endpoint se for diferente
        setUser(response.data) // deve conter nome, email etc
      } catch (error) {
        console.error('Erro ao buscar usuário', error)
        logout() // token inválido, remove do contexto
      }
    }

    if (token) {
      fetchUser()
    }
  }, [token])

  const login = (newToken: string) => {
    localStorage.setItem('jwtToken', newToken)
    setToken(newToken)
  }

  const logout = () => {
    localStorage.removeItem('jwtToken')
    setToken(null)
    setUser(null)
  }

  const value = {
    isAuthenticated: !!token,
    token,
    user,
    login,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
