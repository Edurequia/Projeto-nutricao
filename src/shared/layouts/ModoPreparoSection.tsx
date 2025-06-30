import React from 'react'
import { Grid, TextField, Typography } from '@mui/material'

interface ModoPreparoSectionProps {
  modoPreparo: string
  onModoPreparoChange: (value: string) => void
}

const ModoPreparoSection: React.FC<ModoPreparoSectionProps> = ({
  modoPreparo,
  onModoPreparoChange
}) => {
  return (
    <>
      <Grid container size={12}>
        <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
          Modo de preparo
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={modoPreparo}
          onChange={e => onModoPreparoChange(e.target.value)}
        />
      </Grid>
    </>
  )
}

export default ModoPreparoSection
