import React, { useState, useEffect } from "react";
import HeaderFornecedor from "../../../components/Fornecedor/HeaderFornecedor/HeaderFornecedor";
import iconeBusca from "../../../assets/Fornecedor/Receitas/search.svg";
import { FiEdit } from "react-icons/fi";
import ItemReceita from "../../../components/Fornecedor/ItemReceita/ItemReceita";
import api from "../../../api/api";
import style from './Receitas.module.css'

function ReceitasFornecedor() {
    const [preferencias, setPreferencias] = useState([]);
    const [receitasPedido, setReceitasPedido] = useState([]);
    const [termoBusca, setTermoBusca] = useState('');

    const [modalAberto, setModalAberto] = useState(false);

    const handleFecharModal = () => {
        setModalAberto(false);
    }

    useEffect(() => {
        buscarReceitasPedidos();
    }, []);

    const buscarReceitasPedidos = () => {
        api.get('/receitas').then((response) => {
            setReceitasPedido(response.data);
            console.log(response.data)
        }).catch((error) => {
            console.log(error);
        });
    }

    const handleBusca = (event) => {
        setTermoBusca(event.target.value);
    };

    const receitasFiltradas = receitasPedido.filter((receita) => {
        return receita.receitaDTO.nome.toLowerCase().includes(termoBusca.toLowerCase());
    });

    return (
        <>
            <HeaderFornecedor />
            <div className="items-center justify-center w-full flex mt-10 flex flex-col">
                <div className="pb-3 items-end justify-between w-4/5 flex border-b border-gray-300 ">
                    <div>
                        <h1 className="text-2xl text-[#045D53] mb-4">Você faz parte disso!</h1>
                        <button>
                            <a href="/fornecedor/adicionar-receita" className="rounded-lg border border-black bg-white px-5 py-0.4">
                                Adicionar Receita +
                            </a>
                        </button>
                    </div>
                    <div className="relative flex items-center">
                        <div className="relative">
                            <input
                                type="text"
                                className="w-80 border border-gray-300 rounded-full py-1 px-4"
                                placeholder="Pesquisar..."
                                value={termoBusca}
                                onChange={handleBusca}
                            />
                            <img
                                src={iconeBusca}
                                alt="Search Icon"
                                className="absolute top-1/2 transform -translate-y-1/2 right-2 h-5 w-5 text-gray-500"
                            />
                        </div>
                    </div>
                </div>
                <div className={style.container_receitas}>
                    {receitasFiltradas.length > 0 ? (
                        receitasFiltradas.map((receita) => (
                            <ItemReceita
                                key={receita.id}
                                id={receita.id}
                                nome={receita.receitaDTO.nome}
                                horas={receita.receitaDTO.horas}
                                minutos={receita.receitaDTO.minutos}
                                descricao={receita.receitaDTO.descricao}
                                qtdAvaliacao={receita.receitaDTO.qtdAvaliacoes}
                                mediaAvaliacao={receita.receitaDTO.mediaAvaliacoes}
                                ingredientes={receita.receitaDTO.ingredientes}
                                rendimento={receita.receitaDTO.porcoes}
                                preparo={receita.receitaDTO.modoPreparos}
                                categoria={receita.categoriaDTO}
                                preferencia={receita.preferenciaDTO}
                                imagem={receita.receitaDTO.imagem}
                                abrirModal={() => setModalAberto(true)}
                            />
                        ))
                    ) : (
                        <div className="text-gray-600 text-2xl w-full text-center">
                            Nenhum resultado encontrado
                        </div>
                    )}
                </div>
            </div >
        </>
    );
}

export default ReceitasFornecedor;