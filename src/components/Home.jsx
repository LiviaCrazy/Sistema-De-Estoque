import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative w-full h-screen bg-white flex flex-col justify-center items-center">
      {/* Imagem de fundo */}
      <div
        className="absolute w-[474px] h-[302px] top-[114px] mb-16"
        style={{
          backgroundImage:
            "url('https://aviculturadonordeste.com.br/wp-content/uploads/2023/12/Tijuca-Alimentos-768x490-1.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      ></div>

      {/* Botões Login e Cadastro */}
      <div className="flex flex-col justify-center items-center mt-32">
     {/* Botão Cadastro */}
     <Link to="/cadastro">
          <button className="w-[350px] h-[50px] bg-[#123465] text-white font-bold text-lg rounded-full mb-4 cursor-pointer transition-all duration-300 hover:bg-[#1D4ED8]">
            Cadastro
          </button>
        </Link>

        {/* Botão Login */}
        <Link to="/login">
          <button className="w-[350px] h-[50px] bg-[#123465] text-white font-bold text-lg rounded-full mt-4 cursor-pointer transition-all duration-300 hover:bg-[#1D4ED8]">
            Login
          </button>
        </Link>

      </div>
    </div>
  );
};

export default Home;
