import {
    criarTransacao,
    editarTransacao,
    deletarTransacao,
    consultarTransacoes,
    consultarTransacaoPorId,
  } from '../api/TransacaoApi';
  
  async function criar(payload) {
    return criarTransacao(payload);
  }
  
  async function editar(id, payload) {
    return editarTransacao(id, payload);
  }
  
  async function deletar(id) {
    return deletarTransacao(id);
  }
  
  async function consultarTodos() {
    return consultarTransacoes();
  }
  
  async function consultarPorId(id) {
    return consultarTransacaoPorId(id);
  }
  
  const transacaoServices = {
    criar,
    editar,
    deletar,
    consultarTodos,
    consultarPorId,
  };
  
  export default transacaoServices;