import React, { useEffect, useState } from 'react';
import ReceitaView from './ReceitaView';
import { Typography, CircularProgress, Box, AppBar, Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
    palette: {
        primary: {
            main: '#6200EE',
        },
        background: {
            default: '#f5f5f5',
        },
    },
});

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

interface ReceitaData {
    nomeReceita: string;
    categoria: string;
    ingredientes: Ingrediente[];
    equipamentosUtilizados: string[];
    modoPreparo: string;
    custoTotal: string;
    tempoPreparo: string;
    custoPorPorcao: string;
    pesoPorcao: string;
    numeroPorcoes: string;
    fcc: string;
    perfilNutricional: InformacaoNutricional[];
}

const dadosReceitaMock: ReceitaData = {
    nomeReceita: "Omelete Simples",
    categoria: "Café da Manhã",
    ingredientes: [
        { nome: "Ovo", medidaCaseira: "2 unidades", pb: "100g", pl: "80g", fc: "64g", custo1: "R$1,10", custo2: "R$0,82" },
        { nome: "Queijo prato", medidaCaseira: "1 fatia", pb: "30g", pl: "30g", fc: "40g", custo1: "R$2,90", custo2: "R$2,00" },
        { nome: "Óleo vegetal", medidaCaseira: "2 colheres de sopa", pb: "9g", pl: "9g", fc: "1.0", custo1: "R$0,15", custo2: "R$0,15" },
    ],
    equipamentosUtilizados: ["Panela antiaderente", "Faca pequena", "Tigela", "Garfo"],
    modoPreparo: "1. Bata os ovos em uma tigela com sal e pimenta.\n2. Aqueça um pouco de óleo na panela.\n3. Despeje os ovos batidos e cozinhe em fogo médio.\n4. Quando começar a firmar, adicione o queijo ralado.\n5. Dobre a omelete ao meio e cozinhe por mais um minuto. Sirva quente.",
    custoTotal: "R$ 4,15",
    tempoPreparo: "10 min",
    custoPorPorcao: "R$ 4,15",
    pesoPorcao: "150g",
    numeroPorcoes: "1",
    fcc: "1.0",
    perfilNutricional: [
        { nome: "Ovo", perCapitaPL: "80g", ptn: "7g", cho: "0.6g", lip: "6g", sodio: "70mg", gorduraSaturada: "2g" },
        { nome: "Queijo Prato", perCapitaPL: "30g", ptn: "7.5g", cho: "0.2g", lip: "9g", sodio: "180mg", gorduraSaturada: "5g" },
        { nome: "Óleo Vegetal", perCapitaPL: "9g", ptn: "0g", cho: "0g", lip: "9g", sodio: "0mg", gorduraSaturada: "1g" },
    ],
};

const PaginaReceita = () => {
    const [dadosReceita, setDadosReceita] = useState<ReceitaData | null>(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState<Error | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const buscarReceita = async () => {
            try {
                setCarregando(true);
                setTimeout(() => {
                    setDadosReceita(dadosReceitaMock);
                    setCarregando(false);
                }, 1000);
            } catch (err) {
                setErro(err as Error);
                setCarregando(false);
            }
        };

        buscarReceita();
    }, []);


    const handleFieldChange = (field: keyof ReceitaData, value: string) => {
        setDadosReceita(prev => prev ? { ...prev, [field]: value } : null);
    };

    const handleIngredientChange = (index: number, field: keyof Ingrediente, value: string) => {
        setDadosReceita(prev => {
            if (!prev) return null;
            const novosIngredientes = [...prev.ingredientes];
            novosIngredientes[index] = { ...novosIngredientes[index], [field]: value };
            return { ...prev, ingredientes: novosIngredientes };
        });
    };

    const handleNutritionalInfoChange = (index: number, field: keyof InformacaoNutricional, value: string) => {
        setDadosReceita(prev => {
            if (!prev) return null;
            const novoPerfil = [...prev.perfilNutricional];
            novoPerfil[index] = { ...novoPerfil[index], [field]: value };
            return { ...prev, perfilNutricional: novoPerfil };
        });
    };

    const handleEquipmentUsedChange = (index: number, value: string) => {
        setDadosReceita(prev => {
            if (!prev) return null;
            const novosEquipamentos = [...prev.equipamentosUtilizados];
            novosEquipamentos[index] = value;
            return { ...prev, equipamentosUtilizados: novosEquipamentos };
        });
    };


    const handleSalvarReceita = () => {
        console.log("Receita salva!", dadosReceita);

        alert("Receita salva com sucesso! (Verifique o console para os dados)");
    };

    const handleVoltar = () => {
        navigate("/listaReceitas");
    };

    if (carregando) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
                <Typography sx={{ ml: 2 }}>Carregando receita...</Typography>
            </Box>
        );
    }

    if (erro) {
        return <Typography color="error">Erro ao carregar receita: {erro.message}</Typography>;
    }

    if (!dadosReceita) {
        return <Typography>Nenhuma receita encontrada.</Typography>;
    }

    return (
        <ReceitaView
            nomeReceita={dadosReceita.nomeReceita}
            categoria={dadosReceita.categoria}
            ingredientes={dadosReceita.ingredientes}
            equipamentosUtilizados={dadosReceita.equipamentosUtilizados}
            modoPreparo={dadosReceita.modoPreparo}
            custoTotal={dadosReceita.custoTotal}
            tempoPreparo={dadosReceita.tempoPreparo}
            custoPorPorcao={dadosReceita.custoPorPorcao}
            pesoPorcao={dadosReceita.pesoPorcao}
            numeroPorcoes={dadosReceita.numeroPorcoes}
            fcc={dadosReceita.fcc}
            perfilNutricional={dadosReceita.perfilNutricional}
            onNomeReceitaChange={(value) => handleFieldChange('nomeReceita', value)}
            onCategoriaChange={(value) => handleFieldChange('categoria', value)}
            onModoPreparoChange={(value) => handleFieldChange('modoPreparo', value)}
            onCustoTotalChange={(value) => handleFieldChange('custoTotal', value)}
            onTempoPreparoChange={(value) => handleFieldChange('tempoPreparo', value)}
            onCustoPorPorcaoChange={(value) => handleFieldChange('custoPorPorcao', value)}
            onPesoPorcaoChange={(value) => handleFieldChange('pesoPorcao', value)}
            onNumeroPorcoesChange={(value) => handleFieldChange('numeroPorcoes', value)}
            onFccChange={(value) => handleFieldChange('fcc', value)}
            onIngredientChange={handleIngredientChange}
            onNutritionalInfoChange={handleNutritionalInfoChange}
            onEquipmentUsedChange={handleEquipmentUsedChange}
            onVoltarClick={handleVoltar}
            onEditarClick={handleSalvarReceita}
        />
    );
};

export default PaginaReceita;