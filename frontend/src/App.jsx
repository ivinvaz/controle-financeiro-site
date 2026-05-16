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
