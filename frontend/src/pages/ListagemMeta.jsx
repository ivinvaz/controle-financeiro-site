import { Outlet } from 'react-router-dom';

function ListagemMeta() {
  return (
    <div>
      <h1>Listagem de Metas</h1>
      <p>Lista de todas as suas metas</p>
      <Outlet />
    </div>
  );
}

export default ListagemMeta;