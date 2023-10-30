import React from "react";
import HeaderCliente from "../../components/Cliente/HeaderCliente/HeaderCliente";
import iconeBusca from "../../assets/Cliente/iconeBusca.svg";

function Receitas() {
  return (
    <>
      <HeaderCliente />
      <div className="items-center justify-center w-full flex mt-10">
        <div className="items-center justify-between w-4/5 flex border-b border-gray-300">
          <h1 className="text-2xl text-[#045D53] mb-4">Receitas</h1>
          <div className="relative flex items-center">
            <select
              className="border border-gray-300 rounded-md py-1 px-2 mr-2"
              name="categorias"
              id="categorias"
            >
              <option value="todas">Categorias</option>
              <option value="categoria1">Carnes</option>
              <option value="categoria2">Vegetariano</option>
              <option value="categoria2">Pescetariano</option>
              <option value="categoria2">Vegano</option>
              <option value="categoria2">Rápido e Fácil</option>
              <option value="categoria2">Fit e Saudável</option>
            </select>
            <div className="relative">
              <input
                type="text"
                className="w-80 border border-gray-300 rounded-full py-1 px-4"
                placeholder="Qual será sua próxima refeição?"
              />
              <img
                src={iconeBusca}
                alt="Search Icon"
                className="absolute top-1/2 transform -translate-y-1/2 right-2 h-5 w-5 text-gray-500"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Receitas;
