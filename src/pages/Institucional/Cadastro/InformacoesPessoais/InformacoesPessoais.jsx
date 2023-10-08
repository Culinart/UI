import React from "react";
import CadastroPassos from "../../../../components/Institucional/CadastroPassos";
import styles from "./InformacoesPessoais.module.css"; 

function InformacoesPessoais() {
  return (
    <div className="flex flex-col h-screen">
      <CadastroPassos corEndereco="#AEBDBC" corPlano="#AEBDBC" corCheckout="#AEBDBC" />
      <div className={`bg ${styles.bg}`}>
        <div className={`card ${styles.card}`}>
          a
        </div>
      </div>
    </div>
  );
}

export default InformacoesPessoais;
