import React, { useState, useEffect } from "react";
import api from "../../../api/api";
import Preferencia from "./Preferencia";
import { FaStar } from 'react-icons/fa';

function ModalReceita(props) {
    const [receita, setReceita] = useState(null);

    useEffect(() => {
        buscarReceita();
    }, []);

    const closeModalReceita = () => {
        props.oncloseModalReceita();
    };

    const buscarReceita = () => {
        api.get('/receita-descricao')
            .then((response) => {
                setReceita(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={closeModalReceita}>
            <div className="p-4 border rounded-lg bg-white w-[80%] h-[80%] relative flex" onClick={(e) => e.stopPropagation()} style={{ maxHeight: '80%', overflowY: 'auto' }}>
                <div className=" text-2xl absolute top-4 right-4 cursor-pointer" onClick={closeModalReceita}>
                    X
                </div>
                {receita ? (
                    <>
                        <div className="w-[50%] p-4 mb-6">
                            <div className="flex items-center justify-end">
                                <FaStar className="text-yellow-400 text-xl mr-2" />
                                <span className="text-sm">{receita.nota}</span>
                                <div className="ml-2">
                                    <span className="text-sm">({receita.qtdAvaliacoes} Avaliações)</span>
                                </div>
                            </div>
                            <div className="text-center my-2">
                                <img
                                    src={receita.imagem}
                                    alt="Imagem da Receita"
                                    style={{ width: '280px', height: '160px', borderRadius: '1.2rem', objectFit: 'cover', margin: '0 auto' }}
                                />
                                <h2 style={{ color: "#DC7726", fontFamily: "Poppins", fontSize: "2rem", fontWeight: 700 }}>{receita.nome}</h2>
                            </div>
                            <div className="ml-4">
                                <p style={{ color: "#DC7726", fontFamily: "Poppins", fontSize: "1.25rem", fontWeight: 700 }}>Ingredientes:</p>
                                <ul style={{ listStyleType: "disc" }}>
                                    {receita.ingredientes.map((ingrediente, index) => (
                                        <li key={index} className="mt-2 mb-2">{ingrediente}</li>
                                    ))}
                                </ul>
                            </div>
                            <p className="mt-6 mb-6">Ingredientes para render {receita.porcao} porções</p>
                        </div>
                        <div className="w-[50%] p-4 ">
                            <p style={{ color: "#DC7726", fontFamily: "Poppins", fontSize: "1.25rem", fontWeight: 700 }} className="mb-4">Modo de preparo:</p>
                            <ol>
                                {receita.preparo.map((passo, index) => (
                                    <li key={index} className="mt-4 mb-4">{`${index + 1}. ${passo}`}</li>
                                ))}
                            </ol>
                            <p className="mt-4 mb-4"><strong>Categoria:</strong>{receita.categoria.join(', ')}</p>
                            <p className="mt-4 mb-4"><strong>Preferências:</strong><span className="mt-4 mb-8 flex flex-wrap" style={{ marginLeft: "10%", marginRight: "10%" }}>
                                {receita.preferencias.map((preferencia) => (
                                    <Preferencia key={preferencia.nome} preferencia={preferencia} />
                                ))}
                            </span></p>
                            <p className="mt-4 mb-4"><strong>Tempo de preparo:</strong> {receita.tempoPreparo}</p>
                        </div>
                    </>
                ) : (
                    <p>Carregando...</p>
                )}
            </div>
        </div>
    );
}

export default ModalReceita;
