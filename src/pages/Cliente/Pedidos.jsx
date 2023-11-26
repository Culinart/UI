import React, { useEffect, useState } from "react";
import HeaderCliente from "../../components/Cliente/HeaderCliente/HeaderCliente";
import { FiEdit } from "react-icons/fi";
import CardPedido from "../../components/Cliente/Pedido/CardPedido";
import { useNavigate } from 'react-router-dom';
import api from "../../api/api";
import Swal from "sweetalert2";
import ModalAvaliarReceitas from "../../components/Cliente/Pedido/ModalAvaliarReceitas";


function Pedidos() {

    const navigate = useNavigate();

    const [enderecoUsuario, setEnderecoUsuario] = useState({
        usuario: {},
        endereco: {},
        isAtivo: null,
    });
    const [categorias, setCategorias] = useState([]);
    const [selectedDateIndex, setSelectedDateIndex] = useState(0);
    // const [statusPedido, setStatusPedido] = useState("ATIVO");
    // const [statusPedido, setStatusPedido] = useState("");
    const [isModalAvaliarOpen, setIsModalAvaliarOpen] = useState(false);
    const [datasPedidos, setDatasPedidos] = useState([]);
    const [dataPedidoAtual, setDataPedidoAtual] = useState("");
    const [pedidoAtual, setPedidoAtual] = useState([]);
    const [receitas, setReceitas] = useState([]);

    const navigateToPage = (path) => {
        navigate(path);
    }

    useEffect(() => {
        buscarEnderecoAtivo();
        buscarDatasPedidos();
    }, []);

    useEffect(() => {
        if (datasPedidos.length > 0) {
            setSelectedDateIndex(datasPedidos.length - 1);
            setDataPedidoAtual(datasPedidos[datasPedidos.length - 1].datasPedidos);
            buscarPedido();
        }
    }, [datasPedidos]);


    const openModalAvaliacao = () => {
        setIsModalAvaliarOpen(true);
    };

    const closeModalAvaliacao = () => {
        setIsModalAvaliarOpen(false);
    };

    const confirmarEntrega = () => {

        api.put(`/pedidos/entregue/${pedidoAtual.id}`, null, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
            }
        })
            .then((response) => {

                Swal.fire({
                    title: "Entrega confirmada com sucesso!",
                    confirmButtonColor: "#F29311",
                });

                setTimeout(() => {
                    window.location.reload();
                }, 2000);

            })
            .catch((error) => {
                console.log(error);
            });

    }

    const pularEntrega = () => {

        api.put(`/pedidos/pularEntrega/${pedidoAtual.id}`, null, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
            }
        })
            .then((response) => {

                Swal.fire({
                    title: "Entrega pulada com sucesso!",
                    confirmButtonColor: "#F29311",
                });

                setTimeout(() => {
                    window.location.reload();
                }, 2000);

            })
            .catch((error) => {
                console.log(error);
            });

    }

    const buscarEnderecoAtivo = () => {
        api.get(`/enderecos/usuarios/enderecoAtivo/${sessionStorage.getItem("idUsuario")}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
            }
        })
            .then((response) => {
                setEnderecoUsuario(response.data);
                console.log("ENDERECO: ", response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const buscarDatasPedidos = () => {

        api.get(`/pedidos/datas/${sessionStorage.getItem("idUsuario")}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
            }
        })
            .then((response) => {
                console.log(response);
                setDatasPedidos(response.data);

                setDataPedidoAtual(response.data[response.data.length - 1].datasPedidos);

                buscarPedido();

            })
            .catch((error) => {
                console.log(error);
            });

        // const response = {
        //     data: [
        //         {
        //             "datasPedidos": "2023-11-11"
        //         },
        //         {
        //             "datasPedidos": "2023-11-13"
        //         },
        //         {
        //             "datasPedidos": "2023-11-17"
        //         },
        //         {
        //             "datasPedidos": "2023-11-24"
        //         },
        //         {
        //             "datasPedidos": "2023-12-02"
        //         }
        //     ]
        // }

        // setDatasPedidos(response.data);

        // setDataPedidoAtual(response.data[response.data.length - 1].datasPedidos);

        // buscarPedido();

    }

    const buscarPedido = () => {
        const corpoRequisicao = {
            dataEntrega: datasPedidos[selectedDateIndex].datasPedidos
        }

        api.post(`/pedidos/entrega/${sessionStorage.getItem("idUsuario")}`, corpoRequisicao, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
            }
        })
            .then((response) => {
                console.log('PEDIDO ', response)
                setPedidoAtual(response.data);
                setReceitas(response.data.listaReceitas);
                // setStatusPedido(response.data.status);
            })
            .catch((error) => {
                console.log(error);
            });


        // const response = {
        //     data:
        //     {
        //         "id": 12,
        //         "valor": 150.0,
        //         "dataEntrega": "2023-12-02",
        //         "listaReceitas": [
        //             {
        //                 "id": 2,
        //                 "nome": "Salada Caesar",
        //                 "horas": 0,
        //                 "minutos": 20,
        //                 "qtd_porcoes": 4,
        //                 "preferencias": [
        //                     {
        //                         "nome": "Low Calorie",
        //                         "corFundo": "1C84FF",
        //                         "corTexto": "FFFFFF"
        //                     },
        //                     {
        //                         "nome": "Brasileira",
        //                         "corFundo": "009739",
        //                         "corTexto": "FFFFFF"
        //                     },
        //                     {
        //                         "nome": "Portuguesa",
        //                         "corFundo": "DA291C",
        //                         "corTexto": "FFFFFF"
        //                     }
        //                 ],
        //                 "categorias": [
        //                     {
        //                         "nome": "Vegano"
        //                     },
        //                     {
        //                         "nome": "Rápido e Fácil"
        //                     },
        //                     {
        //                         "nome": "Fit e Saudável"
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": 4,
        //                 "nome": "Sopa de Legumes",
        //                 "horas": 0,
        //                 "minutos": 45,
        //                 "qtd_porcoes": 6,
        //                 "preferencias": [
        //                     {
        //                         "nome": "Húngara",
        //                         "corFundo": "477050",
        //                         "corTexto": "FFFFFF"
        //                     },
        //                     {
        //                         "nome": "Portuguesa",
        //                         "corFundo": "DA291C",
        //                         "corTexto": "FFFFFF"
        //                     },
        //                     {
        //                         "nome": "Gourmet",
        //                         "corFundo": "A4D3FF",
        //                         "corTexto": "000000"
        //                     }
        //                 ],
        //                 "categorias": [
        //                     {
        //                         "nome": "Vegetariano"
        //                     },
        //                     {
        //                         "nome": "Vegano"
        //                     },
        //                     {
        //                         "nome": "Rápido e Fácil"
        //                     }
        //                 ]
        //             }
        //         ]
        //     }
        // }

        // setPedidoAtual(response.data);
        // setReceitas(response.data.listaReceitas);

    }

    const handleDateNavigation = (direction) => {
        if (direction === "left" && selectedDateIndex > 0) {
            setSelectedDateIndex((prevIndex) => prevIndex - 1);
        } else if (direction === "right" && selectedDateIndex < datasPedidos.length - 1) {
            setSelectedDateIndex((prevIndex) => prevIndex + 1);
        }
    };


    return (
        <>
            <HeaderCliente />
            <div className="flex justify-center w-full h-full mt-14">
                <div className="flex flex-col items-center justify-center w-full h-full">
                    <div className="items-center justify-center w-4/5 flex border-b border-gray-300">
                        <div className="flex items-center">
                            <button
                                className={`px-16 py-1 text-2xl ${selectedDateIndex === 0 ? 'text-[#b1cac7] cursor-not-allowed' : 'text-[#045D53]'} ${selectedDateIndex === 0 ? 'disabled' : ''}`}
                                disabled={selectedDateIndex === 0}
                                onClick={() => handleDateNavigation("left")}
                            >
                                &lt;
                            </button>
                            <h1 className="text-2xl text-[#045D53] mx-4">Pedido</h1>
                            <button
                                className={`px-16 py-1 text-2xl ${selectedDateIndex === datasPedidos.length - 1 ? 'text-[#b1cac7] cursor-not-allowed' : 'text-[#045D53]'} ${selectedDateIndex === datasPedidos.length - 1 ? 'disabled' : ''}`}
                                disabled={selectedDateIndex === datasPedidos.length - 1}
                                onClick={() => handleDateNavigation("right")}
                            >
                                &gt;
                            </button>
                        </div>
                    </div>
                    <div className="flex  justify-center items-center w-full bg-[#E1F0EF] mt-16 h-48">
                        <div className="flex justify-center flex-col w-7/12 h-auto">
                            <p className="flex-col text-[#3F4747] text-[1.1rem] ml-5">
                                Entrega
                                <p className="flex items-center">
                                    {`${enderecoUsuario.endereco.logradouro}, ${enderecoUsuario.endereco.numero}`}
                                    <FiEdit className="ml-2 mb-0.5 text-gray-600 cursor-pointer" onClick={() => navigateToPage('/cliente/perfil/endereco')} />
                                </p>
                                <span className="flex">
                                    <p className=" mr-2">Data da entrega: </p>
                                    <p>{dataPedidoAtual}</p>
                                </span>
                                <span className="flex">
                                    <p className="mr-2">Status Entrega: </p>
                                    <p>{pedidoAtual.status}</p>
                                </span>
                            </p>
                        </div>
                        <div className="flex w-3/12 h-auto mt-4">
                            {pedidoAtual.status == "ATIVO" ? <span>
                                <button onClick={confirmarEntrega} className="mr-8 px-2 py-1 text-sm text-[#FFFFFF] bg-[#DC7726] rounded-md">
                                    Confirmar Entrega
                                </button>
                                <button onClick={pularEntrega} className="px-2 py-1 text-sm text-[#FFFFFF] bg-slate-400 rounded-md">
                                    Pular Entrega
                                </button>
                            </span> : ""}
                        </div>
                    </div>
                    <div className="flex items-center flex-col w-full h-auto mt-[4.5rem]">
                        <div className="flex w-10/12 justify-between mb-4 items-center">
                            <h2 className="text-xl font-medium ml-1">Receitas da Entrega</h2>
                            {pedidoAtual.status == "ATIVO" ? <button className="px-2 py-1 text-sm text-[#FFFFFF] bg-[#DC7726] rounded-md" onClick={() => navigateToPage('/cliente/receitas')}>
                                Adicionar Receita
                            </button> : <button onClick={openModalAvaliacao} className="px-2 py-1 text-base text-[#FFFFFF] bg-[#008E80] rounded-md">
                                Avaliar Receitas
                            </button>}
                        </div>
                        <div className="flex w-full h-auto justify-center mt-6">
                            <div className="grid grid-cols-3 gap-10 gap-y-16 w-10/12 h-[27rem] mt-8 ml-6 overflow-hidden overflow-y-scroll">
                                {receitas && receitas.map((receita) => (
                                    <CardPedido
                                        key={receita.id}
                                        nome={receita.nome}
                                        qtd_porcoes={receita.qtd_porcoes}
                                        preferencias={receita.preferencias}
                                        categorias={receita.categorias}
                                        pedidoAtual={pedidoAtual}
                                        setPedidoAtual={setPedidoAtual}
                                        idReceita={receita.id}
                                        statusPedido={pedidoAtual.status}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <footer className="w-full h-20" />
            {isModalAvaliarOpen && (
                <ModalAvaliarReceitas recipes={receitas} oncloseModal={closeModalAvaliacao} />
            )}
        </>
    )
}

export default Pedidos;