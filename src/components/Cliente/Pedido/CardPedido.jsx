import React from "react";
import imgReceitaPedido from "../../../assets/Cliente/Pedidos/imgReceitaPedido.png";
import Preferencia from "../Receitas/Preferencia";

function CardPedido({ nome, qtd_porcoes, preferencias, categorias }) {
    return (
      <div className="flex items-center flex-col w-10/12 h-auto bg-[#FFFFFF] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.5)] rounded-xl border-solid border border-[#DADADA]">
        <img src={imgReceitaPedido} className="w-[93%] h-40 mt-3" alt="Receita" />
        <div className="flex flex-col w-11/12 h-auto mt-2">
          <h2 className="text-[1.165rem] font-medium">{nome}</h2>
          <p className="text-[1rem] mt-[0.9rem]">{qtd_porcoes} no pacote</p>
          <p className="text-[1rem] mt-1">{qtd_porcoes} Porções</p>
          <div className="flex items-center mt-[1.1rem]">
            <p className="text-sm font-light ml-1">{categorias.map((cat) => cat.nome).join(", ")}</p>
          </div>
          <div className="flex flex-wrap justify-center items-center w-full mt-[1.2rem]">
            {preferencias.map((preferencia, index) => (
              <div key={index} className="mb-2">
                <Preferencia preferencia={preferencia} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  

export default CardPedido;
