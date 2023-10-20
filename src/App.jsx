import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from "react"
import Home from "../src/pages/Institucional/Home/Home.jsx"
import NotFound from "../src/pages/NotFound.jsx"
import InformacoesPessoais from "./pages/Institucional/Cadastro/InformacoesPessoais.jsx"
import Endereco from './pages/Institucional/Cadastro/Endereco.jsx';
import Plano from './pages/Institucional/Cadastro/Plano.jsx';
import Checkout from './pages/Institucional/Cadastro/Checkout.jsx';
import ComoFunciona from './pages/Institucional/ComoFunciona/ComoFunciona.jsx';
import Login from './pages/Institucional/Login/Login.jsx';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro/info-pessoal" element={<InformacoesPessoais />} />
          <Route path="/cadastro/endereco" element={<Endereco />} />
          <Route path="/cadastro/plano" element={<Plano />} />
          <Route path="/cadastro/checkout" element={<Checkout />} />
          <Route path="/como-funciona" element={<ComoFunciona />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
