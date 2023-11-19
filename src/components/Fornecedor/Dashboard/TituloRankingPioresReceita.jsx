import React from "react";

function TituloRankingPioresReceita() {
    return (
        <>
            <h1 className="text-base font-medium">Receitas pior avaliadas</h1>
            <div className="flex justify-evenly items-center w-11/12 mt-4 text-[11px] text-[#DC7726]">
                <p className="mt-2 mr-14">Rank</p>
                <p className="mt-2 mr-16">Receita</p>
                <p className="flex flex-col items-center w-2/12 mr-2"><span>Qtd</span> Avaliação</p>
                <p className="mt-2 ml-2.5 mr-11">Avaliação</p>
            </div>
        </>
    )
}

export default TituloRankingPioresReceita;