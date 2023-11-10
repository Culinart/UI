import axios from "axios";
import React, { useState } from "react";
import style from "./AdicionarFuncionario.module.css"

import x from "../../../assets/Institucional/Funcionarios/x.svg";
import user from "../../../assets/Institucional/Funcionarios/user.svg"
import icon_email from "../../../assets/Institucional/Funcionarios/email.svg"

function AdicionarFuncionario({ handleFecharModal }) {
    const [novoFuncionario, setNovoFuncionario] = useState({
        nome: "",
        email: "",
        permissao: "Comum",
        id: ""
    });

    const handleNomeChange = (event) => {
        setNovoFuncionario({ ...novoFuncionario, nome: event.target.value });
    };

    const handleEmailChange = (event) => {
        setNovoFuncionario({ ...novoFuncionario, email: event.target.value });
    };

    const handlePermissaoChange = (event) => {
        let permissao
        if (event.target.checked) {
            permissao = "Administrador"
        }
        setNovoFuncionario({ ...novoFuncionario, permissao: permissao });
    };

    const adicionarFunc = () => {
        axios.post("https://653dc13df52310ee6a9a4ab7.mockapi.io/funcionario", novoFuncionario)
            .then(response => {
                console.log("Novo funcionário adicionado:", response.data);
                window.location.reload();
            })
            .catch(error => {
                console.error("Erro ao adicionar funcionário:", error);
            });
    };

    return (
        <>
            <section className={style.card}>
                <img onClick={handleFecharModal} src={x} alt="Sair" className={style.x} />
                <h1 className={style.titulo}>Adicionar Funcionário</h1>
                <section className={style.container_itens}>
                    <div className={style.item}>
                        <img src={user} alt="Icone de usuario" />
                        <input
                            type="text"
                            placeholder="Nome e sobrenome"
                            value={novoFuncionario.nome}
                            onChange={handleNomeChange}
                        />
                    </div>
                    <div className={style.item}>
                        <img src={icon_email} alt="Icone de usuario" />
                        <input
                            type="email"
                            placeholder="funcionario@mail.com"
                            value={novoFuncionario.email}
                            onChange={handleEmailChange}
                        />
                    </div>
                </section>
                <h1 className={style.subtitulo}>Conceder Permissão:</h1>
                <div className={style.container_permissao}>
                    <label>
                        <input
                            type="checkbox"
                            onChange={handlePermissaoChange}
                        />
                        <span className={style.adm}>Administrador</span>
                    </label>
                </div>
                <div className={style.informativo}>
                    <p>A permissão de administrador permite que o usuário tenha acesso à manipulação dos funcionários atrelados à empresa.</p>
                </div>
                <div className={style.botoes}>
                    <button onClick={handleFecharModal} className={style.cancelar}>
                        Cancelar
                    </button>
                    <button className={style.confirmar} onClick={adicionarFunc}>
                        Confirmar
                    </button>
                </div>
            </section>
        </>
    );
}

export default AdicionarFuncionario;
