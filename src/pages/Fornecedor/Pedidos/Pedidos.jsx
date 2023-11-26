import React, { useEffect, useState } from "react";
import style from './Pedidos.module.css'
import HeaderFornecedor from '../../../components/Fornecedor/HeaderFornecedor/HeaderFornecedor';
import ItemPedido from '../../../components/Fornecedor/Pedidos/ItemPedido/ItemPedido';

function PedidosFornecedor() {
    const [pedidos, setPedidos] = useState([]);

    const api =
        [
            {
                "idPedido": 7,
                "nomeUsuario": "João",
                "logradouro": "Rua 6",
                "numero": 123,
                "dataEntrega": "2023-11-25",
                "qtdReceitas": 2,
                "qtdPorcoes": 9,
                "receitas": "Bolo de Chocolate,Espaguete,Ovo Frito,Arroz",
                "categorias": "Rápido & Fácil,Carnes",
            },
            {
                "idPedido": 8,
                "nomeUsuario": "Maria",
                "logradouro": "Avenida 5",
                "numero": 456,
                "dataEntrega": "2023-11-26",
                "qtdReceitas": 3,
                "qtdPorcoes": 12,
                "receitas": "Lasanha,Sopa de Legumes,Pudim de Leite",
                "categorias": "Massas,Sobremesas",
            },
            {
                "idPedido": 9,
                "nomeUsuario": "José",
                "logradouro": "Rua 7",
                "numero": 789,
                "dataEntrega": "2023-11-27",
                "qtdReceitas": 1,
                "qtdPorcoes": 5,
                "receitas": "Peixe Grelhado",
                "categorias": "Peixes",
            },
            {
                "idPedido": 10,
                "nomeUsuario": "Ana",
                "logradouro": "Travessa 8",
                "numero": 101,
                "dataEntrega": "2023-11-28",
                "qtdReceitas": 2,
                "qtdPorcoes": 8,
                "receitas": "Salada Caesar,Macarrão ao Molho Alfredo",
                "categorias": "Saladas,Massas",
            },
            {
                "idPedido": 11,
                "nomeUsuario": "Lucas",
                "logradouro": "Avenida 9",
                "numero": 112,
                "dataEntrega": "2023-11-29",
                "qtdReceitas": 1,
                "qtdPorcoes": 6,
                "receitas": "Frango Assado com Batatas",
                "categorias": "Aves",
            },
            {
                "idPedido": 12,
                "nomeUsuario": "Isabela",
                "logradouro": "Rua 10",
                "numero": 131,
                "dataEntrega": "2023-11-30",
                "qtdReceitas": 3,
                "qtdPorcoes": 10,
                "receitas": "Risoto de Cogumelos,Brigadeiro de Colher,Torta de Maçã",
                "categorias": "Arroz,Doces,Sobremesas",
            },
            {
                "idPedido": 13,
                "nomeUsuario": "Mateus",
                "logradouro": "Travessa 11",
                "numero": 154,
                "dataEntrega": "2023-12-01",
                "qtdReceitas": 2,
                "qtdPorcoes": 7,
                "receitas": "Hambúrguer Caseiro,Pudim de Chocolate",
                "categorias": "Carnes,Sobremesas",
            },
            {
                "idPedido": 14,
                "nomeUsuario": "Gabriela",
                "logradouro": "Avenida 12",
                "numero": 176,
                "dataEntrega": "2023-12-02",
                "qtdReceitas": 1,
                "qtdPorcoes": 4,
                "receitas": "Massa à Carbonara",
                "categorias": "Massas",
            },
            {
                "idPedido": 15,
                "nomeUsuario": "Rafael",
                "logradouro": "Rua 13",
                "numero": 199,
                "dataEntrega": "2023-12-03",
                "qtdReceitas": 3,
                "qtdPorcoes": 9,
                "receitas": "Pão de Alho,Salada de Frutas,Torta de Limão",
                "categorias": "Acompanhamentos,Sobremesas",
            },
            {
                "idPedido": 16,
                "nomeUsuario": "Eduarda",
                "logradouro": "Travessa 14",
                "numero": 222,
                "dataEntrega": "2023-12-04",
                "qtdReceitas": 2,
                "qtdPorcoes": 8,
                "receitas": "Ratatouille,Creme Brûlée",
                "categorias": "Vegetarianas,Sobremesas",
            },
            {
                "idPedido": 17,
                "nomeUsuario": "Thiago",
                "logradouro": "Avenida 15",
                "numero": 244,
                "dataEntrega": "2023-12-05",
                "qtdReceitas": 1,
                "qtdPorcoes": 5,
                "receitas": "Sushi",
                "categorias": "Internacionais",
            }
        ]

    useEffect(() => {
        listar();
        document.body.style.backgroundColor = '#fff'
    }, []);

    function listar() {
        setPedidos(api);
    }

    return (
        <>
            <HeaderFornecedor />
            <div className={style.container_topo}>
                <span>Entrega das proximas duas semanas</span>
                <span>Próxima entrega - Sexta-feira, 4 de Agosto</span>
            </div>
            <div className={style.container_pedidos}>
                {pedidos.map((pedido) => (
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
                ))}
            </div>
        </>
    );
}

export default PedidosFornecedor;3