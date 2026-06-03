/**
 * LineChart
 * 
 * Componente que renderiza um gráfico de linhas usando react-chartjs-2.
 * 
 * Props:
 * - labels: array de strings representando os rótulos do eixo X
 * - datasets: array de objetos no formato esperado pelo Chart.js,
 *   contendo os valores e estilos das linhas (ex: data, borderColor, backgroundColor)
 * 
 * O componente monta o objeto `data` e o passa para o componente <Line />.
 * O gráfico é exibido dentro de um container estilizado com Tailwind,
 * que aplica largura fixa, altura, sombra, borda e arredondamento.
 * 
 */
import { Line } from "react-chartjs-2";

export default function GraficoLinha({labels,datasets}) {
  const data = {
    labels: labels,
    datasets: datasets,
  };

  return (
    <div className="w-[500px] h-[300px] m-4 p-4 shadow-md rounded-xl border">
      <Line data={data} />
    </div>
  );
}
