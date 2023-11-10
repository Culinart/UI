import React, { useState, useRef } from "react";
import estilo from './ItemFuncionario.module.css';
import EditarFuncionario from "../EditarFuncionario/EditarFuncionario";
import apiMock from "../../../api/mockapi";
import axios from 'axios';

import editar from '../../../assets/Institucional/Funcionarios/edit.svg';
import lixo from '../../../assets/Institucional/Funcionarios/trash.svg';

function ItemFuncionario({ id, nome, email, permissao }) {
    const [exibirEditar, setExibirEditar] = useState(false);

    const handleAbrirModal = () => {
        setExibirEditar(true);
    };

    const handleFecharModal = () => {
        setExibirEditar(false);
    }

    const excluirFuncionario = () => {
        axios.delete(`https://653dc13df52310ee6a9a4ab7.mockapi.io/funcionario/${id}`)
            .then((response) => {
                console.log('Funcionário excluído com sucesso:', response);
                window.location.reload();
            })
            .catch((error) => {
                console.error('Erro ao excluir funcionário:', error);
            });
    };

    return (
        <>
            <section className={estilo.funcionario} key={id}>
                <div className={estilo.item_nome}>
                    <span>{nome}</span>
                </div>
                <div className={estilo.item_email}>
                    <span>{email}</span>
                </div>
                <div className={estilo.item_permissao}>
                    <span>{permissao}</span>
                </div>
                <div className={estilo.item_icones}>
                    <img src={editar} alt="Icone de lápis" onClick={handleAbrirModal} className={estilo.editar} />
                    <img src={lixo} alt="Icone de lata de lixo" onClick={excluirFuncionario} />
                </div>
                {exibirEditar && <EditarFuncionario
                    handleFecharModal={handleFecharModal}
                    id={id}
                    nome={nome}
                    email={email}
                />}
            </section>
        </>
    )
}

export default ItemFuncionario;