import { HandCoins, Minimize2 } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AsideButton from "./AsideButton";

function Aside() {
  const { pathname } = useLocation();
  const [aberto, setAberto] = useState(false);

  const links = [
    { to: "/", label: "DashBoard" },
    { to: "/transacoes", label: "Transações" },
    { to: "/metas", label: "Metas" },
  ];

  return (
    <>
      <AsideButton onClick={() => setAberto(true)} />

      {aberto && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:pointer-events-none md:bg-transparent"
          onClick={() => setAberto(false)}
        />
      )}
      <div
        className={`fixed top-0 left-0 h-full z-50 transition-transform duration-300 ${aberto ? "translate-x-0" : "-translate-x-full"}`}
      >
        <aside className="w-52 min-h-screen bg-[#0d4a5c] flex flex-col gap-6 px-5 py-8 text-lg font-bold text-center">
          <h2 className="text-white text-lg font-medium text-center tracking-wide pb-2 border-b-2 border-white flex items-center justify-center gap-2">
            {" "}
            Menu <HandCoins className="w-6 h-6" />
          </h2>

          <nav>
            <ul className="flex flex-col gap-3 ">
              {links.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    onClick={() => setAberto(false)}
                    className={`flex items-center justify-between px-4 py-2.5 text-sm text-[#000000] transition-colors 
        ${pathname === to ? "bg-white" : "bg-white hover:bg-white/40"}`}
                  >
                    <span>{label}</span>
                    <span className="text-xl">
                      {pathname === to ? "⊙" : "→"}
                    </span>
                  </Link>
                </li>
              ))}

              <li>
                <Link
                  to="/login"
                  onClick={() => setAberto(false)}
                  className="flex items-center justify-between px-4 py-2.5 rounded-lg text-sm text-[#e8f4f8] border border-white/15 bg-white/10 hover:bg-white/15 transition-colors"
                >
                  <span>Logout</span>
                  <span>→</span>
                </Link>
              </li>
            </ul>
          </nav>
          <button
            onClick={() => setAberto(false)}
            className="mt-auto text-white/60 hover:text-white transition-colors text-xl justify-items-center"
            aria-label="Fechar menu"
          >
            <Minimize2 className="w-6 h-6" />
          </button>
        </aside>
      </div>
    </>
  );
}

export default Aside;
