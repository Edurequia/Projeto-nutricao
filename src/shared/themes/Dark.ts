import { createTheme } from "@mui/material";
import { cyan } from "@mui/material/colors";

export const DarkTheme = createTheme({
    palette: {
        primary: {
            main: '#8bc34a',
            dark: '#558b2f',
            light: '#8bc34a',
            contrastText: '#ffffff'
        },
        secondary: {
            main: cyan[500],
            dark: cyan[400],
            light: cyan[300],
            contrastText: '#ffffff'
        },
        background: {
            default: '#323232',
            paper: '#ffffff'
        }
    }
});
