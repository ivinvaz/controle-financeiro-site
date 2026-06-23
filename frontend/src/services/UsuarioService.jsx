import { loginUser, registerUser, saveToken } from '../api/UsuariosApi';

async function registrarUsuario(dadosUsuario) {
  const response = await registerUser(dadosUsuario);

  if (response?.token) {
    saveToken(response.token);
  }

  return response;
}

async function loginUsuario(credenciais) {
  const response = await loginUser(credenciais);

  if (response?.token) {
    saveToken(response.token);
  }

  return response;
}

export { registrarUsuario, loginUsuario };

