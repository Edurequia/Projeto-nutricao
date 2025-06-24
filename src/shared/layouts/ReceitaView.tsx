import { Box, Button, Container, Grid, List, ListItem, ListItemText, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

interface Ingrediente {
  nome: string;
  medidaCaseira: string;
  pb: string;
  pl: string;
  fc: string;
  custo1: string;
  custo2: string;
}

interface InformacaoNutricional {
  nome: string;
  perCapitaPL: string;
  ptn: string;
  cho: string;
  lip: string;
  sodio: string;
  gorduraSaturada: string;
}

interface ReceitaViewProps {
  nomeReceita?: string;
  categoria?: string;
  ingredientes?: Ingrediente[];
  equipamentosUtilizados?: string[];
  modoPreparo?: string;
  custoTotal?: string;
  tempoPreparo?: string;
  custoPorPorcao?: string;
  pesoPorcao?: string;
  numeroPorcoes?: string;
  fcc?: string;
  perfilNutricional?: InformacaoNutricional[];
  onNomeReceitaChange?: (value: string) => void;
  onCategoriaChange?: (value: string) => void;
  onModoPreparoChange?: (value: string) => void;
  onCustoTotalChange?: (value: string) => void;
  onTempoPreparoChange?: (value: string) => void;
  onCustoPorPorcaoChange?: (value: string) => void;
  onPesoPorcaoChange?: (value: string) => void;
  onNumeroPorcoesChange?: (value: string) => void;
  onFccChange?: (value: string) => void;

  onIngredientChange?: (index: number, field: keyof Ingrediente, value: string) => void;
  onNutritionalInfoChange?: (index: number, field: keyof InformacaoNutricional, value: string) => void;
  onEquipmentUsedChange?: (index: number, value: string) => void;

  onVoltarClick?: () => void;
  onEditarClick?: () => void;
}

export const ReceitaView: React.FC<ReceitaViewProps> = ({
  nomeReceita = "",
  categoria = "",
  ingredientes = [],
  equipamentosUtilizados = [],
  modoPreparo = "",
  custoTotal = "",
  tempoPreparo = "",
  custoPorPorcao = "",
  pesoPorcao = "",
  numeroPorcoes = "",
  fcc = "",
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
}) => {

  const navigate = useNavigate();

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
                onChange={(e) => onNomeReceitaChange && onNomeReceitaChange(e.target.value)}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                label="Categoria"
                fullWidth
                variant="outlined"
                size="small"
                value={categoria}
                onChange={(e) => onCategoriaChange && onCategoriaChange(e.target.value)}
              />
            </Grid>

            <Grid size={12}>
              <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                Ingredientes
              </Typography>
              <Grid container spacing={1} alignItems="center">
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
                  <Typography variant="subtitle2">Custo</Typography>
                </Grid>
                <Grid size={2}>
                  <Typography variant="subtitle2">Custo</Typography>
                </Grid>

                {ingredientes && ingredientes.length > 0 ? (
                  ingredientes.map((ingrediente, index) => (
                    <React.Fragment key={index}>
                      <Grid size={3}>
                        <TextField
                          size="small"
                          fullWidth
                          value={ingrediente.nome || ''}
                          onChange={(e) => onIngredientChange && onIngredientChange(index, 'nome', e.target.value)}
                        />
                      </Grid>
                      <Grid size={2}>
                        <TextField
                          size="small"
                          fullWidth
                          value={ingrediente.medidaCaseira || ''}
                          onChange={(e) => onIngredientChange && onIngredientChange(index, 'medidaCaseira', e.target.value)}
                        />
                      </Grid>
                      <Grid size={1}>
                        <TextField
                          size="small"
                          fullWidth
                          value={ingrediente.pb || ''}
                          onChange={(e) => onIngredientChange && onIngredientChange(index, 'pb', e.target.value)}
                        />
                      </Grid>
                      <Grid size={1}>
                        <TextField
                          size="small"
                          fullWidth
                          value={ingrediente.pl || ''}
                          onChange={(e) => onIngredientChange && onIngredientChange(index, 'pl', e.target.value)}
                        />
                      </Grid>
                      <Grid size={1}>
                        <TextField
                          size="small"
                          fullWidth
                          value={ingrediente.fc || ''}
                          onChange={(e) => onIngredientChange && onIngredientChange(index, 'fc', e.target.value)}
                        />
                      </Grid>
                      <Grid size={2}>
                        <TextField
                          size="small"
                          fullWidth
                          value={ingrediente.custo1 || ''}
                          onChange={(e) => onIngredientChange && onIngredientChange(index, 'custo1', e.target.value)}
                        />
                      </Grid>
                      <Grid size={2}>
                        <TextField
                          size="small"
                          fullWidth
                          value={ingrediente.custo2 || ''}
                          onChange={(e) => onIngredientChange && onIngredientChange(index, 'custo2', e.target.value)}
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
              </Grid>
            </Grid>

            <Grid size={12}>
              <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                Equipamentos e utensílios utilizados
              </Typography>
              <List dense>
                {equipamentosUtilizados && equipamentosUtilizados.length > 0 ? (
                  equipamentosUtilizados.map((item, index) => (
                    <ListItem disablePadding key={index}>
                      <TextField
                        fullWidth
                        size="small"
                        value={item || ''}
                        onChange={(e) => onEquipmentUsedChange && onEquipmentUsedChange(index, e.target.value)}
                      />
                    </ListItem>
                  ))
                ) : (
                  <ListItem disablePadding>
                    <ListItemText primary="Nenhum equipamento/utensílio adicionado." />
                  </ListItem>
                )}
              </List>
            </Grid>

            <Grid size={12}>
              <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                Modo de preparo
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                value={modoPreparo}
                onChange={(e) => onModoPreparoChange && onModoPreparoChange(e.target.value)}
              />
            </Grid>

            <Grid size={12}>
              <Grid container spacing={2}>
                <Grid size={6}>
                  <TextField
                    label="Custo total:"
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={custoTotal}
                    onChange={(e) => onCustoTotalChange && onCustoTotalChange(e.target.value)}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    label="Tempo de preparo:"
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={tempoPreparo}
                    onChange={(e) => onTempoPreparoChange && onTempoPreparoChange(e.target.value)}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    label="Custo per capita:"
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={custoPorPorcao}
                    onChange={(e) => onCustoPorPorcaoChange && onCustoPorPorcaoChange(e.target.value)}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    label="Peso da porção:"
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={pesoPorcao}
                    onChange={(e) => onPesoPorcaoChange && onPesoPorcaoChange(e.target.value)}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    label="N° porções:"
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={numeroPorcoes}
                    onChange={(e) => onNumeroPorcoesChange && onNumeroPorcoesChange(e.target.value)}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    label="FCC:"
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={fcc}
                    onChange={(e) => onFccChange && onFccChange(e.target.value)}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid size={12}>
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
                  <Typography variant="subtitle2">PTN</Typography>
                </Grid>
                <Grid size={1}>
                  <Typography variant="subtitle2">CHO</Typography>
                </Grid>
                <Grid size={1}>
                  <Typography variant="subtitle2">LIP</Typography>
                </Grid>
                <Grid size={2}>
                  <Typography variant="subtitle2">Sódio</Typography>
                </Grid>
                <Grid size={3}>
                  <Typography variant="subtitle2">Gordura saturada</Typography>
                </Grid>

                {perfilNutricional && perfilNutricional.length > 0 ? (
                  perfilNutricional.map((nutriente, index) => (
                    <React.Fragment key={`nutri-row-${index}`}>
                      <Grid size={2}>
                        <TextField
                          size="small"
                          fullWidth
                          value={nutriente.nome || ''}
                          onChange={(e) => onNutritionalInfoChange && onNutritionalInfoChange(index, 'nome', e.target.value)}
                        />
                      </Grid>
                      <Grid size={2}>
                        <TextField
                          size="small"
                          fullWidth
                          value={nutriente.perCapitaPL || ''}
                          onChange={(e) => onNutritionalInfoChange && onNutritionalInfoChange(index, 'perCapitaPL', e.target.value)}
                        />
                      </Grid>
                      <Grid size={1}>
                        <TextField
                          size="small"
                          fullWidth
                          value={nutriente.ptn || ''}
                          onChange={(e) => onNutritionalInfoChange && onNutritionalInfoChange(index, 'ptn', e.target.value)}
                        />
                      </Grid>
                      <Grid size={1}>
                        <TextField
                          size="small"
                          fullWidth
                          value={nutriente.cho || ''}
                          onChange={(e) => onNutritionalInfoChange && onNutritionalInfoChange(index, 'cho', e.target.value)}
                        />
                      </Grid>
                      <Grid size={1}>
                        <TextField
                          size="small"
                          fullWidth
                          value={nutriente.lip || ''}
                          onChange={(e) => onNutritionalInfoChange && onNutritionalInfoChange(index, 'lip', e.target.value)}
                        />
                      </Grid>
                      <Grid size={2}>
                        <TextField
                          size="small"
                          fullWidth
                          value={nutriente.sodio || ''}
                          onChange={(e) => onNutritionalInfoChange && onNutritionalInfoChange(index, 'sodio', e.target.value)}
                        />
                      </Grid>
                      <Grid size={3}>
                        <TextField
                          size="small"
                          fullWidth
                          value={nutriente.gorduraSaturada || ''}
                          onChange={(e) => onNutritionalInfoChange && onNutritionalInfoChange(index, 'gorduraSaturada', e.target.value)}
                        />
                      </Grid>
                    </React.Fragment>
                  ))
                ) : (
                  <Grid size={12}>
                    <Typography variant="body2" color="textSecondary">
                      Nenhuma informação nutricional disponível.
                    </Typography>
                  </Grid>
                )}

                <Grid size={2}>
                  <Typography variant="subtitle2">Total</Typography>
                </Grid>
                <Grid size={10}>
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    (Valor Total Calculado)
                  </Typography>
                </Grid>

                <Grid size={2}>
                  <Typography variant="subtitle2">VCT</Typography>
                </Grid>
                <Grid size={10}>
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    (Valor Calórico Total)
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid size={12} sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button sx={{ mr: 2 }} onClick={onVoltarClick || (() => navigate("/listaReceitas"))}>
                Voltar
              </Button>
              <Button variant="contained" color="primary" onClick={onEditarClick}>
                Salvar
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default ReceitaView;