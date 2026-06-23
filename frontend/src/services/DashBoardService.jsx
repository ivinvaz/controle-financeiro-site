import metaService from "./MetaService";
import transacaoServices from "./TransacaoService";
import CategoriaService from "./CategoriaService"; 

const { consultarTodos } = transacaoServices;
const { listar } = metaService;

function SomarValores(lista, campoValor = "valor") {
  return lista.reduce((soma, item) => {
    const valid = Number(item?.[campoValor] ?? 0);
    return soma + valid;
  }, 0); 
}

function AgruparPorCategoria(transacoes, mapaCategorias) {
  const grupos = {};
  transacoes.forEach((transacao) => {
    const categoriaId = transacao.Categoria;
    
    const idString = typeof categoriaId === 'object' && categoriaId !== null 
      ? (categoriaId._id || String(categoriaId))
      : String(categoriaId ?? '').trim();

    const nomeCategoria = mapaCategorias[idString] ?? "Sem categoria";

    if (!grupos[nomeCategoria]) {
      grupos[nomeCategoria] = [];
    }
    grupos[nomeCategoria].push(transacao);
  });
  return grupos;
}

function GetDiasDoMesLabels(referencia = new Date()) {
  const mes = referencia.getMonth();
  const ano = referencia.getFullYear();
  const ultimoDia = new Date(ano, mes + 1, 0).getDate();

  const labels = [];
  for (let dia = 1; dia <= ultimoDia; dia++) labels.push(String(dia));
  return labels;
}

function GetCor(indice) {
  const PALETA_CORES = [
    "#4ade80",
    "#f87171",
    "#60a5fa",
    "#fbbf24",
    "#a78bfa",
    "#34d399",
    "#f472b6",
    "#94a3b8",
  ];
  return PALETA_CORES[indice % PALETA_CORES.length];
}

async function GetTransacoesDate(DataInicio = null, DataFim = null) {
  const resposta = await consultarTodos();
  const transacoes = resposta?.transacoes || resposta?.data || (Array.isArray(resposta) ? resposta : []);

  if (transacoes.length === 0) return [];

  const inicioDoDia = (data) => {
    const d = new Date(data);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  const fimDoDia = (data) => {
    const d = new Date(data);
    d.setHours(23, 59, 59, 999);
    return d;
  };

  let inicio = DataInicio ? inicioDoDia(DataInicio) : null;
  let fim = DataFim ? fimDoDia(DataFim) : null;

  if (!inicio && !fim) {
    const hoje = new Date();
    fim = fimDoDia(new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0));
  }

  return transacoes.filter((transacao) => {
    const dataTransacao = new Date(transacao.dataRealizacao);

    if (inicio && dataTransacao < inicio) return false;
    if (fim && dataTransacao > fim) return false;

    return true;
  });
}

async function GetMetasDate(DataInicio = null, DataFim = null) {
  const resposta = await listar();
  const metas = resposta?.metas || resposta?.data?.metas || (Array.isArray(resposta) ? resposta : []);

  if (metas.length === 0) return [];

  let inicioFiltro = DataInicio ? new Date(DataInicio) : null;
  let fimFiltro = DataFim ? new Date(DataFim) : null;

  if (!inicioFiltro && !fimFiltro) {
    const hoje = new Date();
    inicioFiltro = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    fimFiltro = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0, 23, 59, 59);
  }

  return metas.filter((meta) => {
    const dataValidade = meta.dataValidade || meta.validade || new Date(meta.ano, meta.mes - 1, 1);
    const limiteMeta = new Date(dataValidade);

    return inicioFiltro <= limiteMeta;
  });
}

async function GetSumReceitas(DataInicio = null, DataFim = null) {
  const transacoes = (await GetTransacoesDate(DataInicio, DataFim)) ?? [];
  if (transacoes.length === 0) return 0;
  return SomarValores(transacoes.filter(t => t.natureza === "receita"));
}

async function GetSumDespesas(DataInicio = null, DataFim = null) {
  const transacoes = (await GetTransacoesDate(DataInicio, DataFim)) ?? [];
  if (transacoes.length === 0) return 0;
  return SomarValores(transacoes.filter(t => t.natureza === "despesa"));
}

async function GetSumMetas(DataInicio = null, DataFim = null) {
  const metas = (await GetMetasDate(DataInicio, DataFim)) ?? [];
  return SomarValores(metas, "meta");
}

async function GetDashboardData({
  DataInicio = null,
  DataFim = null,
  receitaAtiva = true,
  despesaAtiva = true,
} = {}) {
  if (!receitaAtiva && !despesaAtiva) {
    return { semDados: true, resumo: null, grafico: null };
  }

  const [todasTransacoes, todasMetas, respostaCategorias] = await Promise.all([
    GetTransacoesDate(DataInicio, DataFim),
    GetMetasDate(DataInicio, DataFim),
    CategoriaService.listar() 
  ]);

  const listaCategorias = respostaCategorias?.data || respostaCategorias?.categorias || (Array.isArray(respostaCategorias) ? respostaCategorias : []);
  const mapaCategorias = {};
  listaCategorias.forEach(cat => {
    if (cat._id && cat.nome) {
      mapaCategorias[cat._id] = cat.nome;
    }
  });

  if (todasTransacoes.length === 0 && todasMetas.length === 0) {
    return { semDados: true, resumo: null, grafico: null };
  }

  const transacoesFiltradas = todasTransacoes.filter((transacao) => {
    if (transacao.natureza === "receita") return receitaAtiva;
    if (transacao.natureza === "despesa") return despesaAtiva;
    return false;
  });

  const transacoesReceita = transacoesFiltradas.filter((t) => t.natureza === "receita");
  const transacoesDespesa = transacoesFiltradas.filter((t) => t.natureza === "despesa");

  const sumReceita = SomarValores(transacoesReceita);
  const sumDespesa = SomarValores(transacoesDespesa);
  const sumMeta = SomarValores(todasMetas, "meta");

  const labels = GetDiasDoMesLabels();
  const ambosAtivos = receitaAtiva && despesaAtiva;

  let pizza;
  if (ambosAtivos) {
    pizza = {
      labels: ["Receitas", "Despesas"],
      datasets: [
        {
          data: [sumReceita, sumDespesa],
          backgroundColor: ["#4ade80", "#f87171"],
        },
      ],
    };
  } else {
    const grupos = AgruparPorCategoria(transacoesFiltradas, mapaCategorias);
    const nomesCategorias = Object.keys(grupos);

    pizza = {
      labels: nomesCategorias,
      datasets: [
        {
          data: nomesCategorias.map((nome) => SomarValores(grupos[nome])),
          backgroundColor: nomesCategorias.map((_, index) => GetCor(index)),
        },
      ],
    };
  }

  const datasetsLinha = [];

  if (ambosAtivos) {
    const movimentacaoPorDia = new Array(labels.length).fill(0);

    transacoesReceita.forEach((t) => {
      const dia = new Date(t.dataRealizacao).getDate();
      if (dia <= labels.length) movimentacaoPorDia[dia - 1] += Number(t.valor || 0);
    });
    
    transacoesDespesa.forEach((t) => {
      const dia = new Date(t.dataRealizacao).getDate();
      if (dia <= labels.length) movimentacaoPorDia[dia - 1] -= Number(t.valor || 0); 
    });

    const saldoAcumuladoPorDia = new Array(labels.length).fill(0);
    let saldoAcumulado = 0;

    for (let i = 0; i < labels.length; i++) {
      saldoAcumulado += movimentacaoPorDia[i];
      saldoAcumuladoPorDia[i] = saldoAcumulado;
    }

    datasetsLinha.push({
      label: "Saldo em Banco",
      data: saldoAcumuladoPorDia,
      borderColor: "#114B5F", 
      backgroundColor: "rgba(17, 75, 95, 0.1)",
      tension: 0.2, 
      fill: false 
    });

  } else {
    const grupos = AgruparPorCategoria(transacoesFiltradas, mapaCategorias);
    const nomesCategorias = Object.keys(grupos);

    nomesCategorias.forEach((nome, i) => {
      const valoresPorDia = new Array(labels.length).fill(0);
      grupos[nome].forEach((t) => {
        const dia = new Date(t.dataRealizacao).getDate();
        if (dia <= labels.length) valoresPorDia[dia - 1] += Number(t.valor || 0);
      });
      datasetsLinha.push({
        label: nome,
        data: valoresPorDia,
        borderColor: GetCor(i),
        backgroundColor: GetCor(i),
      });
    });
  }

  if (ambosAtivos) {
    datasetsLinha.push({
      label: "Metas",
      data: new Array(labels.length).fill(sumMeta),
      borderColor: "#60a5fa",
      backgroundColor: "#60a5fa",
      borderDash: [5, 5],
    });
  }

  return {
    semDados: false,
    resumo: { sumReceita, sumDespesa, sumMeta, margem: sumReceita - sumDespesa },
    grafico: {
      pizza,
      linha: { labels, datasets: datasetsLinha },
    },
  };
}

export {
  GetSumDespesas,
  GetSumMetas,
  GetSumReceitas,
  GetMetasDate,
  GetTransacoesDate,
  GetDashboardData,
};