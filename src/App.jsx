import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from "react"
import Home from "../src/pages/Institucional/Home/Home.jsx"
import NotFound from "../src/pages/NotFound.jsx"
import InformacoesPessoais from "../src/pages/Institucional/Cadastro/InformacoesPessoais/InformacoesPessoais.jsx"

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro/info-pessoal" element={<InformacoesPessoais />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
