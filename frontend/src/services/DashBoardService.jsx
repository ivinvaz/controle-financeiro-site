import metaService from "./MetaService";
import transacaoServices from "./TransacaoService";

const { consultarTodos } = transacaoServices;
const { listar } = metaService;

function SomarValores(lista, campoValor = "valor") {
  return lista.reduce((soma, item) => {
    const valid = Number(item?.[campoValor] ?? 0);
    return soma + valid ? valid : 0;
  });
}

function AgruparPorCategoria(transacoes) {
  const grupos = {};
  transacoes.forEach((transacao) => {
    const nomeCategoria = transacao.Categoria?.nome ?? "Sem categoria";
    if (!grupos[nomeCategoria]) grupos[nomeCategoria] = [];
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
  const transacoes = resposta?.data || (Array.isArray(resposta) ? resposta : []);

  if (transacoes.length === 0) return [];
  let transacoesFiltradas = null;

  if (DataFim === null && DataInicio === null) {
    const hoje = new Date();
    const mesAtual = hoje.getMonth();
    const anoAtual = hoje.getFullYear();

    transacoesFiltradas = transacoes.filter((transacao) => {
      const data = new Date(transacao.dataRealizacao);
      return data.getMonth() === mesAtual && data.getFullYear() === anoAtual;
    });
  } else if (DataInicio !== null && DataFim === null) {
    const inicio = new Date(DataInicio);
    transacoesFiltradas = transacoes.filter((transacao) => {
      const data = new Date(transacao.dataRealizacao);
      return data > inicio;
    });
  } else if (DataInicio === null && DataFim !== null) {
    const fim = new Date(DataFim);
    transacoesFiltradas = transacoes.filter((transacao) => {
      const data = new Date(transacao.dataRealizacao);
      return data < fim;
    });
  } else if (DataInicio !== null && DataFim !== null) {
    const inicio = new Date(DataInicio);
    const fim = new Date(DataFim);
    transacoesFiltradas = transacoes.filter((transacao) => {
      const data = new Date(transacao.dataRealizacao);
      return data > inicio && data < fim;
    });
  }

  return transacoesFiltradas ?? [];
}

async function GetMetasDate(DataInicio = null, DataFim = null) {
  const resposta = await listar();
  const metas = resposta?.data?.metas || [];

  if (metas.length === 0) return [];
  let metasFiltradas = null;

  if (DataInicio === null && DataFim === null) {
    const hoje = new Date();
    const mesAtual = hoje.getMonth();
    const anoAtual = hoje.getFullYear();

    metasFiltradas = metas.filter((meta) => {
      return meta.mes === mesAtual && meta.ano === anoAtual;
    });
  } else if (DataInicio !== null && DataFim === null) {
    const inicio = new Date(DataInicio);
    const mesInicio = inicio.getMonth();
    const anoInicio = inicio.getFullYear();

    metasFiltradas = metas.filter((meta) => {
      return (
        meta.ano > anoInicio ||
        (meta.ano === anoInicio && meta.mes >= mesInicio)
      );
    });
  } else if (DataInicio === null && DataFim !== null) {
    const fim = new Date(DataFim);
    const mesFim = fim.getMonth();
    const anoFim = fim.getFullYear();

    metasFiltradas = metas.filter((meta) => {
      return meta.ano < anoFim || (meta.ano === anoFim && meta.mes <= mesFim);
    });
  } else {
    const inicio = new Date(DataInicio);
    const fim = new Date(DataFim);
    const mesInicio = inicio.getMonth();
    const anoInicio = inicio.getFullYear();
    const mesFim = fim.getMonth();
    const anoFim = fim.getFullYear();

    metasFiltradas = metas.filter((meta) => {
      const depoisDoInicio =
        meta.ano > anoInicio ||
        (meta.ano === anoInicio && meta.mes >= mesInicio);
      const antesDoFim =
        meta.ano < anoFim || (meta.ano === anoFim && meta.mes <= mesFim);
      return depoisDoInicio && antesDoFim;
    });
  }

  return metasFiltradas ?? [];
}

async function GetSumReceitas(DataInicio = null, DataFim = null) {
  const transacoes = (await GetTransacoesDate(DataInicio, DataFim)) ?? [];
  if (transacoes.length === 0) return 0;

  const transacoesReceita = transacoes.filter(
    (transacao) => transacao.natureza === "receita",
  );
  const sumReceita = SomarValores(transacoesReceita);

  return sumReceita;
}

async function GetSumDespesas(DataInicio = null, DataFim = null) {
  const transacoes = (await GetTransacoesDate(DataInicio, DataFim)) ?? [];
  if (transacoes.length === 0) return 0;

  const transacoesDespesa = transacoes.filter(
    (transacao) => transacao.natureza === "despesa",
  );
  const sumDespesa = SomarValores(transacoesDespesa);

  return sumDespesa;
}

async function GetSumMetas(DataInicio = null, DataFim = null) {
  const metas = (await GetMetasDate(DataInicio, DataFim)) ?? [];
  if (metas.length === 0) return 0;

  const sumMeta = SomarValores(metas, "meta");

  return sumMeta;
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

  const [todasTransacoes, todasMetas] = await Promise.all([
    GetTransacoesDate(DataInicio, DataFim),
    GetMetasDate(DataInicio, DataFim),
  ]);

  if (todasTransacoes.length === 0 && todasMetas.length === 0) {
    return { semDados: true, resumo: null, grafico: null };
  }

  const transacoesFiltradas = todasTransacoes.filter((transacao) => {
    if (transacao.natureza === "receita") return receitaAtiva;
    if (transacao.natureza === "despesa") return despesaAtiva;
    return false;
  });

  const transacoesReceita = transacoesFiltradas.filter(
    (transacao) => transacao.natureza === "receita",
  );
  const transacoesDespesa = transacoesFiltradas.filter(
    (transacao) => transacao.natureza === "despesa",
  );

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
    const grupos = AgruparPorCategoria(transacoesFiltradas);
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
    const receitaPorDia = new Array(labels.length).fill(0);
    const despesaPorDia = new Array(labels.length).fill(0);

    transacoesReceita.forEach((t) => {
      const dia = new Date(t.dataRealizacao).getDate();
      receitaPorDia[dia - 1] += t.valor;
    });
    transacoesDespesa.forEach((t) => {
      const dia = new Date(t.dataRealizacao).getDate();
      despesaPorDia[dia - 1] += t.valor;
    });

    datasetsLinha.push(
      {
        label: "Receitas",
        data: receitaPorDia,
        borderColor: "#4ade80",
        backgroundColor: "#4ade80",
      },
      {
        label: "Despesas",
        data: despesaPorDia,
        borderColor: "#f87171",
        backgroundColor: "#f87171",
      },
    );
  } else {
    const grupos = AgruparPorCategoria(transacoesFiltradas);
    const nomesCategorias = Object.keys(grupos);

    nomesCategorias.forEach((nome, i) => {
      const valoresPorDia = new Array(labels.length).fill(0);
      grupos[nome].forEach((t) => {
        const dia = new Date(t.dataRealizacao).getDate();
        valoresPorDia[dia - 1] += t.valor;
      });
      datasetsLinha.push({
        label: nome,
        data: valoresPorDia,
        borderColor: GetCor(i),
        backgroundColor: GetCor(i),
      });
    });
  }

  datasetsLinha.push({
    label: "Metas",
    data: new Array(labels.length).fill(sumMeta),
    borderColor: "#60a5fa",
    backgroundColor: "#60a5fa",
    borderDash: [5, 5],
  });

  return {
    semDados: false,
    resumo: {
      sumReceita,
      sumDespesa,
      sumMeta,
      margem: sumReceita - sumDespesa,
    },
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
