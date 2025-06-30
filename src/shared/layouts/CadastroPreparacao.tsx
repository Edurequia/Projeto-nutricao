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
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useMemo, useRef, useState } from 'react'
import { Delete } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

interface Ingrediente {
  id: string
  nome: string
}

export const CadastroPreparacao = () => {
  const [options, setOptions] = useState<Ingrediente[]>([])
  const [ingredientes, setIngredientes] = useState<
    Array<{
      id: string
      nome: string
      medidaCaseira: string
      pb: string
      pl: string
      fc: string
      pesoCompra: string
      custoCompra: string
      custoUsado: string
      gordSaturada: string
    }>
  >([
    {
      id: '',
      nome: '',
      medidaCaseira: '',
      pb: '',
      pl: '',
      fc: '',
      pesoCompra: '',
      custoCompra: '',
      custoUsado: '',
      gordSaturada: ''
    }
  ])

  const [nomePreparacao, setNomePreparacao] = useState('')
  const [categoria, setCategoria] = useState('')
  const [numero, setNumero] = useState('')
  const [equipamentos, setEquipamentos] = useState('')
  const [modoPreparo, setModoPreparo] = useState('')
  const [tempoPreparo, setTempoPreparo] = useState('')
  const [rendimento, setRendimento] = useState('')
  const [numeroPorcoes, setNumeroPorcoes] = useState('')
  const [pesoPorcao, setPesoPorcao] = useState('')
  const [medida, setMedida] = useState('')
  const [quantidadeAgua, setQuantidadeAgua] = useState('')

  const navigate = useNavigate()

  const abortControllerRef = useRef<AbortController | null>(null)
  const [sobrouAgua, setSobrouAgua] = useState('Sim')

  const handleIngredienteChange = (
    index: number,
    newValue: Ingrediente | null
  ) => {
    const novaLista = [...ingredientes]
    if (newValue) {
      novaLista[index] = {
        ...novaLista[index],
        nome: newValue.nome,
        id: newValue.id
      }
    } else {
      novaLista[index] = {
        ...novaLista[index],
        nome: '',
        id: ''
      }
    }
    setIngredientes(novaLista)
  }

  const calcularFCC = (pbStr: string, plStr: string) => {
    const pb = parseFloat(pbStr)
    const pl = parseFloat(plStr)
    if (!pb || !pl) return 0
    return pl / pb
  }

  const ingredientesComFCC = ingredientes.map(i => ({
    ...i,
    fc: calcularFCC(i.pb, i.pl).toFixed(2)
  }))

  const handleAddIngrediente = () => {
    setIngredientes([
      ...ingredientes,
      {
        id: '',
        nome: '',
        medidaCaseira: '',
        pb: '',
        pl: '',
        fc: '',
        pesoCompra: '',
        custoCompra: '',
        custoUsado: '',
        gordSaturada: ','
      }
    ])
  }

  const handleInputChange = (input: string) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    const controller = new AbortController()
    abortControllerRef.current = controller

    fetch(
      `http://localhost:8080/ingredientes/buscarPorNome?nome=${encodeURIComponent(
        input
      )}`,
      {
        signal: controller.signal
      }
    )
      .then(res => {
        if (!res.ok) throw new Error('Erro na requisição')
        return res.json()
      })
      .then((data: Ingrediente[]) => {
        setOptions(data)
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          console.error('Erro ao buscar ingredientes:', err)
        }
      })
  }

  const custoTotal = useMemo(() => {
    return ingredientes.reduce((total, ing) => {
      const custo = parseFloat(ing.custoUsado)
      return total + (isNaN(custo) ? 0 : custo)
    }, 0)
  }, [ingredientes])

  const custoPerCapta = useMemo(() => {
    const numPorcoes = parseFloat(numeroPorcoes)
    return numPorcoes > 0 ? parseFloat((custoTotal / numPorcoes).toFixed(2)) : 0
  }, [custoTotal, numeroPorcoes])

  const handleSalvar = () => {
    if (!nomePreparacao.trim()) {
      alert('Informe o nome da preparação.')
      return
    }

    const preparacao = {
      nomePreparacao,
      categoria,
      numero: Number(numero),
      equipUtensilios: equipamentos,
      modoPreparo,
      tempoPorcoes: Number(tempoPreparo),
      rendimento: Number(rendimento),
      numPorcoes: Number(numeroPorcoes),
      medidaCaseira: medida,
      custoTotal,
      custoPerCapta,
      fccPreparacao:
        ingredientesComFCC.length > 0
          ? Number(
              (
                ingredientesComFCC.reduce(
                  (acc, i) => acc + parseFloat(i.fc),
                  0
                ) / ingredientesComFCC.length
              ).toFixed(2)
            )
          : 0,
      ingredientesUsados: ingredientes.map(i => ({
        ingrediente: { id: parseInt(i.id) },
        medidaCaseira: i.medidaCaseira,
        pesoBruto: parseFloat(i.pb),
        pesoLiquido: parseFloat(i.pl),
        fatorCoccao: parseFloat(i.fc),
        gramagemComprada: parseFloat(i.pesoCompra),
        custoCompra: parseFloat(i.custoCompra),
        custoUso: parseFloat(i.custoUsado),
        gorduraSaturada: parseFloat(i.gordSaturada)
      }))
    }

    fetch('http://localhost:8080/preparacoes/criarPreparacao', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(preparacao)
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao salvar preparação')
        return res.json()
      })
      .then(() => {
        navigate('/listaReceitas')
      })
      .catch(err => {
        alert('Erro ao salvar: ' + err.message)
      })
  }

  return (
    <Paper sx={{ p: 4, maxWidth: 1300, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" color="secondary" gutterBottom>
        Cadastro de preparação
      </Typography>

      {/* Nome, Categoria, Número */}
      <Grid container spacing={2} mb={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Nome da preparação"
            fullWidth
            size="small"
            value={nomePreparacao}
            onChange={e => setNomePreparacao(e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <TextField
            label="Categoria"
            fullWidth
            size="small"
            value={categoria}
            onChange={e => setCategoria(e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <TextField
            label="Número"
            fullWidth
            size="small"
            value={numero}
            onChange={e => setNumero(e.target.value)}
          />
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
            mb: 2
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
                  const novaLista = ingredientes.filter((_, i) => i !== index)
                  setIngredientes(novaLista)
                }}
              >
                <Delete />
              </IconButton>
            </Grid>

            <Grid size={{ xs: 12, sm: 3 }}>
              <Autocomplete
                options={options}
                getOptionLabel={option => option.nome}
                value={
                  ingredientes[index].id
                    ? options.find(
                        opt => opt.id === ingredientes[index].id
                      ) ?? {
                        id: ingredientes[index].id,
                        nome: ingredientes[index].nome
                      }
                    : null
                }
                onChange={(_, newValue) =>
                  handleIngredienteChange(index, newValue)
                }
                onInputChange={(_, newInput) => handleInputChange(newInput)}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Ingrediente"
                    size="small"
                    fullWidth
                  />
                )}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                freeSolo={false}
                noOptionsText="Nenhum ingrediente encontrado"
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 2 }}>
              <TextField
                label="Medida caseira"
                fullWidth
                size="small"
                value={ingredientes[index].medidaCaseira}
                onChange={e => {
                  const novaLista = [...ingredientes]
                  novaLista[index].medidaCaseira = e.target.value
                  setIngredientes(novaLista)
                }}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 1 }}>
              <TextField
                label="PB (g)"
                fullWidth
                size="small"
                value={ingredientes[index].pb}
                onChange={e => {
                  const novaLista = [...ingredientes]
                  novaLista[index].pb = e.target.value
                  setIngredientes(novaLista)
                }}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 1 }}>
              <TextField
                label="PL (g)"
                fullWidth
                size="small"
                value={ingredientes[index].pl}
                onChange={e => {
                  const novaLista = [...ingredientes]
                  novaLista[index].pl = e.target.value
                  setIngredientes(novaLista)
                }}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 1 }}>
              <TextField
                label="FC (g)"
                fullWidth
                size="small"
                value={ingredientes[index].fc}
                onChange={e => {
                  const novaLista = [...ingredientes]
                  novaLista[index].fc = e.target.value
                  setIngredientes(novaLista)
                }}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 2 }}>
              <TextField
                label="Peso de compra"
                fullWidth
                size="small"
                value={ingredientes[index].pesoCompra}
                onChange={e => {
                  const novaLista = [...ingredientes]
                  novaLista[index].pesoCompra = e.target.value
                  setIngredientes(novaLista)
                }}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 1 }}>
              <TextField
                label="Custo (R$)"
                fullWidth
                size="small"
                value={ingredientes[index].custoCompra}
                onChange={e => {
                  const novaLista = [...ingredientes]
                  novaLista[index].custoCompra = e.target.value
                  setIngredientes(novaLista)
                }}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 1 }}>
              <TextField
                label="Custo (usado)"
                fullWidth
                size="small"
                value={ingredientes[index].custoUsado}
                onChange={e => {
                  const novaLista = [...ingredientes]
                  novaLista[index].custoUsado = e.target.value
                  setIngredientes(novaLista)
                }}
              />
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
        <Typography variant="body1">
          Custo total: R$ {custoTotal.toFixed(2)}
        </Typography>
        <Typography variant="body1">
          Custo per capita: R$ {custoPerCapta.toFixed(2)}
        </Typography>
      </Box>

      {/* Preparo */}
      <Typography variant="h6" color="secondary" mt={4}>
        Preparo
      </Typography>

      <Grid container spacing={2} mt={1}>
        <Grid size={12}>
          <TextField
            label="Equipamentos e utensílios utilizados"
            fullWidth
            size="small"
            value={equipamentos}
            onChange={e => setEquipamentos(e.target.value)}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            label="Modo de preparo"
            fullWidth
            multiline
            minRows={4}
            size="small"
            value={modoPreparo}
            onChange={e => setModoPreparo(e.target.value)}
          />
        </Grid>
      </Grid>

      {/* Informações adicionais */}
      <Grid container spacing={2} mt={2}>
        <Grid size={{ xs: 6, sm: 3 }}>
          <TextField
            label="Tempo de preparo"
            fullWidth
            size="small"
            value={tempoPreparo}
            onChange={e => setTempoPreparo(e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <TextField
            label="Rendimento"
            fullWidth
            size="small"
            value={rendimento}
            onChange={e => setRendimento(e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <TextField
            label="Nº porções"
            fullWidth
            size="small"
            value={numeroPorcoes}
            onChange={e => setNumeroPorcoes(e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <TextField
            label="Peso da porção"
            fullWidth
            size="small"
            value={pesoPorcao}
            onChange={e => setPesoPorcao(e.target.value)}
          />
        </Grid>

        <Grid size={{ xs: 6, sm: 3 }}>
          <TextField
            label="Medida"
            fullWidth
            size="small"
            value={medida}
            onChange={e => setMedida(e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="sobrou-agua-label">Sobrou água?</InputLabel>
            <Select
              labelId="sobrou-agua-label"
              label="Sobrou água?"
              value={sobrouAgua}
              onChange={e => setSobrouAgua(e.target.value)}
            >
              <MenuItem value="Sim">Sim</MenuItem>
              <MenuItem value="Não">Não</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <TextField
            label="Quantidade (ml)"
            fullWidth
            size="small"
            disabled={sobrouAgua === 'Não'}
            value={quantidadeAgua}
            onChange={e => setQuantidadeAgua(e.target.value)}
          />
        </Grid>
      </Grid>

      {/* Botão de envio */}
      <Box display="flex" justifyContent="space-between" mt={4}>
        <Button color="primary" onClick={() => navigate('pagina-inicial')}>
          Voltar
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleSalvar()}
        >
          Salvar preparação
        </Button>
      </Box>
    </Paper>
  )
}

export default CadastroPreparacao
