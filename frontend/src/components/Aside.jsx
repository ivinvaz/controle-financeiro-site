import { Link, useLocation } from "react-router-dom";

function Aside() {
  const { pathname } = useLocation();

  const links = [
    { to: "/", label: "Dashboard" },
    { to: "/transacoes", label: "Transações" },
    { to: "/metas", label: "Metas" },
  ];

  return (
    <aside className="w-52 min-h-screen bg-[#0d4a5c] flex flex-col gap-6 px-5 py-8">
      <h2 className="text-white text-lg font-medium text-center tracking-wide pb-2 border-b-2 border-white/30">
        Menu
      </h2>

      <nav>
        <ul className="flex flex-col gap-3">
          {links.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-sm text-[#e8f4f8] border border-white/15 transition-colors
                  ${
                    pathname === to
                      ? "bg-white/20"
                      : "bg-white/10 hover:bg-white/15"
                  }`}
              >
                <span>{label}</span>
              </Link>
            </li>
          ))}

          <li>
            <Link
              to="/login"
              className="flex items-center justify-between px-14 py-0 rounded-lg text-sm text-[#e8f4f8] border border-white/15 bg-white/10 hover:bg-white/15 transition-colors"
            >
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Aside;
