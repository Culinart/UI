import React, { useState } from "react";

import imgReceitaPedido from "../../../assets/Cliente/Pedidos/imgReceitaPedido.png"

import { RxCounterClockwiseClock } from "react-icons/rx"
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

function CardModalPedido() {

    return (
        <>
            <div className="flex items-center flex-col w-12/12 h-auto bg-[#FFFFFF] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.5)] rounded-lg border-solid border border-[#DADADA]">
                <img src={imgReceitaPedido} className="w-11/12 h-45 mt-2" />
                <div className="flex flex-col w-11/12 h-auto mt-1">
                    <h2 className="text-base font-medium">Frango Xadrez</h2>
                    <div className="flex items-center mt-1 text-[9px]">
                        <RxCounterClockwiseClock className="w-2.5 h-2.5" />
                        <p className="font-medium ml-0.5">30 Minutos |</p>
                        <p className=" font-light ml-0.5"> Carnes, Rápido e Fácil</p>
                    </div>
                    <div className="flex justify-center items-center w-14 h-5 mt-2 rounded-[8px] bg-red-300 border-solid border-2 border-black">
                        <b className="font-medium text-[11px]">Chinesa</b>
                    </div>
                    <div className="flex w-11/12 items-center mt-3 font-medium ml-0">
                        <p className="text-sm">
                            <span>5</span> Porções
                        </p>
                        <button className=" ml-1.5 rotate-180"><MdOutlineArrowDropDownCircle className="w-5 h-5" /></button>
                        <button className=" ml-0.5"><MdOutlineArrowDropDownCircle className="w-5 h-5" /></button>
                    </div>
                    <div className="flex flex-row-reverse text-red-600">
                        <RiDeleteBin6Line className="cursor-pointer" onClick={""} />
                    </div>
                </div>
                <div className="w-full h-2" />
            </div>
        </>)
}

export default CardModalPedido;