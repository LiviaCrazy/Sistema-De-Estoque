// App.js
import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";

// Registrando os componentes necessários para Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const App = () => {
  // Dados para os gráficos
  const barData = {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio"],
    datasets: [
      {
        label: "Vendas (R$)",
        data: [3000, 2000, 4000, 5000, 6000],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  const lineData = {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio"],
    datasets: [
      {
        label: "Crescimento (%)",
        data: [5, 10, 15, 20, 25],
        borderColor: "rgba(255, 99, 132, 0.5)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Gráficos de Exemplo",
      },
    },
  };

  return (
    <div style={{ width: "80%", margin: "0 auto", textAlign: "center" }}>
      <h1>Gráficos em React</h1>
      <div>
        <h2>Gráfico de Barras</h2>
        <Bar data={barData} options={options} />
      </div>
      <div>
        <h2>Gráfico de Linhas</h2>
        <Line data={lineData} options={options} />
      </div>
    </div>
  );
};

export default App;