import React from "react"
import style from "./Receitas.module.css"

import HeaderFornecedor from "../../../components/Fornecedor/HeaderFornecedor/HeaderFornecedor";

function ReceitasFornecedor() {

    return (
        <>
            <div className={style.body}>
                <HeaderFornecedor />
                <div className={style.conteudo}>
                    <h1 className={style.titulo}>Você faz parte disso!</h1>
                    <div className={style.acoes}>
                        <button className={style.botao_adicionar_receita}>Adicionar Receita +</button>
                        <input placeholder="Qual vai ser sua proxima refeição?" className={style.buscar} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReceitasFornecedor;