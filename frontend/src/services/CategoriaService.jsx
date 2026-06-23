import CategoriaApi from "../api/CategoriaApi";

async function criar(dados) {
  try {
    const response = await CategoriaApi.criarCategoria(dados);
    return {
      success: true,
      data: response,
      message: "Categoria criada com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      message: error.message || "Erro ao criar categoria",
    };
  }
}

async function editar(id, dados) {
  try {
    const response = await CategoriaApi.editarCategoria(id, dados);
    return {
      success: true,
      data: response,
      message: "Categoria atualizada com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      message: error.message || "Erro ao editar categoria",
    };
  }
}

async function deletar(id) {
  try {
    await CategoriaApi.deletarCategoria(id);
    return {
      success: true,
      message: "Categoria deletada com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      message: error.message || "Erro ao deletar categoria",
    };
  }
}

async function listar() {
  try {
    const response = await CategoriaApi.consultarCategorias();
    return {
      success: true,
      data: response?.data || response || [],
      message: "Categorias carregadas com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      data: [],
      message: error.message || "Erro ao carregar categorias",
    };
  }
}

async function obterPorId(id) {
  try {
    const response = await CategoriaApi.consultarCategoriaPorId(id);
    return {
      success: true,
      data: response,
      message: "Categoria carregada com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      message: error.message || "Erro ao carregar categoria",
    };
  }
}

export default { criar, editar, deletar, listar, obterPorId };