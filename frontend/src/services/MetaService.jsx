import * as MetaApi from "../api/MetaApi";

async function criar(dados) {
  try {
    const response = await MetaApi.criarMeta(dados);
    return {
      success: true,
      data: response,
      message: "Meta criada com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      message: error.message || "Erro ao criar meta",
    };
  }
}

async function editar(id, dados) {
  try {
    const response = await MetaApi.editarMeta(id, dados);
    return {
      success: true,
      data: response,
      message: "Meta atualizada com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      message: error.message || "Erro ao editar meta",
    };
  }
}

async function deletar(id) {
  try {
    await MetaApi.deletarMeta(id);
    return {
      success: true,
      message: "Meta deletada com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      message: error.message || "Erro ao deletar meta",
    };
  }
}

async function listar() {
  try {
    const response = await MetaApi.consultarMetas();
    return {
      success: true,
      data: response?.data || response || [],
      message: "Metas carregadas com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      data: [],
      message: error.message || "Erro ao carregar metas",
    };
  }
}

async function obterPorId(id) {
  try {
    const response = await MetaApi.consultarMetaPorId(id);
    return {
      success: true,
      data: response,
      message: "Meta carregada com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      message: error.message || "Erro ao carregar meta",
    };
  }
}

export { criar, editar, deletar, listar, obterPorId };
