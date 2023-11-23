import React, { useState } from "react";
import { FaHeart, FaStar, FaPlusCircle, FaCheckCircle } from 'react-icons/fa';
import ModalReceita from "../../Cliente/Receitas/ModalReceita/ModalReceita";
import api from "../../../api/api";
import Preferencia from "../../Cliente/Receitas/Preferencia";

function ItemReceita({ id, nome, ingredientes, rendimento, preparo, horas, minutos, qtdAvaliacao, mediaAvaliacao, categoria, preferencia, imagem }) {

    const [preferenciasDTO, setPreferenciaDTO] = useState(preferencia);
    const [categoriasDTO, setcategoriaDTO] = useState(categoria);

    const handleFavoritedClick = async (e) => {
        e.stopPropagation();
        setIsFavorito(!isFavorito);
        try {
            await api.post(`/receitas/favorito/${id}`, {
                Favorito: !isFavorito,
            });
        } catch (error) {
            console.log(error);
        }
    }

    const excluirReceita = () => {
        api.delete(`/receitas/${id}`)
            .then((response) => {
                console.log("entrei no teen")
                console.log('Receita excluída com sucesso:', response);
                alert('Receita excluída com sucesso');
                window.location.reload();
            })
            .catch((error) => {
                console.log()
                console.error('num foi:', error);
            });

        alert('funcionou excluir')
    };

    const [exibirReceita, setExibirReceita] = useState(false);

    const handleAbrirModal = () => {
        setExibirReceita(true);
    };

    const handleFecharModal = () => {
        setExibirReceita(false);
    }

    return (
        <div className="p-4 border min-w-[300px] rounded-lg mb-4 bg-white hover:shadow-md hover:border-orange-400"
            onClick={handleAbrirModal}
        >
            <div className="relative">
                <button
                    // className="absolute top-0 left-0 bg-white rounded-lg p-2"
                    // onClick={handleFavoritedClick}
                >
                    {/* <FaHeart
                        // className={isFavorito ? "text-red-500 text-2xl" : "text-gray-400 text-2xl"}
                        className={"text-gray-400 text-2xl"}
                    /> */}
                </button>
                <img src={imagem} alt="Imagem da Receita" style={{ width: '280px', height: '160px', borderRadius: '1.2rem' }} />
            </div>
            <h2 className="max-w-md text-lg font-semibold mt-2 max-w-[280px]">{nome}</h2>
            <div>
                {categoriasDTO.map((categoria) => (
                    <span key={categoria.id} className="text-sm mr-2 text-gray-600">
                        {categoria.nome}
                    </span>
                ))}
            </div>
            <div className="flex items-center mt-2">
                {preferenciasDTO.map((preferencia) => (
                    <Preferencia key={preferencia.nome} preferencia={preferencia} />
                ))}
            </div>
            <div className="flex mt-2 items-center">
                <div className="flex items-center">
                    <FaStar className="text-yellow-400 text-xl mr-2" />
                    <span className="text-sm">{mediaAvaliacao}</span>
                </div>
                <div className="ml-2 mr-4 items-center">
                    <span className="text-sm">({qtdAvaliacao} Avaliações)</span>
                </div>
            </div>
            <div className="flex justify-end">
                <button onClick={(e) => { e.stopPropagation() }}>
                    {/* <FaPlusCircle onClick={excluirReceita} className="text-blue-500 text-2xl hover:text-green-700" /> */}
                </button>
            </div>
            {exibirReceita && <ModalReceita
                fecharModal={handleFecharModal}
                id={id}
                nome={nome}
                ingredientes={ingredientes}
                rendimento={rendimento}
                categoria={categoria}
                horas={horas}
                minutos={minutos}
                preparo={preparo}
                qtdAvaliacao={qtdAvaliacao}
                mediaAvaliacao={mediaAvaliacao}
                preferencia={preferencia}
                imagem={imagem}
            />}
        </div>
    );
}

export default ItemReceita;