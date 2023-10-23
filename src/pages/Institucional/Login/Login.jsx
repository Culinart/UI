import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../../../components/Institucional/Header/Header";
import imgLogin from "../../../assets/Institucional/Login/imgLogin.png"
import ondaSuperiorDireita from "../../../assets/Institucional/Login/ondaSuperiorDireita.png"
import ondaInferiorEsquerda from "../../../assets/Institucional/Login/ondaInferiorEsquerda.png"
import ondaInferiorDireita from "../../../assets/Institucional/Login/ondaInferiorDireita.png"
import styles from "./LoginStyles.module.css";

function Login() {

    const navigate = useNavigate();

    const cadastro = () => {
        navigate('/cadastro/info-pessoal');
    }

    const login = () => {
        navigate('/cliente/pedidos');
    }

    return (
        <>
            <div className="flex flex-col h-screen">
                <Header />
                <div className={styles.body}>
                    <img src={ondaSuperiorDireita} className={styles.ondaSuperiorDireita} />
                    <img src={ondaInferiorEsquerda} className={styles.ondaInferiorEsquerda} />
                    <img src={ondaInferiorDireita} className={styles.ondaInferiorDireita} />
                    <div className={`${styles.containerCard} flex`}>
                        <img src={imgLogin} alt="Mulher cozinhando" />
                        <div className={styles.card_formulario}>
                            <h1>Bem vindo, Chef!</h1>
                            <div className={styles.campo}>
                                <b>Email</b>
                                <input type="text" placeholder="user@mail.com" />
                            </div>
                            <div className={styles.campo}>
                                <b>Senha</b>
                                <input type="password" placeholder="************" />
                            </div>
                            <span><input type="checkbox" /> Mantenha-me conectado</span>
                            <button onClick={login}>Entrar</button>
                            <a href="" className={styles.esqueci_senha}>Esqueci minha senha</a>
                            <div className={styles.container_ou}>
                                <div className={styles.linha} />
                                <h1>ou</h1>
                                <div className={styles.linha} />
                            </div>
                            <a onClick={cadastro} className={styles.cadastre_conta}>Cadastre uma conta</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;