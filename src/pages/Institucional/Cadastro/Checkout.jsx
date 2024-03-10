import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import CadastroPassos from "../../../components/Institucional/Cadastro/CadastroPassos";
import HeaderCliente from "../../../components/Cliente/HeaderCliente/HeaderCliente";
import styles from "./CadastroStyles.module.css";
import api from "../../../api/api";
import Swal from "sweetalert2";
import { set } from "date-fns";

function Checkout() {

    const navigate = useNavigate();

    const [endereco, setEndereco] = useState([]);
    const [pagamento, setPagamento] = useState([]);
    const [plano, setPlano] = useState([]);


    useEffect(() => {
        buscarEnderecoUsuario();
        buscarPlanoUsuario();
    }, []);

    const buscarEnderecoUsuario = () => {
        api
            .get(`/enderecos/usuarios/${sessionStorage.getItem("idUsuario")}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
                }
            })
            .then((response) => {
                setEndereco(response.data[0].endereco);
                console.log("ENDERECO:", response)
            })
            .catch((erro) => {
                console.log("Erro", erro);
            });
    }

    const buscarPlanoUsuario = () => {
        api
            .get(`/planos/${sessionStorage.getItem("idUsuario")}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
                }
            })
            .then((response) => {
                console.log(response.data);
                setPlano(response.data);
            })
            .catch((erro) => {
                console.log("Erro", erro);
            });
    }

    const checkout = () => {
        api
            .put(`/usuarios/permissionar/cliente/${sessionStorage.getItem("idUsuario")}`, null, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
                }
            })
            .then((response) => {
                console.log("Resposta", response);
                sessionStorage.setItem('permissao', response.data.permissao);
                criarPlanoDeAssinatura();

            })
            .catch((erro) => {
                console.log("Erro ", erro);
            });
    }

    const criarPlanoDeAssinatura = () => {
        api
            .post(`/assinaturas/solicitar/${sessionStorage.getItem("idUsuario")}`, null, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
                }
            })
            .then(async (response) => {
                window.open(`${response.data.linkCobranca}`, '_blank');
                console.log("Resposta Pagamento: ", response);
                verificarPagamentoConcluido()
            })
            .catch((erro) => {
                console.log("Erro ", erro);
                Swal.fire({
                    title: "Erro ao realizar o checkout! Confira se as informações inseridas são válidas.",
                    confirmButtonColor: "#F29311",
                });
            });
    }

    const exibeStatusPagamento = () => {
        return api
            .put(`/pagamentos/atualizar/status/${sessionStorage.getItem("idUsuario")}`, null, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
                }
            })
            .then((response) => {
                console.log(response.data[0]);
                const pagamentoAtualizado = response.data[0].statusTransacao;
                return pagamentoAtualizado;
            })
            .catch((erro) => {
                console.log("Erro ", erro);
                // Swal.fire({
                //     title: "Erro ao realizar o pagamento! Confira se as informações inseridas são válidas.",
                //     confirmButtonColor: "#F29311",
                // });
                throw erro;
            });
    }
    
    const verificarPagamentoConcluido = () => {
        api
            .put(`/pagamentos/atualizar/status/${sessionStorage.getItem("idUsuario")}`, null, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
                }
            })
            .then((response) => {
                console.log(response.data[0]);
                const pagamentoAtualizado = response.data[0];
                setPagamento(pagamentoAtualizado);
                console.log(pagamentoAtualizado); // Aqui você tem acesso ao estado atualizado
    
                // Função recursiva para exibir o Swal
                function exibirSwal(tentativas) {
                    if (tentativas <= 999) {
                        Swal.fire({
                            title: "Checkout realizado com sucesso!",
                            text: "Por favor, realizar pagamento!",
                            icon: "success",
                            showCancelButton: true,
                            confirmButtonColor: "#F29311",
                            cancelButtonColor: "#808080",
                            confirmButtonText: "Já realizei!",
                            cancelButtonText: "Ainda não!"
                        }).then((result) => {
                            if (result.isConfirmed) {
                                exibeStatusPagamento().then(status => {
                                    if (status == "approved" || status == "settled") {
                                        Swal.fire({
                                            title: "Pagamento realizado",
                                            text: "Pagamento feito com sucesso!",
                                            icon: "success"
                                        });
                                        setTimeout(() => {
                                            navigate('/cliente/pedidos');
                                        }, 2500);
                                    } else {
                                        Swal.fire({
                                            title: "O Pagamento não foi identificado como realizado.",
                                            confirmButtonColor: "#F29311",
                                        }).then(() => {
                                            setTimeout(() => {
                                                exibirSwal(tentativas++);
                                            }, 1500); // Chamada recursiva com próxima tentativa
                                        });
                                    }
                                })
                                .catch(error => {
                                    // Trate os erros aqui, se necessário
                                    console.error("Erro ao exibir status de pagamento:", error);
                                });
                            }
                        });
                    }
                }
    
                // Inicia a exibição do Swal
                exibirSwal(1);
            })
            .catch((erro) => {
                console.log("Erro ", erro);
                // Swal.fire({
                //     title: "Erro ao realizar o pagamento! Confira se as informações inseridas são válidas.",
                //     confirmButtonColor: "#F29311",
                // });
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
                                    <div className="flex justify-between mb-6">
                                        <div className="mr-8">
                                            + {plano.qtdDiasSemana * plano.qtdPessoas * plano.qtdRefeicoesDia * 4} Refeições por mês
                                        </div>
                                        <div>
                                            R$ {plano.valorPlano ? plano.valorPlano.toFixed(2).replace('.', ',') : '500,00'}
                                        </div>
                                    </div>
                                    <span className={`${styles.divisorTotalPreco}`}></span>
                                    <div className="flex justify-between mb-6 mt-2">
                                        <div className="font-semibold">
                                            Total à pagar
                                        </div>
                                        <div className="font-semibold">
                                            R$ {plano.valorPlano ? plano.valorPlano.toFixed(2).replace('.', ',') : '500,00'}
                                        </div>
                                    </div>
                                </div>
                                <span className={`${styles.divisor} ml-6 mr-6`}></span>
                                <div className="flex-col">
                                    <div className="flex-col mt-4">
                                        <div className="font-medium">
                                            Destinatário
                                        </div>
                                        <div>
                                            {sessionStorage.getItem('nome')}
                                        </div>
                                    </div>
                                    <div className="flex-col mt-4">
                                        <div className="font-medium">
                                            Endereço de Entrega
                                        </div>
                                        <div>
                                            {`${endereco.logradouro}, ${endereco.numero}`}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                type="button"
                                className={`bg-[#F29311] ${styles.btnCadastro} mt-8`}
                                onClick={checkout}
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
