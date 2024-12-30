import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa"; // Ícone de lápis
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Importando o Framer Motion

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showSenha, setShowSenha] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Estado para mensagens de erro
  const navigate = useNavigate();

  const handleCadastro = (e) => {
    e.preventDefault();

    const nomeTrimmed = nome.trim();
    const emailTrimmed = email.trim();
    const senhaTrimmed = senha.trim();

    // Validação de campos obrigatórios
    if (!nomeTrimmed || !emailTrimmed || !senhaTrimmed) {
      setErrorMessage("Por favor, preencha todos os campos!");
      return;
    }

    // Validar se o email já foi cadastrado
    const userData = JSON.parse(localStorage.getItem("usuario"));
    if (userData && userData.email === emailTrimmed) {
      setErrorMessage("Este e-mail já está cadastrado. Tente outro.");
      return;
    }

    const newUser = { 
      nome: nomeTrimmed,
      email: emailTrimmed,
      senha: senhaTrimmed,
    };

    // Salva os dados do novo usuário no localStorage
    localStorage.setItem("usuario", JSON.stringify(newUser));
    
    // Aqui a animação vai acontecer antes de ir para o login
    setTimeout(() => {
      navigate("/");
    }, 1000); // Aguardar a animação durar 1 segundo (1000ms)
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-blue-900 flex items-center justify-center text-white">
        <img
          className="w-2/3 h-auto"
          src="https://www.funcef.com.br/data/files/12/41/5D/38/96894710AE283737BE08A8A8/img_calculadora_financas.png"
          alt="Logo"
        />
      </div>

      <div className="flex-1 bg-gray-200 flex flex-col items-center justify-center p-2 relative font-poppins">
      <img
            className="absolute h-[200px] left-1/2 top-[80px] transform -translate-x-1/2"
            src="https://aviculturadonordeste.com.br/wp-content/uploads/2023/12/Tijuca-Alimentos-768x490-1.png"
            alt="Logo Tijuca"
          />
        <form className="w-full max-w-lg space-y-5" onSubmit={handleCadastro}>
          <div className="relative">
            <FaPencilAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600" />
            <input
              type="text"
              placeholder="Nome Completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full p-3 pl-12 border border-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="relative">
            <FaPencilAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600" />
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 pl-12 border border-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="relative">
            <FaPencilAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600" />
            <input
              type={showSenha ? "text" : "password"}
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full p-3 pl-12 border border-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              type="button"
              onClick={() => setShowSenha(!showSenha)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-600"
            >
              {showSenha ? "Ocultar" : "Mostrar"}
            </button>
          </div>

          {/* Exibe a mensagem de erro, caso haja */}
          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}

          {/* Botão com animação de batimento apenas quando o mouse estiver em cima */}
          <motion.button
            type="submit"
            className="w-full p-4 bg-blue-900 text-white rounded-md hover:bg-blue-700 transition"
            animate={{
              scale: 1, // O estado inicial do botão sem animação
              opacity: 1, // Opacidade normal do botão
            }}
            whileHover={{
              scale: 0.9, // Quando o mouse estiver em cima, o botão aumenta
              opacity: 0.9, // O botão diminui ligeiramente em opacidade
            }}
            transition={{
              duration: 0.2, // A animação dura 0.3 segundos
              ease: "easeInOut", // Animação suave
            }}
          >
            Continuar
          </motion.button>

          <p className="text-blue-900 text-sm text-right hover:text-blue-500 transition cursor-pointer">
            Já tem uma conta? <span onClick={() => navigate("/")}>Faça login</span>.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;