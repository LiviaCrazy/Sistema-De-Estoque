import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible, AiFillLock } from "react-icons/ai"; // Ícones para visibilidade da senha e cadeado
import { motion } from "framer-motion"; // Importando o Framer Motion

const Esquece = () => {
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmeSenha, setConfirmeSenha] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [confirmaVisivel, setConfirmaVisivel] = useState(false);
  const navigate = useNavigate();

  const handleChangePassword = (e) => {
    e.preventDefault();

    if (novaSenha !== confirmeSenha) {
      setErrorMessage("As senhas não coincidem. Tente novamente.");
      return;
    }

    // Aqui você pode adicionar a lógica para atualizar a senha do usuário, por exemplo, salvar no localStorage ou enviar ao backend
    localStorage.setItem("senha", novaSenha);

    // Redireciona o usuário após a alteração bem-sucedida
    navigate("/tela");
  };

  return (
    <div className="flex h-screen">
      {/* Lado esquerdo com fundo branco */}
      <div className="w-1/2 bg-white flex justify-center items-center">
        <img
          className="w-2/3 h-auto object-contain"
          src="https://previneo.com.br/wp-content/uploads/2023/04/web-seguro.png"
          alt="Logo"
        />
      </div>

      <div className="w-1/2 bg-[#28487E] flex flex-col justify-center items-center">
        {/* Logo centralizada */}
        <div
          className="w-[112px] h-[112px] rounded-3xl flex items-center justify-center mb-1"
        >
         <img
          className="absolute h-[200px] left-1/2 top-[80px] transform -translate-x-1/2"
          src="https://aviculturadonordeste.com.br/wp-content/uploads/2023/12/Tijuca-Alimentos-768x490-1.png"
          alt="Logo Tijuca"
        />
        </div>


        {/* Conteúdo centralizado abaixo da logo */}
        <div
  className="relative w-[552px] bg-[#e3e4e6] border-l-4 border-[#8199bb] rounded-lg p-8 space-y-6">

          <p className="text-[#28487E] text-[22px] font-inter mb-2 font-semibold">Nova Senha</p>

          {/* Input Nova Senha com ícone */}
         {/* Input Nova Senha com ícone */}
<div className="relative">
  <input
    type={senhaVisivel ? "text" : "password"}
    value={novaSenha}
    onChange={(e) => setNovaSenha(e.target.value)}
    placeholder="Digite sua nova senha"
    className="w-full p-4 pl-12 border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 ease-in-out mb-4"
  />
  {/* Aumentando o tamanho do ícone do cadeado */}
  <AiFillLock className="absolute left-3 top-7 transform -translate-y-1/2 text-blue-600 text-3xl" />
  <button
    type="button"
    onClick={() => setSenhaVisivel(!senhaVisivel)}
    className="absolute right-4 top-1/2 transform -translate-y-5 text-blue-600 text-2xl"
  >
    {senhaVisivel ? <AiFillEyeInvisible /> : <AiFillEye />}
  </button>
</div>

{/* Confirme sua Senha com ícone */}
<div className="relative">
  <input
    type={confirmaVisivel ? "text" : "password"}
    value={confirmeSenha}
    onChange={(e) => setConfirmeSenha(e.target.value)}
    placeholder="Confirme sua nova senha"
    className="w-full p-4 pl-12 border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 ease-in-out mb-4"
  />
  {/* Aumentando o tamanho do ícone do cadeado */}
  <AiFillLock className="absolute left-3 top-7 transform -translate-y-1/2 text-blue-600 text-3xl" />
  <button
    type="button"
    onClick={() => setConfirmaVisivel(!confirmaVisivel)}
    className="absolute right-4 top-1/2 transform -translate-y-5 text-blue-600 text-2xl"
  >
  
    {confirmaVisivel ? <AiFillEyeInvisible /> : <AiFillEye />}
  </button>
</div>

          {/* Botão Entrar com animação de hover */}
          <motion.div
            onClick={handleChangePassword}
            className="w-full h-[48px] bg-blue-700 rounded-full flex items-center justify-center cursor-pointer text-white text-[16px] leading-[19px] font-normal font-inter hover:bg-blue-800 transition-all"
            whileHover={{
              scale: 0.95, // Animação de aumento de escala no hover
              opacity: 0.9,
            }}
            transition={{
              duration: 0.3, // Duração da animação
              ease: "easeInOut", // Tipo de animação suave
            }}
          >
            Entrar
          </motion.div>

          {/* Voltar */}
          <p
            className="text-[#28487E] text-[20px] font-normal font-inter cursor-pointer text-center hover:underline mt-4"
            onClick={() => navigate("/")}
          >
            Voltar
          </p>
        </div>
      </div>
    </div>
  );
};

export default Esquece;
