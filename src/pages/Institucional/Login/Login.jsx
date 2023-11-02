import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

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

    // const login = () => {
    //     navigate('/cliente/pedidos');
    // }

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const login = async (e) => {

        e.preventDefault();

        const jsonLogin = {
            email: email,
            senha: senha
        }

        const response = await axios.post('http://localhost:8080/usuarios/login', jsonLogin)
            .then((response) => {
                if(response.status == 200 && response.data?.token){
                    sessionStorage.setItem('authToken', response.data.token);
                    console.log(response.data);
                    console.log(response.data.token);
                }else{
                    throw new Error('Ocorreu um erro')
                }
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <>
            <div className="flex flex-col h-screen">
                <Header />
                <div className={styles.bodyLogin}>
                    <img src={ondaSuperiorDireita} className={styles.ondaSuperiorDireita} />
                    <img src={ondaInferiorEsquerda} className={styles.ondaInferiorEsquerda} />
                    <img src={ondaInferiorDireita} className={styles.ondaInferiorDireita} />
                    <div className={`${styles.containerCard} flex`}>
                        <img src={imgLogin} alt="Mulher cozinhando" />
                        <form onSubmit={login}>
                            <div className={styles.card_formulario}>
                                <h1>Bem vindo, Chef!</h1>
                                <div className={styles.campo}>
                                    <b>Email</b>
                                    <input
                                        type="text"
                                        placeholder="user@mail.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className={styles.campo}>
                                    <b>Senha</b>
                                    <input
                                        type="password"
                                        placeholder="************"
                                        value={senha}
                                        onChange={(e) => setSenha(e.target.value)}
                                    />
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
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;