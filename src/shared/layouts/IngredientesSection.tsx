import React, { useEffect, useState, useRef } from 'react'
import {
  Grid,
  TextField,
  Typography,
  Autocomplete,
  Box,
  Button
} from '@mui/material'
import { Ingrediente, IngredienteUsado } from './PaginaReceita'
import { Add } from '@mui/icons-material'

interface IngredientesSectionProps {
  ingredientes: IngredienteUsado[]
  onIngredientChange: (
    index: number,
    field: keyof IngredienteUsado | 'nome',
    value: string
  ) => void
  onAddIngrediente: () => void
}

const IngredientesSection: React.FC<IngredientesSectionProps> = ({
  ingredientes,
  onIngredientChange,
  onAddIngrediente
}) => {
  const [options, setOptions] = useState<Ingrediente[]>([])
  const [inputValue, setInputValue] = useState('')
  const abortControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (!inputValue) return

    // Aborta busca anterior
    abortControllerRef.current?.abort()
    const controller = new AbortController()
    abortControllerRef.current = controller

    fetch(
      `http://localhost:8080/ingredientes/buscarPorNome?nome=${encodeURIComponent(
        inputValue
      )}`,
      {
        signal: controller.signal
      }
    )
      .then(res => res.json())
      .then((data: Ingrediente[]) => {
        setOptions(data)
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          console.error('Erro ao buscar ingredientes:', err)
        }
      })

    return () => controller.abort()
  }, [inputValue])

  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
          Ingredientes
        </Typography>
      </Grid>

      <Grid size={3}>
        <Typography variant="subtitle2">Ingrediente</Typography>
      </Grid>
      <Grid size={2}>
        <Typography variant="subtitle2">Medida caseira</Typography>
      </Grid>
      <Grid size={1}>
        <Typography variant="subtitle2">PB</Typography>
      </Grid>
      <Grid size={1}>
        <Typography variant="subtitle2">PL</Typography>
      </Grid>
      <Grid size={1}>
        <Typography variant="subtitle2">FC</Typography>
      </Grid>
      <Grid size={2}>
        <Typography variant="subtitle2">Custo compra</Typography>
      </Grid>
      <Grid size={2}>
        <Typography variant="subtitle2">Custo</Typography>
      </Grid>

      {ingredientes && ingredientes.length > 0 ? (
        ingredientes.map((ingrediente, index) => (
          <React.Fragment key={index}>
            <Grid size={3}>
              <Autocomplete
                options={options}
                getOptionLabel={option => option.nome}
                value={
                  ingrediente.ingrediente?.id
                    ? options.find(
                        opt => opt.id === ingrediente.ingrediente?.id
                      ) ?? {
                        id: ingrediente.ingrediente?.id,
                        nome: ingrediente.ingrediente?.nome ?? ''
                      }
                    : null
                }
                onChange={(_, newValue) =>
                  onIngredientChange(index, 'nome', newValue?.nome ?? '')
                }
                onInputChange={(_, newInputValue) => {
                  setInputValue(newInputValue)
                  onIngredientChange(index, 'nome', newInputValue)
                }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Ingrediente"
                    size="small"
                    fullWidth
                  />
                )}
                noOptionsText="Nenhum ingrediente encontrado"
              />
            </Grid>
            <Grid size={2}>
              <TextField
                size="small"
                fullWidth
                value={ingrediente.medidaCaseira ?? ''}
                onChange={e =>
                  onIngredientChange(index, 'medidaCaseira', e.target.value)
                }
              />
            </Grid>
            <Grid size={1}>
              <TextField
                size="small"
                fullWidth
                value={ingrediente.pesoBruto ?? ''}
                onChange={e =>
                  onIngredientChange(index, 'pesoBruto', e.target.value)
                }
              />
            </Grid>
            <Grid size={1}>
              <TextField
                size="small"
                fullWidth
                value={ingrediente.pesoLiquido ?? ''}
                onChange={e =>
                  onIngredientChange(index, 'pesoLiquido', e.target.value)
                }
              />
            </Grid>
            <Grid size={1}>
              <TextField
                size="small"
                fullWidth
                value={ingrediente.fatorCoccao ?? ''}
                onChange={e =>
                  onIngredientChange(index, 'fatorCoccao', e.target.value)
                }
              />
            </Grid>
            <Grid size={2}>
              <TextField
                size="small"
                fullWidth
                value={ingrediente.custoCompra ?? ''}
                onChange={e =>
                  onIngredientChange(index, 'custoCompra', e.target.value)
                }
              />
            </Grid>
            <Grid size={2}>
              <TextField
                size="small"
                fullWidth
                value={ingrediente.custoUso ?? ''}
                onChange={e =>
                  onIngredientChange(index, 'custoUso', e.target.value)
                }
              />
            </Grid>
          </React.Fragment>
        ))
      ) : (
        <Grid size={12}>
          <Typography variant="body2" color="textSecondary">
            Nenhum ingrediente adicionado.
          </Typography>
        </Grid>
      )}

      <Grid size={12}>
        <Box mt={1}>
          <Button startIcon={<Add />} onClick={onAddIngrediente}>
            Adicionar ingrediente
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default IngredientesSection
