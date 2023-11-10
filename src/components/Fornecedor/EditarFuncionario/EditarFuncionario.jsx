import React, { useState } from "react";
import style from "./EditarFuncionario.module.css";
import x from "../../../assets/Institucional/Funcionarios/x.svg";
import user from "../../../assets/Institucional/Funcionarios/user.svg";
import icon_email from "../../../assets/Institucional/Funcionarios/email.svg";
import apiMock from "../../../api/mockapi";

function EditarFuncionario({ id, nome, email, permissao, handleFecharModal }) {
    const [inputNome, setInputNome] = useState(nome);
    const [inputEmail, setInputEmail] = useState(email);
    const [inputPermissao, setInputPermissao] = useState(permissao);

    function atualizarFuncionario(id) {
        const corpoRequisicao = {
            nome: inputNome,
            email: inputEmail,
            permissao: inputPermissao,
        };

        apiMock
            .put(`/${id}`, corpoRequisicao)
            .then((response) => {
                console.log("Resposta", response);
                window.location.reload();
            })
            .catch((erro) => {
                alert("Erro ao atualizar funcionario!");
                console.log("Erro", erro);
            });
    }

    return (
        <>
            <section className={style.card}>
                <img onClick={handleFecharModal} src={x} alt="Sair" className={style.x} />
                <h1 className={style.titulo}>Editar Funcionário</h1>
                <section className={style.container_itens}>
                    <div className={style.item}>
                        <img src={user} alt="Icone de usuario" />
                        <input
                            type="text"
                            defaultValue={nome}
                            onChange={(e) => {
                                setInputNome(e.target.value);
                            }}
                        />
                    </div>
                    <div className={style.item}>
                        <img src={icon_email} alt="Icone de usuario" />
                        <input
                            type="text"
                            defaultValue={email}
                            onChange={(e) => {
                                setInputEmail(e.target.value);
                            }}
                        />
                    </div>
                </section>
                <h1 className={style.subtitulo}>Conceder Permissão:</h1>
                <div className={style.container_permissao}>
                    <label>
                        <input
                            type="radio"
                            value="Administrador"
                            checked={inputPermissao === "Administrador"}
                            onChange={() => {
                                setInputPermissao("Administrador");
                            }}
                        />
                        <span className={style.adm}>Administrador</span>
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Comum"
                            checked={inputPermissao === "Comum"}
                            onChange={() => {
                                setInputPermissao("Comum");
                            }}
                        />
                        <span className={style.adm}>Comum</span>
                    </label>
                </div>
                <div className={style.informativo}>
                    <p>A permissão de administrador permite que o usuário tenha acesso à manipulação dos funcionários atrelados à empresa.</p>
                </div>
                <div className={style.botoes}>
                    <button onClick={handleFecharModal} className={style.cancelar}>Cancelar</button>
                    <button className={style.confirmar} onClick={() => {
                        atualizarFuncionario(id);
                        handleFecharModal();
                    }}>Confirmar</button>
                </div>
            </section>
        </>
    );
}

export default EditarFuncionario;
