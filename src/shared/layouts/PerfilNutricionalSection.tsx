import React from 'react'
import { Grid, TextField, Typography } from '@mui/material'
import { InformacaoNutricional, IngredienteUsado } from './PaginaReceita'

interface PerfilNutricionalSectionProps {
  perfilNutricional: InformacaoNutricional[]
  ingredientes: IngredienteUsado[] // Adicionado para cálculo
  onNutritionalInfoChange: (
    index: number,
    field: keyof InformacaoNutricional,
    value: string
  ) => void
}

const PerfilNutricionalSection: React.FC<PerfilNutricionalSectionProps> = ({
  perfilNutricional,
  ingredientes,
  onNutritionalInfoChange
}) => {
  // Calcula totais considerando que os valores já estão por porção
  const calcularValoresTotais = () => {
    let totais = {
      proteinas: 0,
      carboidratos: 0,
      lipidios: 0,
      sodio: 0,
      gordSaturada: 0
    }

    perfilNutricional.forEach(nutriente => {
      totais.proteinas += parseFloat(nutriente.proteinas?.toString() || '0')
      totais.carboidratos += parseFloat(
        nutriente.carboidratos?.toString() || '0'
      )
      totais.lipidios += parseFloat(nutriente.lipidios?.toString() || '0')
      totais.sodio += parseFloat(nutriente.sodio?.toString() || '0')
      totais.gordSaturada += parseFloat(
        nutriente.gordSaturada?.toString() || '0'
      )
    })

    return totais
  }

  const calcularVCT = (
    proteinas: number,
    carboidratos: number,
    lipidios: number
  ) => {
    return proteinas * 4 + carboidratos * 4 + lipidios * 9
  }

  const totais = calcularValoresTotais()
  const vct = calcularVCT(
    totais.proteinas,
    totais.carboidratos,
    totais.lipidios
  )

  console.log('perfilNutricional: ', perfilNutricional)

  return (
    <>
      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
        Perfil nutricional
      </Typography>
      <Grid container spacing={1} alignItems="center">
        <Grid size={2}>
          <Typography variant="subtitle2">Ingrediente</Typography>
        </Grid>
        <Grid size={2}>
          <Typography variant="subtitle2">Per capita (PL)</Typography>
        </Grid>
        <Grid size={1}>
          <Typography variant="subtitle2">PTN (g)</Typography>
        </Grid>
        <Grid size={1}>
          <Typography variant="subtitle2">CHO (g)</Typography>
        </Grid>
        <Grid size={1}>
          <Typography variant="subtitle2">LIP (g)</Typography>
        </Grid>
        <Grid size={2}>
          <Typography variant="subtitle2">Sódio (mg)</Typography>
        </Grid>
        <Grid size={3}>
          <Typography variant="subtitle2">Gord. saturada (g)</Typography>
        </Grid>

        {perfilNutricional && perfilNutricional.length > 0 ? (
          perfilNutricional.map((nutriente, index) => (
            <React.Fragment key={`nutri-row-${index}`}>
              <Grid size={2}>
                <TextField
                  size="small"
                  fullWidth
                  value={nutriente.nome || ''}
                  onChange={e =>
                    onNutritionalInfoChange(index, 'nome', e.target.value)
                  }
                />
              </Grid>

              <Grid size={2}>
                <TextField
                  size="small"
                  fullWidth
                  value={nutriente.perCapta || ''}
                  onChange={e =>
                    onNutritionalInfoChange(index, 'perCapta', e.target.value)
                  }
                />
              </Grid>

              <Grid size={1}>
                <TextField
                  size="small"
                  fullWidth
                  type="number"
                  value={nutriente.proteinas || ''}
                  onChange={e =>
                    onNutritionalInfoChange(index, 'proteinas', e.target.value)
                  }
                />
              </Grid>

              <Grid size={1}>
                <TextField
                  size="small"
                  fullWidth
                  type="number"
                  value={nutriente.carboidratos || ''}
                  onChange={e =>
                    onNutritionalInfoChange(
                      index,
                      'carboidratos',
                      e.target.value
                    )
                  }
                />
              </Grid>

              <Grid size={1}>
                <TextField
                  size="small"
                  fullWidth
                  type="number"
                  value={nutriente.lipidios || ''}
                  onChange={e =>
                    onNutritionalInfoChange(index, 'lipidios', e.target.value)
                  }
                />
              </Grid>

              <Grid size={2}>
                <TextField
                  size="small"
                  fullWidth
                  type="number"
                  value={nutriente.sodio || ''}
                  onChange={e =>
                    onNutritionalInfoChange(index, 'sodio', e.target.value)
                  }
                />
              </Grid>

              <Grid size={3}>
                <TextField
                  size="small"
                  fullWidth
                  type="number"
                  value={nutriente.gordSaturada || ''}
                  onChange={e =>
                    onNutritionalInfoChange(
                      index,
                      'gordSaturada',
                      e.target.value
                    )
                  }
                />
              </Grid>
            </React.Fragment>
          ))
        ) : (
          <Grid size={12}>
            <Typography variant="body2" color="text.secondary">
              Nenhuma informação nutricional disponível.
            </Typography>
          </Grid>
        )}

        <Grid size={8}>
          <Typography>
            <Typography variant="subtitle2">Total</Typography>
            PTN: {totais.proteinas.toFixed(2)}g | CHO:{' '}
            {totais.carboidratos.toFixed(2)}g | LIP:{' '}
            {totais.lipidios.toFixed(2)}g | Sódio: {totais.sodio.toFixed(2)}mg |
            Gord. Sat.: {totais.gordSaturada.toFixed(2)}g
          </Typography>
        </Grid>

        <Grid size={10}>
          <Typography variant="subtitle2">
            VCT: {vct.toFixed(2)} kcal
          </Typography>
        </Grid>
      </Grid>
    </>
  )
}

export default PerfilNutricionalSection
