import React, { useState, useEffect } from "react";
import { FaSearch, FaPlus, FaExclamationCircle, FaUser, FaHome, FaCogs, FaDatabase, FaFileAlt, FaTools, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

// Componente do ícone de barra lateral
const SidebarIcon = ({ icon, label, to }) => (
  <Link to={to} className="flex flex-col items-center mb-10 hover:text-white group">
    <div className="text-white text-2xl mb-2 group-hover:scale-110 group-hover:text-gray-800 transition-all duration-200 ease-in-out">
      {icon}
    </div>
    <p className="text-white text-xs group-hover:text-gray-800">{label}</p>
  </Link>
);

// Barra de pesquisa
const SearchBar = () => (
  <div className="relative flex items-center w-full max-w-2xl mx-auto mt-3 bg-white border border-gray-400 rounded-lg shadow-md">
    <div className="absolute left-3">
      <FaSearch className="text-gray-400" />
    </div>
    <input
      type="text"
      placeholder="Buscar por contratos..."
      className="w-full py-2 pl-10 pr-4 text-lg text-gray-700 rounded-lg focus:outline-none"
    />
  </div>
);

// Componente de exibição dos contratos em lista
const ContentSection = ({ title, data, openModal, deleteContract }) => (
  <div className="mt-12 bg-gray-50 p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
    <ul className="mt-6 space-y-4">
      {data.map((item) => (
        <li
          key={item.id}
          className="p-4 rounded-lg shadow-md flex justify-between items-center cursor-pointer hover:bg-gray-100"
          style={{ backgroundColor: item.bgColor }}
        >
          <div className="flex items-center space-x-4" onClick={() => openModal(item.id)}>
            <div
              className="w-16 h-16 bg-cover bg-center rounded-full"
              style={{ backgroundImage: `url(${item.image})` }}
            ></div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{item.name}</p>
              <p className="text-xs text-gray-600">{item.details}</p>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            {item.startDate} - {item.endDate}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Impede o clique em "Excluir" de abrir o modal
              deleteContract(item.id);
            }}
            className="text-red-500 hover:text-red-700"
          >
            <FaTrashAlt />
          </button>
        </li>
      ))}
    </ul>
  </div>
);

// Modal de edição ou adição do contrato
const Modal = ({ isOpen, closeModal, contract, modifyContract, addContract, handleChange, handleSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-9 rounded-lg shadow-md flex">
        <div className="w-full">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">{contract ? "Editar Contrato" : "Adicionar Contrato"}</h2>
          <form onSubmit={handleSubmit}>
            {Object.keys(contract).map(
              (key) =>
                key !== "id" && key !== "image" && key !== "bgColor" && (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                    {key === "startDate" || key === "endDate" ? (
                      <input
                        type="date"
                        value={contract[key]}
                        onChange={(e) => handleChange(e, key)}
                        className="w-full py-2 mt-2 px-4 border border-gray-300 rounded-lg"
                      />
                    ) : (
                      <input
                        type="text"
                        value={contract[key]}
                        onChange={(e) => handleChange(e, key)}
                        className="w-full py-2 mt-2 px-4 border border-gray-300 rounded-lg"
                      />
                    )}
                  </div>
                )
            )}
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2"
              >
                Fechar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg mr-2"
              >
                {contract ? "Salvar" : "Adicionar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const Contracts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
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
  const [newContract, setNewContract] = useState({
    image: "",
    name: "",
    details: "",
    startDate: "",
    endDate: "",
    value: "",
    parties: "",
  });

  const sidebarIcons = [
    { icon: <FaHome />, label: "Início", to: "/Tela" },
    { icon: <FaCogs />, label: "Software", to: "/software" },
    { icon: <FaDatabase />, label: "CMDB", to: "/cmdb" },
    { icon: <FaFileAlt />, label: "Contratos", to: "/contracts" },
    { icon: <FaTools />, label: "Configurações", to: "/settings" },
  ];

  // Função para abrir o modal de edição ou adição
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

  // Função para fechar o modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedContract(null);
  };

  // Função para adicionar contrato
  const addContract = (newContractData) => {
    const newContract = { ...newContractData, id: Date.now().toString(), bgColor: "#c1e7c7" }; // nova cor para novos contratos
    const updatedContracts = [...contracts, newContract];
    setContracts(updatedContracts);
    localStorage.setItem("contracts", JSON.stringify(updatedContracts)); // Salva no localStorage
    closeModal();
  };

  // Função para modificar o contrato
  const modifyContract = (modifiedContract) => {
    const updatedContracts = contracts.map((c) => (c.id === modifiedContract.id ? modifiedContract : c));
    setContracts(updatedContracts);
    localStorage.setItem("contracts", JSON.stringify(updatedContracts)); // Salva no localStorage
    closeModal();
  };

  // Função para excluir contrato
  const deleteContract = (id) => {
    const updatedContracts = contracts.filter((contract) => contract.id !== id);
    setContracts(updatedContracts);
    localStorage.setItem("contracts", JSON.stringify(updatedContracts)); // Salva no localStorage
  };

  // Função para atualizar os valores dos campos no modal
  const handleChange = (e, key) => {
    setSelectedContract({ ...selectedContract, [key]: e.target.value });
  };

  // Função para submeter a modificação ou adição do contrato
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedContract.id) {
      modifyContract(selectedContract);
    } else {
      addContract(selectedContract);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="absolute w-20 h-full bg-gradient-to-b from-blue-800 to-blue-700 p-9">
        <div className="mb-40"></div>
        {sidebarIcons.map((icon, index) => (
          <SidebarIcon key={index} icon={icon.icon} label={icon.label} to={icon.to} />
        ))}
      </div>

      <div className="ml-24 pt-8 pb-16 px-6">
        <div className="flex items-center justify-center space-x-4">
          <SearchBar />
          <div className="flex space-x-4">
            <button
              onClick={() => openModal()}
              className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center"
            >
              <FaPlus className="mr-2" /> Adicionar
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg flex items-center">
              <FaExclamationCircle className="mr-2" /> Reclamar
            </button>
            <Link to="/perfil">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center">
                <FaUser className="mr-2" /> Perfil
              </button>
            </Link>
          </div>
        </div>

        <ContentSection title="Seção de Contratos" data={contracts} openModal={openModal} deleteContract={deleteContract} />
      </div>

      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        contract={selectedContract}
        modifyContract={modifyContract}
        addContract={addContract}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Contracts;
