import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import { Link } from "react-router-dom"; // Importando o Link
import {
  FaHome,
  FaCogs,
  FaDatabase,
  FaFileAlt,
  FaTools,
  FaUser,
  FaPlus,
  FaExclamationCircle,
  FaTrash, // Ícone de lixeira para o botão de deletar
} from "react-icons/fa"; // Adicionando ícones para os botões

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
      <BsSearch className="text-gray-400" />
    </div>
    <input
      type="text"
      placeholder="Buscar por produtos, marcas e muito mais..."
      className="w-full py-2 pl-10 pr-4 text-lg text-gray-700 rounded-lg focus:outline-none"
    />
  </div>
);

// Componente do Modal para adicionar um produto
const Modal = ({ isOpen, closeModal, handleAddProduct }) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    brand: "",
    id: "",
    quantity: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddProduct(newProduct);
    closeModal();
    setNewProduct({ name: "", brand: "", id: "", quantity: "", image: "" }); // Limpa os campos
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-9 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Adicionar Produto</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleChange}
              className="w-full py-2 px-4 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Marca</label>
            <input
              type="text"
              name="brand"
              value={newProduct.brand}
              onChange={handleChange}
              className="w-full py-2 px-4 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">ID</label>
            <input
              type="text"
              name="id"
              value={newProduct.id}
              onChange={handleChange}
              className="w-full py-2 px-4 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Quantidade</label>
            <input
              type="number"
              name="quantity"
              value={newProduct.quantity}
              onChange={handleChange}
              className="w-full py-2 px-4 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Imagem URL</label>
            <input
              type="text"
              name="image"
              value={newProduct.image}
              onChange={handleChange}
              className="w-full py-2 px-4 border border-gray-300 rounded-lg"
            />
          </div>
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
              className="px-4 py-2 bg-green-500 text-white rounded-lg"
            >
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Componente Modal para exibir informações do produto
const ProductDetailModal = ({ isOpen, closeModal, product }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-9 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Detalhes do Produto</h2>
        <div className="mb-4">
          <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-lg mb-4" />
          <p><strong>Nome:</strong> {product.name}</p>
          <p><strong>Marca:</strong> {product.brand}</p>
          <p><strong>ID:</strong> {product.id}</p>
          <p><strong>Quantidade:</strong> {product.quantity}</p>
        </div>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente Principal
const Tela = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProductDetailModalOpen, setIsProductDetailModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [contentData, setContentData] = useState([
    {
      name: "Fone de Ouvido Bluetooth",
      brand: "Edifier",
      id: "123456",
      quantity: "10",
      image: "https://example.com/earphone.jpg", // Exemplo de imagem
    },
    {
      name: "Produto Marca A",
      brand: "Marca A",
      id: "654321",
      quantity: "20",
      image: "https://example.com/productA.jpg",
    },
    {
      name: "Produto Marca B",
      brand: "Marca B",
      id: "789123",
      quantity: "30",
      image: "https://example.com/productB.jpg",
    },
    {
      name: "Produto Marca C",
      brand: "Marca C",
      id: "321987",
      quantity: "40",
      image: "https://example.com/productC.jpg",
    },
  ]);

  // Função para abrir o modal de adição de produto
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Função para fechar o modal de adição de produto
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Função para abrir o modal de detalhes do produto
  const openProductDetailModal = (product) => {
    setSelectedProduct(product);
    setIsProductDetailModalOpen(true);
  };

  // Função para fechar o modal de detalhes do produto
  const closeProductDetailModal = () => {
    setIsProductDetailModalOpen(false);
  };

  // Função para adicionar o produto
  const handleAddProduct = (product) => {
    setContentData([...contentData, product]);
  };

  // Função para deletar o produto
  const handleDeleteProduct = (productId) => {
    const updatedProducts = contentData.filter((product) => product.id !== productId);
    setContentData(updatedProducts);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Barra lateral */}
      <div className="absolute w-20 h-full bg-gradient-to-b from-blue-800 to-blue-700 p-9">
        <div className="mb-40"></div>
        <SidebarIcon icon={<FaHome />} label="Home" to="/Tela" />
        <SidebarIcon icon={<FaCogs />} label="Software" to="/software" />
        <SidebarIcon icon={<FaDatabase />} label="CMDB" to="/CMDB" />
        <SidebarIcon icon={<FaFileAlt />} label="Contracts" to="/contracts" />
        <SidebarIcon icon={<FaTools />} label="Settings" to="/settings" />
      </div>

      {/* Conteúdo principal */}
      <div className="ml-24 pt-8 pb-16 px-6">
        {/* Barra de pesquisa */}
        <div className="flex items-center justify-center space-x-4">
          <SearchBar />
          <div className="flex space-x-4">
            <button
              onClick={openModal}
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

        {/* Exibir produtos em uma tabela */}
        <div className="mt-12 bg-gray-50 p-6 rounded-lg shadow-md border border-gray-300">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Produtos</h2>
          <table className="min-w-full mt-6 border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border border-gray-300 text-left">Nome</th>
                <th className="px-4 py-2 border border-gray-300 text-left">Marca</th>
                <th className="px-4 py-2 border border-gray-300 text-left">ID</th>
                <th className="px-4 py-2 border border-gray-300 text-left">Quantidade</th>
                <th className="px-4 py-2 border border-gray-300 text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              {contentData.map((product, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="px-4 py-2 border border-gray-300">
                    <button onClick={() => openProductDetailModal(product)} className="text-blue-500 hover:text-blue-700">
                      {product.name}
                    </button>
                  </td>
                  <td className="px-4 py-2 border border-gray-300">{product.brand}</td>
                  <td className="px-4 py-2 border border-gray-300">{product.id}</td>
                  <td className="px-4 py-2 border border-gray-300">{product.quantity}</td>
                  <td className="px-4 py-2 border border-gray-300 text-center">
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash className="inline-block" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para adicionar produto */}
      <Modal isOpen={isModalOpen} closeModal={closeModal} handleAddProduct={handleAddProduct} />

      {/* Modal para exibir detalhes do produto */}
      {selectedProduct && (
        <ProductDetailModal
          isOpen={isProductDetailModalOpen}
          closeModal={closeProductDetailModal}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default Tela;
