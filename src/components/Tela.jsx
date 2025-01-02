import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { FaHome, FaCogs, FaDatabase, FaFileAlt, FaTools, FaUser, FaPlus, FaExclamationCircle, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";


const SidebarIcon = ({ icon, label, to }) => (
  <Link to={to} className="flex flex-col items-center mb-10 hover:text-white group">
    <div className="text-white text-2xl mb-2 group-hover:scale-110 group-hover:text-gray-800 transition-all duration-200 ease-in-out">
      {icon}
    </div>
    <p className="text-white text-xs group-hover:text-gray-800">{label}</p>
  </Link>
);

const SearchBar = ({ searchTerm, setSearchTerm }) => (
  <div className="relative flex items-center w-full max-w-2xl mx-auto mt-3 bg-white border border-gray-400 rounded-lg shadow-md">
    <div className="absolute left-3">
      <BsSearch className="text-gray-400" />
    </div>
    <input
      type="text"
      placeholder="Buscar por produtos, marcas e muito mais..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full py-2 pl-10 pr-4 text-lg text-gray-700 rounded-lg focus:outline-none"
    />
  </div>
);

const Modal = ({ isOpen, closeModal, handleAddProduct, productDetails }) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    brand: "",
    id: "",
    quantity: "",
    image: "",
    imageSource: "url"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleImageSourceChange = (e) => {
    setNewProduct({ ...newProduct, imageSource: e.target.value, image: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddProduct(newProduct);
    closeModal();
    setNewProduct({ name: "", brand: "", id: "", quantity: "", image: "", imageSource: "url" });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-9 rounded-lg shadow-md">
        {productDetails ? (
          <>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Detalhes do Produto</h2>
            <div className="mb-4">
              <p><strong>Nome:</strong> {productDetails.name}</p>
              <p><strong>Marca:</strong> {productDetails.brand}</p>
              <p><strong>ID:</strong> {productDetails.id}</p>
              <p><strong>Quantidade:</strong> {productDetails.quantity}</p>
              <div>
                <strong>Imagem:</strong>
                {productDetails.imageSource === "url" ? (
                  <img src={productDetails.image} alt={productDetails.name} className="w-32 h-32 mt-2" />
                ) : (
                  <img src={productDetails.image} alt={productDetails.name} className="w-32 h-32 mt-2" />
                )}
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2"
              >
                Fechar
              </button>
            </div>
          </>
        ) : (
          <>
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
                <label className="block text-sm font-medium text-gray-700">Imagem</label>
                <div className="flex items-center mb-4">
                  <label className="mr-4">
                    <input
                      type="radio"
                      name="imageSource"
                      value="url"
                      checked={newProduct.imageSource === "url"}
                      onChange={handleImageSourceChange}
                    /> URL
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="imageSource"
                      value="file"
                      checked={newProduct.imageSource === "file"}
                      onChange={handleImageSourceChange}
                    /> Galeria
                  </label>
                </div>
                {newProduct.imageSource === "url" ? (
                  <input
                    type="text"
                    name="image"
                    value={newProduct.image}
                    onChange={handleChange}
                    className="w-full py-2 px-4 border border-gray-300 rounded-lg"
                    placeholder="Insira o URL da imagem"
                  />
                ) : (
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full py-2 px-4 border border-gray-300 rounded-lg"
                  />
                )}
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
          </>
        )}
      </div>
    </div>
  );
};

const Tela = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");  // Adicionado para armazenar o termo da pesquisa
  const [contentData, setContentData] = useState(() => {
    const savedData = localStorage.getItem("contentData");
    return savedData ? JSON.parse(savedData) : [];
  });

  const openModal = (product = null) => {
    setProductDetails(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setProductDetails(null);
  };

  const handleAddProduct = (product) => {
    const updatedContentData = [...contentData, product];
    setContentData(updatedContentData);
    localStorage.setItem("contentData", JSON.stringify(updatedContentData));
  };

  const handleDeleteProduct = (productId) => {
    const updatedContentData = contentData.filter((product) => product.id !== productId);
    setContentData(updatedContentData);
    localStorage.setItem("contentData", JSON.stringify(updatedContentData));
  };

  // Filtrando os produtos conforme o termo de pesquisa
  const filteredData = contentData.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="absolute w-20 h-full bg-gradient-to-b from-blue-800 to-blue-700 p-9">
        <div className="mb-40"></div>
        <SidebarIcon icon={<FaHome />} label="Home" to="/Tela" />
        <SidebarIcon icon={<FaCogs />} label="Software" to="/software" />
        <SidebarIcon icon={<FaDatabase />} label="CMDB" to="/CMDB" />
        <SidebarIcon icon={<FaFileAlt />} label="Contracts" to="/contracts" />
        <SidebarIcon icon={<FaTools />} label="Settings" to="/perfil" />
      </div>

      <div className="ml-24 pt-10 pb-16 px-8">
        <div className="flex items-center justify-center space-x-4">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <div className="flex space-x-4">
            <button
              onClick={() => openModal()}
              className="bg-blue-600 text-white py-2 px-6 rounded-lg flex items-center"
            >
              <FaPlus className="mr-5" /> Adicionar
            </button>
          </div>
        </div>

        <div className="mt-12 bg-gray-50 p-6 rounded-lg shadow-md border border-gray-300">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Produtos</h2>
          <table className="min-w-full mt-6 border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border border-gray-300 text-center ">Nome</th>
                <th className="px-4 py-2 border border-gray-300 text-center">Marca</th>
                <th className="px-4 py-2 border border-gray-300 text-center">ID</th>
                <th className="px-4 py-2 border border-gray-300 text-center">Quantidade</th>
                <th className="px-4 py-2 border border-gray-300 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((product, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td
                    onClick={() => openModal(product)}
                    className="px-4 py-2 border border-gray-300 text-blue-600 cursor-pointer"
                  >
                    {product.name}
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

      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        handleAddProduct={handleAddProduct}
        productDetails={productDetails}
      />
    </div>
  );
};

export default Tela;