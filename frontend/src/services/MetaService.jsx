import * as MetaApi from '../api/MetaApi';

/**
 * MetaService
 * 
 * Serviço para gerenciar operações de Metas.
 * Fornece métodos para criar, editar, deletar e consultar metas.
 */

async function criar(dados) {
  try {
    const response = await MetaApi.criarMeta(dados);
    return {
      success: true,
      data: response,
      message: 'Meta criada com sucesso!',
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      message: error.message || 'Erro ao criar meta',
    };
  }
}

async function editar(id, dados) {
  try {
    const response = await MetaApi.editarMeta(id, dados);
    return {
      success: true,
      data: response,
      message: 'Meta atualizada com sucesso!',
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      message: error.message || 'Erro ao editar meta',
    };
  }
}

async function deletar(id) {
  try {
    await MetaApi.deletarMeta(id);
    return {
      success: true,
      message: 'Meta deletada com sucesso!',
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      message: error.message || 'Erro ao deletar meta',
    };
  }
}

async function listar() {
  try {
    const response = await MetaApi.consultarMetas();
    return {
      success: true,
      data: response?.data || response || [],
      message: 'Metas carregadas com sucesso!',
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      data: [],
      message: error.message || 'Erro ao carregar metas',
    };
  }
}

async function obterPorId(id) {
  try {
    const response = await MetaApi.consultarMetaPorId(id);
    return {
      success: true,
      data: response,
      message: 'Meta carregada com sucesso!',
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      message: error.message || 'Erro ao carregar meta',
    };
  }
}

// Validações
function validarMeta(dados) {
  const erros = {};

  if (!dados.nome || dados.nome.trim() === '') {
    erros.nome = 'Nome da meta é obrigatório';
  }

  if (!dados.valor || dados.valor <= 0) {
    erros.valor = 'Valor da meta é obrigatório e deve ser maior que 0';
  }

  if (typeof dados.valor === 'string' && isNaN(parseFloat(dados.valor))) {
    erros.valor = 'Valor deve ser um número válido';
  }

  if (dados.mes) {
    const mes = parseInt(dados.mes);
    if (isNaN(mes) || mes < 1 || mes > 12) {
      erros.mes = 'Mês deve estar entre 1 e 12';
    }
  }

  if (dados.ano) {
    const ano = parseInt(dados.ano);
    if (isNaN(ano) || ano < 2000 || ano > 2100) {
      erros.ano = 'Ano deve estar entre 2000 e 2100';
    }
  }

  return {
    valido: Object.keys(erros).length === 0,
    erros,
  };
}

export { criar, editar, deletar, listar, obterPorId, validarMeta };
