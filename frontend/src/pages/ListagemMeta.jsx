import { useEffect, useState } from "react";
import ListingBlock from "../components/ListingBlock";
import * as MetaService from "../services/MetaService";

/**
 * Formata um número como moeda brasileira.
 * Aceita tanto o campo "valor" quanto "meta" da API.
 */
function formatarValor(valor) {
  const numero = Number(valor) || 0;
  return `R$ ${numero.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * Converte o objeto retornado pela API para o formato
 * esperado pelo componente ListingBlock.
 *
 * Campos da API → ListingBlock:
 *   _id | id   → id
 *   nome        → nome
 *   valor | meta → valor  (formatado como moeda)
 *   mes + ano   → categoria (ex: "06/2026")
 *   descricao   → descricao
 *   "meta"      → tipo  (define a cor #B4C5E4 no ListingBlock)
 */
function mapearParaListagem(item) {
  const categoriaData =
    item.mes && item.ano
      ? `${String(item.mes).padStart(2, "0")}/${item.ano}`
      : null;

  return {
    id: String(item._id ?? item.id),
    nome: item.nome || "Meta sem nome",
    valor: formatarValor(item.valor ?? item.meta ?? 0),
    tipo: "meta",
    categoria: categoriaData ?? item.categoria ?? "—",
    descricao: item.descricao || "—",
  };
}

function ListagemMeta() {
  const [metas, setMetas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarMetas() {
      const resultado = await MetaService.listar();

      if (resultado.success) {
        const listaFormatada = (resultado.data || []).map(mapearParaListagem);
        setMetas(listaFormatada);
      } else {
        setErro(resultado.message || "Erro ao carregar metas.");
      }

      setCarregando(false);
    }

    carregarMetas();
  }, []);

  if (carregando) {
    return <p className="m-2 text-slate-600">Carregando metas...</p>;
  }

  if (erro) {
    return <p className="m-2 text-red-600">{erro}</p>;
  }

  if (metas.length === 0) {
    return <p className="m-2 text-slate-600">Nenhuma meta encontrada.</p>;
  }

  return <ListingBlock options={metas} type="meta" />;
}

export default ListagemMeta;
