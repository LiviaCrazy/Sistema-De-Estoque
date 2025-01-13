import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "../Serves/api";

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showSenha, setShowSenha] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();

    const nomeTrimmed = nome.trim();
    const emailTrimmed = email.trim();
    const senhaTrimmed = senha.trim();

    if (!nomeTrimmed || !emailTrimmed || !senhaTrimmed) {
      setErrorMessage("Por favor, preencha todos os campos!");
      return;
    }

    try {
      await axios.post("http://192.168.9.250:5001/cadastro/api", {
        nome: nomeTrimmed,
        email: emailTrimmed,
        senha: senhaTrimmed,
      });

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Erro ao cadastrar. Tente novamente.");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-blue-900 flex items-center justify-center text-white">
        <motion.img
          className="w-2/3 h-auto"
          src="https://www.funcef.com.br/data/files/12/41/5D/38/96894710AE283737BE08A8A8/img_calculadora_financas.png"
          alt="Logo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </div>

      <div className="flex-1 bg-gray-100 flex flex-col items-center justify-center p-2 relative font-poppins">
        <motion.img
          className="absolute h-[200px] left-1/2 top-[50px] transform -translate-x-1/2"
          src="https://aviculturadonordeste.com.br/wp-content/uploads/2023/12/Tijuca-Alimentos-768x490-1.png"
          alt="Logo Tijuca"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        />

        <motion.form
          className="w-full max-w-lg space-y-5"
          onSubmit={handleCadastro}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Campos de Entrada */}
          {["Nome Completo", "E-mail"].map((placeholder, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <FaPencilAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600" />
              <input
                type={placeholder === "E-mail" ? "email" : "text"}
                placeholder={placeholder}
                value={placeholder === "Nome Completo" ? nome : email}
                onChange={(e) =>
                  placeholder === "Nome Completo"
                    ? setNome(e.target.value)
                    : setEmail(e.target.value)
                }
                className="w-full p-3 pl-12 border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 ease-in-out"
              />
            </motion.div>
          ))}

          {/* Campo de Senha */}
          <motion.div
            className="relative"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <FaPencilAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600" />
            <input
              type={showSenha ? "text" : "password"}
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full p-3 pl-12 border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 ease-in-out"
            />
            <button
              type="button"
              onClick={() => setShowSenha(!showSenha)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-600"
            >
              {showSenha ? "Ocultar" : "Mostrar"}
            </button>
          </motion.div>

          {/* Exibição de mensagem de erro */}
          {errorMessage && (
            <motion.p
              className="text-red-500 text-sm text-center"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {errorMessage}
            </motion.p>
          )}

          {/* Botão de Submit com animação */}
          <motion.button
            type="submit"
            className="w-full p-4 bg-blue-900 text-white rounded-md hover:bg-blue-700 transition"
            whileHover={{
              scale: 0.9,
              opacity: 0.9,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            Continuar
          </motion.button>

          {/* Link de login */}
          <motion.p
            className="text-blue-900 text-sm text-right hover:text-blue-500 transition cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Já tem uma conta? <span onClick={() => navigate("/")}>Faça login</span>.
          </motion.p>
        </motion.form>
      </div>
    </div>
  );
};

export default Cadastro;
