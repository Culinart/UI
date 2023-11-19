import React from "react";
import style from "../../../pages/Fornecedor/Dashboard/Dashboard.module.css"

import { IoStar } from "react-icons/io5";

function ReceitaPiorAvaliada() {
    return (
        <>
            <div className={`${style.width_avaliados} flex items-center justify-between h-11 mt-2`}>
                <div className={`${style.width_numero_rank_receitas} flex justify-center items-center h-full bg-[#FBF2E6] rounded-l-md font-medium`}>
                    <p className="text-lg text-[#DC7726]">1</p>
                </div>
                <div className={`${style.width_receita} flex justify-center items-center h-full bg-[#FBF2E6]`}>
                    <p className="text-base font-medium">Feijoada</p>
                </div>
                <div className={`${style.width_qtd_avaliacoes} flex justify-center items-center h-full bg-[#FBF2E6]`}>
                    <p className="text-base font-medium">542</p>
                </div>
                <div className={`${style.width_avaliacao} flex justify-center items-center h-full bg-[#FBF2E6]`}>
                    <p className="text-base font-medium mr-2">5</p>
                    <IoStar className="text-[#ece64c] mb-[0.155rem] ml-2" />
                </div>
            </div>
        </>
    )
}

export default ReceitaPiorAvaliada;