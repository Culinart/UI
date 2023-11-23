import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import api from '../../../api/api';

import HeaderFornecedor from "../../../components/Fornecedor/HeaderFornecedor/HeaderFornecedor";


import style from "./EditarReceita.module.css"

function EditarReceita() {
    const { id } = useParams();

    // console.log(listaReceitas);
    // console.log(listaReceitas);

    const [listaReceitas, setListaReceitas] = useState([])
    const [receita, setReceita] = useState([])

    useEffect(() => {
        // buscarPreferencias();
        buscarReceitasPedidos();
    }, []);

    const buscarReceitasPedidos = () => {
        api.get('/receitas').then((response) => {
            setListaReceitas(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    const encontrarReceita = () => {
        for (var i = 0; i < listaReceitas; i++) {
            alert('encontrou na encontrar receita')
        }
    }

    return (
        <>
            <HeaderFornecedor />
            <section className={style.body}>
                <div className={style.conteudo}>
                    <div className={style.topo}>
                        <h1 className={style.titulo_pagina}>Editar Receita {id}</h1>
                        <div className={style.linha_horizontal} />
                    </div>
                    <div className={style.container_imagem_titulo}>
                        <div className={style.imagem} />
                        <div className={style.container_titulo_categoria}>
                            <label>
                                <span>Titulo</span>
                                <input className={style.input_titulo} />
                            </label>
                            <div className={style.container_categoria}>
                                <div className={style.icone} />
                                <span><b>Categoria: </b>Koreana</span>
                            </div>
                        </div>
                    </div>
                    <div className={style.container_medida_rendimento}>
                        <div className={style.container_rendimento_tempo}>
                            <div className={style.container_rendimento}>
                                <h1>Rendimento</h1>
                                <div className={style.rendimento}>
                                    <span>Ingredientes para render</span>
                                    <input type="number" />
                                    <span>porções</span>
                                </div>
                            </div>

                            <div className={style.container_tempo}>
                                <h1>Tempo de preparo</h1>
                                <div className={style.tempo}>
                                    <input type="number" />
                                    <span>Hora(s) e</span>
                                    <input type="number" />
                                    <span>Minuto(s)</span>
                                </div>
                            </div>
                        </div>

                        <div className={style.unidade_medida}>
                            <div className={style.titulos_medida}>
                                <h1 className={style.titulo_quantidade}>Quantidade</h1>
                                <h1 className={style.titulo_unidade}>Unidade</h1>
                                <h1 className={style.titulo_ingrediente}>Ingrediente</h1>
                            </div>
                            <div className={style.inputs_medida}>
                                <input type="number" className={style.input_quantidade} />
                                <select name="Unidade" className={style.input_unidade}>
                                    <option value="valor1">Valor 1</option>
                                </select>
                                <input type="text" className={style.input_ingrediente} />
                            </div>
                            <button className={style.adicionar_ingrediente}>Adicionar Ingrediente</button>
                        </div>
                    </div>

                    <div className={style.container_modo_preparo}>
                        <h1 className={style.titulo_preparo}>Modo de preparo</h1>
                        <div className={style.passo}>
                            <span>Passo 1</span>
                            <textarea cols="30" rows="3" />
                        </div>
                        <button className={style.adicionar_passo}>Adicionar Passo</button>
                    </div>

                    <div className={style.container_botoes}>
                        <button>
                            <a href="/fornecedor/receitas">
                                Cancelar
                            </a>
                        </button>
                        <button>Confirmar</button>
                    </div>
                </div>
            </section>
        </>
    );
}

export default EditarReceita;
