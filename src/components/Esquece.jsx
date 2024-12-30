import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible, AiFillLock } from "react-icons/ai";
import { motion } from "framer-motion";

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

    localStorage.setItem("senha", novaSenha);
    navigate("/tela");
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-white flex justify-center items-center">
        <img
          className="w-2/3 h-auto object-contain"
          src="https://previneo.com.br/wp-content/uploads/2023/04/web-seguro.png"
          alt="Logo"
        />
      </div>

      <div className="w-1/2 bg-[#28487E] flex flex-col justify-center items-center">
        <div className="w-[112px] h-[112px] rounded-3xl flex items-center justify-center mb-1">
          <img
            className="absolute h-[200px] left-1/2 top-[80px] transform -translate-x-1/2"
            src="https://aviculturadonordeste.com.br/wp-content/uploads/2023/12/Tijuca-Alimentos-768x490-1.png"
            alt="Logo Tijuca"
          />
        </div>

        <div className="relative w-[552px] bg-[#e3e4e6] border-l-4 border-[#8199bb] rounded-lg p-8 space-y-6">
          <p className="text-[#28487E] text-[22px] font-inter mb-2 font-semibold">Nova Senha</p>

          <div className="relative">
            <input
              type={senhaVisivel ? "text" : "password"}
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              placeholder="Digite sua nova senha"
              className="w-full p-4 pl-12 border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 ease-in-out mb-4"
            />
            <AiFillLock className="absolute left-3 top-7 transform -translate-y-1/2 text-blue-600 text-3xl" />
            <button
              type="button"
              onClick={() => setSenhaVisivel(!senhaVisivel)}
              className="absolute right-4 top-1/2 transform -translate-y-5 text-blue-600 text-2xl"
            >
              {senhaVisivel ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>

          <div className="relative">
            <input
              type={confirmaVisivel ? "text" : "password"}
              value={confirmeSenha}
              onChange={(e) => setConfirmeSenha(e.target.value)}
              placeholder="Confirme sua nova senha"
              className="w-full p-4 pl-12 border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 ease-in-out mb-4"
            />
            <AiFillLock className="absolute left-3 top-7 transform -translate-y-1/2 text-blue-600 text-3xl" />
            <button
              type="button"
              onClick={() => setConfirmaVisivel(!confirmaVisivel)}
              className="absolute right-4 top-1/2 transform -translate-y-5 text-blue-600 text-2xl"
            >
              {confirmaVisivel ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>

          {errorMessage && (
            <p className="text-red-600 text-sm text-center">{errorMessage}</p>
          )}

          <motion.div
            onClick={handleChangePassword}
            className="w-full h-[48px] bg-blue-700 rounded-full flex items-center justify-center cursor-pointer text-white text-[16px] leading-[19px] font-normal font-inter hover:bg-blue-800 transition-all"
            whileHover={{
              scale: 0.95,
              opacity: 0.9,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
          >
            Alterar Senha
          </motion.div>

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