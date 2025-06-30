import React, { useEffect, useState } from 'react'
import ReceitaView from './ReceitaView'
import { Typography, CircularProgress, Box } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

interface Usuario {
  id: number
  nome: string
  email: string
}

export interface Ingrediente {
  id?: number
  nome: string
  medidaCaseira?: string
  pb?: number
  pl?: number
  fc?: number
  custo1?: number
  custo2?: number
  proteinas?: number
  carboidratos?: number
  lipidios?: number
  sodio?: number
  gordSaturada?: number
  usuarioCriadorIngrediente?: Usuario
}

export interface IngredienteUsado {
  id?: number
  ingrediente: Ingrediente
  custoCompra?: number
  custoUso?: number
  fatorCoccao?: number
  gramagemComprada?: number
  perCapitaPL?: number
  pesoBruto?: number
  pesoLiquido?: number
  medidaCaseira?: string
}

interface ReceitaData {
  id?: number
  nomePreparacao: string
  categoria: string
  custoPerCapta: number
  custoTotal: number
  equipUtensilios: string
  fccPreparacao: number
  ingredientesUsados: IngredienteUsado[]
  medidaCaseira: string
  modoPreparo: string
  numPorcoes: number
  numero: number
  rendimento: number
  tempoPorcoes: number
  usuarioCriadorPreparacao: null
  perfilNutricional?: InformacaoNutricional[]
}

export interface InformacaoNutricional {
  nome: string
  perCapta?: number
  proteinas?: number
  carboidratos?: number
  lipidios?: number
  sodio?: number
  gordSaturada?: number
}

const API_BASE_URL = 'http://localhost:8080/preparacoes'

const PaginaReceita = () => {
  const [dadosReceita, setDadosReceita] = useState<ReceitaData | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<Error | null>(null)
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    const buscarReceita = async () => {
      try {
        setCarregando(true)

        if (!id) {
          setDadosReceita({
            nomePreparacao: '',
            categoria: '',
            ingredientesUsados: [],
            equipUtensilios: '',
            modoPreparo: '',
            custoTotal: 0,
            tempoPorcoes: 0,
            custoPerCapta: 0,
            medidaCaseira: '',
            numPorcoes: 0,
            numero: 0,
            rendimento: 0,
            fccPreparacao: 0,
            usuarioCriadorPreparacao: null,
            perfilNutricional: []
          })
          setCarregando(false)
          return
        }

        const response = await fetch(`${API_BASE_URL}/${id}`)
        if (!response.ok) {
          throw new Error('Erro ao carregar receita')
        }
        const data: ReceitaData = await response.json()

        // Mapeia os ingredientes para o perfil nutricional
        const perfilNutricional = data.ingredientesUsados.map(ingrediente => ({
          nome: ingrediente.ingrediente.nome,
          perCapta: ingrediente.perCapitaPL,
          proteinas: ingrediente.ingrediente.proteinas,
          carboidratos: ingrediente.ingrediente.carboidratos,
          lipidios: ingrediente.ingrediente.lipidios,
          sodio: ingrediente.ingrediente.sodio,
          gordSaturada: ingrediente.ingrediente.gordSaturada
        }))

        setDadosReceita({
          ...data,
          perfilNutricional
        })
        setCarregando(false)
      } catch (err) {
        setErro(err as Error)
        setCarregando(false)
      }
    }

    buscarReceita()
  }, [id])

  const handleFieldChange = (field: keyof ReceitaData, value: any) => {
    setDadosReceita(prev => (prev ? { ...prev, [field]: value } : null))
  }

  const handleIngredientChange = (
    index: number,
    field: keyof IngredienteUsado | 'nome',
    value: string | number
  ) => {
    setDadosReceita(prev => {
      if (!prev) return null
      const novosIngredientes = [...prev.ingredientesUsados]
      const ingredienteAntigo = novosIngredientes[index].ingrediente

      const numericValue =
        typeof value === 'string' && field !== 'nome'
          ? parseFloat(value) || 0
          : value

      if (field === 'nome') {
        novosIngredientes[index] = {
          ...novosIngredientes[index],
          ingrediente: {
            ...ingredienteAntigo,
            nome: value as string
          }
        }
      } else {
        novosIngredientes[index] = {
          ...novosIngredientes[index],
          [field]: numericValue
        }
      }

      const novoPerfilNutricional = [...(prev.perfilNutricional || [])]
      if (novoPerfilNutricional[index]) {
        if (field === 'nome') {
        } else {
          novoPerfilNutricional[index] = {
            ...novoPerfilNutricional[index],
            [field]: numericValue
          }
        }
      }

      return {
        ...prev,
        ingredientesUsados: novosIngredientes,
        perfilNutricional: novoPerfilNutricional
      }
    })
  }

  const handleAddIngredient = () => {
    setDadosReceita(prev => {
      if (!prev) return null
      const novoIngredienteUsado: IngredienteUsado = {
        ingrediente: {
          nome: '',
          proteinas: 0,
          carboidratos: 0,
          lipidios: 0
        }
      }

      const novoPerfilNutricional = [
        ...(prev.perfilNutricional || []),
        {
          nome: '',
          proteinas: 0,
          carboidratos: 0,
          lipidios: 0
        }
      ]

      return {
        ...prev,
        ingredientesUsados: [...prev.ingredientesUsados, novoIngredienteUsado],
        perfilNutricional: novoPerfilNutricional
      }
    })
  }

  const handleRemoveIngredient = (index: number) => {
    setDadosReceita(prev => {
      if (!prev) return null
      const novosIngredientes = [...prev.ingredientesUsados]
      novosIngredientes.splice(index, 1)

      const novoPerfilNutricional = [...(prev.perfilNutricional || [])]
      novoPerfilNutricional.splice(index, 1)

      return {
        ...prev,
        ingredientesUsados: novosIngredientes,
        perfilNutricional: novoPerfilNutricional
      }
    })
  }

  const handleEquipmentListChange = (equipamentos: string[]) => {
    setDadosReceita(prev =>
      prev
        ? {
            ...prev,
            equipUtensilios: equipamentos.map(e => e.trim()).join(',')
          }
        : null
    )
  }

  const handleNutritionalInfoChange = (
    index: number,
    field: keyof InformacaoNutricional,
    value: string | number
  ) => {
    setDadosReceita(prev => {
      if (!prev || !prev.perfilNutricional) return null

      const numericValue =
        typeof value === 'string' ? parseFloat(value) || 0 : value
      const novoPerfil = [...prev.perfilNutricional]
      novoPerfil[index] = { ...novoPerfil[index], [field]: numericValue }

      // Atualiza também o ingrediente correspondente
      const novosIngredientes = [...prev.ingredientesUsados]
      if (novosIngredientes[index]) {
        novosIngredientes[index] = {
          ...novosIngredientes[index],
          [field]: numericValue
        }
      }

      return {
        ...prev,
        perfilNutricional: novoPerfil,
        ingredientesUsados: novosIngredientes
      }
    })
  }

  const validarDados = () => {
    if (!dadosReceita?.nomePreparacao.trim()) {
      throw new Error('Nome da preparação é obrigatório')
    }
  }

  const handleSalvarReceita = async () => {
    if (!dadosReceita) return

    validarDados()

    try {
      setCarregando(true)
      const method = dadosReceita.id ? 'PUT' : 'POST'
      const url = dadosReceita.id
        ? `${API_BASE_URL}/editarPreparacao`
        : `${API_BASE_URL}/criarPreparacao`

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosReceita)
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(
          `Erro ao salvar receita: ${errorText || response.statusText}`
        )
      }

      const data = await response.json()
      setDadosReceita(data)

      if (!dadosReceita.id && data.id) {
        navigate(`/receita/${data.id}`)
        return
      }
    } catch (err) {
      setErro(err as Error)
    } finally {
      setCarregando(false)
      navigate('/listaReceitas')
    }
  }

  const handleVoltar = () => {
    navigate('/listaReceitas')
  }

  if (carregando && id) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Carregando receita...</Typography>
      </Box>
    )
  }

  if (erro) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">
          Erro ao carregar receita: {erro.message}
        </Typography>
      </Box>
    )
  }

  if (!dadosReceita && !id) {
    return <Typography>Nenhuma receita encontrada.</Typography>
  }

  return (
    <>
      {dadosReceita && (
        <ReceitaView
          nomeReceita={dadosReceita.nomePreparacao}
          categoria={dadosReceita.categoria}
          ingredientes={dadosReceita.ingredientesUsados}
          equipamentosUtilizados={dadosReceita.equipUtensilios.split(',')}
          modoPreparo={dadosReceita.modoPreparo}
          custoTotal={dadosReceita.custoTotal.toString()}
          tempoPreparo={dadosReceita.tempoPorcoes.toString()}
          custoPorPorcao={dadosReceita.custoPerCapta.toString()}
          pesoPorcao={dadosReceita.medidaCaseira}
          numeroPorcoes={dadosReceita.numPorcoes.toString()}
          fcc={dadosReceita.fccPreparacao.toString()}
          perfilNutricional={dadosReceita.perfilNutricional || []}
          onNomeReceitaChange={value =>
            handleFieldChange('nomePreparacao', value)
          }
          onCategoriaChange={value => handleFieldChange('categoria', value)}
          onModoPreparoChange={value => handleFieldChange('modoPreparo', value)}
          onCustoTotalChange={value =>
            handleFieldChange('custoTotal', parseFloat(value) || 0)
          }
          onTempoPreparoChange={value =>
            handleFieldChange('tempoPorcoes', parseFloat(value) || 0)
          }
          onCustoPorPorcaoChange={value =>
            handleFieldChange('custoPerCapta', parseFloat(value) || 0)
          }
          onPesoPorcaoChange={value =>
            handleFieldChange('medidaCaseira', value)
          }
          onNumeroPorcoesChange={value =>
            handleFieldChange('numPorcoes', parseInt(value) || 0)
          }
          onFccChange={value =>
            handleFieldChange('fccPreparacao', parseFloat(value) || 0)
          }
          onNutritionalInfoChange={handleNutritionalInfoChange}
          onIngredientChange={handleIngredientChange}
          onAddIngredient={handleAddIngredient}
          onRemoveIngredient={handleRemoveIngredient}
          onEquipmentUsedChange={handleEquipmentListChange}
          onVoltarClick={handleVoltar}
          onEditarClick={handleSalvarReceita}
          isEditing={true}
          onAddIngrediente={handleAddIngredient}
        />
      )}
    </>
  )
}

export default PaginaReceita
