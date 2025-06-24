import { Delete } from "@mui/icons-material";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Receita {
    id: number;
    nome: string;
}

export const ListaReceitas = () => {
    const [receitas, setReceitas] = useState<Receita[]>([
        { id: 1, nome: "Nome da preparação 1" },
        { id: 2, nome: "Nome da preparação 2" },
        { id: 3, nome: "Nome da preparação 3" },
        { id: 4, nome: "Nome da preparação 4" },
        { id: 5, nome: "Nome da preparação 5" },
        { id: 6, nome: "Nome da preparação 6" },
    ]);

    const navigate = useNavigate();

    const handleDeletar = (id: number) => {
        setReceitas((prev) => prev.filter((r) => r.id !== id));
    };

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                bgcolor: "#fff",
            }}
        >
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    overflowY: "auto",
                    p: 2,
                    maxWidth: 1300,
                    mx: "auto",
                    width: "100%",
                    boxSizing: "border-box",
                    "@media (max-width:600px)": {
                        maxWidth: "100%",
                        p: 1,
                    },
                }}
            >
                <Typography variant="h5" color="secondary" gutterBottom>
                    Lista de receitas
                </Typography>

                <Stack spacing={2}>
                    {receitas.map((receita) => (
                        <Paper
                            key={receita.id}
                            sx={{
                                p: 2,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Typography>{receita.nome}</Typography>

                            <Box>
                                <Button size="small" sx={{ color: "#666", mr: 2 }} onClick={() => navigate("/receita")}>
                                    Visualizar
                                </Button>
                                <Button
                                    size="small"
                                    color="error"
                                    onClick={() => handleDeletar(receita.id)}
                                >
                                    <Delete />
                                </Button>
                            </Box>
                        </Paper>
                    ))}
                </Stack>
            </Box>

            <Box
                sx={{
                    p: 2,
                    display: "flex",
                    justifyContent: "flex-end",
                    maxWidth: 1300,
                    mx: "auto",
                    width: "100%",
                }}
            >
                <Button
                    variant="text"
                    onClick={() => navigate("/pagina-inicial")}
                >
                    Voltar
                </Button>
            </Box>
        </Box>
    );
};

export default ListaReceitas;
