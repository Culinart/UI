import React, { useState } from "react";
import CadastroPassos from "../../../components/Institucional/Cadastro/CadastroPassos";
import Header from "../../../components/Institucional/Header/Header";
import iconeCarne from "../../../assets/Institucional/Cadastro/iconeCarne.svg";
import iconePeixe from "../../../assets/Institucional/Cadastro/iconePeixe.svg";
import iconeRelogio from "../../../assets/Institucional/Cadastro/iconeRelogio.svg";
import iconeSuco from "../../../assets/Institucional/Cadastro/iconeSuco.svg";
import iconePlanta from "../../../assets/Institucional/Cadastro/iconePlanta.svg";
import iconeMaca from "../../../assets/Institucional/Cadastro/iconeMaca.svg";
import styles from "./CadastroStyles.module.css";

function Plano() {
    const [preferenciasSelecionadas, setPreferenciasSelecionadas] = useState([]);
    const [pessoasSelecionadas, setPessoasSelecionadas] = useState(0);
    const [refeicoesSelecionadas, setRefeicoesSelecionadas] = useState(0);
    const [diasSelecionados, setDiasSelecionados] = useState(0);
    const [diaSemanaSelecionado, setDiaSemanaSelecionado] = useState(0);

    const handlePreferencias = (preferencia) => {
        if (preferenciasSelecionadas.includes(preferencia)) {
            setPreferenciasSelecionadas(preferenciasSelecionadas.filter((item) => item !== preferencia));
        } else {
            setPreferenciasSelecionadas([...preferenciasSelecionadas, preferencia]);
        }
    };

    const preferenciasData = [
        {
            label: "Carnes",
            image: iconeCarne,
        },
        {
            label: "Pescetariano",
            image: iconePeixe,
        },
        {
            label: "Rápido e Fácil",
            image: iconeRelogio,
        },
        {
            label: "Vegetariano",
            image: iconeSuco,
        },
        {
            label: "Vegano",
            image: iconePlanta,
        },
        {
            label: "Fit e Saudável",
            image: iconeMaca,
        },
    ];

    const diasSemanaData = [
        {
            label: "S",
            data: "Segunda",
        },
        {
            label: "T",
            data: "Terça",
        },
        {
            label: "Q",
            data: "Quarta",
        },
        {
            label: "Q",
            data: "Quinta",
        },
        {
            label: "S",
            data: "Sexta",
        },
    ];

    const createNumberArray = (n) => {
        return Array.from({ length: n }, (_, i) => i + 1);
    };

    const pessoasData = createNumberArray(8);
    const refeicoesData = createNumberArray(6);
    const diasData = createNumberArray(7);

    const splitPreferenciasData = preferenciasData.reduce((result, item, index) => {
        if (index % 3 === 0) {
            result.push([item]);
        } else {
            result[result.length - 1].push(item);
        }
        return result;
    }, []);

    const handlePessoas = (count) => {
        setPessoasSelecionadas(count);
    };

    const handleRefeicoes = (count) => {
        setRefeicoesSelecionadas(count);
    };

    const handleDias = (count) => {
        setDiasSelecionados(count);
    };

    const handleDiaSemana = (dia) => {
        setDiaSemanaSelecionado(dia.data);
    };

    const cadastrarPlano = () => {
        console.log("Selected preferencias:", preferenciasSelecionadas);
        console.log("Selected Pessoas:", pessoasSelecionadas);
        console.log("Selected Refeições por dia:", refeicoesSelecionadas);
        console.log("Selected Dias por semana:", diasSelecionados);
        console.log("Selected Dia da semana:", diaSemanaSelecionado);
    };


    return (
        <>
            <div className="flex flex-col h-screen">
                <Header />
                <CadastroPassos corEndereco="#2EC4B6" corPlano="#2EC4B6" corCheckout="#AEBDBC" />
                <div className={`bg ${styles.bg}`}>
                    <div className={`card ${styles.card} flex`}>
                        <div className="flex flex-col w-full items-center">
                            <div className="flex flex-col items-center">
                                <h2 className="text-[#DC7726] font-bold text-2xl mb-2">Personalize seu Plano!</h2>
                            </div>
                            <div className="flex mt-4 mb-4">
                                <div className="px-8">
                                    <h3>1. Selecione suas preferências</h3>
                                    <div className="flex w-full items-center justify-center">
                                        {splitPreferenciasData.map((columnData, columnIndex) => (
                                            <div className="flex-col items-center justify-center" key={columnIndex}>
                                                {columnData.map((preferenciaData, index) => (
                                                    <div
                                                        key={index}
                                                        className={`card ${styles.card_plano} flex-col items-center justify-center ${preferenciasSelecionadas.includes(preferenciaData.label) ? styles.card_plano_selecionado : ''}`}
                                                        onClick={() => handlePreferencias(preferenciaData.label)}
                                                    >
                                                        <img
                                                            src={preferenciaData.image}
                                                            className="mx-auto my-auto w-10"
                                                            alt={preferenciaData.label}
                                                        />
                                                        <div className={`${styles.texto_card_plano}`}>{preferenciaData.label}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <span className="bg-[#AEBDBC] w-1 h-80"></span>
                                <div className="flex-col items-center justify-center px-8">
                                    <h3 className="text-center">2. Customize o seu plano</h3>
                                    <div>
                                        <div className="flex justify-between" >
                                            <div>Pessoas</div>
                                            <div className="flex">
                                                {pessoasData.map((count) => (
                                                    <div
                                                        key={count}
                                                        className={`card ${styles.customizacao_plano} flex-col items-center justify-center ${pessoasSelecionadas === count ? styles.customizacao_plano_selecionado : ""
                                                            }`}
                                                        onClick={() => handlePessoas(count)}
                                                    >
                                                        {count}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div>Refeições por dia</div>
                                            <div className="flex">
                                                {refeicoesData.map((count) => (
                                                    <div
                                                        key={count}
                                                        className={`card ${styles.customizacao_plano} flex-col items-center justify-center ${refeicoesSelecionadas === count ? styles.customizacao_plano_selecionado : ""
                                                            }`}
                                                        onClick={() => handleRefeicoes(count)}
                                                    >
                                                        {count}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div>Dias por semana</div>
                                            <div className="flex">
                                                {diasData.map((count) => (
                                                    <div
                                                        key={count}
                                                        className={`card ${styles.customizacao_plano} flex-col items-center justify-center ${diasSelecionados === count ? styles.customizacao_plano_selecionado : ""
                                                            }`}
                                                        onClick={() => handleDias(count)}
                                                    >
                                                        {count}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div>Dia para entrega</div>
                                            <div className="flex">
                                                {diasSemanaData.map((dia) => (
                                                    <div
                                                        key={dia.data}
                                                        className={`card ${styles.customizacao_plano} flex-col items-center justify-center ${diaSemanaSelecionado === dia.data ? styles.customizacao_plano_selecionado : ''}`}
                                                        onClick={() => handleDiaSemana(dia)}
                                                    >
                                                        {dia.label}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className={`bg-[#F29311] ${styles.btnCadastro}`}
                                onClick={cadastrarPlano}
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Plano;
