import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  IconButton,
  Autocomplete
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface Ingrediente {
  id: string;
  nome: string;
}

export const CadastroPreparacao = () => {
  const [options, setOptions] = useState<Ingrediente[]>([]);
  const [ingredientes, setIngredientes] = useState<Array<{
    id: string | null;
    nome: string;
    medidaCaseira: string;
    pb: string;
    pl: string;
    fc: string;
    pesoCompra: string;
    custoCompra: string;
    custoUsado: string;
  }>>([
    { id: null, nome: "", medidaCaseira: "", pb: "", pl: "", fc: "", pesoCompra: "", custoCompra: "", custoUsado: "" }
  ]);

  const [sobrouAgua, setSobrouAgua] = useState("Sim");

  const handleIngredienteChange = (index: number, newValue: Ingrediente | null) => {
    const novaLista = [...ingredientes];
    if (newValue) {
      novaLista[index] = {
        ...novaLista[index],
        nome: newValue.nome,
        id: newValue.id,
      };
    } else {
      novaLista[index] = {
        ...novaLista[index],
        nome: "",
        id: null,
      };
    }
    setIngredientes(novaLista);
  };

  const handleAddIngrediente = () => {
    setIngredientes([
      ...ingredientes,
      { id: "", nome: "", medidaCaseira: "", pb: "", pl: "", fc: "", pesoCompra: "", custoCompra: "", custoUsado: "" }
    ]);
  };

  const navigate = useNavigate();

  return (
    <Paper sx={{ p: 4, maxWidth: 1300, mx: "auto", mt: 4 }}>
      <Typography variant="h5" color="secondary" gutterBottom>
        Cadastro de preparação
      </Typography>

      {/* Nome, Categoria, Número */}
      <Grid container spacing={2} mb={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField label="Nome da preparação" fullWidth size="small" />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <TextField label="Categoria" fullWidth size="small" />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <TextField label="Número" fullWidth size="small" />
        </Grid>
      </Grid>

      {/* Ingredientes */}
      <Typography variant="h6" color="secondary" mt={2}>
        Ingredientes
      </Typography>

      {ingredientes.map((ingrediente, index) => (
        <Box
          key={index}
          sx={{
            border: '1px solid #ddd',
            borderRadius: 2,
            p: 2,
            mb: 2,
          }}
        >
          <Grid container spacing={1} alignItems="center">
            <Grid size={{ xs: 10 }}>
              <Typography variant="subtitle1" color="text.secondary">
                Ingrediente #{index + 1}
              </Typography>
            </Grid>
            <Grid size={{ xs: 2 }} display="flex" justifyContent="flex-end">
              <IconButton
                color="error"
                onClick={() => {
                  const novaLista = ingredientes.filter((_, i) => i !== index);
                  setIngredientes(novaLista);
                }}
              >
                <Delete />
              </IconButton>
            </Grid>

            <Grid size={{ xs: 12, sm: 3 }}>
              <Autocomplete
                options={options} // options vazio
                getOptionLabel={(option) => option.nome}
                value={
                  ingredientes[index].id
                    ? options.find((opt) => opt.id === ingredientes[index].id) ?? null
                    : null
                }
                onChange={(_, newValue) => handleIngredienteChange(index, newValue)}
                onInputChange={() => {
                  // não faz nada por enquanto
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Ingrediente" size="small" fullWidth />
                )}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                freeSolo={false}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 2 }}>
              <TextField label="Medida caseira" fullWidth size="small" />
            </Grid>
            <Grid size={{ xs: 6, sm: 1 }}>
              <TextField label="PB (g)" fullWidth size="small" />
            </Grid>
            <Grid size={{ xs: 6, sm: 1 }}>
              <TextField label="PL (g)" fullWidth size="small" />
            </Grid>
            <Grid size={{ xs: 6, sm: 1 }}>
              <TextField label="FC (g)" fullWidth size="small" />
            </Grid>
            <Grid size={{ xs: 6, sm: 2 }}>
              <TextField label="Peso de compra" fullWidth size="small" />
            </Grid>
            <Grid size={{ xs: 6, sm: 1 }}>
              <TextField label="Custo (R$)" fullWidth size="small" />
            </Grid>
            <Grid size={{ xs: 6, sm: 1 }}>
              <TextField label="Custo (usado)" fullWidth size="small" />
            </Grid>
          </Grid>
        </Box>
      ))}

      <Box mt={1}>
        <Button
          startIcon={<AddIcon />}
          onClick={handleAddIngrediente}
          variant="text"
        >
          Adicionar ingrediente
        </Button>
      </Box>

      {/* Custo total */}
      <Box mt={2}>
        <Typography variant="body1">Custo total:</Typography>
        <Typography variant="body1">Custo per capita:</Typography>
      </Box>

      {/* Preparo */}
      <Typography variant="h6" color="secondary" mt={4}>
        Preparo
      </Typography>

      <Grid container spacing={2} mt={1}>
        <Grid size={12}>
          <TextField label="Equipamentos e utensílios utilizados" fullWidth size="small" />
        </Grid>
        <Grid size={12}>
          <TextField
            label="Modo de preparo"
            fullWidth
            multiline
            minRows={4}
            size="small"
          />
        </Grid>
      </Grid>

      {/* Informações adicionais */}
      <Grid container spacing={2} mt={2}>
        <Grid size={{ xs: 6, sm: 3 }}>
          <TextField label="Tempo de preparo" fullWidth size="small" />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <TextField label="Rendimento" fullWidth size="small" />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <TextField label="Nº porções" fullWidth size="small" />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <TextField label="Peso da porção" fullWidth size="small" />
        </Grid>

        <Grid size={{ xs: 6, sm: 3 }}>
          <TextField label="Medida" fullWidth size="small" />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="sobrou-agua-label">Sobrou água?</InputLabel>
            <Select
              labelId="sobrou-agua-label"
              label="Sobrou água?"
              value={sobrouAgua}
              onChange={(e) => setSobrouAgua(e.target.value)}
            >
              <MenuItem value="Sim">Sim</MenuItem>
              <MenuItem value="Não">Não</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <TextField label="Quantidade (ml)" fullWidth size="small" disabled={sobrouAgua === "Não"} />
        </Grid>
      </Grid>

      {/* Botão de envio */}
      <Box display="flex" justifyContent="space-between" mt={4}>
        <Button color="primary" onClick={() => navigate("/pagina-inicial")}>
          Voltar
        </Button>
        <Button variant="contained" color="primary">
          Salvar preparação
        </Button>
      </Box>
    </Paper>
  );
};

export default CadastroPreparacao;
