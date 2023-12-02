import React, { useState } from "react";
import { FaHeart, FaStar, FaPlusCircle, FaCheckCircle } from 'react-icons/fa';
import ModalReceita from "../../Cliente/Receitas/ModalReceita/ModalReceita";
import api from "../../../api/api";
import Preferencia from "../../Cliente/Receitas/Preferencia";
import style from './ItemReceita.module.css'
import { useLocation } from 'react-router-dom';

function ItemReceita({ id, nome, ingredientes, rendimento, preparo, horas, minutos, qtdAvaliacao, mediaAvaliacao, categoria, preferencia, imagem }) {

    const [preferenciasDTO, setPreferenciaDTO] = useState(preferencia);
    const [categoriasDTO, setcategoriaDTO] = useState(categoria);

    const location = useLocation();

    const isPaginaReceitasCliente = location.pathname === '/cliente/receitas';

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
    };

    const [exibirReceita, setExibirReceita] = useState(false);

    const handleAbrirModal = () => {
        setExibirReceita(true);
    };

    const handleFecharModal = () => {
        setExibirReceita(false);
    }

    return (
        <div className={style.card} onClick={handleAbrirModal}>
            <div className="relative">
                <button className="absolute top-0 left-0 bg-white rounded-lg p-2">
                    <FaHeart className={`text-gray-400 text-2xl`} />
                </button>
                {/* {isPaginaReceitasCliente && (
                )} */}
                <img src={imagem} alt="Imagem da Receita" className={style.imagem} />
            </div>
            <h2 className={style.nome_receita}>{nome}</h2>
            <div className={style.container_categorias}>
                {Array.isArray(categoria) && categoria.map((categoria, index) => (
                    <span className={`${style.nome_categoria} mr-2 text-sm`} key={index}>
                        {categoria.categoria.nome} | 
                    </span>
                ))}
            </div>
            <div className="flex items-center mt-2">
                {preferencia.map((preferencia, index) => (
                    <Preferencia key={index} preferencia={preferencia.preferencia} />
                ))}
            </div>
            <div className="flex mt-2 justify-between items-center">
                <div className="flex items-center">
                    <FaStar className="text-yellow-400 text-xl mr-2" />
                    <span className="text-sm">{mediaAvaliacao} ({qtdAvaliacao} Avaliações)</span>
                </div>
                {isPaginaReceitasCliente && (
                    <button onClick={(e) => { e.stopPropagation() }}>
                        <FaPlusCircle className="text-green-500 text-2xl hover:text-green-700" />
                    </button>
                )}
            </div>
            <div className="flex justify-end">
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