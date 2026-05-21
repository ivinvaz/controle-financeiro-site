import { useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate();

  const handleEntrar = () => {
    navigate("/");
  };
  return (
    <div>
      <h1>Login</h1>
      <button
        className="bg-gray-500 text-white py-0 px-4 rounded"
        onClick={handleEntrar}
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
