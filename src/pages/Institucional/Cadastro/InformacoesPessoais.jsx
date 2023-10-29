import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import imgCadastro from "../../../assets/Institucional/Cadastro/imgCadastro.svg";
import Header from "../../../components/Institucional/Header/Header";
import api from "../../../api/api";
import styles from "./CadastroStyles.module.css";


const validationSchema = Yup.object().shape({
  nome: Yup.string()
    .required("Insira o seu nome completo")
    .test("two-words", "Insira o seu nome completo", (value) => {
      const words = value.split(" ");
      return words.filter((word) => word.replace(/\W/g, "").length >= 1).length >= 2;
    }),
  email: Yup.string().email("Email inválido").required("Insira o seu email"),
  telefone: Yup.string()
    .matches(
      /^\(\d{2}\) \d{5}-\d{4}$/,
      "Insira o seu telefone com o DDD"
    )
    .required("Insira o seu telefone com o DDD"),
  senha: Yup.string()
    .required("Insira uma senha")
    .min(8, "A senha deve ter pelo menos 8 caracteres"),
  senhaConfirmacao: Yup.string()
    .oneOf([Yup.ref("senha"), null], "Senhas não coincidem")
    .required("Confirme a sua senha"),
});

function InformacoesPessoais() {

  const navigate = useNavigate();

  const [inputNome, setInputNome] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputTelefone, setInputTelefone] = useState("");
  const [inputSenha, setInputSenha] = useState("");
  const [inputSenhaConfirmacao, setInputSenhaConfirmacao] = useState("");

  const handleTelefoneChange = (event) => {
    const inputTelefone = event.target.value.replace(/\D/g, '');
    let telefoneFormatado = "";

    if (inputTelefone.length > 0) {
      telefoneFormatado = `(${inputTelefone.slice(0, 2)}`;

      if (inputTelefone.length > 2) {
        telefoneFormatado += `) ${inputTelefone.slice(2, 7)}`;

        if (inputTelefone.length > 7) {
          telefoneFormatado += `-${inputTelefone.slice(7, 11)}`;
        }
      }

      setInputTelefone(telefoneFormatado);
    }
  };

  function cadastrarUsuario() {
    const telefoneNumerico = inputTelefone.replace(/\D/g, "");

    const corpoRequisicao = {
      nome: inputNome,
      email: inputEmail,
      telefone: telefoneNumerico,
      senha: inputSenha,
    };
    console.log(corpoRequisicao);
    navigate('/login');
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className={`bg ${styles.bg}`}>
        <div className={`card ${styles.card} flex p-4`}>
          <div className="flex flex-col w-full max-w-md mx-auto">
            <h2 className="text-[#DC7726] font-bold text-2xl mb-2">Crie sua conta e faça arte!</h2>
            <Formik
              initialValues={{
                nome: "",
                email: "",
                telefone: "",
                senha: "",
                senhaConfirmacao: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                setInputNome(values.nome);
                setInputEmail(values.email);
                setInputTelefone(inputTelefone);
                setInputSenha(values.senha);
                setInputSenhaConfirmacao(values.senhaConfirmacao);
                if (values.nome && values.email && inputTelefone && values.senha && values.senhaConfirmacao) {
                  cadastrarUsuario();
                }

                setSubmitting(false);
              }}
            >
              {({ setFieldValue }) => (
                <Form className="flex flex-col space-y-4 w-full items-center">
                  <div className="flex flex-col">
                    <label htmlFor="nome" className={`text-[#045D53] font-medium ${styles.inputLabel}`}>Nome</label>
                    <Field
                      type="text"
                      id="nome"
                      name="nome"
                      placeholder="Nome Completo"
                      className={styles.input}
                      onChange={(e) => {
                        setInputNome(e.target.value);
                        setFieldValue("nome", e.target.value);
                      }}
                    />
                    <ErrorMessage name="nome" component="div" className="text-red-500 font-medium text-xs" />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="email" className={`text-[#045D53] font-medium ${styles.inputLabel}`}>Email</label>
                    <Field
                      type="text"
                      id="email"
                      name="email"
                      placeholder="user@email.com"
                      className={styles.input}
                      onChange={(e) => {
                        setInputEmail(e.target.value);
                        setFieldValue("email", e.target.value);
                      }}
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 font-medium text-xs" />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="telefone" className={`text-[#045D53] font-medium ${styles.inputLabel}`}>Telefone</label>
                    <Field
                      type="text"
                      id="telefone"
                      name="telefone"
                      placeholder="(00) 00000-0000"
                      maxLength="15"
                      className={styles.input}
                      value={inputTelefone}
                      onChange={(e) => {
                        handleTelefoneChange(e);
                        setFieldValue("telefone", e.target.value);
                      }}
                    />
                    <ErrorMessage name="telefone" component="div" className="text-red-500 font-medium text-xs" />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="senha" className={`text-[#045D53] font-medium ${styles.inputLabel}`}>Senha</label>
                    <Field
                      type="password"
                      id="senha"
                      name="senha"
                      placeholder="********"
                      className={styles.input}
                      onChange={(e) => {
                        setInputSenha(e.target.value);
                        setFieldValue("senha", e.target.value);
                      }}
                    />
                    <ErrorMessage name="senha" component="div" className="text-red-500 font-medium text-xs" />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="senhaConfirmacao" className={`text-[#045D53] font-medium ${styles.inputLabel}`}>Confirmar Senha</label>
                    <Field
                      type="password"
                      id="senhaConfirmacao"
                      name="senhaConfirmacao"
                      placeholder="********"
                      className={styles.input}
                      onChange={(e) => {
                        setInputSenhaConfirmacao(e.target.value);
                        setFieldValue("senhaConfirmacao", e.target.value);
                      }}
                    />
                    <ErrorMessage name="senhaConfirmacao" component="div" className="text-red-500 font-medium text-xs" />
                  </div>

                  <button type="submit" className={`bg-[#F29311] ${styles.btnCadastro}`}>
                    Confirmar
                  </button>
                </Form>
              )}
            </Formik>
          </div>
          <img src={imgCadastro} />
        </div>
      </div>
    </div>
  );
}

export default InformacoesPessoais;
