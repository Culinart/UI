import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";
import CurrencyInput from 'react-currency-masked-input'
import HeaderCliente from "../../components/Cliente/HeaderCliente/HeaderCliente";

function Precos() {
    const [isEditing, setIsEditing] = useState(false);
    const [precoCarnes, setPrecoCarnes] = useState("R$00,00");
    const [precoPeixes, setPrecoPeixes] = useState("R$00,00");
    const [precoVegano, setPrecoVegano] = useState("R$00,00");
    const [precoVegetariano, setPrecoVegetariano] = useState("R$00,00");
    const [precoRapido, setPrecoRapido] = useState("R$00,00");
    const [precoFit, setPrecoFit] = useState("R$00,00");

    const atualizarPrecos = () => {
        const carne = document.getElementById("Carnes").value
        const peixe = document.getElementById("Pescetariano").value
        const vegano = document.getElementById("Vegano").value
        const vegetariano = document.getElementById("Vegetariano").value
        const rapido = document.getElementById("Rápido e Fácil").value
        const fit = document.getElementById("Fit e Saudável").value
        if (carne == "" || peixe == "" || vegano == "" || vegetariano == "" || rapido == "" || fit == ""
        || carne == null || peixe == null ||  vegano == null || vegetariano == null || rapido == null || fit == null
        ) {
            alertaValoresInválidos();
        } else {
            setPrecoCarnes("R$" + (document.getElementById("Carnes").value).replaceAll(".", ","));
            setPrecoVegetariano("R$" + (document.getElementById("Vegetariano").value).replaceAll(".", ","));
            setPrecoVegano("R$" + (document.getElementById("Vegano").value).replaceAll(".", ","));
            setPrecoRapido("R$" + (document.getElementById("Rápido e Fácil").value).replaceAll(".", ","));
            setPrecoFit("R$" + (document.getElementById("Fit e Saudável").value).replaceAll(".", ","));
            setPrecoPeixes("R$" + (document.getElementById("Pescetariano").value).replaceAll(".", ","));
            setIsEditing(false);
        }
    }

    const alertaValoresInválidos = () => {
        Swal.fire({
            title: "Valores inválidos, por favor verifique-os e tente novamente.",
            confirmButtonColor: "#F29311",
          });
    }

    const cancelarEdicao = () => {
        setIsEditing(false);
    };

    return (
        <>
            <HeaderCliente />
            <div className="items-center justify-center w-full flex mt-10">
                <div className="items-center justify-between w-4/5 flex border-b border-gray-300">
                    <h1 className="text-2xl font-semibold text-[#DC7726] mb-4">
                        Preços por Categoria
                    </h1>
                </div>
            </div>
            <div className="flex h-screen">
                <div className="flex-grow p-6 flex items-start justify-center mt-8">
                    <div
                        className="flex-col justify-center items-center w-2/4 bg-white py-8 px-32 rounded-lg relative"
                        style={{
                            boxShadow: "2px 2px 2px 0px rgba(0, 0, 0, 0.25)",
                        }}
                    >
                        <div className="flex absolute top-4 right-4">
                            {!isEditing && (
                                <FiEdit
                                    onClick={() => setIsEditing(true)}
                                    className="cursor-pointer text-[#DC7726] text-2xl"
                                />
                            )}
                        </div>
                        <table className="w-full mt-8">
                            <thead>
                                <tr>
                                    <th className="bg-[#23BCAE] text-white p-3 border-b">
                                        Categoria
                                    </th>
                                    <th className="bg-[#23BCAE] text-white p-3 border-b">
                                        Preço
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { categoria: "Carnes", preco: precoCarnes },
                                    { categoria: "Vegetariano", preco: precoVegetariano },
                                    { categoria: "Vegano", preco: precoVegano },
                                    { categoria: "Rápido e Fácil", preco: precoRapido },
                                    { categoria: "Fit e Saudável", preco: precoFit },
                                    { categoria: "Pescetariano", preco: precoPeixes },
                                ].map((item, index) => (
                                    <tr key={index}>
                                        <td className="p-2 pr-4 border-b">{item.categoria}</td>
                                        <td className="p-2 border-b">
                                            {isEditing ? (
                                                <CurrencyInput
                                                decimalSeparator="," 
                                                defaultValue={(((item.preco).replaceAll("R$", "")).replaceAll(",", "."))}
                                                id={item.categoria}
                                                required
                                                />
                                            ) : (
                                                item.preco
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {isEditing && (
                            <div className="flex w-full items-center justify-center mt-12">
                                <div className="flex space-x-12">
                                    <button
                                        className={` bg-gray-400 text-white px-5 py-1 rounded-lg`}
                                        onClick={cancelarEdicao}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className={`bg-[#F29311] text-white px-5 py-1 rounded-lg`}
                                        onClick={atualizarPrecos}
                                    >
                                        Confirmar
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Precos;
