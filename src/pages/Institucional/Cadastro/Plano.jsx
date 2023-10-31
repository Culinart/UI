import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import CadastroPassos from "../../../components/Institucional/Cadastro/CadastroPassos";
import HeaderCliente from "../../../components/Cliente/HeaderCliente/HeaderCliente";
import iconeCarne from "../../../assets/Institucional/Cadastro/iconeCarne.svg";
import iconePeixe from "../../../assets/Institucional/Cadastro/iconePeixe.svg";
import iconeRelogio from "../../../assets/Institucional/Cadastro/iconeRelogio.svg";
import iconeSuco from "../../../assets/Institucional/Cadastro/iconeSuco.svg";
import iconePlanta from "../../../assets/Institucional/Cadastro/iconePlanta.svg";
import iconeMaca from "../../../assets/Institucional/Cadastro/iconeMaca.svg";
import styles from "./CadastroStyles.module.css";

function Plano() {

    const navigate = useNavigate();

    const [preferenciasSelecionadas, setPreferenciasSelecionadas] = useState([]);
    const [pessoasSelecionadas, setPessoasSelecionadas] = useState(0);
    const [refeicoesSelecionadas, setRefeicoesSelecionadas] = useState(0);
    const [diasSelecionados, setDiasSelecionados] = useState(0);
    const [diaSemanaSelecionado, setDiaSemanaSelecionado] = useState(0);
    const [selectedTime, setSelectedTime] = useState("");
    const [error, setError] = useState("");

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

    const horariosData = [
        "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
        "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
        "18:00", "19:00", "20:00", "21:00", "22:00"
    ];

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

    const validateConstants = () => {
        if (
            preferenciasSelecionadas == "" ||
            pessoasSelecionadas === 0 ||
            refeicoesSelecionadas === 0 ||
            diasSelecionados === 0 ||
            diaSemanaSelecionado === 0 ||
            selectedTime === ""
        ) {
            setError("Selecione suas preferências e complete o seu plano");
            return false;
        }
        setError("");
        return true;
    };

    const cadastrarPlano = () => {
        if (validateConstants()) {
            const corpoRequisicao = {
                preferencias: preferenciasSelecionadas,
                qtdPessoas: pessoasSelecionadas,
                qtdRefeicoesDia: refeicoesSelecionadas,
                qtdDiasSemana: diasSelecionados,
                horaEntrega: selectedTime,
                diaSemana: diaSemanaSelecionado,
            };
            api
          .post(`/planos/${idUsuario}`, corpoRequisicao)
          .then((response) => {
            console.log("Resposta", response);
            navigate('/cadastro/checkout');
        })
        .catch((erro) => {
            console.log("Erro", erro);
        });
      }
    };


    return (
        <>
            <div className="flex flex-col h-screen">
                <HeaderCliente />
                <CadastroPassos corPlano="#F29311" corCheckout="#CCD7D6" />
                <div className={`bg ${styles.bg}`}>
                    <div className={`card ${styles.card} flex`}>
                        <div className="flex flex-col w-full items-center">
                            <div className="flex flex-col items-center">
                                <h2 className="text-[#DC7726] font-bold text-2xl mb-2">Personalize seu Plano!</h2>
                            </div>
                            <div className="flex mt-4 mb-4">
                                <div className="px-8 ml-12 mr-12">
                                    <h3 className="text-center">1. Selecione suas preferências</h3>
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
                                <span className={`${styles.divisor}`}></span>
                                <div className="flex-col items-center justify-center px-8">
                                    <h3 className="text-center mb-4">2. Customize o seu plano</h3>
                                    <div>
                                        <div className="flex justify-between items-center mb-4" >
                                            <div className="mr-2">Pessoas</div>
                                            <div className="flex">
                                                {pessoasData.map((count, index) => (
                                                    <div
                                                        key={count}
                                                        className={`card flex-col items-center justify-center ${index === 0 ? styles.customizacao_plano_comeco : ''} ${index === pessoasData.length - 1 ? styles.customizacao_plano_fim : ''} ${pessoasSelecionadas === count ? styles.customizacao_plano_selecionado_pontas : ''
                                                            } ${pessoasSelecionadas !== count && index !== 0 && index !== pessoasData.length - 1 ? styles.customizacao_plano : ''
                                                            }`}
                                                        onClick={() => handlePessoas(count)}
                                                    >
                                                        {count}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center mb-4">
                                            <div className="mr-2">Refeições por dia</div>
                                            <div className="flex">
                                                {refeicoesData.map((count, index) => (
                                                    <div
                                                        key={count}
                                                        className={`card flex-col items-center justify-center ${index === 0 ? styles.customizacao_plano_comeco : ''} ${index === refeicoesData.length - 1 ? styles.customizacao_plano_fim : ''} ${refeicoesSelecionadas === count ? styles.customizacao_plano_selecionado_pontas : ''
                                                            } ${refeicoesSelecionadas !== count && index !== 0 && index !== refeicoesData.length - 1 ? styles.customizacao_plano : ''
                                                            }`}
                                                        onClick={() => handleRefeicoes(count)}
                                                    >
                                                        {count}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center mb-4">
                                            <div className="mr-2">Dias por semana</div>
                                            <div className="flex">
                                                {diasData.map((count, index) => (
                                                    <div
                                                        key={count}
                                                        className={`card flex-col items-center justify-center ${index === 0 ? styles.customizacao_plano_comeco : ''} ${index === diasData.length - 1 ? styles.customizacao_plano_fim : ''} ${diasSelecionados === count ? styles.customizacao_plano_selecionado_pontas : ''} ${diasSelecionados !== count && index !== 0 && index !== diasData.length - 1 ? styles.customizacao_plano : ''}`}
                                                        onClick={() => handleDias(count)}
                                                    >
                                                        {count}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center mb-4">
                                            <div className="mr-2">Dia para entrega</div>
                                            <div className="flex">
                                                {diasSemanaData.map((dia) => (
                                                    <div
                                                        key={dia.data}
                                                        className={`card ${styles.dia_semana_plano} flex-col items-center justify-center ${diaSemanaSelecionado === dia.data ? styles.dia_semana_plano_selecionado : ''}`}
                                                        onClick={() => handleDiaSemana(dia)}
                                                    >
                                                        {dia.label}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center mb-4">
                                            <div className="mr-2">Horário para entrega</div>
                                            <div className="flex">
                                                <select
                                                    className={`${styles.combobox_plano}`}
                                                    value={selectedTime}
                                                    onChange={(e) => setSelectedTime(e.target.value)}
                                                >
                                                    <option value="">Horário</option>
                                                    {horariosData.map((time, index) => (
                                                        <option key={index} value={time}>
                                                            {time}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {error && (
                                <div style={{ color: "red" }}>
                                    {error}
                                </div>
                            )}
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
