import React, { useState, useEffect } from "react";
import iconeBusca from "../../../assets/Fornecedor/Receitas/search.svg";
import ItemReceita from "../../../components/Fornecedor/ItemReceita/ItemReceita";
import api from "../../../api/api";
import style from './Receitas.module.css';
import HeaderCliente from "../../../components/Cliente/HeaderCliente/HeaderCliente";

function ReceitasFornecedor() {
    const [preferencias, setPreferencias] = useState([]);
    const [receitas, setReceitas] = useState([]);
    const [termoBusca, setTermoBusca] = useState('');
    const [isPesquisando, setIsPesquisando] = useState(false);

    const [modalAberto, setModalAberto] = useState(false);

    const handleFecharModal = () => {
        setModalAberto(false);
    }

    useEffect(() => {
        buscarreceitass();
    }, []);

    const buscarreceitass = () => {
        api.get('/receitas', {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
            }
        }).then((response) => {
            setReceitas(response.data);
            console.log(response.data)
        }).catch((error) => {
            console.log(error);
        });
    }

    const handleBusca = (event) => {
        setTermoBusca(event.target.value);
    };

    const receitasFiltradas = receitas.filter((receita) => {
        return receita.nome.toLowerCase().includes(termoBusca.toLowerCase());
    });

    return (
        <>
            <HeaderCliente />
            <div className="items-center justify-center w-full mt-10 flex flex-col">
                <div className="pb-3 items-end justify-between w-4/5 flex border-b border-gray-300 ">
                    <div>
                        <h1 className="text-2xl text-[#045D53]">Receitas</h1>
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
                {isPesquisando
                        ? receitasFiltradas.length > 0
                            ? receitasFiltradas.map((receita, index) => (
                                <ItemReceita
                                    key={index}
                                    id={receita.id}
                                    nome={receita.nome}
                                    horas={receita.horas}
                                    minutos={receita.minutos}
                                    descricao={receita.descricao}
                                    qtdAvaliacao={receita.qtdAvaliacoes}
                                    mediaAvaliacao={receita.mediaAvaliacoes}
                                    ingredientes={receita.ingredientes}
                                    rendimento={receita.porcoes}
                                    preparo={receita.modoPreparos}
                                    categoria={receita.categorias}
                                    preferencia={receita.preferencias}
                                    imagem={receita.imagem}
                                    abrirModal={() => setModalAberto(true)}
                                />
                            ))
                            : <div className="text-gray-600 text-2xl w-full text-center">Nenhum resultado encontrado</div>
                        : (receitas ?? []).length > 0
                            ? (receitas ?? []).map((receita, index) => (
                                <ItemReceita
                                key={index}
                                id={receita.id}
                                nome={receita.nome}
                                horas={receita.horas}
                                minutos={receita.minutos}
                                descricao={receita.descricao}
                                qtdAvaliacao={receita.qtdAvaliacoes}
                                mediaAvaliacao={receita.mediaAvaliacoes}
                                ingredientes={receita.ingredientes}
                                rendimento={receita.porcoes}
                                preparo={receita.modoPreparos}
                                categoria={receita.categorias}
                                preferencia={receita.preferencias}
                                imagem={receita.imagem}
                                    abrirModal={() => setModalAberto(true)}
                                />
                            ))
                            : <div className="text-gray-600 text-2xl w-full text-center">Nenhum resultado encontrado</div>
                    }
                </div>
            </div>
        </>
    );
}

export default ReceitasFornecedor;