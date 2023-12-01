import React, { useState, useEffect } from 'react';
import api from "../../../api/api";
import style from "./ModalCategorias.module.css";
import { IoClose } from "react-icons/io5";


function ModalCategorias({ handleFecharModal, categorias }) {
    const [categoriasSelecionadas, setCategoriasSelecionadas] = useState([]);

    const enviar = () => {
        console.log(categoriasSelecionadas)
    };

    const handleSpanClick = (categoria) => {
        if (!categoriasSelecionadas.includes(categoria)) {
            setCategoriasSelecionadas([...categoriasSelecionadas, categoria]);
        }
    };

    const handleRemoverCategoria = (categoria) => {
        setCategoriasSelecionadas(categoriasSelecionadas.filter((cat) => cat !== categoria));
    };

    const handleCliqueForaModal = (event) => {
        if (event.target === event.currentTarget) {
            handleFecharModal();
        }
    };

    return (
        <>
            <div className={style.fundo_modal} onClick={handleCliqueForaModal}>
                <div className={style.card}>
                    <IoClose onClick={handleFecharModal} size={25} className={style.fechar} />
                    <h1 className={style.titulo}>Adicionar Categorias</h1>
                    <div className={style.container_itens_selecionados}>
                        <h2 className={style.subtitulo}>Categorias Selecionadas</h2>
                        {categoriasSelecionadas.map((categoria) => (
                            <span onClick={() => handleRemoverCategoria(categoria)} className={style.item} key={categoria}>
                                {categoria.nome}
                            </span>
                        ))}
                    </div>
                    <div className={style.container_itens}>
                        <h2 className={style.subtitulo}>Categorias Disponíveis</h2>
                        {categorias.map((categoria) => (
                            <span
                                onClick={() => handleSpanClick(categoria)}
                                className={style.item}
                                key={categoria}
                            >
                                {categoria.nome}
                            </span>
                        ))}
                    </div>
                    <div className={style.botoes}>
                        <button onClick={handleFecharModal} className={style.cancelar}>
                            Cancelar
                        </button>
                        <button onClick={enviar} className={style.confirmar}>Confirmar</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalCategorias;