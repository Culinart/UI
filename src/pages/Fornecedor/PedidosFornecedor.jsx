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
                        <select>
                            <option value="pendente">Pendente</option>
                            <option value="finalizado">Entregue</option>
                            <option value="cancelado">Cancelado</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PedidosFornecedor;
