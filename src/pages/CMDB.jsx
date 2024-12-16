import React, { useState } from "react";
import { FaSearch, FaPlus, FaExclamationCircle, FaUser, FaHome, FaCogs, FaDatabase, FaFileAlt, FaTools } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { Link } from "react-router-dom";

// Componente para os ícones da barra lateral
const SidebarIcon = ({ icon, label, to }) => (
  <Link to={to} className="flex flex-col items-center mb-10 hover:text-white group">
    <div className="text-white text-2xl mb-2 group-hover:scale-110 group-hover:text-gray-800 transition-all duration-200 ease-in-out">
      {icon}
    </div>
    <p className="text-white text-xs group-hover:text-gray-800">{label}</p>
  </Link>
);

// Componente para a barra de pesquisa
const SearchBar = () => (
  <div className="relative flex items-center w-full max-w-2xl mx-auto mt-3 bg-white border border-gray-400 rounded-lg shadow-md">
    <div className="absolute left-3">
      <FaSearch className="text-gray-400" />
    </div>
    <input
      type="text"
      placeholder="Buscar por itens de configuração..."
      className="w-full py-2 pl-10 pr-4 text-lg text-gray-700 rounded-lg focus:outline-none"
    />
  </div>
);

// Componente para as seções de conteúdo com os itens
const ContentSection = ({ title, data, openModal }) => (
  <div className="mt-12 bg-gray-50 p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {data.map((item, index) => (
        <div
          key={index}
          className="p-4 bg-white rounded-lg shadow-md flex flex-col items-center cursor-pointer"
          onClick={() => openModal(item)}
        >
          <div
            className="w-20 h-20 bg-cover bg-center mb-4"
            style={{ backgroundImage: `url(${item.image})` }}
          ></div>
          <p className="text-sm font-semibold text-gray-800">{item.name}</p>
          <p className="text-xs text-gray-600">{item.details}</p>
        </div>
      ))}
    </div>
  </div>
);

// Componente Modal para exibir detalhes do item de configuração
const Modal = ({ isOpen, closeModal, ci }) => {
  if (!isOpen || !ci) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-9 rounded-lg shadow-md flex">
        {/* Imagem do Item */}
        <div className="w-1/3 h-full mr-4">
          <img
            src={ci.image}
            alt={ci.name}
            className="w-full h-48 object-cover rounded-md"
          />
        </div>

        {/* Detalhes do Item */}
        <div className="w-2/3">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Detalhes do Item de Configuração
          </h2>
          <p>
            <strong>Nome:</strong> {ci.name}
          </p>
          <p>
            <strong>ID:</strong> {ci.id}
          </p>
          <p>
            <strong>Categoria:</strong> {ci.category}
          </p>
          <p>
            <strong>Descrição:</strong> {ci.details}
          </p>
          <div className="flex justify-end mt-4">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente Principal da Página CMDB
const CMDB = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCI, setSelectedCI] = useState(null);

  const sidebarIcons = [
    { icon: <FaHome />, label: "Home", to: "/tela" },
    { icon: <FaCogs />, label: "Software", to: "/software" },
    { icon: <FaDatabase />, label: "CMDB", to: "/cmdb" },
    { icon: <FaFileAlt />, label: "Contracts", to: "/contracts" },
    { icon: <FaTools />, label: "Settings", to: "/settings" },
  ];

  const ciData = [
    {
      image: "https://example.com/ci1-logo.png",
      name: "CI A",
      details: "Descrição do Item de Configuração A",
      id: "201",
      category: "Serviço",
    },
    {
      image: "https://example.com/ci2-logo.png",
      name: "CI B",
      details: "Descrição do Item de Configuração B",
      id: "202",
      category: "Hardware",
    },
    {
      image: "https://example.com/ci3-logo.png",
      name: "CI C",
      details: "Descrição do Item de Configuração C",
      id: "203",
      category: "Software",
    },
    {
      image: "https://example.com/ci4-logo.png",
      name: "CI D",
      details: "Descrição do Item de Configuração D",
      id: "204",
      category: "Rede",
    },
  ];

  const openModal = (ci) => {
    setSelectedCI(ci);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCI(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
    
    <div className="absolute w-20 h-full bg-gradient-to-b from-blue-800 to-blue-700 p-9">
    <div className="mb-40"></div>
        {sidebarIcons.map((icon, index) => (
          <SidebarIcon key={index} icon={icon.icon} label={icon.label} to={icon.to} />
        ))}
      </div>

      {/* Conteúdo principal */}
      <div className="ml-24 pt-8 pb-16 px-6">
        {/* Barra de pesquisa e Botões ao lado */}
        <div className="flex items-center justify-center space-x-4">
          <SearchBar />

          {/* Botões de Ação */}
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center">
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

        {/* Seções de conteúdo */}
        <ContentSection title="Itens de Configuração" data={ciData} openModal={openModal} />

        {/* Botão para abrir o modal */}
        <div className="mt-1 flex justify-center">
          <button
            onClick={() => openModal(ciData[0])}
            className="flex items-center justify-center bg-blue-500 text-white rounded-full p-1"
          >
            <FiChevronDown size={30} />
          </button>
        </div>
      </div>

      {/* Modal para mostrar detalhes do item */}
      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        ci={selectedCI}
      />
    </div>
  );
};

export default CMDB;
