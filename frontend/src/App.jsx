import { Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="meta" element={<ListagemMeta />}>
          <Route path="cadastro-meta" element={<CadastroMeta />} />
          <Route path="editar-meta" element={<EdicaoMeta />} />
        </Route>
        <Route path="transacao" element={<ListagemTransacao />}>
          <Route path="cadastro-transacao" element={<CadastroTransacao />} />
          <Route path="editar-transacao" element={<EdicaoTransacao />} />
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
    </Routes>
  );
}

export default App;
