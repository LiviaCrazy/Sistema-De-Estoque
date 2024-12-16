import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Cadastro from "./components/Cadastro";
import Esuece  from "./components/Esquece";
import Tela from "./components/Tela";

import Perfil from "./components/Perfil";

import CMDB from "./pages/CMDB";
import Contracts from "./pages/Contracts";
import Software from "./pages/Software";




function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/esqueci" element={<Esuece />} />
      <Route path="/tela" element={<Tela />} />
      
      <Route path="/perfil" element={<Perfil />} />

      <Route path="/CMDB" element={<CMDB />} />
      <Route path="/Contracts" element={< Contracts/>} />
      <Route path="/Software" element={<Software />} />

      </Routes>
    </Router>
  );
}

export default App;