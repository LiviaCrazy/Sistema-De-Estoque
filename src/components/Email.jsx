import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible, AiFillLock } from "react-icons/ai";
import { motion } from "framer-motion";

const Email = () => {
  const [email, setEmail] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmeSenha, setConfirmeSenha] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [confirmaVisivel, setConfirmaVisivel] = useState(false);
  const [step, setStep] = useState(1); // Define the step of the flow (1: Email, 2: Password)
  const navigate = useNavigate();

  const handleEmailSubmit = (e) => {
    e.preventDefault();

    // Check if the email exists in localStorage
    const userData = JSON.parse(localStorage.getItem("usuario"));
    if (!userData || userData.email !== email) {
      setErrorMessage("E-mail não encontrado. Verifique e tente novamente.");
      return;
    }

    setErrorMessage(""); // Clear the error message
    setStep(2); // Move to password change step
  };

  const handleChangePassword = (e) => {
    e.preventDefault();

    if (!novaSenha || !confirmeSenha) {
      setErrorMessage("Preencha os campos corretamente.");
      return;
    }

    if (novaSenha !== confirmeSenha) {
      setErrorMessage("As senhas não coincidem. Tente novamente.");
      return;
    }

    const userData = JSON.parse(localStorage.getItem("usuario"));
    if (userData) {
      userData.senha = novaSenha;
      localStorage.setItem("usuario", JSON.stringify(userData));
    }

    setErrorMessage(""); // Clear the error message
    navigate("/");
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-white flex justify-center items-center">
        <motion.img
          className="w-2/3 h-auto object-contain"
          src="https://previneo.com.br/wp-content/uploads/2023/04/web-seguro.png"
          alt="Logo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </div>

      <div className="w-1/2 bg-blue-900 flex flex-col justify-center items-center">
        <motion.div
          className="w-[112px] h-[112px] rounded-3xl flex items-center justify-center mb-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <img
            className="fixed h-[170px] left-1/2 top-[50px] transform -translate-x-1/2"
            src="https://aviculturadonordeste.com.br/wp-content/uploads/2023/12/Tijuca-Alimentos-768x490-1.png"
            alt="Logo Tijuca"
          />
        </motion.div>

        <motion.div
          className="relative w-[552px] bg-[#fefefe] rounded-lg p-8 space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {step === 1 ? (
            <>
              <motion.p
                className="text-[#28487E] text-[22px] font-inter mb-2 font-semibold"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                E-mail
              </motion.p>

              <motion.div
                className="relative"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digite seu e-mail"
                  className="w-full p-4 pl-12 border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 ease-in-out mb-4"
                />
                <AiFillLock className="absolute left-3 top-7 transform -translate-y-1/2 text-blue-600 text-3xl" />
              </motion.div>

              {errorMessage && (
                <motion.p
                  className="text-red-600 text-sm text-center"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {errorMessage}
                </motion.p>
              )}

              <motion.div
                onClick={handleEmailSubmit}
                className="w-full h-[48px] bg-blue-700 rounded-full flex items-center justify-center cursor-pointer text-white text-[16px] leading-[19px] font-normal font-inter hover:bg-blue-800 transition-all"
                whileHover={{
                  scale: 0.95,
                  opacity: 0.9,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                Continuar
              </motion.div>
            </>
          ) : (
            <>
              <motion.p
                className="text-[#28487E] text-[22px] font-inter mb-2 font-semibold"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                Senha
              </motion.p>

              <motion.div
                className="relative"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
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
              </motion.div>

              <motion.div
                className="relative"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
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
              </motion.div>

              {errorMessage && (
                <motion.p
                  className="text-red-600 text-sm text-center"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {errorMessage}
                </motion.p>
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
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                Alterar Senha
              </motion.div>
            </>
          )}

          <motion.p
            className="text-[#28487E] text-[20px] font-normal font-inter cursor-pointer text-center hover:underline mt-4"
            onClick={() => navigate("/")}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            Voltar
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default Email;
