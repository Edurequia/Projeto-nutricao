import React from 'react'
import {
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography
} from '@mui/material'
import { Add, Delete } from '@mui/icons-material'

interface EquipamentosSectionProps {
  equipamentosUtilizados: string[]
  onEquipmentUsedChange: (equipamentos: string[]) => void
}

const EquipamentosSection: React.FC<EquipamentosSectionProps> = ({
  equipamentosUtilizados,
  onEquipmentUsedChange
}) => {
  const handleAdd = () => {
    onEquipmentUsedChange([...equipamentosUtilizados, ''])
  }

  const handleChange = (index: number, value: string) => {
    const updated = [...equipamentosUtilizados]
    updated[index] = value
    onEquipmentUsedChange(updated)
  }

  const handleRemove = (index: number) => {
    const updated = [...equipamentosUtilizados]
    updated.splice(index, 1)
    onEquipmentUsedChange(updated)
  }

  return (
    <>
      <Grid size={12}>
        <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
          Equipamentos e utensílios utilizados
        </Typography>

        <List dense>
          {equipamentosUtilizados.length > 0 ? (
            equipamentosUtilizados.map((item, index) => (
              <ListItem
                key={`${item}-${index}`}
                disablePadding
                secondaryAction={
                  <IconButton edge="end" onClick={() => handleRemove(index)}>
                    <Delete />
                  </IconButton>
                }
              >
                <TextField
                  fullWidth
                  size="small"
                  value={item}
                  onChange={e => handleChange(index, e.target.value)}
                />
              </ListItem>
            ))
          ) : (
            <ListItem disablePadding>
              <ListItemText primary="Nenhum equipamento/utensílio adicionado." />
            </ListItem>
          )}
        </List>

        <Button startIcon={<Add />} onClick={handleAdd} sx={{ mt: 1 }}>
          Adicionar Equipamento
        </Button>
      </Grid>
    </>
  )
}

export default EquipamentosSection
