import React from "react";
import { FaHeart, FaClock, FaStar, FaPlusCircle } from 'react-icons/fa';
import Preferencia from "./Preferencia";

function CardReceita(props) {
    const {
        nome,
        tempoPreparo,
        categorias,
        preferencias,
        nota,
        qtdAvaliacoes,
    } = props.receita;

    return (
        <div className="p-4 border rounded-lg mb-4 bg-white">
            <div className="flex items-center justify-between">
                <button>
                    <FaHeart className="text-red-500 text-2xl" />
                </button>
            </div>
            <h2 className="text-lg font-semibold mt-2">{nome}</h2>
            <div>
                {categorias.map((categoria) => (
                    <span key={categoria} className="mr-2 text-gray-400">
                        {categoria}
                    </span>
                ))}
            </div>

            <div className="flex items-center mt-2">
                {preferencias.map((preferencia) => (
                    <Preferencia key={preferencia.nome} preferencia={preferencia} />
                ))}
            </div>
            <div className="flex items-center mt-2">
        <div className="flex items-center">
          <FaClock className="text-gray-400 text-xl mr-2" size={16}/> 
          <span className="text-sm">{tempoPreparo}</span>
        </div>
      </div>
            <div className="flex items-center mt-2">
                <div className="flex items-center">
                    <FaStar className="text-yellow-400 text-xl mr-2" />
                    <span className="text-sm">{nota}</span>
                </div>
                <div className="mx-2">|</div>
                <div>
                    <span className="text-sm">{qtdAvaliacoes} Avaliações</span>
                </div>
            </div>
            <div className="flex justify-end mt-2">
                <button>
                    <FaPlusCircle className="text-green-500 text-2xl" />
                </button>
            </div>
        </div>
    );
}

export default CardReceita;
