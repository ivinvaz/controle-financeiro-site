/**
 * PieChart
 * 
 * Componente que renderiza um gráfico de pizza usando react-chartjs-2.
 * 
 * Props:
 * - labels: array de strings representando os rótulos das fatias
 * - datasets: array de objetos no formato esperado pelo Chart.js,
 *   contendo os valores e estilos de cada fatia (ex: data, backgroundColor)
 * 
 * O componente monta o objeto `data` e o passa para o componente <Pie />.
 * O gráfico é exibido dentro de um container estilizado com Tailwind,
 * que aplica largura fixa, altura, sombra, borda e arredondamento.
 * 
 */

import { Pie } from "react-chartjs-2";

export default function GraficoPizza({labels,datasets}) {
  const data = {
    labels: labels,
    datasets: datasets,
  };

  return (
    <div className="w-[300px] h-[300px] m-4 p-4 shadow-md rounded-xl border">
      <Pie data={data} />
    </div>
  );
}
