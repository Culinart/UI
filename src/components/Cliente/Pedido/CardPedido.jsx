import React, { useState } from "react";

import imgReceitaPedido from "../../../assets/Cliente/Pedidos/imgReceitaPedido.png"

import { RxCounterClockwiseClock } from "react-icons/rx"

function CardPedido() {
    return (
        <>
            <div className="flex items-center flex-col w-10/12 h-auto bg-[#FFFFFF] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.5)] rounded-xl border-solid border border-[#DADADA]">
                <img src={imgReceitaPedido} className="w-[93%] h-40 mt-3" />
                <div className="flex flex-col w-11/12 h-auto mt-2">
                    <h2 className="text-[1.165rem] font-medium">Frango Xadrez</h2>
                    <p className="text-[1rem] mt-[0.9rem]">1 no pacote</p>
                    <p className="text-[1rem] mt-1">5 Porções</p>
                    <div className="flex items-center mt-[1.1rem]">
                        <RxCounterClockwiseClock className="w-[1.2rem] h-[1.2rem]" />
                        <p className="text-sm font-medium ml-1">30 Minutos |</p>
                        <p className="text-sm font-light ml-1">Carnes, Rápido e Fácil</p>
                    </div>
                    <div className="flex justify-center items-center w-[4.5rem] h-[1.65rem] mt-[1.2rem] rounded-[10px] bg-red-300 border-solid border-2 border-black">
                        <b className="text-[0.8rem]">Chinesa</b>
                    </div>
                </div>
                <div className="w-full h-5" />
            </div>
        </>
    )
}

export default CardPedido;