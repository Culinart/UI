import React, { useEffect, useState } from "react";
import HeaderCliente from "../../components/Cliente/HeaderCliente/HeaderCliente";
import { FiEdit } from "react-icons/fi";
import CardPedido from "../../components/Cliente/Pedido/CardPedido";
import { useNavigate } from 'react-router-dom';
import api from "../../api/api";


function Pedidos() {

    const navigate = useNavigate();

    const [enderecoUsuario, setEnderecoUsuario] = useState({
        usuario: {},
        endereco: {},
        isAtivo: null,
    });
    const [categorias, setCategorias] = useState([]);


    const navigateToPage = (path) => {
        navigate(path);
    }

    useEffect(() => {
        buscarEnderecoAtivo();
        buscarCategoriasUsuario();
    }, []);

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

    const buscarCategoriasUsuario = () => {
        api.get(`/planos/categorias/${sessionStorage.getItem("idUsuario")}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
            }
        })
            .then((response) => {
                const categoriasNomes = response.data.map((planoCategoria) => planoCategoria.categoria.nome);
                setCategorias(categoriasNomes);
                console.log("CATEGORIAS: ", categoriasNomes);
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
                    <div className="items-center justify-between w-4/5 flex border-b border-gray-300">
                        <h1 className="text-2xl text-[#045D53] mb-4">Pedido</h1>
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
                                    <p className=" mr-2">Data da próxima entrega: </p>
                                    <p>00/00/0000</p>
                                </span>
                                {categorias.map((categoria, index) => (
                                    <p key={index}>{categoria}</p>
                                ))}
                            </p>
                        </div>
                        <div className="flex justify-center items-center w-3/12 h-auto mt-4">
                            <button className="pl-3 pr-3 pb-2 pt-2 text-[1.1rem] text-[#FFFFFF] bg-[#DC7726] border-solid border-3 border-[#FF9F1C] rounded-md">
                                Editar Entrega
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center flex-col w-full h-auto mt-[4.5rem] h-96">
                        <div className="flex w-10/12 justify-start ml-8">
                            <h2 className="text-xl font-medium ml-1">Receitas da Entrega</h2>
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

        </>
    )
}

export default Pedidos;