import { useEffect, useState } from "react";
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

  if (carregando) {
    return <p className="m-2 text-slate-600">Carregando transações...</p>;
  }

  if (erro) {
    return <p className="m-2 text-red-600">{erro}</p>;
  }

  if (transacoes.length === 0) {
    return <p className="m-2 text-slate-600">Nenhuma transação encontrada.</p>;
  }

  return <ListingBlock options={transacoes} type="transacoes" />;
}

export default ListagemTransacao;