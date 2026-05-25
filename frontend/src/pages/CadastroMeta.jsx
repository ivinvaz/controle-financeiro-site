import { useNavigate } from "react-router-dom";

function CadastroMeta() {
  const navigate = useNavigate();

  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const anoAtual = new Date().getFullYear();
  const anos = Array.from({ length: 5 }, (_, i) => anoAtual + i);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="flex flex-col gap-4 px-4 py-6 max-w-md mx-auto border-3 border-[#114B5F] rounded-2xl shadow-sm">
      <h2 className=" font-semibold text-base">Nova Meta</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm">
          Nome
          <input
            type="text"
            className="border border-gray-300 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#0d4a5c]"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Mês
          <select className="border border-gray-300 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#0d4a5c]">
            <option value="">Selecione</option>
            {meses.map((mes) => (
              <option key={mes} value={mes}>
                {mes}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Ano
          <select className="border border-gray-300 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#0d4a5c]">
            <option value="">Selecione</option>
            {anos.map((ano) => (
              <option key={ano} value={ano}>
                {ano}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Valor(R$)
          <input
            type="number"
            className="border border-gray-300 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#0d4a5c]"
          />
        </label>

        {/* Mobile: coluna — Desktop: linha */}
        <footer className="flex flex-col md:flex-row gap-3 mt-2">
          <button
            type="submit"
            className="bg-[#0d4a5c] text-white py-2 px-6 rounded-xl text-sm font-medium hover:bg-[#0d6a7c] transition-colors md:flex-1"
          >
            Criar
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-100 text-gray-700 py-2 px-6 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors md:flex-1"
          >
            Cancelar
          </button>

          <button
            type="button"
            className="bg-[#F15025] text-white py-2 px-6 rounded-xl text-sm font-medium hover:bg-orange-600 transition-colors md:flex-1"
          >
            Remover
          </button>
        </footer>
      </form>
    </section>
  );
}

export default CadastroMeta;
