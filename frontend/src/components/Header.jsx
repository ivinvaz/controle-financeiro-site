import { useLocation } from "react-router-dom";

const titles = {
  "/": "Dashboard",
  "/metas": "Metas",
  "/metas/novo": "Cadastro",
  "/transacoes": "Transações",
  "/transacoes/novo": "Cadastro",
};

const getTitle = (pathname) => {
  if (titles[pathname]) return titles[pathname];
  if (pathname.includes("/editar")) return "Edição";
  return;
};

function Header() {
  const { pathname } = useLocation();

  return (
    <header className="flex items-start justify-start py-4">
      <h1 className="text-xl font-bold">{getTitle(pathname)}</h1>
    </header>
  );
}

export default Header;
