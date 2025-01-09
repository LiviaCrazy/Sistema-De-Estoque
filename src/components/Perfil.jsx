import React, { useState, useEffect } from "react";
import { FaUserCircle, FaCamera, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';

function Perfil() {
  const [avatarImage, setAvatarImage] = useState(null);
  const [resumoAtividades, setResumoAtividades] = useState({
    vendasRealizadas: 0,
    produtosEstoque: 0,
    contratosFirmados: 0,
  });
  const [usuario, setUsuario] = useState({
    nome: '',
    email: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarImage(imageUrl);
      localStorage.setItem("avatarImage", imageUrl);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarImage(null);
    localStorage.removeItem("avatarImage");
  };

  useEffect(() => {
    const savedAvatar = localStorage.getItem("avatarImage");
    if (savedAvatar) setAvatarImage(savedAvatar);

    const savedNome = localStorage.getItem("nome");
    const savedEmail = localStorage.getItem("email");

    if (savedNome && savedEmail) {
      setUsuario({
        nome: savedNome,
        email: savedEmail,
      });
    }

    const dadosAtividades = {
      vendasRealizadas: 120,
      produtosEstoque: 50,
      contratosFirmados: 8,
    };
    setResumoAtividades(dadosAtividades);
  }, []);

  const handleGoBack = () => navigate(-1);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleOutsideClick = (event) => {
    if (event.target.id === "modal-overlay") closeModal();
  };

  return (
    <div className="flex w-full h-screen font-sans">

      {/* Seção Esquerda */}
      <motion.div
        className="w-2/5 bg-blue-900 text-white p-8 flex flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Avatar */}
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

        {/* Informações sociais */}
        <motion.div
          className="text-center mb-10"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl">{usuario.nome || "Nome do Usuário"}</h2>
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
      <motion.div
        className="w-3/5 bg-gray-100 p-8 flex flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <motion.div
          className="w-full bg-white p-9 rounded-lg shadow-lg mb-9"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-semibold text-center mb-4">Resumo de Atividades</h3>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 text-left">Atividade</th>
                <th className="py-2 px-4 text-left">Quantidade</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4">Vendas Realizadas</td>
                <td className="py-2 px-4">{resumoAtividades.vendasRealizadas}</td> 
              </tr>
              <tr>
                <td className="py-2 px-4">Produtos em Estoque</td>
                <td className="py-2 px-4">{resumoAtividades.produtosEstoque}</td> 
              </tr>
              <tr>
                <td className="py-2 px-4">Contratos Firmados</td>
                <td className="py-2 px-4">{resumoAtividades.contratosFirmados}</td> 
              </tr>
            </tbody>
          </table>
        </motion.div>

        <motion.button
          onClick={handleGoBack}
          className="bg-blue-900 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-all"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Voltar
        </motion.button>
      </motion.div>

      {/* Modal */}
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
