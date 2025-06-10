import { createTheme } from "@mui/material";
import { purple } from "@mui/material/colors";

export const LigthTheme = createTheme({
    palette: {
        primary: {
            main: '#7cb342',
            dark: '#558b2f',
            light: '#8bc34a',
            contrastText: '#ffffff'
        },
        secondary: {
            main: purple[500],
            dark: purple[700],
            light: purple[300],
            contrastText: '#ffffff'
        },
        background: {
            default: '#f1f8e9',
            paper: '#ffffff'
        }
    }
});
