import React, { useEffect, useState } from "react";
import style from "./Funcionarios.module.css";
import HeaderFornecedor from "../../../components/Fornecedor/HeaderFornecedor/HeaderFornecedor";
import AdicionarFuncionario from "../../../components/Fornecedor/AdicionarFuncionario/AdicionarFuncionario";
import ItemFuncionario from "../../../components/Fornecedor/Funcionario/ItemFuncionario";
import apiMock from "../../../api/mockapi";
import seta from "../../../assets/Institucional/Funcionarios/down.svg";
import buscar from "../../../assets/Institucional/Funcionarios/search.svg";

function Funcionarios() {
    const [funcionarios, setFuncionarios] = useState([]);
    const [exibirModalAdicionar, setExibirModalAdicionar] = useState(false);
    const [novosFuncionarios, setNovosFuncionarios] = useState([]);
    const [termoBusca, setTermoBusca] = useState('');

    const [funcionarioSelecionado, setFuncionarioSelecionado] = useState(null);

    useEffect(() => {
        listar();
    }, []);

    function listar() {
        apiMock
            .get()
            .then((respostaObtida) => {
                setFuncionarios(respostaObtida.data);
                console.log(respostaObtida.data);
            })
            .catch((erroOcorrido) => {
                console.log(erroOcorrido);
            });
    }


    const handleAbrirModalEdicao = (id) => {
        setFuncionarioSelecionado(id);
    };



    const handleAbrirModalAdicionar = () => {
        setExibirModalAdicionar(true);
    };

    const handleFecharModalAdicionar = () => {
        setExibirModalAdicionar(false);
    };

    const adicionarFuncionario = (novoFuncionario) => {
        setNovosFuncionarios([...novosFuncionarios, novoFuncionario]);
    };

    const handleBusca = (event) => {
        setTermoBusca(event.target.value);
    };

    const funcionariosFiltrados = funcionarios.filter((funcionario) => {
        return funcionario.nome.toLowerCase().includes(termoBusca.toLowerCase());
    });

    return (
        <>
            <HeaderFornecedor />
            <div className={style.body}>
                <div className={style.conteudo}>
                    <div className={style.titulo}>
                        <h1>Funcionários</h1>
                    </div>
                    <div className={style.card}>
                        <div className={style.acoes}>
                            <button onClick={handleAbrirModalAdicionar}>
                                Adicionar Funcionário +
                            </button>
                            <div className={style.upload}>
                                <input type="file" accept="text/csv" className={style.upload_input} />
                            </div>
                            <div className={style.input_buscar}>
                                <input type="text" value={termoBusca} onChange={handleBusca} placeholder="Pesquise Aqui..." />
                                <img src={buscar} />
                            </div>
                        </div>
                        <div className={style.titulos}>
                            <div className={style.item_nome}>
                                <b>Nome</b>
                                <img src={seta} />
                            </div>
                            <div className={style.item_email}>
                                <b>Email</b>
                                <img src={seta} />
                            </div>
                            <div className={style.item_permissao}>
                                <b>Permissão</b>
                                <img src={seta} />
                            </div>
                            <div className={style.item_icones} />
                        </div>
                        {funcionariosFiltrados.map((funcionario) => (
                            <ItemFuncionario
                                key={funcionario.id}
                                id={funcionario.id}
                                nome={funcionario.nome}
                                email={funcionario.email}
                                permissao={funcionario.permissao}

                                handleAbrirModalEdicao={handleAbrirModalEdicao}
                                funcionarioSelecionado={funcionarioSelecionado}
                            />
                        ))}
                    </div>
                </div>
                {exibirModalAdicionar && (
                    <AdicionarFuncionario
                        handleFecharModal={handleFecharModalAdicionar}
                        adicionarFuncionario={adicionarFuncionario}
                    />
                )}
            </div>
        </>
    );
}

export default Funcionarios;