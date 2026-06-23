import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Layout from "./layouts/Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import ListagemMeta from "./pages/ListagemMeta";
import CadastroMeta from "./pages/CadastroMeta";
import EdicaoMeta from "./pages/EdicaoMeta";
import ListagemTransacao from "./pages/ListagemTransacao";
import CadastroTransacao from "./pages/CadastroTransacao";
import EdicaoTransacao from "./pages/EdicaoTransacao";
import { getToken } from "./api/UsuariosApi";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = Boolean(getToken());

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location.pathname }} />
  );
};

const PublicRoute = ({ children }) => {
  const isAuthenticated = Boolean(getToken());
  return isAuthenticated ? <Navigate to="/" replace /> : children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/registro"
          element={
            <PublicRoute>
              <Registro />
            </PublicRoute>
          }
        />

        {/* Rotas privadas */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="metas" element={<ListagemMeta />} />
          <Route path="metas/novo" element={<CadastroMeta />} />
          <Route path="metas/:id/editar" element={<EdicaoMeta />} />
          <Route path="transacoes" element={<ListagemTransacao />} />
          <Route path="transacoes/novo" element={<CadastroTransacao />} />
          <Route path="transacoes/:id/editar" element={<EdicaoTransacao />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
