import React from "react";
import style from "../../../pages/Fornecedor/Dashboard/Dashboard.module.css"

function MenosEscolhidaRank() {
    return (
        <>
            <div className="flex items-center justify-between w-11/12 h-11 mt-2" >
                <div className={`${style.width_numero_rank} flex justify-center items-center h-full bg-[#FBF2E6] rounded-l-md font-medium`}>
                    <p className="text-lg text-[#DC7726]">1</p>
                </div>
                <div className={`${style.width_categorias} flex justify-center items-center h-full bg-[#FBF2E6]`}>
                    <p className="text-sm font-medium">Rápido e Fácil</p>
                </div>
                <div className={`${style.width_qtd_escolhas} flex justify-center items-center h-full bg-[#FBF2E6] rounded-r-md`}>
                    <p className="text-sm font-medium">1770</p>
                </div>
            </div>

        </>
    )
}

export default MenosEscolhidaRank;