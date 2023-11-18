import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from "react"
import Home from "../src/pages/Institucional/Home/Home.jsx"
import NotFound from "../src/pages/NotFound.jsx"
import InformacoesPessoais from "./pages/Institucional/Cadastro/InformacoesPessoais.jsx"
import Endereco from './pages/Institucional/Cadastro/Endereco.jsx';
import Plano from './pages/Institucional/Cadastro/Plano.jsx';
import Checkout from './pages/Institucional/Cadastro/Checkout.jsx';
import Pedidos from './pages/Cliente/Pedidos.jsx';
import ComoFunciona from './pages/Institucional/ComoFunciona/ComoFunciona.jsx';
import Login from './pages/Institucional/Login/Login.jsx';
import RedefinirSenha from './pages/Institucional/Login/RedefinirSenha.jsx';
import Receitas from './pages/Cliente/Receitas.jsx';
import Preferencias from './pages/Cliente/Preferencias.jsx';
import PerfilInfoPessoal from './pages/Cliente/Perfil/PerfilInfoPessoal.jsx';
import PerfilSenhaAutenticacao from './pages/Cliente/Perfil/PerfilSenhaAutenticacao.jsx';
import PerfilEndereco from './pages/Cliente/Perfil/PerfilEndereco.jsx';
import PerfilPagamento from './pages/Cliente/Perfil/PerfilPagamento.jsx';
import AdicionarEndereco from './pages/Cliente/Perfil/AdicionarEndereco.jsx';
import MeuPlano from './pages/Cliente/MeuPlano.jsx';
import PerfilInfoPessoalFornecedor from './pages/Fornecedor/Perfil/PerfilFornecedor.jsx';
import PerfilSenhaAutenticacaoFornecedor from './pages/Fornecedor/Perfil/PerfilSenhaAutenticacaoFornecedor.jsx';
import PedidosFornecedor from './pages/Fornecedor/PedidosFornecedor.jsx';
import Precos from './pages/Fornecedor/Precos.jsx'

import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.minimal.css";


function App() {

  return (
    <>
      <ToastContainer
        limit={3}
        draggable
        rtl={false}
        pauseOnHover
        closeOnClick
        autoClose={2100}
        pauseOnFocusLoss
        newestOnTop={false}
        position="top-center"
        hideProgressBar={false}
      />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro/info-pessoal" element={<InformacoesPessoais />} />
          <Route path="/cadastro/endereco" element={<Endereco />} />
          <Route path="/cadastro/plano" element={<Plano />} />
          <Route path="/cadastro/checkout" element={<Checkout />} />
          <Route path="/como-funciona" element={<ComoFunciona />} />
          <Route path="/login" element={<Login />} />
          <Route path="/redefinir-senha" element={<RedefinirSenha />} />
          <Route path="/cliente/pedidos" element={<Pedidos />} />
          <Route path="/cliente/receitas" element={<Receitas />} />
          <Route path="/cliente/preferencias" element={<Preferencias />} />
          <Route path="/cliente/perfil/info-pessoal" element={<PerfilInfoPessoal />} />
          <Route path="/cliente/perfil/senha-autenticacao" element={<PerfilSenhaAutenticacao />} />
          <Route path="/cliente/perfil/endereco" element={<PerfilEndereco />} />
          <Route path="/cliente/perfil/pagamento" element={<PerfilPagamento />} />
          <Route path="/cliente/adicionar/endereco" element={<AdicionarEndereco />} />
          <Route path="/cliente/meu-plano" element={<MeuPlano />} />
          <Route path="/fornecedor/perfil/info-pessoal" element={<PerfilInfoPessoalFornecedor />} />
          <Route path="/fornecedor/perfil/senha-autenticacao" element={<PerfilSenhaAutenticacaoFornecedor />} />
          <Route path="/fornecedor/pedidos" element={<PedidosFornecedor />} />
          <Route path="/fornecedor/precos" element={<Precos />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
