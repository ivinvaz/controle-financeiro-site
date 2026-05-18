import { Outlet } from 'react-router-dom';

function ListagemTransacao() {
  return (
    <div>
      <h1>Listagem de Transações</h1>
      <p>Lista de todas as suas transações</p>
      <Outlet />
    </div>
  );
}

export default ListagemTransacao;