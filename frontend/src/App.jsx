import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = Boolean(localStorage.getItem("token"));
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

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
