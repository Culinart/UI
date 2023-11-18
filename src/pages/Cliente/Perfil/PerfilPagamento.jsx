import React,  { useEffect } from "react";
import HeaderCliente from "../../../components/Cliente/HeaderCliente/HeaderCliente";
import SidebarPerfil from "../../../components/Cliente/Perfil/SidebarPerfil";
import { useNavigate } from 'react-router-dom';

function PerfilPagamento() {

    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem('permissao') == null || sessionStorage.getItem('permissao') == '') {
            navigate('/')
        } else if (sessionStorage.getItem('permissao') == 'USUARIO') {
            navigate('/cadastro/endereco')
        }
    }, []);

    return (
        <>
            <HeaderCliente />
            <div className="flex h-screen">
                <SidebarPerfil nome={sessionStorage.getItem('nome')} />
                <div className="flex-grow p-6 flex items-start justify-center mt-12">
                    <div className="flex-col justify-center items-center w-full max-w-md bg-white p-6 rounded-lg filter drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.25))">
                        <div className="flex">
                            <h1 className="text-[#DC7726] font-bold text-2xl mb-2 flex justify-center items-center w-full">
                                Pagamento
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PerfilPagamento;