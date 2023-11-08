import React, { useEffect, useState } from "react";
import HeaderCliente from "../../components/Cliente/HeaderCliente/HeaderCliente";
import Preferencia from "../../components/Cliente/Receitas/Preferencia";
import api from "../../api/api";

function Preferencias() {
  const [preferencias, setPreferencias] = useState([]);

  useEffect(() => {
    buscarPreferencias();
  }, []);

  const buscarPreferencias = () => {
    api.get('/preferencias').then((response) => {
      setPreferencias(response.data);
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
          <div className="w-1/5 h-[32rem] flex flex-col justify-center bg-white p-4 rounded shadow-md">
            {/* Sidebar content here */}
          </div>
          <div className="flex flex-wrap w-4/5">
            {Object.keys(preferenciasAgrupadas).map((tipo) => (
              <div key={tipo} className="w-1/5 p-4">
                <h2 className="text-md text-[#045D53] mb-2 text-center">{tipo}</h2>
                <ul className="space-y-2">
                  {preferenciasAgrupadas[tipo].map((item) => (
                    <div className="text-center">
                      <div className="flex justify-center">
                        <Preferencia key={item.nome} preferencia={item} />
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
