import React, { useState } from "react";
import HeaderCliente from "../../components/Cliente/HeaderCliente/HeaderCliente";
import iconeBusca from "../../assets/Cliente/iconeBusca.svg";
import { FiEdit } from "react-icons/fi";
import CardReceita from "../../components/Cliente/Receitas/CardReceita";
import Preferencia from "../../components/Cliente/Receitas/Preferencia";
import temp from "../../assets/Cliente/temp.svg";

function Receitas() {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [preferencias, setPreferencias] = useState([
    {
      nome: "Picante",
      corFundo: "#F54A4A",
      corTexto: "#FFFFFF",
    },
    {
      nome: "Koreana",
      corFundo: "#BDC2DE",
      corTexto: "#000000",
    },
  ]);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const options = [
    "Carnes",
    "Vegetariano",
    "Pescetariano",
    "Vegano",
    "Rápido e Fácil",
    "Fit e Saudável",
  ];

  const handleOptionChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const receitas = [
    {
      imagem: temp,
      nome: "Receita 1",
      categorias: ["Categoria 1"],
      preferencias: [{
        nome: "Picante",
        corFundo: "#F54A4A",
        corTexto: "#FFFFFF",
      },
      {
        nome: "Koreana",
        corFundo: "#BDC2DE",
        corTexto: "#000000",
      }],
      nota: 5,
      qtdAvaliacoes: 100,
      favorito: true
    },
    {
      imagem: temp,
      nome: "Receita 2",
      categorias: ["Categoria 2"],
      preferencias: [{
        nome: "Picante",
        corFundo: "#F54A4A",
        corTexto: "#FFFFFF",
      },
      {
        nome: "Koreana",
        corFundo: "#BDC2DE",
        corTexto: "#000000",
      }],
      nota: 4.5,
      qtdAvaliacoes: 80,
      favorito: false
    },
    {
      imagem: temp,
      nome: "Receita 3",
      categorias: ["Categoria 3"],
      preferencias: [{
        nome: "Picante",
        corFundo: "#F54A4A",
        corTexto: "#FFFFFF",
      },
      {
        nome: "Koreana",
        corFundo: "#BDC2DE",
        corTexto: "#000000",
      }],
      nota: 4.8,
      qtdAvaliacoes: 120,
      favorito: false
    },
  ];

  return (
    <>
      <HeaderCliente />
      <div className="items-center justify-center w-full flex mt-10">
        <div className="items-center justify-between w-4/5 flex border-b border-gray-300">
          <h1 className="text-2xl text-[#045D53] mb-4">Receitas</h1>
          <div className="relative flex items-center">
            <div
              className="border border-gray-300 bg-white rounded-md py-1 px-6 mr-8 cursor-pointer"
              onClick={toggleOptions}
            >
              Categorias
            </div>
            {showOptions && (
              <div className="absolute mt-48 p-2 bg-white border border-gray-300 rounded-md">
                {options.map((option) => (
                  <label key={option} className="block">
                    <input
                      type="checkbox"
                      checked={selectedOptions.includes(option)}
                      onChange={() => handleOptionChange(option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
            <div className="relative">
              <input
                type="text"
                className="w-80 border border-gray-300 rounded-full py-1 px-4"
                placeholder="Qual será sua próxima refeição?"
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
            <FiEdit />
          </div>
        </div>
        <div
          className="mt-4 mb-8 flex flex-wrap"
          style={{
            marginLeft: "10%", 
            marginRight: "10%",
          }}
        >
          {preferencias.map((preferencia) => (
            <Preferencia key={preferencia.nome} preferencia={preferencia} /> 
          ))}
        </div>
      </div>
      <div className="flex justify-between mt-4" style={{ marginRight: "10%", marginLeft: "10%" }}>
        {receitas.map((receita, index) => (
          <CardReceita key={index} receita={receita} />
        ))}
      </div>
    </>
  );
}

export default Receitas;
