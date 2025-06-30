import { Delete } from '@mui/icons-material'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Stack,
  Typography
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Receita {
  id: number
  nomePreparacao: string
}

const API_BASE_URL = 'http://localhost:8080/preparacoes'

export const ListaReceitas = () => {
  const [receitas, setReceitas] = useState<Receita[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const [modalAberto, setModalAberto] = useState(false)
  const [receitaSelecionada, setReceitaSelecionada] = useState<Receita | null>(
    null
  )

  useEffect(() => {
    fetch(API_BASE_URL)
      .then(res => {
        if (!res.ok) throw new Error('Erro ao carregar receitas')
        return res.json()
      })
      .then(data => {
        setReceitas(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const handleDeletar = async (id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Erro ao excluir a receita')
      }

      setReceitas(prev => prev.filter(r => r.id !== id))
      setModalAberto(false)
      setReceitaSelecionada(null)
    } catch (err) {
      console.error(err)
      alert('Erro ao excluir a receita. Tente novamente.')
    }
  }

  const confirmarExclusao = (receita: Receita) => {
    setReceitaSelecionada(receita)
    setModalAberto(true)
  }

  const cancelarExclusao = () => {
    setModalAberto(false)
    setReceitaSelecionada(null)
  }

  if (loading) return <Typography>Carregando receitas...</Typography>
  if (error) return <Typography color="error">{error}</Typography>

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#fff'
      }}
    >
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          p: 2,
          maxWidth: 1300,
          mx: 'auto',
          width: '100%',
          boxSizing: 'border-box',
          '@media (max-width:600px)': {
            maxWidth: '100%',
            p: 1
          }
        }}
      >
        <Typography
          variant="h5"
          color="secondary"
          gutterBottom
          sx={{ textAlign: 'center' }}
        >
          Lista de receitas
        </Typography>
        {receitas.length === 0 ? (
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textAlign: 'center', mt: 4 }}
          >
            Nenhuma receita cadastrada.
          </Typography>
        ) : (
          <Stack spacing={2}>
            {receitas.map(receita => (
              <Paper
                key={receita.id}
                sx={{
                  p: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Typography>{receita.nomePreparacao}</Typography>

                <Box>
                  <Button
                    size="small"
                    sx={{ color: '#666', mr: 2 }}
                    onClick={() => navigate(`/receita/${receita.id}`)}
                  >
                    Visualizar
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => confirmarExclusao(receita)}
                    startIcon={<Delete />}
                  >
                    Excluir
                  </Button>
                </Box>
              </Paper>
            ))}
          </Stack>
        )}
      </Box>

      <Box
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'flex-end',
          maxWidth: 1300,
          mx: 'auto',
          width: '100%'
        }}
      >
        <Button variant="text" onClick={() => navigate('/pagina-inicial')}>
          Voltar
        </Button>
      </Box>

      <Dialog open={modalAberto} onClose={cancelarExclusao}>
        <DialogTitle>Confirmar exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja excluir a receita{' '}
            <strong>{receitaSelecionada?.nomePreparacao}</strong>? Essa ação não
            poderá ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelarExclusao} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={() => handleDeletar(receitaSelecionada!.id)}
            color="error"
            autoFocus
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ListaReceitas
