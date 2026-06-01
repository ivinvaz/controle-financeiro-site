import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api';

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
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const response = error.response;
    const message = response?.data?.message || response?.statusText || error.message;
    const err = new Error(message);
    err.status = response?.status;
    err.data = response?.data;
    return Promise.reject(err);
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
};

