import React, { useState, useEffect } from "react";
import HeaderCliente from "../../components/Cliente/HeaderCliente/HeaderCliente";
import iconeBusca from "../../assets/Cliente/iconeBusca.svg";
import { FiEdit } from "react-icons/fi";
import CardReceita from "../../components/Cliente/Receitas/CardReceita";
import Preferencia from "../../components/Cliente/Receitas/Preferencia";
import { useNavigate } from 'react-router-dom';
import api from "../../api/api";

function Receitas() {
  const navigate = useNavigate();

  const [preferencias, setPreferencias] = useState([]);
  const [receitasPedido, setReceitasPedido] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    // buscarPreferencias();
    buscarReceitasPedidos();
  }, []);

  const buscarPreferencias = () => {
    api.get('/preferencias').then((response) => {
      setPreferencias(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }



  const buscarReceitasPedidos = () => {
    api.get('/receitas').then((response) => {
      setReceitasPedido(response.data);
      // console.log(receitasPedido[0].preferenciaDTO);
    }).catch((error) => {
      console.log(error);
    });
  }

  // console.log("Console log solto" + receitasPedido)


  const navegarPreferencias = () => {
    navigate("/cliente/preferencias");
  }

  const handleSearchInputChange = (e) => {
    const { value } = e.target;
    setSearchInput(value);
  }

  useEffect(() => {
    if (searchInput) {
      console.log(searchInput);
      api.get(`/search-receitas?name=${searchInput}`)
        .then((response) => {
          setReceitasPedido(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      buscarReceitasPedidos();
    }
  }, [searchInput]);

  return (
    <>
      <HeaderCliente />
      <div className="items-center justify-center w-full flex mt-10">
        <div className="items-center justify-between w-4/5 flex border-b border-gray-300">
          <h1 className="text-2xl text-[#045D53] mb-4">Receitas</h1>
          <div className="relative flex items-center">
            <div className="relative">
              <input
                type="text"
                className="w-80 border border-gray-300 rounded-full py-1 px-4"
                placeholder="Pesquisar..."
                value={searchInput}
                onChange={handleSearchInputChange}
              />
              <img
                src={iconeBusca}
                alt="Search Icon"
                className="absolute top-1/2 transform -translate-y-1/2 right-2 h-5 w-5 text-gray-500"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex-col">
        <div className="items-center justify-center w-full flex mt-4">
          <div className="items-center justify-start w-4/5 flex text-[#3F4747]">
            <h2 className="mr-4">Preferências</h2>
            <FiEdit onClick={navegarPreferencias} className="cursor-pointer" />
          </div>
        </div>
        <div className="mt-4 mb-8 flex flex-wrap" style={{ marginLeft: "10%", marginRight: "10%" }}>
          {preferencias.map((preferencia) => (
            <Preferencia key={preferencia.nome} preferencia={preferencia} />
          ))}
        </div>
      </div>
      <div className="flex justify-between mt-4" style={{ marginRight: "10%", marginLeft: "10%" }}>
        {receitasPedido.length > 0 ? (
          receitasPedido.map((receita, index) => (
            <CardReceita
              // key={index}
              receita={receita}
              // pedidosReceita={receitasPedido}

              key={receita.id}
              id={receita.id}
              nome={receita.receitaDTO.nome}
              // tempoPreparo={receita.receitaDTO.tempoPreparo}
              categoria={receita.categoriaDTO[0].nome}
              preferencia={receita.preferenciaDTO}
              imagem={receita.imagem}
            />
          ))
        ) : (
          <div className="text-gray-600 text-2xl w-full text-center">
            Nenhum resultado encontrado
          </div>
        )}
      </div>
    </>
  );
}

export default Receitas;
