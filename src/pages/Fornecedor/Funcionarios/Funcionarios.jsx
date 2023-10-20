import React from "react"
import HeaderFornecedor from "../../../components/Fornecedor/HeaderFornecedor/HeaderFornecedor";
import style from './Funcionarios.module.css';
import pesquisar from '../../../assets/Institucional/Funcionarios/search.svg';
import importar from '../../../assets/Institucional/Funcionarios/import.png';


function Funcionarios() {

    return (
        <>
            <HeaderFornecedor />
            <body className={style.body}>
                <div className={style.conteudo}>
                    <div className={style.titulo}>
                        <h1>Funcionários</h1>
                    </div>
                    <div className={style.card}>
                        <div className={style.acoes}>
                            <button>Adicionar Funcionário +</button>
                            <button>
                                Importar Funcionário
                                {/* <img src={importar} alt="Coração" /> */}
                            </button>
                            <input type="text" placeholder="Pesquise Aqui..." />
                        </div>
                        <div className={style.titulos}>
                            <div className={style.campo}>
                                <b>Nome</b>
                            </div>
                            <div className={style.campo}>
                                <b>Email</b>
                            </div>
                            <div className={style.campo}>
                                <b>Permissão</b>
                            </div>
                            <div className={style.campo}>
                                <b>icones</b>
                            </div>
                        </div>
                        <div className={style.funcionario}>
                            <div className={style.campo}>
                                <span>Rafael Felipe Moraes dos Santos</span>
                            </div>
                            <div className={style.campo}>
                                <span>Rafael Felipe Moraes dos Santos</span>
                            </div>
                            <div className={style.campo}>
                                <span>Rafael Felipe Moraes dos Santos</span>
                            </div>
                            <div className={style.campo}>
                                <span>Rafael Felipe Moraes dos Santos</span>
                            </div>
                        </div>
                    </div>
                </div>

            </body>
        </>
    )
}

export default Funcionarios;
