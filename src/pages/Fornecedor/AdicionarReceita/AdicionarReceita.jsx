import React, { useState } from 'react';
import api from '../../../api/api';
import HeaderFornecedor from '../../../components/Fornecedor/HeaderFornecedor/HeaderFornecedor';
import style from './AdicionarReceita.module.css';
import trash from '../../../assets/Fornecedor/Receitas/trash.svg';
import editar from '../../../assets/Fornecedor/Receitas/Edit.svg';
import { FaUpload } from 'react-icons/fa';

function AdicionarReceita() {
  const [receita, setReceita] = useState({
    nome: '',
    horas: '',
    minutos: '',
    rendimento: '',
    descricao: '',
    qtdAvaliacoes: '',
    mediaAvaliacoes: '',
    ingredientes: [{ quantidade: '', unidade: '', nome: '' }],
    modoPreparo: [{ passo: '' }],
  });

  const handleFileUploadClick = () => {
    // Aqui você aciona o clique no input file
    document.getElementById('seuInputFile').click();
  };

  const handleFileChange = (e) => {
    // Aqui você pode lidar com a alteração do arquivo se necessário
    const selectedFile = e.target.files[0];
    console.log('Arquivo selecionado:', selectedFile);
  };

  const adicionarPasso = () => {
    setReceita((prevState) => ({
      ...prevState,
      modoPreparo: [...prevState.modoPreparo, { passo: '' }],
    }));
  };

  const adicionarIngrediente = () => {
    setReceita((prevState) => ({
      ...prevState,
      ingredientes: [...prevState.ingredientes, { quantidade: '', unidade: '', nome: '' }],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .post('/receitas', receita)
      .then((response) => {
        console.log('Nova receita adicionada:', response.data);
      })
      .catch((error) => {
        console.error('Erro ao adicionar receita:', error);
      });
    console.log('Esta é a receita', receita);
  };

  const handleInputChange = (index, field, value, arrayField) => {
    setReceita((prevState) => {
      const newArray = [...prevState[arrayField]];
      newArray[index][field] = value;
      return { ...prevState, [arrayField]: newArray };
    });
  };

  const removerIngrediente = (index) => {
    if (index === 0 && receita.ingredientes.length === 1) {
      return;
    }

    setReceita((prevState) => {
      const novosIngredientes = [...prevState.ingredientes];
      novosIngredientes.splice(index, 1);
      return { ...prevState, ingredientes: novosIngredientes };
    });
  };

  const removerPasso = (index) => {
    if (index === 0 && receita.modoPreparo.length === 1) {
      return;
    }

    setReceita((prevState) => {
      const novosPassos = [...prevState.modoPreparo];
      novosPassos.splice(index, 1);
      return { ...prevState, modoPreparo: novosPassos };
    });
  };

  return (
    <>
      <HeaderFornecedor />
      <section onSubmit={handleSubmit} className={style.body}>
        <div className={style.topo}>
          <h1 className={style.titulo_pagina}>Adicionar Receita</h1>
          <div className={style.linha_horizontal} />
        </div>
        <div className={style.container_imagem_titulo}>
          <div className={style.container_imagem}>
            <div>
              {/* Input file oculto */}
              <input
                type="file"
                id="seuInputFile"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />

              {/* Ícone que substituirá o input file */}
              <div onClick={handleFileUploadClick}>
                <FaUpload size={30} color="blue" />
                <p>Clique para fazer upload</p>
              </div>
            </div>
          </div>
          <div className={style.container_titulo_categoria}>
            <label>
              <span>Titulo</span>
              <input
                className={style.input_titulo}
                value={receita.nome}
                onChange={(e) => setReceita({ ...receita, nome: e.target.value })}
              />
            </label>
            <div className={style.container_categoria}>
              <img src={editar} className={style.icone} alt="icone de lapis" />
              <span>
                <b>Categoria: </b>Koreana
              </span>
            </div>
          </div>
        </div>
        <div className={style.container_medida_rendimento}>
          <div className={style.container_rendimento_tempo}>
            <div className={style.container_rendimento}>
              <h1>Rendimento</h1>
              <div className={style.rendimento}>
                <span>Ingredientes para render</span>
                <input
                  type="number"
                  value={receita.rendimento}
                  onChange={(e) => setReceita({ ...receita, rendimento: e.target.value })}
                />
                <span>porções</span>
              </div>
            </div>
            <div className={style.container_tempo}>
              <h1>Tempo de preparo</h1>
              <div className={style.tempo}>
                <input
                  type="number"
                  value={receita.horas}
                  onChange={(e) => setReceita({ ...receita, horas: e.target.value })}
                />
                <span>Hora(s) e</span>
                <input
                  type="number"
                  value={receita.minutos}
                  onChange={(e) => setReceita({ ...receita, minutos: e.target.value })}
                />
                <span>Minuto(s)</span>
              </div>
            </div>
          </div>
          <div className={style.unidade_medida}>
            <div className={style.titulos_medida}>
              <h1 className={style.titulo_quantidade}>Quantidade</h1>
              <h1 className={style.titulo_unidade}>Unidade</h1>
              <h1 className={style.titulo_ingrediente}>Ingrediente</h1>
            </div>
            {receita.ingredientes.map((ingrediente, index) => (
              <div className={style.inputs_medida} key={index}>
                <input
                  type="number"
                  value={ingrediente.quantidade}
                  className={style.input_quantidade}
                  onChange={(e) => handleInputChange(index, 'quantidade', e.target.value, 'ingredientes')}
                />
                <select
                  name="select"
                  value={ingrediente.unidade}
                  className={style.input_unidade}
                  onChange={(e) => handleInputChange(index, 'unidade', e.target.value, 'ingredientes')}
                >
                  <option value="UNIDADE">Unidade</option>
                  <option value="LITRO">Litro</option>
                  <option value="KILO">Kilo</option>
                  <option value="GRAMA">Grama</option>
                  <option value="MILIGRAMA">Miligrama</option>
                  <option value="MILILITRO">Mililitro</option>
                  <option value="XICARA">Xicara</option>
                  <option value="SEM_UNIDADE">Sem Unidade</option>
                  <option value="COLHER_SOPA">Colher de sopa</option>
                  <option value="COLHER_CHA">Colher de chá</option>
                </select>
                <input
                  type="text"
                  value={ingrediente.nome}
                  className={style.input_ingrediente}
                  onChange={(e) => handleInputChange(index, 'nome', e.target.value, 'ingredientes')}
                />
                <img src={trash} className={style.icone} onClick={() => removerIngrediente(index)} alt="icone de lata de lixo" />
              </div>
            ))}
            <button className={style.adicionar_ingrediente} onClick={adicionarIngrediente}>
              Adicionar Ingrediente
            </button>
          </div>
        </div>
        <div className={style.container_modo_preparo}>
          <h1 className={style.titulo_preparo}>Modo de preparo</h1>
          {receita.modoPreparo.map((passo, index) => (
            <div key={index}>
              <div className={style.passo}>
                <span>Passo {index + 1}</span>
                <img src={trash} className={style.icone} onClick={() => removerPasso(index)} alt="icone de lata de lixo" />
                <textarea cols="30" rows="3" value={passo.passo} onChange={(e) => handleInputChange(index, 'passo', e.target.value, 'modoPreparo')} />
              </div>
            </div>
          ))}
          <button className={style.adicionar_ingrediente} onClick={adicionarPasso}>
            Adicionar passo
          </button>
        </div>
        <div className={style.container_botoes}>
          <button>Cancelar</button>
          <button type="submit" onClick={handleSubmit}>Confirmar</button>
        </div>
      </section>
    </>
  );
}

export default AdicionarReceita;