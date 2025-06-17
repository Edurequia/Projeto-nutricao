import { createTheme } from "@mui/material";
import { amber, blueGrey, brown, deepOrange, grey, purple } from "@mui/material/colors";

export const LigthTheme = createTheme({
    palette: {
        primary: {
            main: deepOrange[700],
            dark: '#e64a19',
            light: '#ff8a65',
            contrastText: '#ffffff'
        },
        secondary: {
            main: blueGrey[700],
            dark: blueGrey[700],
            light: blueGrey[300],
            contrastText: '#ffffff'
        },
        background: {
            default: grey[50],
            paper: '#ffffff'
        }
    }
});
