import React, { useState } from "react";
import Header from "../../../components/Institucional/Header/Header";
import imgLogin from "../../../assets/Institucional/Login/imgLogin.png"
import ondaSuperiorDireita from "../../../assets/Institucional/Login/ondaSuperiorDireita.png"
import ondaInferiorEsquerda from "../../../assets/Institucional/Login/ondaInferiorEsquerda.png"
import ondaInferiorDireita from "../../../assets/Institucional/Login/ondaInferiorDireita.png"
import styles from "./LoginStyles.module.css";

function Login() {
    return (
        <>
            <div className="flex flex-col h-screen">
                <Header />
                <div className={styles.body}>
                    <img src={ondaSuperiorDireita} className={styles.ondaSuperiorDireita} />
                    <img src={ondaInferiorEsquerda} className={styles.ondaInferiorEsquerda} />
                    <img src={ondaInferiorDireita} className={styles.ondaInferiorDireita} />
                    <div className={`${styles.containerCard} flex`}>
                        <img src={imgLogin} className={styles.imgLogin} />
                        <div className={`${styles.card} flex`}>
                            <h2 className={styles.titulo}>
                                <b>
                                    Bem vindo, Chef!
                                </b>
                            </h2>
                            <ul className={styles.formularioLogin}>
                                <li className={styles.campo}>
                                    <b className={styles.tituloInput}>Email</b>
                                    <input type="email" className={styles.inputFormulario} placeholder="user@mail.com" />
                                </li>
                                <li className={`${styles.campo} mt-4`}>
                                    <b className={styles.tituloInput}>Senha</b>
                                    <input type="password" className={styles.inputFormulario} placeholder="*********" />
                                </li>
                                <div className="mt-3">
                                    <input type="checkbox" name="checkbox" className={styles.checkbox} />
                                    <label htmlFor="checkbox" className={styles.labelCheckbox}>Mantenha-me conectado</label>
                                </div>
                            </ul>
                            <button className={styles.btnEntrar}><a href="/"><b>Entrar</b></a></button>
                            <p className={styles.esqueciSenha}>Esqueci minha senha</p>
                            <div className={styles.containerLinha}>
                                <div className={styles.linha} />
                                <b>ou</b>
                                <div className={styles.linha} />
                            </div>
                                <b className={styles.cadastrarConta}>Cadastre uma conta</b>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}




export default Login;