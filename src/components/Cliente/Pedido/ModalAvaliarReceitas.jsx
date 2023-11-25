import React from "react";
import CardReceitaAvaliacao from "./CardReceitaAvaliacao";

function ModalAvaliarReceitas({ oncloseModal }) {
    const closeModal = () => {
        closeModalAvaliacao();
    };

    return (
        <div
            className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={closeModal}
        >
            <div
                className="p-8 border rounded-lg bg-white max-h-96 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-2xl font-semibold mb-4">Avaliar Receitas</h2>
                <div className="grid grid-cols-3 gap-4">
                    <CardReceitaAvaliacao />
                    <CardReceitaAvaliacao />
                    <CardReceitaAvaliacao />
                    <CardReceitaAvaliacao />
                    <CardReceitaAvaliacao />
                    <CardReceitaAvaliacao />
                </div>
                <div className="flex justify-center items-center w-full mt-6 mb-2">
                    <button className=" mr-6 px-2 py-1 text-sm text-[#FFFFFF] bg-slate-400 rounded-md" onClick={oncloseModal}>
                        Cancelar
                    </button>
                    <button className=" ml-6 px-2 py-1 text-sm text-[#FFFFFF] bg-[#DC7726] rounded-md" onClick={oncloseModal}>
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalAvaliarReceitas;
