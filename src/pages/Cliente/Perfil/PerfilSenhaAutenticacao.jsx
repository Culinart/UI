import React, { useState, useEffect  } from "react";
import HeaderCliente from "../../../components/Cliente/HeaderCliente/HeaderCliente";
import SidebarPerfil from "../../../components/Cliente/Perfil/SidebarPerfil";
import { FiEdit } from "react-icons/fi";
import api from "../../../api/api";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const validationSchema = Yup.object().shape({
  senha: Yup.string()
    .required("Insira a sua senha atual")
    .min(8, "A senha deve ter pelo menos 8 caracteres"),
  senhaNova: Yup.string()
    .required("Insira a sua senha nova")
    .min(8, "A senha deve ter pelo menos 8 caracteres"),
  senhaNovaConfirmacao: Yup.string()
    .oneOf([Yup.ref("senhaNova"), null], "Senhas não coincidem")
    .required("Confirme a sua senha"),
});

function PerfilSenhaAutenticacao() {
  const [isEditing, setIsEditing] = useState(false);
  const [inputSenha, setInputSenha] = useState("");
  const [inputSenhaNova, setInputSenhaNova] = useState("");
  const [inputSenhaNovaConfirmacao, setInputSenhaNovaConfirmacao] = useState("");
  const [senha, setSenha] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    buscarSenha();
}, []);

  const alertaErro = () => {
    Swal.fire({
      icon: "error",
      iconColor: "#FF9F1C",
      title: "<b>Erro ao atualizar as informações!</b>",
      text: "Confira suas credenciais e tente novamente",
      position: "center",
      confirmButtonColor: "#FF9F1C",
    });
  };

  const buscarSenha = () => {
    api
      .get(`/usuarios/senha/${sessionStorage.getItem("idUsuario")}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        console.log("Resposta", response);
        setSenha(response.data.senha);
      })
      .catch((erro) => {
        console.log("Erro", erro);
      });
  };

  function atualizarSenha(values) {
    if (!isEditing) {
      return Promise.resolve(true);
    }

    if (values.senha !== senha) {
      alertaErro();
      return Promise.resolve(false);
    }

    const corpoRequisicao = {
      senha: values.senhaNova,
    };
    api
      .put(`/usuarios/senha`, corpoRequisicao, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        console.log("Resposta", response);
        setSenha(values.senhaNova);
        return true;
      })
      .catch((erro) => {
        console.log("Erro", erro);
        return false;
      });
  }

  return (
    <>
      <HeaderCliente />
      <div className="flex h-screen">
        <SidebarPerfil nome={sessionStorage.getItem("nome")} />
        <div className="flex-grow p-6 flex items-start justify-center mt-12">
          <div className="flex-col justify-center items-center w-full max-w-md bg-white p-6 rounded-lg filter drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.25))">
            <div className="flex">
              <h1 className="text-[#DC7726] font-bold text-2xl mb-2 flex justify-center items-center w-full">
                Alterar Senha
              </h1>
              {!isEditing && (
                <FiEdit onClick={() => setIsEditing(true)} className="cursor-pointer text-[#DC7726] text-2xl" />
              )}
            </div>
            <Formik
              initialValues={{
                senha: "",
                senhaNova: "",
                senhaNovaConfirmacao: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                setIsSubmitting(true);
                setInputSenha(values.senha);
                setInputSenhaNova(values.senhaNova);
                setInputSenhaNovaConfirmacao(values.senhaNovaConfirmacao);

                atualizarSenha(values)
                  .then((success) => {
                    if (success) {
                      setIsEditing(false);
                    }
                    setIsSubmitting(false);
                  })
                  .catch(() => {
                    alertaErro();
                    setIsSubmitting(false);
                  });
              }}
            >
              {({ values, setFieldValue, submitForm, errors }) => (
                <Form className="flex flex-col space-y-6 w-full items-start ml-16 mt-2">
                  <div className="flex flex-col mt-4 mb-4">
                    <label className="text-lg mb-2">Senha:</label>
                    {isEditing ? (
                      <>
                        <Field
                          type="password"
                          name="senha"
                          onChange={(e) => {
                            setInputSenha(e.target.value);
                            setFieldValue("senha", e.target.value);
                          }}
                          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                        />
                        {errors.senha && <ErrorMessage name="senha" component="div" className="text-red-500 text-sm" />}
                      </>
                    ) : (
                      <p type="password">{inputSenha}</p>
                    )}
                  </div>
                  {isEditing ? (
                    <div className="flex flex-col mt-4 mb-4">
                      <label className="text-lg mb-2">Senha Nova:</label>
                      <Field
                        type="password"
                        name="senhaNova"
                        onChange={(e) => {
                          setInputSenhaNova(e.target.value);
                          setFieldValue("senhaNova", e.target.value);
                        }}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                      />
                      {errors.senhaNova && <ErrorMessage name="senhaNova" component="div" className="text-red-500 text-sm" />}
                    </div>
                  ) : (
                    <p type="password">{inputSenhaNova}</p>
                  )}
                  {isEditing ? (
                    <div className="flex flex-col mt-4 mb-4">
                      <label className="text-lg mb-2">Confirmação Senha Nova:</label>
                      <Field
                        type="password"
                        name="senhaNovaConfirmacao"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                        onChange={(e) => {
                          setInputSenhaNovaConfirmacao(e.target.value);
                          setFieldValue("senhaNovaConfirmacao", e.target.value);
                        }}
                      />
                      {errors.senhaNovaConfirmacao && (
                        <ErrorMessage name="senhaNovaConfirmacao" component="div" className="text-red-500 text-sm" />
                      )}
                    </div>
                  ) : (
                    <p>{inputSenhaNovaConfirmacao}</p>
                  )}
                  {isEditing && (
                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditing(false);
                          setInputSenha("");
                          setInputSenhaNova("");
                          setInputSenhaNovaConfirmacao("");
                          setFieldValue("senha", "");
                          setFieldValue("senhaNova", "");
                          setFieldValue("senhaNovaConfirmacao", "");
                        }}
                        className="border border-gray-300 rounded-md px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        disabled={isSubmitting}
                        className="border border-gray-300 rounded-md px-4 py-2 bg-[#DC7726] hover-bg-[#ba5a0d] text-white"
                        onClick={() => {
                          submitForm();
                        }}
                      >
                        Confirmar
                      </button>
                    </div>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}

export default PerfilSenhaAutenticacao;
