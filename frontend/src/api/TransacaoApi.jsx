const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api';

const DEFAULT_ERROR_MESSAGE = 'Nao foi possivel concluir a solicitacao. Tente novamente.';
const CONNECTION_ERROR_MESSAGE = 'Nao foi possivel conectar ao servidor. Verifique se o backend esta rodando e tente novamente.';

function getToken() {
  return window.localStorage.getItem('token');
}

function getAuthHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path, options = {}) {
  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
        ...options.headers,
      },
    });

    let data = null;

    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (!response.ok) {
      throw new Error(data?.message || data?.error || DEFAULT_ERROR_MESSAGE);
    }

    return data;
  } catch (error) {
    if (error.message) {
      throw error;
    }

    throw new Error(CONNECTION_ERROR_MESSAGE);
  }
}

async function criarTransacao(payload) {
  return request('/transacao/criar', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

async function editarTransacao(id, payload) {
  return request(`/transacao/editar/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

async function deletarTransacao(id) {
  return request(`/transacao/deletar/${id}`, {
    method: 'DELETE',
  });
}

async function consultarTransacoes() {
  return request('/transacao/consultar', {
    method: 'GET',
  });
}

async function consultarTransacaoPorId(id) {
  return request(`/transacao/consultar/${id}`, {
    method: 'GET',
  });
}

export {
  BASE_URL,
  request,
  criarTransacao,
  editarTransacao,
  deletarTransacao,
  consultarTransacoes,
  consultarTransacaoPorId,
};