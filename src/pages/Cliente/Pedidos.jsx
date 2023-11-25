import React, { useEffect, useState } from "react";
import HeaderCliente from "../../components/Cliente/HeaderCliente/HeaderCliente";
import { FiEdit } from "react-icons/fi";
import CardPedido from "../../components/Cliente/Pedido/CardPedido";
import { useNavigate } from 'react-router-dom';
import api from "../../api/api";
import ModalAvaliarReceitas from "../../components/Cliente/Pedido/ModalAvaliarReceitas";


function Pedidos() {

    const navigate = useNavigate();

    const [enderecoUsuario, setEnderecoUsuario] = useState({
        usuario: {},
        endereco: {},
        isAtivo: null,
    });
    const [categorias, setCategorias] = useState([]);
    const [dates, setDates] = useState([]);
    const [selectedDateIndex, setSelectedDateIndex] = useState(0);
    // const [statusPedido, setStatusPedido] = useState("ATIVO");
    const [statusPedido, setStatusPedido] = useState("");
    const [isModalAvaliarOpen, setIsModalAvaliarOpen] = useState(false);

    const navigateToPage = (path) => {
        navigate(path);
    }

    useEffect(() => {
        buscarEnderecoAtivo();
    }, []);

    useEffect(() => {
        api.get('/api/dates')
            .then((response) => {
                setDates(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const openModalAvaliacao = () => {
        setIsModalAvaliarOpen(true);
    };

    const closeModalAvaliacao = () => {
        setIsModalAvaliarOpen(false);
    };

    const confirmarEntrega = () => {
        alert('entrega confirmada')
    }

    const pularEntrega = () => {
        alert('entrega pulada')
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


    return (
        <>
            <HeaderCliente />
            <div className="flex justify-center w-full h-full mt-14">
                <div className="flex flex-col items-center justify-center w-full h-full">
                    <div className="items-center justify-center w-4/5 flex border-b border-gray-300">
                        <div className="flex items-center">
                            <button
                                className="px-16 py-1 text-2xl text-[#045D53]"
                            >
                                &lt;
                            </button>
                            <h1 className="text-2xl text-[#045D53] mx-4">Pedido</h1>
                            <button
                                className={statusPedido == "ATIVO" ? "px-16 py-1 text-2xl text-[#b1cac7]" : "px-16 py-1 text-2xl text-[#045D53]"}
                                disabled={statusPedido == "ATIVO"}
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
                                    <p>00/00/0000</p>
                                </span>
                                <span className="flex">
                                    <p className="mr-2">Status Entrega: </p>
                                    <p>{statusPedido}</p>
                                </span>
                            </p>
                        </div>
                        <div className="flex w-3/12 h-auto mt-4">
                            {statusPedido == "ATIVO" ? <span>
                                <button onClick={confirmarEntrega} className="mr-8 px-2 py-1 text-sm text-[#FFFFFF] bg-[#DC7726] rounded-md">
                                    Confirmar Entrega
                                </button>
                                <button onClick={pularEntrega} className="px-2 py-1 text-sm text-[#FFFFFF] bg-slate-400 rounded-md">
                                    Pular Entrega
                                </button>
                            </span> : ""}
                        </div>
                    </div>
                    <div className="flex items-center flex-col w-full h-auto mt-[4.5rem] h-96">
                        <div className="flex w-10/12 justify-between mb-4 items-center">
                            <h2 className="text-xl font-medium ml-1">Receitas da Entrega</h2>
                            {statusPedido == "ATIVO" ? <button className="px-2 py-1 text-sm text-[#FFFFFF] bg-[#DC7726] rounded-md">
                                Adicionar Receita
                            </button> : <button onClick={openModalAvaliacao} className="px-2 py-1 text-base text-[#FFFFFF] bg-[#008E80] rounded-md">
                                Avaliar Receitas
                            </button>}
                        </div>
                        <div className="flex w-full h-auto justify-center mt-6">
                            <div className="grid grid-cols-3 gap-10 gap-y-16 w-10/12 h-[27rem] mt-8 ml-6 overflow-hidden overflow-y-scroll">
                                <CardPedido />
                                <CardPedido />
                                <CardPedido />
                                <CardPedido />
                                <CardPedido />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <footer className="w-full h-20" />
            {isModalAvaliarOpen && (
                <ModalAvaliarReceitas oncloseModal={closeModalAvaliacao} />
            )}
        </>
    )
}

export default Pedidos;