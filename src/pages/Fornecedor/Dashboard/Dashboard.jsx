import React, { useState, useEffect } from "react";
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

import { MdOutlineFileDownload } from "react-icons/md";
import api from "../../../api/api";

import fileDownload from 'js-file-download';

import Swal from "sweetalert2";

function Dashboard() {

    const [categorias, setCategorias] = useState([]);
    const [melhoresAvaliados, setMelhoresAvaliados] = useState([])
    const [pioresAvaliados, setPioresAvaliados] = useState([])
    const [melhoresCategorias, setMelhoresCategorias] = useState([])
    const [pioresCategorias, setPioresCategorias] = useState([])
    const [melhoresPreferencias, setMelhoresPreferencias] = useState([])
    const [pioresPreferencias, setPioresPreferencias] = useState([])

    useEffect(() => {
        getAvaliacoes();
        getCategorias();
        getPreferencias();
    }, []);

    const getPreferencias = () => {
        api.get('dashboard/preferencias', {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
            }
        }).then((response) => {
            const sortedPreferencias = response.data.sort((a, b) => b.qtd_escolhas - a.qtd_escolhas);

            const melhoresPref = sortedPreferencias.slice(0, 5);

            const PioresPref = sortedPreferencias.slice(-5).reverse();

            setMelhoresPreferencias(melhoresPref);
            setPioresPreferencias(PioresPref);

            console.log("PREFERENCIAS:", response.data);
        }).catch((error) => {
            console.log('Status do erro: ' + error.response.status);
            console.log(error.message);
        });
    };

    const getCategorias = () => {
        api.get('dashboard/categorias', {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
            }
        }).then((response) => {
            const sortedCategorias = response.data.sort((a, b) => b.qtd_escolhas - a.qtd_escolhas);

            const melhoresCateg = sortedCategorias.slice(0, 5);

            const pioresCateg = sortedCategorias.slice(-5).reverse();

            setMelhoresCategorias(melhoresCateg);
            setPioresCategorias(pioresCateg);

            console.log("CATEGORIAS:", response.data);
        }).catch((error) => {
            console.log('Status do erro: ' + error.response.status);
            console.log(error.message);
        });
    };


    const getAvaliacoes = () => {
        api.get('dashboard/receitas', {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
            }
        }).then((response) => {
            const sortedAvaliacoes = response.data.sort((a, b) => b.notaMedia - a.notaMedia);

            const melhoresAvaliacoes = sortedAvaliacoes.slice(0, 5);

            const pioresAvaliacoes = sortedAvaliacoes.slice(-5).reverse();

            setMelhoresAvaliados(melhoresAvaliacoes);
            setPioresAvaliados(pioresAvaliacoes);

            console.log("AVALIACOES:", response.data);
        }).catch((error) => {
            console.log('Status do erro: ' + error.response.status);
            console.log(error.message);
        });
    };


    const alertaErroDownload = () => {
        Swal.fire({
            icon: "error",
            title: "<b>Não foi possível fazer o download!</b>",
            text: "Tente novamente mais tarde!",
            position: "center",
        })
    }

    // Exportação com API
    const handleExportArquivoTxt = (e) => {

        e.preventDefault()

        api.get('avaliacoes/download/txt', {
            responseType: 'blob',
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
            }
        }).then((response) => {
            console.log("entrei no .then do download do txt")
            fileDownload(response.data, 'relatorio-avaliacoes.txt')
        }).catch((error) => {
            console.log("Erro na exportação do arquivo txt")
            console.log('Status do erro: ' + error.response.status)
            console.log(error.message)

            alertaErroDownload()
        })
    }

    const handleCategorias = () => {
        if (selectedOptionKpiEsquerda === "Categorias") {
            setMelhoresCategorias(categorias.slice(0, 5));
            setPioresCategorias(categorias.slice(-5).reverse());
        } else if (selectedOptionKpiEsquerda === "Preferências") {
            setMelhoresCategorias(melhoresPreferencias);
            setPioresCategorias(pioresPreferencias);
        }
    };

    const [selectedOptionKpiEsquerda, setSelectedOptionKpiEsquerda] = useState("Categorias");

    const opcoesKpiEsquerda = [
        "Categorias", "Preferências"
    ];

    const [selectedOptionKpiDireita, setSelectedOptionKpiDireita] = useState("Melhor");

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

    const renderMelhoresRank = () => {
        if (selectedOptionKpiEsquerda === 'Categorias') {
            return melhoresCategorias.map((categoria, index) => (
                <MaisEscolhidaRank key={index} ranking={index + 1} categoria={categoria.categoria} quantidadeEscolhas={categoria.qtd_escolhas} />
            ));
        } else if (selectedOptionKpiEsquerda === 'Preferências') {
            return melhoresPreferencias.map((preferencia, index) => (
                <MaisEscolhidaRank key={index} ranking={index + 1} categoria={preferencia.preferencia} quantidadeEscolhas={preferencia.qtd_escolhas} />
            ));
        }
    };

    const renderPioresRank = () => {
        if (selectedOptionKpiEsquerda === 'Categorias') {
            return pioresCategorias.map((categoria, index) => (
                <MenosEscolhidaRank key={index} ranking={index + 1} categoria={categoria.categoria} quantidadeEscolhas={categoria.qtd_escolhas} />
            ));
        } else if (selectedOptionKpiEsquerda === 'Preferências') {
            return pioresPreferencias.map((preferencia, index) => (
                <MenosEscolhidaRank key={index} ranking={index + 1} categoria={preferencia.preferencia} quantidadeEscolhas={preferencia.qtd_escolhas} />
            ));
        }
    };

    return (
        <>
            <HeaderFornecedor />
            <div className="flex justify-center w-full h-auto mt-12 ">
                <div className="flex w-full justify-center">
                    <div className="flex w-11/12 h-auto items-center flex-col">
                        <div className={`${style.container_kpis} flex justify-between h-auto mt-1`}>
                            <div className={`${style.kpi_esquerda} bg-[#FFFFFF] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-md h-auto`}>
                                <div className="flex w-full justify-center">
                                    <div className="flex justify-between items-center w-11/12 mt-2">
                                        <select
                                            className={`${style.combobox_horario_entrega} flex text-xs font-light  mt-5`}
                                            value={selectedOptionKpiEsquerda}
                                            onChange={(e) => setSelectedOptionKpiEsquerda(e.target.value)}
                                        >
                                            <option value="Categorias">Categorias</option>
                                            <option value="Preferências">Preferências</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex w-full justify-center mt-10">
                                    <div className={`${style.container_escolhidos} flex justify-between`}>
                                        <div className={`${style.width_escolhidos} flex flex-col items-center`}>
                                            <h1 className="text-base font-medium">Mais Escolhidos</h1>
                                            <TituloRankingCategoriaMaisEscolhidos />
                                            {renderMelhoresRank()}
                                        </div>
                                        <div className={`${style.width_escolhidos} flex flex-col items-center`}>
                                            <h1 className="text-base font-medium">Menos Escolhidos</h1>
                                            <TituloRankingCategoriaMenosEscolhidos />
                                            {renderPioresRank()}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full h-5 mt-2" />
                            </div>
                            <div className={`${style.kpi_direita} bg-[#FFFFFF] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-md`} >
                                <span className="flex justify-between">
                                    <select
                                        className={`${style.combobox_horario_entrega} flex text-xs font-light pl-4 pr-4 ml-4 mt-6`}
                                        value={selectedOptionKpiDireita}
                                        onChange={(e) => setSelectedOptionKpiDireita(e.target.value)}
                                    >
                                        <option value="Melhor">Melhor</option>
                                        <option value="Pior">Pior</option>
                                    </select>

                                    <button onClick={handleExportArquivoTxt} className="flex justify-evenly mr-8 items-center w-40 h-[1.7rem] mt-4 bg-[#C5C5C5] text-[#FFFFFF] text-[0.85rem] rounded-md hover:bg-[#2EC4B6] transition duration-200">
                                        Baixar Avaliações
                                        <MdOutlineFileDownload className="w-4 h-4" />
                                    </button>
                                </span>
                                <div className="flex flex-col w-full items-center h-auto mt-10">
                                    {selectedOptionKpiDireita === "Melhor" && (
                                        <>
                                            <TituloRankingMelhoresReceita />
                                            <div className="flex flex-col w-full h-72 items-center overflow-hidden overflow-y-scroll mr-2.5 mt-2">
                                                {melhoresAvaliados.map((receita, index) => (
                                                    <ReceitaMelhorAvaliada key={index} index={index} receita={receita} />
                                                ))}
                                            </div>
                                        </>
                                    )}
                                    {selectedOptionKpiDireita === "Pior" && (
                                        <>
                                            <TituloRankingPioresReceita />
                                            <div className="flex flex-col w-full h-72 items-center overflow-hidden overflow-y-scroll mr-2.5 mt-2">
                                                {pioresAvaliados.map((receita, index) => (
                                                    <ReceitaPiorAvaliada key={index} index={index} receita={receita} />
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="w-full h-5" />
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