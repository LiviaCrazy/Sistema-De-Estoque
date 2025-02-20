import React, { useState, useEffect } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showSenha, setShowSenha] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (errorMessage) {
      setErrorMessage("");
    }
  }, [email, senha]);

  const handleLogin = (e) => {
    e.preventDefault();

    const emailTrimmed = email.trim();
    const senhaTrimmed = senha.trim();

    if (!emailTrimmed || !senhaTrimmed) {
      setErrorMessage("Por favor, preencha todos os campos!");
      return;
    }

    const userData = JSON.parse(localStorage.getItem("usuario"));
    if (
      userData &&
      userData.email === emailTrimmed &&
      userData.senha === senhaTrimmed
    ) {
      // Salva que o usuário está autenticado no localStorage
      localStorage.setItem("authenticated", "true");
      onLogin();
    } else {
      setErrorMessage("Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <motion.form
      className="w-full max-w-lg space-y-6 mt-16"
      onSubmit={handleLogin}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="relative"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <FaPencilAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600" />
        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 pl-12 border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 ease-in-out"
        />
      </motion.div>

      <motion.div
        className="relative"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <FaPencilAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600" />
        <input
          type={showSenha ? "text" : "password"}
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full p-4 pl-12 border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 ease-in-out"
        />
        <button
          type="button"
          onClick={() => setShowSenha(!showSenha)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-600"
        >
          {showSenha ? "Ocultar" : "Mostrar"}
        </button>
      </motion.div>

      {errorMessage && (
        <p className="text-red-500 text-sm text-center">{errorMessage}</p>
      )}

      <motion.button
        type="submit"
        className="w-full p-4 bg-blue-900 text-white rounded-md hover:bg-blue-700 transition"
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 0.95, opacity: 0.9 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        Entrar
      </motion.button>

      <div className="w-full flex justify-between text-sm text-blue-900 mt-4">
        <Link to="/cadastro" className="hover:underline">
          Ainda não tem uma conta?
        </Link>
        <Link to="/email" className="hover:underline">
          Esqueceu a senha?
        </Link>
      </div>
    </motion.form>
  );
};

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica se o usuário está autenticado
    const isAuthenticated = localStorage.getItem("authenticated");
    if (isAuthenticated === "true") {
      navigate("/"); // Redireciona para a página /tela
    }
  }, [navigate]);

  const handleSuccessfulLogin = () => {
    navigate("/tela");
  };

  return (
    <div className="flex h-screen font-poppins">
      <div className="flex-1 bg-blue-900 flex items-center justify-center">
        <motion.img
          className="w-2/3 h-auto"
          src="https://www.funcef.com.br/data/files/5A/82/BE/D4/3E9067106F9B2C57BE08A8A8/img_simulador_financeiro.png"
          alt="Logo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </div>

      <div className="flex-1 bg-gray-100 flex flex-col items-center justify-center p-6 relative">
        <motion.img
          className="absolute h-[200px] left-1/2 top-[80px] transform -translate-x-40"
          src="https://aviculturadonordeste.com.br/wp-content/uploads/2023/12/Tijuca-Alimentos-768x490-1.png"
          alt="Logo Tijuca"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
        <LoginForm onLogin={handleSuccessfulLogin} />
      </div>
    </div>
  );
};

export default Login;
