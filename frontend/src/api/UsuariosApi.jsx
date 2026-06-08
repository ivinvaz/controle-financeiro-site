import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api';

const DEFAULT_ERROR_MESSAGE = 'Nao foi possivel concluir a solicitacao. Tente novamente.';
const CONNECTION_ERROR_MESSAGE = 'Nao foi possivel conectar ao servidor. Verifique se o backend esta rodando e tente novamente.';

function getToken() {
  return window.localStorage.getItem('token');
}

function saveToken(token) {
  if (token) {
    window.localStorage.setItem('token', token);
  } else {
    window.localStorage.removeItem('token');
  }
}

function removeToken() {
  window.localStorage.removeItem('token');
}

function getAuthHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

function getResponseMessage(data) {
  if (!data) return '';
  if (typeof data === 'string') return data;
  if (typeof data.message === 'string') return data.message;
  if (typeof data.error === 'string') return data.error;

  return '';
}

function normalizeApiError(error) {
  const response = error.response;
  const message =
    getResponseMessage(response?.data) ||
    response?.statusText ||
    (error.code === 'ECONNABORTED' ? 'Tempo de resposta excedido. Tente novamente.' : '') ||
    (!response ? CONNECTION_ERROR_MESSAGE : '') ||
    error.message ||
    DEFAULT_ERROR_MESSAGE;

  const err = new Error(message);
  err.status = response?.status;
  err.data = response?.data;
  err.code = error.code;
  err.isConnectionError = !response;

  return err;
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const normalizedError = normalizeApiError(error);

    if ([401, 403].includes(normalizedError.status)) {
      removeToken();

      const isPublicRoute = ['/login', '/registro'].includes(window.location.pathname);
      if (!isPublicRoute) {
        window.location.replace('/login');
      }
    }

    return Promise.reject(normalizedError);
  }
);

async function request(path, options = {}) {
  const response = await api({ url: path, ...options });
  return response.data;
}

async function requestWithAuth(path, options = {}) {
  const headers = {
    ...options.headers,
    ...getAuthHeaders(),
  };

  return request(path, {
    ...options,
    headers,
  });
}

async function registerUser(payload) {
  return request('/usuario/registrar', {
    method: 'POST',
    data: payload,
  });
}

async function loginUser(payload) {
  return request('/usuario/login', {
    method: 'POST',
    data: payload,
  });
}

export {
  BASE_URL,
  getToken,
  saveToken,
  removeToken,
  getAuthHeaders,
  request,
  requestWithAuth,
  registerUser,
  loginUser,
  normalizeApiError,
};

