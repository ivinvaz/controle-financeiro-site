import { useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate();

  const handleEntrar = () => {
    navigate("/");
  };
  return (
    <div>
      <h1>Login</h1>
      <p>Página de login</p>
      <button onClick={handleEntrar}>Entrar</button>
    </div>
  );
}

export default Login;
