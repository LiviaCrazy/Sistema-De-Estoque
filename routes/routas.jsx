import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from '../src/components/Login';
import Cadastro from '../src/components/Cadastro';
import Esquece from '../src/components/Esquece';
import Tela from '../src/components/Tela';

import Perfil from '../src/components/Perfil';

import CMDB from '../src/pages/CMDB';
import Contracts from '../src/pages/Contracts';

import Email from "../src/components/Email";



function Rotas() {
  return (
    <Router>
      <Routes>

      <Route path="/" element={< Login/>} />
    
      <Route path="/cadastro" element={<Cadastro />} />

      <Route path="/esqueci" element={<Esquece />} />

      <Route path="/tela" element={<Tela />} />
      
      <Route path="/perfil" element={<Perfil />} />


      <Route path="/CMDB" element={<CMDB />} />
      
      <Route path="/Contracts" element={< Contracts/>} />

      <Route path="/Email" element={< Email/>} />
     

      </Routes>
    </Router>
  );
}

export default Rotas;