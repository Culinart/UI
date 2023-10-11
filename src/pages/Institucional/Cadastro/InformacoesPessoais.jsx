import React, { useState } from "react";
import CadastroPassos from "../../../components/Institucional/CadastroPassos";
import imgCadastro from "../../../assets/Institucional/Cadastro/imgCadastro.svg";
import styles from "./CadastroStyles.module.css";

function InformacoesPessoais() {
  const [telefone, setTelefone] = useState("");

  const handleTelefoneChange = (event) => {
    const inputTelefone = event.target.value.replace(/\D/g, '');
    let telefoneFormatado = "";

    if (inputTelefone.length > 0) {
      telefoneFormatado = `(${inputTelefone.slice(0, 2)}`;

      if (inputTelefone.length > 2) {
        telefoneFormatado += `) ${inputTelefone.slice(2, 7)}`;

        if (inputTelefone.length > 7) {
          telefoneFormatado += `-${inputTelefone.slice(7, 11)}`;
        }

      }

    }

    setTelefone(telefoneFormatado);
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="w-full h-16 bg-slate-600"></header>
      <CadastroPassos corEndereco="#AEBDBC" corPlano="#AEBDBC" corCheckout="#AEBDBC" />
      <div className={`bg ${styles.bg}`}>
        <div className={`card ${styles.card} flex`}>
          <div className="flex flex-col">
            <span className="text-[#DC7726] font-bold text-2xl mb-4">Crie sua conta e faça arte!</span>
            <div className="flex flex-col items-center">
              <p className="flex flex-col">
                <label htmlFor="nome" className="text-[#045D53] font-bold">Nome</label>
                <input
                  type="text"
                  id="nome"
                  placeholder="Nome Completo"
                  className={styles.input}
                />
              </p>
              <p className="flex flex-col">
                <label htmlFor="email" className="text-[#045D53] font-bold">Email</label>
                <input
                  type="text"
                  id="email"
                  placeholder="user@email.com"
                  className={styles.input}
                />
              </p>
              <p className="flex flex-col">
                <label htmlFor="telefone" className="text-[#045D53] font-bold">Telefone</label>
                <input
                  type="text"
                  id="telefone"
                  placeholder="(00) 00000-0000"
                  className={styles.input}
                  value={telefone}
                  onChange={handleTelefoneChange}
                />
              </p>
              <p className="flex flex-col">
                <label htmlFor="senha" className="text-[#045D53] font-bold">Senha</label>
                <input
                  type="password"
                  id="senha"
                  placeholder="********"
                  className={styles.input}
                />
              </p>
              <p className="flex flex-col">
                <label htmlFor="senhaConfirmacao" className="text-[#045D53] font-bold">Confirmar Senha</label>
                <input
                  type="password"
                  id="senhaConfirmacao"
                  placeholder="********"
                  className={styles.input}
                />
              </p>
              <button className={`${styles.btnCadastro}`}>
                Confirmar
              </button>
            </div>
          </div>
          <img src={imgCadastro} alt="Cadastro" />
        </div>
      </div>
    </div>
  );
}

export default InformacoesPessoais;
