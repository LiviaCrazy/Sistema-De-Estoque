import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  FaSearch,
  FaHome,
  FaCogs,
  FaDatabase,
  FaFileAlt,
  FaTools,
  FaTrashAlt,
  FaPlus,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Importando o framer-motion

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const SidebarIcon = ({ icon, label, to }) => (
  <Link to={to} className="flex flex-col items-center mb-10 hover:text-white group">
    <motion.div
      className="text-white text-2xl mb-2 group-hover:scale-110 group-hover:text-gray-800 transition-all duration-200 ease-in-out"
      whileHover={{ scale: 1.1 }} // Animação suave ao passar o mouse
    >
      {icon}
    </motion.div>
    <motion.p
      className="text-white text-xs group-hover:text-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {label}
    </motion.p>
  </Link>
);

const SearchBar = ({ searchTerm, onSearchChange }) => (
  <div className="relative flex items-center w-full max-w-2xl mx-auto mt-3 bg-white border border-gray-400 rounded-lg shadow-md">
    <div className="absolute left-3">
      <FaSearch className="text-gray-400" />
    </div>
    <input
      type="text"
      placeholder="Buscar por itens de configuração..."
      className="w-full py-2 pl-10 pr-4 text-lg text-gray-700 rounded-lg focus:outline-none"
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  </div>
);

const CMDBCharts = ({ data, graph, onDelete, onChangeInfo }) => {
  const barData = {
    labels: data.map((ci) => ci.name),
    datasets: [
      {
        label: "Categorias por Item",
        data: data.map((ci) => (ci.category === "Software" ? 10 : 5)),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  const lineData = {
    labels: data.map((ci) => ci.name),
    datasets: [
      {
        label: "ID por Item",
        data: data.map((ci) => parseInt(ci.id, 10)),
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
        text: "Gráficos do CMDB",
      },
    },
  };

  return (
    <motion.div
      className="mt-12 flex gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full lg:w-2/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-center">
            Gráfico {graph.type === "bar" ? "de Barras" : "de Linhas"}
          </h2>
          <button
            onClick={() => onDelete(graph.id)}
            className="text-red-600 hover:text-red-800"
          >
            <FaTrashAlt />
          </button>
        </div>

        <div className="flex mb-4">
          <label htmlFor="customTitle" className="mr-2">
            Título:
          </label>
          <input
            id="customTitle"
            type="text"
            placeholder="Insira o título do gráfico"
            className="border p-2 rounded-lg"
            value={graph.title}
            onChange={(e) => onChangeInfo(graph.id, "title", e.target.value)}
          />
        </div>

        {graph.type === "bar" ? <Bar data={barData} options={options} /> : <Line data={lineData} options={options} />}
      </div>

      <div className="w-full lg:w-1/3 bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold">Detalhes do Gráfico</h3>
        <div className="mt-2">
          <p><strong>Título:</strong> {graph.title || "Sem título"}</p>
          <p><strong>Tipo de gráfico:</strong> {graph.type === "bar" ? "Barras" : "Linhas"}</p>
          <div>
            {graph.produtos && graph.produtos.length > 0 && (
              <>
                <h4 className="mt-4">Produtos:</h4>
                {graph.produtos.map((produto, index) => (
                  <p key={index}>
                    <strong>Produto:</strong> {produto.nome}, <strong>Quantidade:</strong> {produto.quantidade}
                  </p>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CMDB = () => {
  const [ciData, setCiData] = useState([]);
  const [graphs, setGraphs] = useState(() => {
    const savedGraphs = localStorage.getItem("graphs");
    return savedGraphs ? JSON.parse(savedGraphs) : [];
  });
  const [newGraphType, setNewGraphType] = useState("bar");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGraphTitle, setNewGraphTitle] = useState("");
  const [produtos, setProdutos] = useState([{ nome: "", quantidade: "" }]);
  const [searchTerm, setSearchTerm] = useState("");

  const sidebarIcons = [
    { icon: <FaHome />, label: "Inicio", to: "/tela" },
    { icon: <FaDatabase />, label: "CMDB", to: "/cmdb" },
    { icon: <FaFileAlt />, label: "Contratros", to: "/contracts" },
    { icon: <FaTools />, label: "Configurações", to: "/perfil" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const data = [
        { name: "CI A", details: "Item A", id: "201", category: "Serviço" },
        { name: "CI B", details: "Item B", id: "202", category: "Hardware" },
        { name: "CI C", details: "Item C", id: "203", category: "Software" },
        { name: "CI D", details: "Item D", id: "204", category: "Rede" },
      ];
      setCiData(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("graphs", JSON.stringify(graphs));
  }, [graphs]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addNewGraph = () => {
    const newGraph = {
      id: graphs.length + 1,
      title: newGraphTitle,
      type: newGraphType,
      produtos: produtos,
    };
    setGraphs((prevGraphs) => [...prevGraphs, newGraph]);
    closeModal();
  };

  const handleGraphTypeChange = (event) => {
    setNewGraphType(event.target.value);
  };

  const handleGraphTitleChange = (event) => {
    setNewGraphTitle(event.target.value);
  };

  const handleDeleteGraph = (graphId) => {
    setGraphs(graphs.filter((graph) => graph.id !== graphId));
  };

  const handleChangeGraphInfo = (graphId, key, value) => {
    const updatedGraphs = graphs.map((graph) =>
      graph.id === graphId ? { ...graph, [key]: value } : graph
    );
    setGraphs(updatedGraphs);
  };

  const handleAddProduto = () => {
    setProdutos([...produtos, { nome: "", quantidade: "" }]);
  };

  const handleProdutoChange = (index, field, value) => {
    const updatedProdutos = produtos.map((produto, idx) =>
      idx === index ? { ...produto, [field]: value } : produto
    );
    setProdutos(updatedProdutos);
  };

  const filteredGraphs = graphs.filter((graph) =>
    graph.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar fixa */}
      <motion.div
        className="fixed w-28 h-full bg-gradient-to-b from-blue-800 to-blue-700 p-9"
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-52"></div>
        {sidebarIcons.map((icon, index) => (
          <SidebarIcon key={index} icon={icon.icon} label={icon.label} to={icon.to} />
        ))}
      </motion.div>

      {/* Conteúdo da página */}
      <div className="ml-44 pt-8 pb-16 px-6">
        <div className="flex items-center justify-between space-x-4">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <div className="flex items-center space-x-4">
            <div>
              <label htmlFor="graph-type" className="text-lg font-medium text-gray-700 mr-2">
                Escolha o tipo de gráfico:
              </label>
              <select
                id="graph-type"
                value={newGraphType}
                onChange={handleGraphTypeChange}
                className="border p-2 rounded-lg"
              >
                <option value="bar">Gráfico de Barras</option>
                <option value="line">Gráfico de Linhas</option>
              </select>
            </div>
            <button
              onClick={openModal}
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Adicionar Novo Gráfico
            </button>
          </div>
        </div>

        {filteredGraphs.map((graph) => (
          <CMDBCharts
            key={graph.id}
            data={ciData}
            graph={graph}
            onDelete={handleDeleteGraph}
            onChangeInfo={handleChangeGraphInfo}
          />
        ))}
      </div>

      {isModalOpen && (
        <motion.div
          className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Adicionar Novo Gráfico</h3>
            <div className="flex mb-6">
              <label htmlFor="newGraphTitle" className="mr-0">
                Título:
              </label>
              <input
                id="newGraphTitle"
                type="text"
                placeholder="título do gráfico"
                className="border border-gray-200 p-2 rounded-lg w-72"
                value={newGraphTitle}
                onChange={handleGraphTitleChange}
              />
            </div>
            <div className="flex mb-9">
              <label htmlFor="newGraphType" className="mr-2">
                Tipo de Gráfico:
              </label>
              <select
                id="newGraphType"
                value={newGraphType}
                onChange={handleGraphTypeChange}
                className="border p-2 rounded-lg"
              >
                <option value="bar">Gráfico de Barras</option>
                <option value="line">Gráfico de Linhas</option>
              </select>
            </div>

            <button
              onClick={handleAddProduto}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full mb-4"
            >
              Adicionar Produtor
            </button>

            {produtos.map((produto, index) => (
              <div key={index} className="mb-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Adicionar Produto"
                    className="border border-gray-400 p-2 rounded-lg w-1/2"
                    value={produto.nome}
                    onChange={(e) => handleProdutoChange(index, "nome", e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Quantidade"
                    className="border border-gray-400 p-2 rounded-lg w-1/2"
                    value={produto.quantidade}
                    onChange={(e) => handleProdutoChange(index, "quantidade", e.target.value)}
                  />
                </div>
              </div>
            ))}

            <div className="flex justify-end">
              <button
                onClick={addNewGraph}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg"
              >
                Adicionar
              </button>
              <button
                onClick={closeModal}
                className="ml-4 bg-gray-600 text-white py-2 px-4 rounded-lg"
              >
                Cancelar
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CMDB;
