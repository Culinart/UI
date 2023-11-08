import React, { useEffect, useState } from "react";
import HeaderCliente from "../../components/Cliente/HeaderCliente/HeaderCliente";
import Preferencia from "../../components/Cliente/Receitas/Preferencia";
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';
import api from "../../api/api";

sessionStorage.setItem("idUsuario", 1);

function Preferencias() {
    const [preferencias, setPreferencias] = useState([]);
    const [userPreferences, setUserPreferences] = useState([]);

    useEffect(() => {
        buscarPreferencias();
        buscarPreferenciasUsuario();
    }, [preferencias, userPreferences]);

    const buscarPreferencias = () => {
        api.get('/preferencias').then((response) => {
            setPreferencias(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    const buscarPreferenciasUsuario = () => {
        api.get(`/preferencias/${sessionStorage.getItem("idUsuario")}`)
        .then((response) => {
            setUserPreferences(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    const isPreferenceSelected = (preferenceId) => {
        return userPreferences.some(p => p.idPreferencia === preferenceId);
    }

    const addPreference = (preferenceId) => {
        api.post(`/preferencias/${preferenceId}/${sessionStorage.getItem("idUsuario")}`)
        .then((response) => {
            setUserPreferences(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    const removePreference = (preferenceId) => {
        api.delete(`/preferencias/${preferenceId}/${sessionStorage.getItem("idUsuario")}`)
        .then((response) => {
            setUserPreferences(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    const preferenciasAgrupadas = preferencias.reduce((result, item) => {
        if (!result[item.tipo]) {
            result[item.tipo] = [];
        }
        result[item.tipo].push(item);
        return result;
    }, {});

    return (
        <>
            <HeaderCliente />
            <div className="items-center justify-center w-full flex mt-10">
                <div className="items-center justify-between w-4/5 flex border-b border-gray-300">
                    <h1 className="text-2xl text-[#045D53] mb-4">Preferências</h1>
                </div>
            </div>
            <div className="items-center justify-center w-full flex mt-4">
                <div className="flex p-4 w-4/5 space-x-4">
                    <div className="w-1/5 h-[32rem] flex flex-col items-center bg-white p-4 rounded shadow-md">
                        <h3 className="text-base font-medium text-[#045D53] mb-4">Preferências Escolhidas</h3>
                        <div className="space-y-4">
                            {userPreferences.map((item) => (
                                <div className="flex justify-center" key={item.id}>
                                    <Preferencia preferencia={item} />
                                    <BiTrash
                                        className="text-lg text-gray-600 cursor-pointer"
                                        onClick={() => removePreference(item.id)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-wrap w-4/5">
                        {Object.keys(preferenciasAgrupadas).map((tipo) => (
                            <div key={tipo} className="w-1/5 p-4">
                                <h2 className="text-md text-[#045D53] mb-2 text-center">{tipo}</h2>
                                <ul className="space-y-4">
                                    {preferenciasAgrupadas[tipo].map((item) => (
                                        <div className="text-center" key={item.id}>
                                            <div className="flex justify-center">
                                                <Preferencia preferencia={item} />
                                                {isPreferenceSelected(item.id) ? (
                                                    <BiTrash
                                                        className="text-lg text-gray-600 cursor-pointer"
                                                        onClick={() => removePreference(item.id)}
                                                    />
                                                ) : (
                                                    <AiOutlinePlusCircle
                                                        className="text-lg text-gray-600 cursor-pointer"
                                                        onClick={() => addPreference(item.id)}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Preferencias;
