import React, { useState, useEffect } from "react";
import HeaderCliente from "../../../components/Cliente/HeaderCliente/HeaderCliente";
import SidebarPerfil from "../../../components/Cliente/Perfil/SidebarPerfil";
import { useNavigate } from 'react-router-dom';
import api from "../../../api/api";
import Swal from "sweetalert2";

function PerfilPagamento() {

    const navigate = useNavigate();

    const [plano, setPlano] = useState("");
    const [statusPlano, setStatusPlano] = useState("");

    useEffect(() => {
        if (sessionStorage.getItem('permissao') == null || sessionStorage.getItem('permissao') == '') {
            navigate('/')
        } else if (sessionStorage.getItem('permissao') == 'USUARIO') {
            navigate('/cadastro/endereco')
        }
        buscarPlano();
    }, []);

    const buscarPlano = () => {
        api.get(`/planos/${sessionStorage.getItem('idUsuario')}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
            }
        })
            .then((response) => {
                setPlano(response.data);
                setStatusPlano(response.data.isAtivo);
            }).catch((error) => {
                console.log(error);
            });
    }

    const cancelarAssinatura = () => {
        api.delete(`/pagamentos/assinatura/${plano}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
            }
        })
            .then((response) => {
                Swal.fire({
                    title: "Assinatura cancelada com sucesso!",
                    confirmButtonColor: "#F29311",
                });
            }).catch((error) => {
                console.log(error);
            });
    }

    const desativarPlano = () => {
        api.delete(`/pagamentos/plano/${plano.id}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
            }
        })
            .then((response) => {
                cancelarAssinatura();
            }).catch((error) => {
                console.log(error);
            });
    }

    const ativarPlano = () => {
        api.delete(`/pagamentos/solicitar/${sessionStorage.getItem('idUsuario')}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
            }
        })
            .then((response) => {
                Swal.fire({
                    title: "Plano reativado com sucesso!",
                    confirmButtonColor: "#F29311",
                });
        
                setTimeout(() => {
                    window.location.reload();
                }, 2000);

            }).catch((error) => {
                console.log(error);
            });
    }

    return (
        <>
            <HeaderCliente />
            <div className="flex h-screen">
                <SidebarPerfil nome={sessionStorage.getItem('nome')} />
                <div className="flex-grow p-6 flex items-start justify-center mt-12">
                    <div className="flex-col justify-center items-center w-full max-w-md bg-white p-6 rounded-lg filter drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.25))">
                        <div className="w-full flex-col items-center justify-center">
                            <h1 className="text-[#DC7726] font-bold text-2xl mb-2 flex justify-center items-center w-full">
                                Pagamento
                            </h1>
                            {statusPlano == "ATIVO" ? <span>
                                <p className="mt-4 mb-4">
                                    Para cancelar sua assinatura, basta clicar na opção de cancelamento. Caso mude de ideia no futuro, a opção para reativar a assinatura estará disponível, permitindo que retorne ao seu plano anterior.
                                </p>
                                <span className="w-full flex items-center justify-center">
                                    <button
                                        type="button"
                                        onClick={desativarPlano}
                                        className="border border-gray-300 rounded-md px-3 py-1 bg-[#DC7726] hover-bg-[#ba5a0d] text-white">
                                        Cancelar Assinatura
                                    </button>
                                </span>
                            </span> : <span>
                                <p className="mt-4 mb-4">
                                    Reative o seu pagamento e retorne ao seu plano anterior.
                                </p>
                                <span className="w-full flex items-center justify-center">
                                    <button
                                        type="button"
                                        onClick={ativarPlano}
                                        className="border border-gray-300 rounded-md px-3 py-1 bg-[#DC7726] hover-bg-[#ba5a0d] text-white">
                                        Renovar Assinatura
                                    </button>
                                </span>
                            </span>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PerfilPagamento;