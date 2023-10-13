import React from "react";
import CadastroPassos from "../../../components/Institucional/Cadastro/CadastroPassos";
import Header from "../../../components/Institucional/Header/Header";
import styles from "./CadastroStyles.module.css";

function Endereco() {
    return (
        <>
            <div className="flex flex-col h-screen">
                <Header />
                <CadastroPassos corEndereco="#AEBDBC" corPlano="#AEBDBC" corCheckout="#AEBDBC" />
                <div className={`bg ${styles.bg}`}>
                    <div className={`card ${styles.card} flex`}>
                        <div className="flex flex-col">
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Endereco;