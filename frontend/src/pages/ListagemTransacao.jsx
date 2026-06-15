import { useEffect, useState } from "react";
import Conteiner from "../components/Conteiner";
import ListingBlock from "../components/ListingBlock";
import transacaoServices from "../services/TransacaoService";

function ListagemTransacao() {
  const [transacoes, setTransacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarTransacoes() {
      try {
        const resposta = await transacaoServices.consultarTodos();

        const listaFormatada = (resposta.transacoes || []).map((item) => ({
          id: item._id,
          nome: item.nome,
          valor: item.valor,
          tipo: item.natureza,
          categoria: item.Categoria || "Não informado",
          descricao: item.descricao,
          natureza: item.natureza,
        }));

        setTransacoes(listaFormatada);
      } catch (error) {
        setErro(error.message || "Erro ao carregar transações.");
      } finally {
        setCarregando(false);
      }
    }

    carregarTransacoes();
  }, []);

  return (
    <main className="flex flex-1 min-h-screen bg-[#EEE5E9] p-4">
      <Conteiner className="bg-white">
        <h1 className="text-2xl font-bold text-[#114B5F] m-2">
          Listagem de Transações
        </h1>

        {carregando && (
          <p className="m-2 text-slate-600">
            Carregando transações...
          </p>
        )}

        {erro && (
          <p className="m-2 text-red-600">
            {erro}
          </p>
        )}

        {!carregando && !erro && transacoes.length === 0 && (
          <p className="m-2 text-slate-600">
            Nenhuma transação encontrada.
          </p>
        )}

        {!carregando && !erro && transacoes.length > 0 && (
          <ListingBlock
            options={transacoes}
            type="transacoes"
          />
        )}
      </Conteiner>
    </main>
  );
}

export default ListagemTransacao;