import React from "react";
import CadastroPassos from "../../../components/Institucional/Cadastro/CadastroPassos";
import Header from "../../../components/Institucional/Header/Header";
import styles from "./CadastroStyles.module.css";

function Checkout() {
    return (
        <>
            <div className="flex flex-col h-screen">
                <Header />
                <CadastroPassos corEndereco="#2EC4B6" corPlano="#2EC4B6" corCheckout="#2EC4B6" />
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

export default Checkout;