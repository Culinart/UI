import React, { useState, useEffect } from "react";
import api from "../../../../api/api";
import Preferencia from "../Preferencia";
import { FaStar } from 'react-icons/fa';
import style from "./ModalReceita.module.css"

import editar from "../../../../assets/Fornecedor/Receitas/Edit.svg"
import lixo from "../../../../assets/Fornecedor/Receitas/trash.svg"
import sair from "../../../../assets/Fornecedor/Receitas/exit.svg"

function ModalReceita({ id, nome, ingredientes, rendimento, horas, minutos, qtdAvaliacao, mediaAvaliacao, preparo, categoria, preferencia, imagem, fecharModal }) {

    const [listaIngredientes, setListaIngredientes] = useState(ingredientes);
    const [listaPreparo, setListaPreparo] = useState(preparo);
    const [listaPreferencia, setListaPreferencia] = useState(preferencia);
    const [listaCategoria, setListaCategoria] = useState(categoria);

    function atualizar() {
        console.log('icone de editar funcionando')
    }

    function exluir() {
        alert('Icone de excluir funcionando')
        api.delete(`/receitas/${id}`)
            .then(response => {
                alert("apagou a receita")
                console.log(response.data)
            })
            .catch(error => {
                console.log(error);
            });
    }

    const closeModal = () => {
        fecharModal();
    }

    return (
        <>
            <div className={style.body}>
                <section className={style.card} onClick={(e) => { e.stopPropagation(); }}>
                    <img src={sair} className={style.icone_sair} alt="sair" onClick={closeModal} />
                    <div className={style.esquerda}>
                        <div className={style.container_avaliacao}>
                            <div className={style.avaliacao}>
                                <span>⭐{mediaAvaliacao} ({qtdAvaliacao} Avaliações)</span>
                            </div>
                            <div className={style.editar_excluir}>
                                <a href={`/fornecedor/editar-receita/${id}`}>
                                    <img src={editar} onClick={atualizar} className={style.icone} alt="Icone de lápis" />
                                </a>
                                <img src={lixo} onClick={exluir} className={style.icone} alt="Icone de lixo" />
                            </div>
                        </div>
                        <img src={imagem} className={style.imagem} alt="Foto da receita" />
                        <div className={style.container_nome}>
                            <h1 className={style.nome_receita}>{nome}</h1>
                        </div>

                        <h2 className={style.titulo_ingredientes}>Ingredientes:</h2>
                        <ul className={style.container_ingredientes}>
                            {listaIngredientes.map((ingrediente) => (
                                <li key={ingrediente.id}>
                                    {ingrediente.quantidade} <span> </span>
                                    {ingrediente.unidadeMedidaEnum} <span> </span>
                                    {ingrediente.nome} <span> </span>
                                </li>
                            ))}
                        </ul>
                        {(() => {
                            if (rendimento == 1) {
                                return <span className={style.porcoes}>Ingredientes para render <b>{rendimento}</b> porção</span>;
                            } else if (rendimento > 1) {
                                return <span className={style.porcoes}>Ingredientes para render <b>{rendimento}</b> porções</span>;
                            }
                        })()}
                    </div>
                    <div className={style.direita}>
                        <h2 className={style.titulo_preparo}>Modo de preparo:</h2>
                        <ol className={style.container_preparo}>
                            {listaPreparo.map((passoPreparo) => (
                                <li key={passoPreparo.id}>
                                    {passoPreparo.passo}
                                </li>
                            ))}
                        </ol>
                        <div className={style.container_tempo_categoria_preferencia}>
                            <div className={style.categoria}>
                                <b>Categoria: </b>
                                {listaCategoria.map((categoria) => (
                                    <span className={style.nome_categoria}>
                                        {categoria.nome}
                                    </span>
                                ))}
                            </div>
                            <div className={style.preferencia}>
                                <b>Prefêrencias:</b>
                                {listaPreferencia.map((preferencia) => (
                                    <Preferencia key={preferencia.nome} preferencia={preferencia} />
                                ))}
                            </div>
                            <span>
                                <b>Tempo de preparo: </b>
                                {(() => {
                                    if (horas == 0) {
                                        return <span>{minutos} minutos</span>;
                                    } else if (horas == 1 && minutos == 0) {
                                        return <span>{horas} hora</span>;
                                    } else if (horas == 1 && minutos > 0) {
                                        return <span>{horas} hora e {minutos} minutos</span>;
                                    } else if (horas > 1 && minutos == 0) {
                                        return <span>{horas} horas</span>;
                                    } else if (horas > 1 && minutos > 0) {
                                        return <span>{horas} horas e {minutos} minutos</span>;
                                    }
                                })()}
                            </span>
                        </div>
                    </div>
                </section >
            </div >
        </>
    )
}

export default ModalReceita;