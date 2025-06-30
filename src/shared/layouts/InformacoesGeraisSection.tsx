import React from 'react'
import { Grid, TextField } from '@mui/material'

interface InformacoesGeraisSectionProps {
  custoTotal: string
  tempoPreparo: string
  custoPorPorcao: string
  pesoPorcao: string
  numeroPorcoes: string
  fcc: string
  onCustoTotalChange: (value: string) => void
  onTempoPreparoChange: (value: string) => void
  onCustoPorPorcaoChange: (value: string) => void
  onPesoPorcaoChange: (value: string) => void
  onNumeroPorcoesChange: (value: string) => void
  onFccChange: (value: string) => void
}

const InformacoesGeraisSection: React.FC<InformacoesGeraisSectionProps> = ({
  custoTotal,
  tempoPreparo,
  custoPorPorcao,
  pesoPorcao,
  numeroPorcoes,
  fcc,
  onCustoTotalChange,
  onTempoPreparoChange,
  onCustoPorPorcaoChange,
  onPesoPorcaoChange,
  onNumeroPorcoesChange,
  onFccChange
}) => {
  return (
    <Grid container spacing={2}>
      <Grid size={6}>
        <TextField
          label="Custo total:"
          fullWidth
          variant="outlined"
          size="small"
          value={custoTotal}
          onChange={e => onCustoTotalChange(e.target.value)}
        />
      </Grid>
      <Grid size={6}>
        <TextField
          label="Tempo de preparo:"
          fullWidth
          variant="outlined"
          size="small"
          value={tempoPreparo}
          onChange={e => onTempoPreparoChange(e.target.value)}
        />
      </Grid>
      <Grid size={6}>
        <TextField
          label="Custo per capita:"
          fullWidth
          variant="outlined"
          size="small"
          value={custoPorPorcao}
          onChange={e => onCustoPorPorcaoChange(e.target.value)}
        />
      </Grid>
      <Grid size={6}>
        <TextField
          label="Peso da porção:"
          fullWidth
          variant="outlined"
          size="small"
          value={pesoPorcao}
          onChange={e => onPesoPorcaoChange(e.target.value)}
        />
      </Grid>
      <Grid size={6}>
        <TextField
          label="N° porções:"
          fullWidth
          variant="outlined"
          size="small"
          value={numeroPorcoes}
          onChange={e => onNumeroPorcoesChange(e.target.value)}
        />
      </Grid>
      <Grid size={6}>
        <TextField
          label="FCC:"
          fullWidth
          variant="outlined"
          size="small"
          value={fcc}
          onChange={e => onFccChange(e.target.value)}
        />
      </Grid>
    </Grid>
  )
}

export default InformacoesGeraisSection
