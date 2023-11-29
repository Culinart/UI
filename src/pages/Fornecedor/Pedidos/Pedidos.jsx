import React, { useEffect, useState } from "react";
import style from './Pedidos.module.css'
import HeaderFornecedor from '../../../components/Fornecedor/HeaderFornecedor/HeaderFornecedor';
import ItemPedido from '../../../components/Fornecedor/Pedidos/ItemPedido/ItemPedido';
import api from '../../../api/api'

function PedidosFornecedor() {
    const [pedidos, setPedidos] = useState([]);

    const buscarPedidosFornecedor = () => {
        api.get('/pedidos/proximas', {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
            }
        }).then((response) => {
            console.log("Resposta: ",response);
            setPedidos(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        buscarPedidosFornecedor();
        document.body.style.backgroundColor = '#fff'
    }, []);

    return (
        <>
            <HeaderFornecedor />
            <div className={style.container_topo}>
                <span>Entrega das proximas duas semanas</span>
                <span>Próxima entrega - Sexta-feira, 4 de Agosto</span>
            </div>
            <div className={style.container_pedidos}>
                {pedidos.length > 0 ? (
                    pedidos.map((pedido) => (
                        <ItemPedido
                            key={pedido.idPedido}
                            id={pedido.idPedido}
                            usuario={pedido.nomeUsuario}
                            logradouro={pedido.logradouro}
                            numero={pedido.numero}
                            data={pedido.dataEntrega}
                            qtdReceitas={pedido.qtdReceitas}
                            qtdPorcoes={pedido.qtdPorcoes}
                            receitas={pedido.receitas}
                            categorias={pedido.categorias}
                        />
                    ))
                ) : (
                    <div className="text-gray-600 text-2xl w-full text-center">
                        Nenhum resultado encontrado
                    </div>
                )}

            </div>
        </>
    );
}

export default PedidosFornecedor; 3