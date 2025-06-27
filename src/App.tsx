import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { AppThemeProvider } from "./shared/contexts/ThemeContext";
import { AuthProvider } from "./shared/contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AppThemeProvider>
    </AuthProvider>
  );
}

export default App;
