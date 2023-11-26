import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import CadastroPassos from "../../../components/Institucional/Cadastro/CadastroPassos";
import HeaderCliente from "../../../components/Cliente/HeaderCliente/HeaderCliente";
import styles from "./CadastroStyles.module.css";
import api from "../../../api/api";

function Checkout() {

    const navigate = useNavigate();

    const [endereco, setEndereco] = useState([]);
    const [plano, setPlano] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [qtdRefeicoesMes, setQtdRefeicoesMes] = useState([]);
    const [precoMes, setPrecoMes] = useState([]);
    const [qtdPessoas, setQtdPessoas] = useState(0);
    const [qtdRefeicoesDia, setQtdRefeicoesDia] = useState(0);
    const [selectedCategorias, setSelectedCategorias] = useState([]);

    useEffect(() => {
        buscarEnderecoUsuario();
        buscarPlanoUsuario();
        buscarCategorias();
    }, []);

    const buscarEnderecoUsuario = () => {
        api
            .get(`/enderecos/usuarios/${sessionStorage.getItem("idUsuario")}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
                }
            })
            .then((response) => {
                setEndereco(response.data);
            })
            .catch((erro) => {
                console.log("Erro", erro);
            });
    }

    const buscarCategorias = () => {
        api
            .get(`/categorias`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
                }
            })
            .then((response) => {
                setCategorias(response.data);
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
                setPlano(response.data);
                setQtdPessoas(response.data.qtdPessoas);
                setQtdRefeicoesDia(response.data.qtdRefeicoesDia);
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
                sessionStorage.setItem('permissao', response.data.permissao)
                criarPagamentoUsuario();

            })
            .catch((erro) => {
                console.log("Erro ", erro);
            });
    }

    const criarPagamentoUsuario = () => {
        api
            .post(`/pagamentos/solicitar/${sessionStorage.getItem("idUsuario")}`, null, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
                }
            })
            .then((response) => {
                console.log("Resposta", response);
                Swal.fire({
                    title: "Checkout realizado com sucesso!",
                    confirmButtonColor: "#F29311",
                });
            
                setTimeout(() => {
                    navigate('/cliente/pedidos');
                }, 2000);

            })
            .catch((erro) => {
                console.log("Erro ", erro);
            });
    }

    const atualizarPlano = () => {
        const valorPlano = calculateValorPlano();

        api.put(`/planos/${sessionStorage.getItem("idUsuario")}`, { valorPlano }, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
            }
        })
            .then((response) => {
                console.log("Resposta", response);
                checkout();
            })
            .catch((erro) => {
                console.log("Erro ", erro);
            });
    }

    const calculateValorPlano = () => {
        const valor = qtdPessoas * qtdRefeicoesDia * getMaxCategoryPrice();
        return valor.toFixed(2);
    }

    const getMaxCategoryPrice = () => {
        let maxPrice = 0;
        selectedCategorias.forEach((categoria) => {
            if (categoria.valor > maxPrice) {
                maxPrice = categoria.valor;
            }
        });
        return maxPrice;
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
                                            + {qtdPessoas * qtdRefeicoesDia * 4} Refeições por mês
                                        </div>
                                        <div>
                                            R$ {calculateValorPlano()}
                                        </div>
                                    </div>
                                    <span className={`${styles.divisorTotalPreco}`}></span>
                                    <div className="flex justify-between mb-6 mt-2">
                                        <div className="font-semibold">
                                            Total à pagar
                                        </div>
                                        <div className="font-semibold">
                                            R$ {calculateValorPlano()}
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
                                onClick={atualizarPlano}
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
