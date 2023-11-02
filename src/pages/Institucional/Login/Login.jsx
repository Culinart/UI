import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import api from "../../../api/api";

import { toast } from 'react-toastify';
import { injectStyle } from "react-toastify/dist/inject-style";

import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

import Header from "../../../components/Institucional/Header/Header";
import imgLogin from "../../../assets/Institucional/Login/imgLogin.png"
import ondaSuperiorDireita from "../../../assets/Institucional/Login/ondaSuperiorDireita.png"
import ondaInferiorEsquerda from "../../../assets/Institucional/Login/ondaInferiorEsquerda.png"
import ondaInferiorDireita from "../../../assets/Institucional/Login/ondaInferiorDireita.png"
import styles from "./LoginStyles.module.css";


const validationSchemaLogin = Yup.object().shape({
    email: Yup.string().email("Email inválido").required("Insira o seu email"),
    senha: Yup.string().required("Insira uma senha")
})

function Login() {

    injectStyle();

    const [errorLogin, setErrorLogin] = useState('');

    const navigate = useNavigate();

    const cadastro = () => {
        navigate('/cadastro/info-pessoal');
    }

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const login = async (e) => {

        e.preventDefault();

        api.post('/usuarios/login', {
            email: email,
            senha: senha
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                console.log("ENTREI NO .THEN")
                if (response.status == 200 && response.data?.token) {
                    sessionStorage.setItem('authToken', response.data.token);
                    navigate('/cliente/pedidos');

                    console.log(response.data);
                    console.log(response.data.token);

                    toast.success('Login realizado com sucesso!');

                } 
            })
            .catch(error => {

                if (response.status == 400 || response.status == 401) {
                    setErrorLogin('Email ou senha incorretos!');
                    document.querySelector('input[type="email"]').classList.add('inputError');
                    document.querySelector('input[type="password"]').classList.add('inputError');
                } else {
                    console.log(response.status)
                    console.error(error.message);
                    toast.error('Ocorreu um erro interno.');
                }
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

                        <Formik
                            initialValues={{
                                email: "",
                                senha: "",
                            }}
                            validationSchemaLogin={validationSchemaLogin}
                            onSubmit={(values, { setSubmitting }) => {
                                setEmail(values.email);
                                setSenha(values.senha);

                                if (values.email && values.senha) {
                                    login();
                                }

                                setSubmitting(false);
                            }}
                        >
                            {({ setFieldValue }) => (
                                <Form >
                                    <div className={styles.card_formulario}>
                                        <h1>Bem vindo, Chef!</h1>
                                        <div className={styles.campo}>
                                            <b>Email</b>
                                            <Field
                                                type="email"
                                                id="email"
                                                name="email"
                                                placeholder="user@mail.com"
                                                value={email}
                                                className={styles.input}
                                                onChange={(e) => {
                                                    setEmail(e.target.value);
                                                    setFieldValue("email", e.target.value);
                                                }}
                                            />
                                            <ErrorMessage name="email" component="div" className="text-red-500 font-medium text-xs" />
                                            <div className={styles.errorMessage}>{errorLogin}</div>
                                        </div>
                                        <div className={styles.campo}>
                                            <b>Senha</b>
                                            <input
                                                type="password"
                                                placeholder="************"
                                                id="senha"
                                                value={senha}
                                                className={styles.input}
                                                onChange={(e) =>{ 
                                                    setSenha(e.target.value)
                                                    setFieldValue("senha", e.target.value);
                                                }}
                                            />
                                            <div className={styles.errorMessage}>{errorLogin}</div>
                                        </div>
                                        <span><input type="checkbox" /> Mantenha-me conectado</span>
                                        <button type="submit" onClick={login}>Entrar</button>
                                        <a href="" className={styles.esqueci_senha}>Esqueci minha senha</a>
                                        <div className={styles.container_ou}>
                                            <div className={styles.linha} />
                                            <h1>ou</h1>
                                            <div className={styles.linha} />
                                        </div>
                                        <a onClick={cadastro} className={styles.cadastre_conta}>Cadastre uma conta</a>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;