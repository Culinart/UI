import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from "react"
import Home from "../src/pages/Institucional/Home/Home.jsx"
import NotFound from "../src/pages/NotFound.jsx"
import InformacoesPessoais from "./pages/Institucional/Cadastro/InformacoesPessoais.jsx"
import Endereco from './pages/Institucional/Cadastro/Endereco.jsx';
import ComoFunciona from './pages/Institucional/ComoFunciona/ComoFunciona.jsx';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro/info-pessoal" element={<InformacoesPessoais />} />
          <Route path="/cadastro/endereco" element={<Endereco />} />
          <Route path="/como-funciona" element={<ComoFunciona />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
