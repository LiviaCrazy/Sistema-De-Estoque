import React, { useState, useEffect } from "react";
import { FaUserCircle, FaCamera, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Perfil() {
  const [avatarImage, setAvatarImage] = useState(null); // Estado para armazenar a imagem do avatar
  const [usuario, setUsuario] = useState({ nome: "", email: "" }); // Estado para armazenar informações do usuário
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar a exibição do modal de reclamação
  const [dataCounts, setDataCounts] = useState({ graphs: 0, contracts: 0, products: 0 }); // Estado para os dados da tabela
  const navigate = useNavigate(); // Hook para navegação entre rotas

  // Atualiza as informações do avatar e do usuário ao carregar a página
  useEffect(() => {
    const savedAvatar = localStorage.getItem("avatarImage"); // Busca o avatar salvo no localStorage
    if (savedAvatar) setAvatarImage(savedAvatar);

    const usuarioData = localStorage.getItem("usuario"); // Busca as informações do usuário no localStorage
    if (usuarioData) {
      setUsuario(JSON.parse(usuarioData));
    }

    // Busca os dados do localStorage e calcula as quantidades
    const graphs = JSON.parse(localStorage.getItem("graphs")) || [];
    const contracts = JSON.parse(localStorage.getItem("contracts")) || [];
    const products = JSON.parse(localStorage.getItem("contentData")) || [];
    setDataCounts({
      graphs: graphs.length,
      contracts: contracts.length,
      products: products.length,
    });
  }, []);

  // Função para alterar o avatar
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Cria uma URL temporária para o arquivo selecionado
      setAvatarImage(imageUrl);
      localStorage.setItem("avatarImage", imageUrl); // Salva a nova imagem no localStorage
    }
  };

  // Função para remover o avatar
  const handleRemoveAvatar = () => {
    setAvatarImage(null); // Remove a imagem do estado
    localStorage.removeItem("avatarImage"); // Remove a imagem do localStorage
  };

  // Funções para abrir e fechar o modal de reclamação
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleOutsideClick = (event) => {
    if (event.target.id === "modal-overlay") closeModal();
  };

  return (
    <div className="flex w-full h-screen font-sans">
      {/* Seção Esquerda */}
      <div className="flex w-full h-screen font-sans">
  {/* Seção Esquerda */}
  <motion.div
    className="w-2/5 bg-blue-900 text-white p-8 flex flex-col items-center justify-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    {/* Avatar do Usuário */}
    <motion.div
      className="relative w-48 h-48 bg-gray-300 rounded-full border-4 border-white shadow-lg mb-16 flex items-center justify-center"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {avatarImage ? (
        <img
          src={avatarImage}
          alt="Avatar"
          className="w-full h-full object-cover rounded-full"
        />
      ) : (
        <FaUserCircle className="text-9xl text-gray-800" />
      )}
      <label
        htmlFor="avatar-upload"
        className="absolute bottom-0 left-0 bg-blue-900 text-white hover:bg-blue-950 p-2 rounded-full cursor-pointer transition-all"
      >
        <FaCamera />
      </label>
      <button
        onClick={handleRemoveAvatar}
        className="absolute bottom-0 right-0 bg-red-600 text-white hover:bg-red-800 p-2 rounded-full cursor-pointer transition-all"
      >
        <FaTrashAlt />
      </button>
      <input
        id="avatar-upload"
        type="file"
        accept="image/*"
        onChange={handleAvatarChange}
        className="hidden"
      />
    </motion.div>

    {/* Informações do Usuário */}
    <motion.div
      className="text-center mb-10"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold">{usuario.nome || "Nome do Usuário"}</h2>
      <p className="text-lg text-gray-200">{usuario.email || "E-mail do Usuário"}</p>
    </motion.div>

    {/* Botões */}
    <motion.div
      className="flex flex-wrap justify-center gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <button
        className="bg-white text-blue-900 border py-2 px-6 rounded-lg w-64 h-12 transition-all hover:bg-red-600 hover:text-white border-gray-950"
        onClick={openModal}
      >
        Reclamar
      </button>
      <button
        className="bg-white text-blue-900 border py-2 px-6 rounded-lg w-64 h-12 transition-all hover:bg-blue-600 hover:text-white border-gray-950"
        onClick={() => navigate("/esqueci")}
      >
        Mudar Senha
      </button>
      <button
        className="bg-white text-blue-900 border py-2 px-6 rounded-lg w-64 h-12 transition-all hover:bg-blue-600 hover:text-white border-gray-950"
        onClick={() => navigate("/")}
      >
        Sair
      </button>
    </motion.div>
  </motion.div>

  {/* Seção Direita */}
  <div className="w-3/5 bg-white flex flex-col items-center justify-center p-8">
    <h2 className="text-3xl font-bold text-gray-800 mb-6">Resumo das Informações</h2>
    <div className="w-2/3 overflow-hidden rounded-lg shadow-2xl">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gradient-to-r from-blue-600 to-blue-900 text-white">
            <th className="p-4 text-left text-lg font-semibold">Categoria</th>
            <th className="p-4 text-left text-lg font-semibold">Quantidade</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-blue-100 transition-colors">
            <td className="p-4 border-b border-gray-300">Gráficos</td>
            <td className="p-4 border-b border-gray-300">{dataCounts.graphs}</td>
          </tr>
          <tr className="bg-gray-100 hover:bg-blue-100 transition-colors">
            <td className="p-4 border-b border-gray-300">Contratos</td>
            <td className="p-4 border-b border-gray-300">{dataCounts.contracts}</td>
          </tr>
          <tr className="hover:bg-blue-100 transition-colors">
            <td className="p-4">Produtos</td>
            <td className="p-4">{dataCounts.products}</td>
          </tr>
        </tbody>
      </table>
    </div>
      {/* Botão Voltar abaixo da tabela */}
  <motion.button
    onClick={() => navigate(-1)} // Atualizado para usar o hook de navegação para voltar
    className="mt-6 bg-blue-900 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-all"
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.4 }}
  >
    Voltar
  </motion.button>
  </div>
</div>


      {/* Modal de Reclamação */}
      {isModalOpen && (
        <motion.div
          id="modal-overlay"
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-500"
          onClick={handleOutsideClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          
          <motion.div
            className="bg-white p-4 rounded-2xl w-96 shadow-xl transform transition-all duration-300"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-semibold mb-5 text-center bg-gradient-to-r from-red-500 to-red-700 text-white rounded-xl py-3">
              Faça sua Reclamação
            </h3>
            <textarea
              className="w-full p-6 border border-red-600 rounded-lg mb-4 hover:border-red-800 transition-all"
              rows="4"
              placeholder="Fale o seu problema..."
            ></textarea>

            <div className="flex justify-center items-center gap-4">
              <button
                onClick={closeModal}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-800 transition-all"
              >
                Enviar
              </button>
            </div>
          </motion.div>
        </motion.div>
        
      )}
    </div>
  );
}

export default Perfil;
