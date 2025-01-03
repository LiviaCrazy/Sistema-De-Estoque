import React, { useState, useEffect } from "react";
import { FaSearch, FaPlus, FaExclamationCircle, FaHome, FaCogs, FaDatabase, FaFileAlt, FaTools, FaTrashAlt, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";




// Componente SidebarIcon - Exibe um ícone de link na barra lateral
const SidebarIcon = ({ icon, label, to }) => (
  <Link to={to} className="flex flex-col items-center mb-10 hover:text-white group">
    <div className="text-white text-2xl mb-2 group-hover:scale-110 group-hover:text-gray-800 transition-all duration-200 ease-in-out">
      {icon}
    </div>
    <p className="text-white text-xs group-hover:text-gray-800">{label}</p>
  </Link>
);

// Componente SearchBar - Campo de busca para filtrar contratos
const SearchBar = ({ searchTerm, onSearchChange }) => (
  <div className="relative flex items-center w-full max-w-2xl mx-auto mt-3 bg-white border border-gray-400 rounded-lg shadow-md">
    <div className="absolute left-3">
      <FaSearch className="text-gray-400" />
    </div>
    <input
      type="text"
      placeholder="Buscar por contratos..."
      className="w-full py-2 pl-10 pr-4 text-lg text-gray-700 rounded-lg focus:outline-none"
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)} // Atualiza o termo de busca
    />
  </div>
);

// Componente ContentSection - Exibe uma seção com lista de contratos
const ContentSection = ({ title, data, openModal, deleteContract, viewDetails }) => (
  <div className="mt-12 bg-gray-50 p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
    <ul className="mt-6 space-y-4">
      {data.map((item) => (
        <li
          key={item.id}
          className="p-4 rounded-lg shadow-md flex justify-between items-center cursor-pointer hover:bg-gray-100"
          style={{ backgroundColor: item.bgColor }} // Cor de fundo do contrato
        >
          <div className="flex items-center space-x-4">
            <div
              className="w-16 h-16 bg-cover bg-center rounded-full"
              style={{ backgroundImage: `url(${item.image})` }} // Imagem do contrato
            ></div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{item.name}</p>
              <p className="text-xs text-gray-600">{item.details}</p>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            {item.startDate} - {item.endDate}
          </div>
          <div className="flex space-x-3">
            {/* Botões para excluir e visualizar contrato */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteContract(item.id);
              }}
              className="text-red-500 hover:text-red-700"
            >
              <FaTrashAlt />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                viewDetails(item.id);
              }}
              className="text-blue-500 hover:text-blue-700"
            >
              <FaEye />
            </button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);


// Componente ContractModal - Modal para adicionar ou editar contrato
const ContractModal = ({ isOpen, closeModal, contract, handleChange, handleSubmit }) => {
  if (!isOpen) return null; // Não renderiza se o modal não estiver aberto

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white p-9 rounded-lg shadow-md flex flex-col w-96">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">{contract.id ? 'Editar Contrato' : 'Adicionar Contrato'}</h2>
        <div className="space-y-4">
          {/* Formulário para editar ou adicionar contrato */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Nome</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={contract.name}
              onChange={(e) => handleChange(e, 'name')}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Detalhes</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={contract.details}
              onChange={(e) => handleChange(e, 'details')}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Valor</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={contract.value}
              onChange={(e) => handleChange(e, 'value')}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Partes envolvidas</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={contract.parties}
              onChange={(e) => handleChange(e, 'parties')}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Data de Início</label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={contract.startDate}
              onChange={(e) => handleChange(e, 'startDate')}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Data de Término</label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={contract.endDate}
              onChange={(e) => handleChange(e, 'endDate')}
            />
          </div>
        </div>
        <div className="flex justify-end mt-6">
          {/* Botões para salvar ou fechar o modal */}
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            {contract.id ? 'Salvar' : 'Adicionar'}
          </button>
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg ml-2"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

const Contracts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Controle do modal
  const [selectedContract, setSelectedContract] = useState(null); // Contrato selecionado
  const [contracts, setContracts] = useState(
    JSON.parse(localStorage.getItem("contracts")) || [
      {
        image: "https://example.com/contract1-logo.png",
        name: "Contrato A",
        details: "Descrição do Contrato A",
        id: "201",
        startDate: "2023-01-01",
        endDate: "2024-01-01",
        value: "R$ 10.000,00",
        parties: "Empresa X, Empresa Y",
        bgColor: "#f0f4f8",
      },
    ]
  );
  const [searchTerm, setSearchTerm] = useState(""); // Termo de busca

  const sidebarIcons = [
    { icon: <FaHome />, label: "Início", to: "/Tela" },
    { icon: <FaDatabase />, label: "CMDB", to: "/cmdb" },
    { icon: <FaFileAlt />, label: "Contratos", to: "/contracts" },
    { icon: <FaTools />, label: "Configurações", to: "/perfil" },
  ];

  // Função para abrir o modal de adicionar/editar contrato
  const openModal = (contractId) => {
    if (contractId) {
      const contract = contracts.find((c) => c.id === contractId);
      setSelectedContract({ ...contract });
    } else {
      setSelectedContract({
        image: "",
        name: "",
        details: "",
        startDate: "",
        endDate: "",
        value: "",
        parties: "",
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedContract(null);
  };
// Função para adicionar um novo contrato
const addContract = (newContractData) => {
  // Escolher uma cor aleatória entre azul-celeste  e azul-pó 
  const colors = ["#87ceeb", "#b0e0e6"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  const newContract = { 
    ...newContractData, 
    id: Date.now().toString(), 
    bgColor: randomColor // Adiciona a cor aleatória
  };
  const updatedContracts = [...contracts, newContract];
  setContracts(updatedContracts);
  localStorage.setItem("contracts", JSON.stringify(updatedContracts));
  closeModal();
};
  // Função para modificar um contrato existente
  const modifyContract = (modifiedContract) => {
    const updatedContracts = contracts.map((c) => (c.id === modifiedContract.id ? modifiedContract : c));
    setContracts(updatedContracts);
    localStorage.setItem("contracts", JSON.stringify(updatedContracts));
    closeModal();
  };

  // Função para excluir contrato
  const deleteContract = (id) => {
    const updatedContracts = contracts.filter((contract) => contract.id !== id);
    setContracts(updatedContracts);
    localStorage.setItem("contracts", JSON.stringify(updatedContracts));
  };

  // Função para atualizar os dados do contrato no modal
  const handleChange = (e, key) => {
    setSelectedContract({ ...selectedContract, [key]: e.target.value });
  };

  // Função para enviar o formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedContract.id) {
      modifyContract(selectedContract);
    } else {
      addContract(selectedContract);
    }
  };

  // Filtra os contratos com base no termo de busca
  const filteredContracts = contracts.filter((contract) =>
    contract.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Barra lateral fixa */}
      <div className="fixed w-20 h-full bg-gradient-to-b from-blue-800 to-blue-700 p-9">
        <div className="mb-40"></div>
        {sidebarIcons.map((icon, index) => (
          <SidebarIcon key={index} icon={icon.icon} label={icon.label} to={icon.to} />
        ))}
      </div>

      <div className="ml-24 pt-8 pb-16 px-6">
        {/* Barra de busca e botões */}
        <div className="flex items-center justify-center space-x-4">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <div className="flex space-x-4">
            <button
              onClick={() => openModal()}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center"
            >
              <FaPlus className="mr-2" /> Adicionar
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg flex items-center">
              <FaExclamationCircle className="mr-2" /> Reclamar
            </button>
          </div>
        </div>

        {/* Seção de contratos */}
        <ContentSection
          title="Seção de Contratos"
          data={filteredContracts}
          openModal={openModal}
          deleteContract={deleteContract}
          viewDetails={openModal}
        />
      </div>

      {/* Modal para adicionar ou editar contratos */}
      <ContractModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        contract={selectedContract}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Contracts;
