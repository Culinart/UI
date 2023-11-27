import React, { useState } from "react";
import style from "./Dashboard.module.css"

import HeaderFornecedor from "../../../components/Fornecedor/HeaderFornecedor/HeaderFornecedor";
import TituloRankingCategoriaMaisEscolhidos from "../../../components/Fornecedor/Dashboard/TituloRankingCategoriaMaisEscolhidos";
import TituloRankingCategoriaMenosEscolhidos from "../../../components/Fornecedor/Dashboard/TituloRankingCategoriaMenosEscolhidos";
import MaisEscolhidaRank from "../../../components/Fornecedor/Dashboard/MaisEscolhidaRank";
import MenosEscolhidaRank from "../../../components/Fornecedor/Dashboard/MenosEscolhidaRank";
import TituloRankingMelhoresReceita from "../../../components/Fornecedor/Dashboard/TItuloRankingMelhoresReceita";
import TituloRankingPioresReceita from "../../../components/Fornecedor/Dashboard/TituloRankingPioresReceita";
import ReceitaMelhorAvaliada from "../../../components/Fornecedor/Dashboard/ReceitaMelhorAvaliada";
import ReceitaPiorAvaliada from "../../../components/Fornecedor/Dashboard/ReceitaPiorAvaliada";
import Grafico from "../../../components/Fornecedor/Dashboard/Grafico";

function Dashboard() {

    const [selectedOptionKpiEsquerda, setSelectedOptionKpiEsquerda] = useState("");

    const opcoesKpiEsquerda = [
        "Categorias", "Preferências"
    ];

    const [selectedOptionKpiDireita, setSelectedOptionKpiDireita] = useState("");

    const opcoesKpiDireita = [
        "Melhor", "Pior"
    ];

    const chartData = {
        labels: ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'NOV', 'DEZ'],
        datasets: [{
            label: 'Clientes Inativos',
            data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
            backgroundColor: '#FF9F1C',
        },
        {
            label: 'Clientes  Ativos',
            data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
            backgroundColor: '#2EC4B6',
        }]
    };

    console.log(chartData.datasets)

    const [chartDataState, setChartDataState] = useState(chartData)

    return (
        <>
            <HeaderFornecedor />
            <div className="flex justify-center w-full h-auto mt-12 ">
                <div className="flex w-full justify-center">
                    <div className="flex w-11/12 h-auto items-center flex-col">
                        <div className={`${style.container_kpis} flex justify-between h-auto mt-1`}>
                            <div className={`${style.kpi_esquerda} bg-[#FFFFFF] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-md h-auto`}>
                                <select
                                    className={`${style.combobox_horario_entrega} flex text-xs font-light pl-4 pr-4 ml-4 mt-6`}
                                    value={selectedOptionKpiEsquerda}
                                    onChange={(e) => setSelectedOptionKpiEsquerda(e.target.value)}
                                >
                                    <option value="">--</option>
                                    {opcoesKpiEsquerda.map((time, index) => (
                                        <option key={index} value={time}>
                                            {time}
                                        </option>
                                    ))}
                                </select>
                                <div className="flex w-full justify-center mt-10">
                                    <div className={`${style.container_escolhidos} flex justify-between`}>
                                        <div className={`${style.width_escolhidos} flex flex-col items-center`}>
                                            <h1 className="text-base font-medium">Mais Escolhidos</h1>
                                            <TituloRankingCategoriaMaisEscolhidos />
                                            <MaisEscolhidaRank />
                                            <MaisEscolhidaRank />
                                            <MaisEscolhidaRank />
                                            <MaisEscolhidaRank />
                                            <MaisEscolhidaRank />
                                            <MaisEscolhidaRank />
                                        </div>
                                        <div className={`${style.width_escolhidos} flex flex-col items-center`}>
                                            <h1 className="text-base font-medium">Menos Escolhidos</h1>
                                            <TituloRankingCategoriaMenosEscolhidos />
                                            <MenosEscolhidaRank />
                                            <MenosEscolhidaRank />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full h-5 mt-2" />
                            </div>
                            <div className={`${style.kpi_direita} bg-[#FFFFFF] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-md`} >
                                <select
                                    className={`${style.combobox_horario_entrega} flex text-xs font-light pl-4 pr-4 ml-4 mt-6`}
                                    value={selectedOptionKpiDireita}
                                    onChange={(e) => setSelectedOptionKpiDireita(e.target.value)}
                                >
                                    <option value="">--</option>
                                    {opcoesKpiDireita.map((time, index) => (
                                        <option key={index} value={time}>
                                            {time}
                                        </option>
                                    ))}
                                </select>
                                <div className="flex flex-col w-full items-center h-auto mt-10">
                                    <TituloRankingMelhoresReceita />
                                    <div className="flex flex-col w-full h-72 items-center overflow-hidden overflow-y-scroll mr-2.5 mt-2">
                                        <ReceitaMelhorAvaliada />
                                        <ReceitaMelhorAvaliada />
                                        <ReceitaMelhorAvaliada />
                                        <ReceitaMelhorAvaliada />
                                        <ReceitaMelhorAvaliada />
                                        <ReceitaMelhorAvaliada />
                                        <ReceitaMelhorAvaliada />
                                        <ReceitaMelhorAvaliada />
                                        <ReceitaMelhorAvaliada />
                                        <ReceitaMelhorAvaliada />
                                        <ReceitaMelhorAvaliada />
                                        <ReceitaMelhorAvaliada />
                                        <ReceitaMelhorAvaliada />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${style.container_kpis} flex justify-center h-auto mt-12 bg-[#FFFFFF] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-2xl `}>
                                        
                            <Grafico chartData={chartDataState} />
                        </div>
                    </div>
                </div>
            </div>
                <footer className="w-full h-12" />
        </>
    )
}

export default Dashboard;