import React, { Children, useState } from "react";
import HeaderCliente from "../../components/Cliente/HeaderCliente/HeaderCliente";
import sytle from "./Pedidos.module.css"

import { IoIosHome } from "react-icons/io"
import { TbCalendarSearch } from "react-icons/tb"

import DatasCarrossel from "../../components/Cliente/Pedido/DatasCarrossel";
import Carrossel from "../../components/Cliente/Pedido/Carrossel";
import ModalPedido from "../../components/Cliente/Pedido/ModalPedido";
import CardPedido from "../../components/Cliente/Pedido/CardPedido";
import ModalCalendario from "../../components/Cliente/Pedido/ModalCalendario";


function Pedidos() {

    const [modalAberto, setModalAberto] = useState(false);

    const handleAbrirModal = () => {
        setModalAberto(true);
    };

    const [modalCalendarioAberto, setModalCalendarioAberto] = useState(false);

    const handleOpenCalendarModal = () => {
        setModalCalendarioAberto(true);
    };


    return (
        <>
            <HeaderCliente />
            <div className="flex justify-center w-full h-full mt-14">
                <div className="flex flex-col items-center justify-center w-full h-full">
                    <div className="items-center justify-center w-full flex text-[#045D53]">
                        <h2 className="text-[1.3rem] mr-3 cursor-default">Data das próximas entregas</h2>
                        <TbCalendarSearch onClick={handleOpenCalendarModal} className="cursor-pointer w-6 h-6" />
                    </div>
                    <DatasCarrossel />
                    <div className="flex  justify-center items-center w-full bg-[#E1F0EF] mt-20 h-64">
                        <div className="flex justify-center flex-col w-7/12 h-auto">
                            <p className="flex text-[#3F4747] text-[1.1rem] ml-5">Entrega
                                <span className="ml-4 mr-4">-</span>
                                <span className="flex items-center">
                                    Rua Haddock Lobo, 595
                                    <IoIosHome className="ml-2 mb-0.5 text-[#FF9F1C]" />
                                </span></p>
                            <ul className="text-[#3F4747] text-base text-[1rem] mt-8 ml-5">
                                <li>Carnes, Peixes, Rápido e fácil</li>
                                <li>3 receitas</li>
                                <li>15 porções</li>
                            </ul>
                        </div>
                        <div className="flex justify-center items-center w-3/12 h-auto mt-4">
                            <button onClick={handleAbrirModal} className="pl-3 pr-3 pb-2 pt-2 text-[1.1rem] text-[#FFFFFF] bg-[#DC7726] border-solid border-3 border-[#FF9F1C] rounded-md">
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



            {modalAberto ? (
                <ModalPedido onClose={() => setModalAberto(false)} />
            ) : null}

            {modalCalendarioAberto ? (
                <ModalCalendario onClose={() => setModalCalendarioAberto(false)} />
            ) : null}

        </>
    )
}

export default Pedidos;