import React from "react";
import { FaHeart, FaClock, FaStar, FaPlusCircle } from 'react-icons/fa';
import Preferencia from "./Preferencia";

function CardReceita(props) {
    const {
        imagem,
        nome,
        categorias,
        preferencias,
        nota,
        qtdAvaliacoes,
        favorito,
    } = props.receita;

    return (
        <div className="p-4 border rounded-lg mb-4 bg-white">
            <div className="relative">
                <button className="absolute top-0 left-0 bg-white rounded-lg p-2">
                    <FaHeart
                        className={favorito ? "text-red-500 text-2xl" : "text-gray-400 text-2xl"}
                    />
                </button>
                <img src={imagem} alt="Imagem da Receita" style={{ width: '280px', height: '160px', borderRadius: '1.2rem' }} />
            </div>
            <h2 className=" text-lg font-semibold mt-2">{nome}</h2>
            <div>
                {categorias.map((categoria) => (
                    <span key={categoria} className=" text-sm mr-2 text-gray-600">
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
                    <FaStar className="text-yellow-400 text-xl mr-2" />
                    <span className="text-sm">{nota}</span>
                </div>
                <div className="ml-2 mr-4 items-center">
                    <span className="text-sm">({qtdAvaliacoes} Avaliações)</span>
                </div>
            </div>
            <div className="flex justify-end ">
                <button>
                    <FaPlusCircle className="text-green-500 text-2xl" />
                </button>
            </div>
        </div>
    );
}

export default CardReceita;
