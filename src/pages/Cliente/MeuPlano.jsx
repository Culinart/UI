import React, { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import HeaderCliente from "../../components/Cliente/HeaderCliente/HeaderCliente";
import iconeCarne from "../../assets/Institucional/Cadastro/iconeCarne.svg";
import iconePeixe from "../../assets/Institucional/Cadastro/iconePeixe.svg";
import iconeRelogio from "../../assets/Institucional/Cadastro/iconeRelogio.svg";
import iconeSuco from "../../assets/Institucional/Cadastro/iconeSuco.svg";
import iconePlanta from "../../assets/Institucional/Cadastro/iconePlanta.svg";
import iconeMaca from "../../assets/Institucional/Cadastro/iconeMaca.svg";
import styles from "./MeuPlano.module.css";
import api from "../../api/api";
import AlertaClienteInativo from "../../components/Cliente/AlertaClienteInativo";

function MeuPlano() {

    const [isEditing, setIsEditing] = useState(false);
    const [preferenciasSelecionadas, setPreferenciasSelecionadas] = useState([]);
    const [pessoasSelecionadas, setPessoasSelecionadas] = useState(0);
    const [refeicoesSelecionadas, setRefeicoesSelecionadas] = useState(0);
    const [diasSelecionados, setDiasSelecionados] = useState(0);
    const [diaSemanaSelecionado, setDiaSemanaSelecionado] = useState(0);
    const [selectedTime, setSelectedTime] = useState("");
    const [error, setError] = useState("");
    const [isAtivo, setAtivo] = useState(false);

    useEffect(() => {
        buscarPlano();
        const permissao = sessionStorage.getItem('permissao');
        if (permissao === null || parseInt(permissao, 10) < 1) {
            setAtivo(false);
        } else {
            setAtivo(true);
        }
    }, []);

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

    const buscarPlano = () => {
        api
            .get(`/planos/${sessionStorage.getItem('idUsuario')}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
                }
            })
            .then((response) => {
                console.log("Resposta", response);
                setPreferenciasSelecionadas(response.data.categoria);
                setPessoasSelecionadas(response.data.qtdPessoas);
                setRefeicoesSelecionadas(response.data.qtdRefeicoesDia);
                setDiasSelecionados(response.data.qtdDiasSemana);
                setDiaSemanaSelecionado(response.data.diaSemana);
                setSelectedTime(response.data.horaEntrega);
            })
            .catch((erro) => {
                console.log("Erro", erro);
            });
    }

    const atualizarPlano = () => {
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
                .put(`/planos/${sessionStorage.getItem('idUsuario')}`, corpoRequisicao, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
                    }
                })
                .then((response) => {
                    console.log("Resposta", response);
                    buscarPlano();
                })
                .catch((erro) => {
                    console.log("Erro", erro);
                });
        }
    };

    const cancelarEdicao = () => {
        setIsEditing(false);
        setError("");
    }


    return (
        <>
            <div className="flex flex-col">
                <HeaderCliente />
                <AlertaClienteInativo isAtivo={isAtivo} />
                <div className={`bg ${styles.bg} mt-10 mb-10`}>
                <div className={`card ${styles.card} flex relative`}>
                        {!isEditing && (
                            <FiEdit
                                onClick={() => setIsEditing(true)}
                                className="cursor-pointer text-[#DC7726] text-2xl absolute top-10 right-14"
                            />
                        )}
                        <div className="flex flex-col w-full items-center">
                            <div className="flex items-center">
                                <h2 className="text-[#045D53] font-semibold text-2xl mb-2 mt-8">Meu Plano</h2>
                            </div>
                            <div className="flex mt-4 mb-4">
                                <div className="px-8 ml-12 mr-12">
                                    <h3 className="text-center font-semibold">Categorias</h3>
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
                                <div className="flex-col items-center justify-center px-8">
                                    <h3 className="text-center font-semibold mb-4">Quantidades</h3>
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
                            {isEditing && (
                                <>
                                    <div className="flex flex-col w-full items-center mt-4">
                                        <div className="flex flex-col items-center">
                                            <h2 className="text-[#045D53] font-semibold text-2xl mb-6">Checkout</h2>
                                        </div>
                                        <div className="flex">
                                            <div>
                                                <div className="flex-col">
                                                    <div className="flex justify-between mb-6">
                                                        <div className="mr-8">
                                                            + X Refeições por mês
                                                        </div>
                                                        <div>
                                                            R$ XXX,XX
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between mb-4">
                                                        <div className="mr-8">
                                                            + Frete
                                                        </div>
                                                        <div>
                                                            R$ XXX,XX
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className={`${styles.divisorTotalPreco}`}></span>
                                                <div className="flex justify-between mb-6 mt-2">
                                                    <div className="font-semibold">
                                                        Total à pagar
                                                    </div>
                                                    <div className="font-semibold">
                                                        R$ XXX,XX
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex space-x-12 mt-4 mb-4">
                                    <button
                                        className={` bg-gray-400 ${styles.btnCadastroCancelar}`}
                                        onClick={cancelarEdicao}
                                        >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className={`bg-[#F29311] ${styles.btnCadastro}`}
                                        onClick={atualizarPlano}
                                        >
                                        Confirmar
                                    </button>
                                        </div>
                                </>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

export default MeuPlano;