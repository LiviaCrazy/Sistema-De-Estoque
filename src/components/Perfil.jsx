import React, { useState, useEffect } from "react";
import { FaUserCircle, FaCamera, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

function Perfil() {
  // Estado para armazenar a imagem do avatar
  const [avatarImage, setAvatarImage] = useState(null);

  // Estado para armazenar os dados do resumo de atividades
  const [resumoAtividades, setResumoAtividades] = useState({
    vendasRealizadas: 0,
    produtosEstoque: 0,
    contratosFirmados: 0,
  });

  // Estado para armazenar o nome e e-mail do usuário
  const [usuario, setUsuario] = useState({
    nome: '',
    email: ''
  });

  // Estado para controlar a visibilidade do modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hook para navegação
  const navigate = useNavigate();

  // Função para lidar com a seleção da imagem
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Cria uma URL temporária para a imagem selecionada
      const imageUrl = URL.createObjectURL(file);
      setAvatarImage(imageUrl);
      // Salva a imagem no localStorage
      localStorage.setItem("avatarImage", imageUrl);
    }
  };

  // Função para remover a imagem do avatar
  const handleRemoveAvatar = () => {
    setAvatarImage(null);
    // Remove a imagem do localStorage
    localStorage.removeItem("avatarImage");
  };

  // Carregar a imagem do localStorage e as informações do usuário quando o componente for montado
  useEffect(() => {
    const savedAvatar = localStorage.getItem("avatarImage");
    if (savedAvatar) {
      setAvatarImage(savedAvatar);
    }

    // Carregar as informações do usuário (nome e e-mail)
    const savedNome = localStorage.getItem("nome");
    const savedEmail = localStorage.getItem("email");

    if (savedNome && savedEmail) {
      setUsuario({
        nome: savedNome,
        email: savedEmail,
      });
    }

    // Simulação de dados do resumo de atividades
    const dadosAtividades = {
      vendasRealizadas: 120, // Exemplo de vendas realizadas
      produtosEstoque: 50,  // Exemplo de produtos em estoque
      contratosFirmados: 8, // Exemplo de contratos firmados
    };
    setResumoAtividades(dadosAtividades);
  }, []);

  // Função para voltar para a página anterior
  const handleGoBack = () => {
    navigate(-1); // Volta para a página anterior no histórico
  };

  // Função para abrir o modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Função para fechar o modal ao clicar fora
  const handleOutsideClick = (event) => {
    if (event.target.id === "modal-overlay") {
      closeModal();
    }
  };

  return (
    <div className="flex w-full h-screen font-sans">

      {/* Seção Esquerda */}
      <div className="w-2/5 bg-blue-900 text-white p-8 flex flex-col items-center justify-center">
        {/* Avatar */}
        <div className="relative w-48 h-48 bg-gray-300 rounded-full border-4 border-white shadow-lg mb-16 flex items-center justify-center">
          {/* Se houver uma imagem, exibe a imagem, caso contrário exibe o ícone de avatar */}
          {avatarImage ? (
            <img
              src={avatarImage}
              alt="Avatar"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <FaUserCircle className="text-9xl text-gray-800" /> // Ícone de usuário do react-icons
          )}

          {/* Ícone para trocar a imagem */}
          <label
            htmlFor="avatar-upload"
            className="absolute bottom-0 left-0 bg-blue-900 text-white hover:bg-blue-950 p-2 rounded-full cursor-pointer transition-all"
          >
            <FaCamera /> {/* Ícone de câmera do react-icons */}
          </label>

          {/* Ícone de lixeira para remover a imagem */}
          <button
            onClick={handleRemoveAvatar}
            className="absolute bottom-0 right-0 bg-red-600 text-white hover:bg-red-800 p-2 rounded-full cursor-pointer transition-all"
          >
            <FaTrashAlt /> {/* Ícone de lixeira */}
          </button>

          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>

        {/* Informações sociais */}
        <div className="text-center mb-10">
          {/* Exibindo o nome e e-mail do usuário */}
          <h2 className="text-3xl">{usuario.nome || "Nome do Usuário"}</h2>
          <p className="text-lg text-gray-200">{usuario.email || "E-mail do Usuário"}</p>
        </div>

        {/* Botões */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            className="bg-white text-blue-900 border py-2 px-6 rounded-lg w-64 h-12 transition-all hover:bg-red-600 hover:text-white border-gray-950"
            onClick={openModal} // Abrir o modal ao clicar
          >
            Reclamar
          </button>

          <button className="bg-white text-blue-900 border py-2 px-6 rounded-lg w-64 h-12 transition-all hover:bg-blue-600 hover:text-white border-gray-950" onClick={() => navigate("/esqueci")}>Mudar Senha</button>

          <button className="bg-white text-blue-900 border py-2 px-6 rounded-lg w-64 h-12 transition-all hover:bg-blue-600 hover:text-white border-gray-950 " onClick={() => navigate("/")}>Sair</button>
        </div>
      </div>

      {/* Seção Direita */}
      <div className="w-3/5 bg-gray-100 p-8 flex flex-col items-center justify-center">

        {/* Tabela de Vendas, Produtos e Contratos */}
        <div className="w-full bg-white p-9 rounded-lg shadow-lg mb-9">
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
        </div>

        {/* Botão Voltar */}
        <button 
          onClick={handleGoBack} 
          className="bg-blue-900 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-all"
        >
          Voltar
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div 
          id="modal-overlay"
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-md flex justify-center items-center z-50 transition-opacity duration-500"
          onClick={handleOutsideClick} // Fecha o modal ao clicar fora
        >
          <div className="bg-white p-4 rounded-2xl w-96 shadow-xl transform transition-all duration-300">
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
                onClick={closeModal} // Fechar o modal
                className= " bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-800 transition-all"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Perfil;