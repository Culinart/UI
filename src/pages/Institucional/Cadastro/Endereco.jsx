import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CadastroPassos from "../../../components/Institucional/Cadastro/CadastroPassos";
import Header from "../../../components/Institucional/Header/Header";
import imgEndereco from "../../../assets/Institucional/Cadastro/imgEndereco.svg"
import styles from "./CadastroStyles.module.css";

const validationSchema = Yup.object().shape({
    
});

function Endereco() {
    const [cep, setCep] = useState("");
    
    function cadastrarEndereco() {
    
        const corpoRequisicao = {
        };
        console.log(corpoRequisicao);
      }

    return (
        <>
            <div className="flex flex-col h-screen">
                <Header />
                <CadastroPassos corEndereco="#2EC4B6" corPlano="#AEBDBC" corCheckout="#AEBDBC" />
                <div className={`bg ${styles.bg}`}>
                    <div className={`card ${styles.card} flex`}>
                        <div className="flex">
                            <div className="flex flex-col items-center">
                                <h2 className="text-[#DC7726] font-bold text-2xl mb-2">Onde fica sua cozinha, Chef?</h2>
                                <Formik
                                    initialValues={{
                                        cep: ""
                                    }}
                                    validationSchema={validationSchema}
                                    onSubmit={(values, { setSubmitting }) => {
                                        setInputCep(values.cep);
                                        if (values.cep) {
                                            cadastrarEndereco();
                                        }

                                        setSubmitting(false);
                                    }}
                                >
                                    {({ setFieldValue }) => (
                                        <Form className="flex flex-col space-y-4 w-full items-center">
                                            <div className="flex flex-col">
                                                <label htmlFor="nome" className={`text-[#045D53] font-medium ${styles.inputLabel}`}>CEP</label>
                                                <Field
                                                    type="text"
                                                    id="cep"
                                                    name="cep"
                                                    placeholder="00000-000"
                                                    className={styles.input}
                                                    onChange={(e) => {
                                                        setInputCep(e.target.value);
                                                        setFieldValue("cep", e.target.value);
                                                    }}
                                                />
                                                <ErrorMessage name="cep" component="div" className="text-red-500 font-medium text-xs" />
                                            </div>
                                            <button type="submit" className={`bg-[#F29311] ${styles.btnCadastro}`}>
                                                Confirmar
                                            </button>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                            <img src={imgEndereco} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Endereco;