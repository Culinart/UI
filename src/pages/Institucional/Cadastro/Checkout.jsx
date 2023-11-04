import React from "react";
import { useNavigate } from 'react-router-dom';
import CadastroPassos from "../../../components/Institucional/Cadastro/CadastroPassos";
import HeaderCliente from "../../../components/Cliente/HeaderCliente/HeaderCliente";
import styles from "./CadastroStyles.module.css";

function Checkout() {

    const navigate = useNavigate();

    const handleButtonClick = () => {
            api
          .post(`/planos/ativar/${idUsuario}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
            }
        })
          .then((response) => {
            console.log("Resposta", response);
            navigate('/cliente/pedidos');
        })
        .catch((erro) => {
            console.log("Erro ", erro);
        });
      }


    return (
        <>
            <div className="flex flex-col h-screen">
                <HeaderCliente />
                <CadastroPassos corPlano="#F29311" corCheckout="#F29311" />
                <div className={`bg ${styles.bg}`}>
                    <div className={`card ${styles.card} flex`}>
                        <div className="flex flex-col w-full items-center">
                            <div className="flex flex-col items-center">
                                <h2 className="text-[#DC7726] font-bold text-2xl mb-8">Checkout</h2>
                            </div>
                            <div className="flex">
                            <div>
                                <div className="flex-col">
                                    <div className="flex justify-between mb-6">
                                        <div className="mr-8">
                                            + X Refeições por mês
                                        </div>
                                        <div>
                                            R$ XXX,XX
                                        </div>
                                    </div>
                                    <div className="flex justify-between mb-4">
                                        <div className="mr-8">
                                            + Frete
                                        </div>
                                        <div>
                                            R$ XXX,XX
                                        </div>
                                    </div>
                                </div>
                                <span className={`${styles.divisorTotalPreco}`}></span>
                                <div className="flex justify-between mb-6 mt-2">
                                    <div className="font-semibold">
                                        Total à pagar
                                    </div>
                                    <div className="font-semibold">
                                        R$ XXX,XX
                                    </div>
                                </div>
                                </div>
                                <span className={`${styles.divisor} ml-6 mr-6`}></span>
                                <div className="flex-col">
                                    <div className="flex-col mt-4">
                                        <div className="font-medium">
                                            Nome do Destinatário
                                        </div>
                                        <div>
                                            Nome Completo
                                        </div>
                                    </div>
                                    <div className="flex-col mt-4">
                                        <div className="font-medium">
                                            Endereço de Entrega
                                        </div>
                                        <div>
                                            Lorem ipsum dolor sit amet, ap 210
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                type="button"
                                className={`bg-[#F29311] ${styles.btnCadastro} mt-8`}
                                onClick={handleButtonClick}
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkout;
