import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography
} from '@mui/material'
import {
  InformacaoNutricional,
  Ingrediente,
  IngredienteUsado
} from './PaginaReceita'
import IngredientesSection from './IngredientesSection'
import EquipamentosSection from './EquipamentosSection'
import ModoPreparoSection from './ModoPreparoSection'
import InformacoesGeraisSection from './InformacoesGeraisSection'
import PerfilNutricionalSection from './PerfilNutricionalSection'

interface ReceitaViewProps {
  nomeReceita: string
  categoria: string
  ingredientes: IngredienteUsado[]
  equipamentosUtilizados: string[]
  modoPreparo: string
  custoTotal: string
  tempoPreparo: string
  custoPorPorcao: string
  pesoPorcao: string
  numeroPorcoes: string
  fcc: string
  perfilNutricional: InformacaoNutricional[]

  // Handlers para campos simples
  onNomeReceitaChange: (value: string) => void
  onCategoriaChange: (value: string) => void
  onModoPreparoChange: (value: string) => void
  onCustoTotalChange: (value: string) => void
  onTempoPreparoChange: (value: string) => void
  onCustoPorPorcaoChange: (value: string) => void
  onPesoPorcaoChange: (value: string) => void
  onNumeroPorcoesChange: (value: string) => void
  onFccChange: (value: string) => void

  // Handlers para ingredientes
  onIngredientChange: (
    index: number,
    field: keyof IngredienteUsado | 'nome',
    value: string
  ) => void
  onAddIngredient: () => void
  onRemoveIngredient: (index: number) => void

  // Handlers para informações nutricionais
  onNutritionalInfoChange: (
    index: number,
    field: keyof InformacaoNutricional,
    value: string
  ) => void

  // Handlers para equipamentos
  onEquipmentUsedChange: (equipamentos: string[]) => void

  // Ações
  onVoltarClick: () => void
  onEditarClick: () => void

  // Controle de edição
  isEditing?: boolean
  onAddIngrediente: () => void
}

export const ReceitaView: React.FC<ReceitaViewProps> = ({
  nomeReceita = '',
  categoria = '',
  ingredientes = [],
  equipamentosUtilizados = [],
  modoPreparo = '',
  custoTotal = '',
  tempoPreparo = '',
  custoPorPorcao = '',
  pesoPorcao = '',
  numeroPorcoes = '',
  fcc = '',
  perfilNutricional = [],
  // Handlers
  onNomeReceitaChange,
  onCategoriaChange,
  onModoPreparoChange,
  onCustoTotalChange,
  onTempoPreparoChange,
  onCustoPorPorcaoChange,
  onPesoPorcaoChange,
  onNumeroPorcoesChange,
  onFccChange,
  onIngredientChange,
  onNutritionalInfoChange,
  onEquipmentUsedChange,
  onVoltarClick,
  onEditarClick,
  isEditing = true,
  onAddIngrediente
}) => {
  const navigate = useNavigate()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container component="main" maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Grid container spacing={3}>
            <Grid size={12}>
              <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                Nome da preparação
              </Typography>
              <TextField
                label="Nome da preparação"
                fullWidth
                variant="outlined"
                size="small"
                value={nomeReceita}
                onChange={e => onNomeReceitaChange(e.target.value)}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                label="Categoria"
                fullWidth
                variant="outlined"
                size="small"
                value={categoria}
                onChange={e => onCategoriaChange(e.target.value)}
              />
            </Grid>

            <IngredientesSection
              ingredientes={ingredientes}
              onIngredientChange={onIngredientChange}
              onAddIngrediente={onAddIngrediente}
            />

            <EquipamentosSection
              equipamentosUtilizados={equipamentosUtilizados}
              onEquipmentUsedChange={onEquipmentUsedChange}
            />

            <ModoPreparoSection
              modoPreparo={modoPreparo}
              onModoPreparoChange={onModoPreparoChange}
            />

            <InformacoesGeraisSection
              custoTotal={custoTotal}
              tempoPreparo={tempoPreparo}
              custoPorPorcao={custoPorPorcao}
              pesoPorcao={pesoPorcao}
              numeroPorcoes={numeroPorcoes}
              fcc={fcc}
              onCustoTotalChange={onCustoTotalChange}
              onTempoPreparoChange={onTempoPreparoChange}
              onCustoPorPorcaoChange={onCustoPorPorcaoChange}
              onPesoPorcaoChange={onPesoPorcaoChange}
              onNumeroPorcoesChange={onNumeroPorcoesChange}
              onFccChange={onFccChange}
            />

            <PerfilNutricionalSection
              perfilNutricional={perfilNutricional}
              onNutritionalInfoChange={onNutritionalInfoChange}
              ingredientes={ingredientes}
            />

            <Grid
              size={12}
              sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}
            >
              <Button
                sx={{ mr: 2 }}
                onClick={onVoltarClick || (() => navigate('/listaReceitas'))}
              >
                Voltar
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={onEditarClick}
              >
                Editar
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  )
}

export default ReceitaView
