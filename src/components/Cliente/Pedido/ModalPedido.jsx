import React, { useState } from "react";
import style from "./ModalPedido.module.css"

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { isSameWeek } from 'date-fns';

import { useNavigate } from 'react-router-dom';

import CardModalPedido from "./CardModalPedido";

import { ptBR } from 'date-fns/locale';


function ModalPedido({ onClose = () => { } }) {

    const navigate = useNavigate();

    const receitas = () => {
        navigate('/cliente/receitas')
    }

    const endereco = () => {
        navigate('')
    }

    const [dateModal, setDateModal] = useState(new Date());

    const formatoDateModalAuxiliar = (date) => {
        var d = new Date(date),
            day = '' + d.getDay(),
            month = '' + (d.getMonth() + 1),
            year = '' + d.getFullYear();

        return [day, month, year].join('-');
    }

    const formatoDateModal = (date) => {

        console.log(date)

        let diaMesAno = formatoDateModalAuxiliar(date);

        console.log(diaMesAno)
    }

    formatoDateModal(dateModal);

    const [selectedTime, setSelectedTime] = useState("");

    const horariosData = [
        "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
        "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
        "18:00", "19:00", "20:00", "21:00", "22:00"
    ];

    const customLocale = {
        ...ptBR,
        localize: {
          ...ptBR.localize,
          month: (month) => ptBR.localize.month(month).charAt(0).toUpperCase() + ptBR.localize.month(month).slice(1),
        },
       };

    return (
        <>
            <div className="flex justify-center items-center absolute z-10 top-0 bg-opacity-50 w-full h-[90rem] bg-black">
                <div className="flex justify-center items-center w-2/4 h-auto bg-[#FFFFFF] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.5)] rounded-xl z-50 opacity-100">
                    <div className="flex w-full h-auto flex-col">
                        <div className="flex w-full items-center justify-center">
                            <div className={`${style.width_noventa_e_tres_porcento} flex items-center justify-center mt-6 h-auto bg-[#FFFDFA] `}>
                                <div className="flex flex-col w-full">
                                    <h1 className="text-[#DC7726] text-2xl font-bold">Editar Entrega</h1>
                                    <p className=" mt-3 text-sm font-light">Sexta feira, 4 de agosto</p>
                                </div>
                                <div className="flex items-center w-1/4 bg-[#3D7872] rounded-lg mb-5 mr-0">
                                    <button className="flex justify-center text-base w-full text-[#FFFFFF] pr-1 pl-1 pb-1 pt-1">Pular Entrega</button>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full justify-center">
                            <div className={`${style.width_noventa_e_tres_porcento} flex items-center justify-center mt-7 h-auto bg-[#FFFDFA] border-solid border-3 border-[#045D53] rounded-md`}>
                                <div className="flex flex-col w-full mt-2 ml-6">
                                    <h1 className="text-base font-bold">Rua Haddock Lobo, 595</h1>
                                    <p className="text-base font-medium mt-4">01414-001</p>
                                </div>
                                <div className={`${style.btnEditarEndereco} flex justify-center bg-[#00AE9E] rounded-lg mr-6`}>
                                    <button className="text-[#FFFFFF] text-sm pb-1 pt-1">Editar Endereço</button>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center w-full h-auto mt-4">
                            <div className={`${style.width_noventa_e_tres_porcento} flex flex-col h-auto `}>
                                <p className="flex items-center font-semibold">Data de Entrega:
                                    <ReactDatePicker
                                        selected={dateModal}
                                        onChange={date => setDateModal(date)}
                                        className={`${style.combobox_horario_entrega} flex justify-center items-center font-light pl-4 pr-4 ml-4 w-[7.5rem]`}
                                        placeholderText="dia/mês/ano"
                                        dateFormat={"dd/MM/yyyy"}
                                        minDate={new Date()}
                                        maxDate={new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000)}
                                        filterDate={date => {
                                            return isSameWeek(date, new Date()) && date.getDay() !== 0 && date.getDay() !== 6;
                                        }}
                                        locale={customLocale}
                                    />
                                </p>
                                <p className="flex mt-2 font-semibold">Hora da Entrega:
                                    <select
                                        className={`${style.combobox_horario_entrega} flex justify-center items-center font-light pl-4 pr-4 ml-4`}
                                        value={selectedTime}
                                        onChange={(e) => setSelectedTime(e.target.value)}
                                    >
                                        <option value="">-</option>
                                        {horariosData.map((time, index) => (
                                            <option key={index} value={time}>
                                                {time}
                                            </option>
                                        ))}
                                    </select>
                                </p>
                            </div>
                        </div>
                        <div className="flex w-full"> 
                        </div>
                        <div className="flex flex-col w-full h-20 mt-12">
                            <div className={`${style.width_noventa_e_tres_porcento} flex flex-col h-auto items-center`}>
                                <div className={`${style.width_noventa_e_tres_porcento} flex justify-between h-auto `}>
                                    <h1 className="text-[#DC7726] text-2xl font-bold ml-0">
                                        O que vou receber?
                                    </h1>
                                    <div className="flex justify-center bg-[#00AE9E] rounded-lg">
                                        <button onClick={receitas} className="text-sm w-full text-[#FFFFFF] pl-3 pr-3 pb-1 pt-1">Adicionar Receita</button>
                                    </div>
                                </div>
                                <p className="w-11/12 text-sm italic mt-5">As alterações na entrega irão afetar o preço da próxima mensalidade</p>
                            </div>
                        </div>
                        <div className="flex w-full h-auto justify-center mt-3">
                            <div className={`${style.width_noventa_e_tres_porcento} grid grid-cols-3 gap-9 gap-y-10 h-60 mt-3 overflow-hidden overflow-y-scroll`}>
                                <CardModalPedido />
                                <CardModalPedido />
                                <CardModalPedido />
                                <CardModalPedido />
                                <CardModalPedido />
                                <CardModalPedido />
                                <CardModalPedido />
                                <CardModalPedido />
                                <CardModalPedido />
                                <CardModalPedido />
                                <CardModalPedido />
                                <CardModalPedido />
                                <CardModalPedido />
                            </div>
                        </div>
                        <div className="flex w-full justify-center mt-12">
                            <div className="flex w-6/12 justify-around font-semibold">
                                <button onClick={onClose} className="w-5/12 bg-[#D9D9D9] rounded-md hover:bg-red-600 hover:text-white hover:duration-300">Cancelar</button>
                                <button className="w-5/12 pt-0.5 pb-0.5 text-[#FFFFFF] bg-[#DC7726] border-solid border-2 border-[#FF9F1C] rounded-md">Confirmar</button>
                            </div>
                        </div>
                        <footer className="w-full h-5" />
                    </div>
                </div>
            </div>
        </>

    );
}

export default ModalPedido;