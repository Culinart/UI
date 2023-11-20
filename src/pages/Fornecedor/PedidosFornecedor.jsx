import React, { useEffect, useState } from "react";
import HeaderFornecedor from "../../components/Fornecedor/HeaderFornecedor/HeaderFornecedor";

function PedidosFornecedor() {

    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        setPedidos(
            [
                {
                    id: 1,
                    
                }
            ]
        )
    }, []);

    return (
        <>
            <HeaderFornecedor />
            <div className="items-center justify-center w-full flex mt-10">
                <div className="items-center justify-between w-4/5 flex border-b border-gray-300">
                    <h1 className="text-2xl text-[#045D53] mb-4">Pedidos</h1>
                    <div className="flex">
                        <select className="mr-2">
                            <option value="hoje">Hoje</option>
                            <option value="semana">Esta Semana</option>
                            <option value="semana">Semana Passada</option>
                            <option value="mes">Este Mês</option>
                            <option value="mes">Mês Passado</option>
                        </select>
                        <select>
                            <option value="pendente">Pendente</option>
                            <option value="finalizado">Finalizado</option>
                            <option value="cancelado">Cancelado</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PedidosFornecedor;
