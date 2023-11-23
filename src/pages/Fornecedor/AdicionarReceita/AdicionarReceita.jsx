import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from "../../../api/api";

import HeaderFornecedor from "../../../components/Fornecedor/HeaderFornecedor/HeaderFornecedor";
import style from "./AdicionarReceita.module.css"
import trash from "../../../assets/Fornecedor/Receitas/trash.svg"

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
        modoPreparo: [{ passo: '' }]
    });

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
        api.post('/receitas', receita)
            .then(response => {
                console.log("Nova receita adicionada:", response.data);
            })
            .catch(error => {
                console.error("Erro ao adicionar receita:", error);
            });
        console.log("esta é a receira", receita);
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
                <div className={style.conteudo}>
                    <div className={style.topo}>
                        <h1 className={style.titulo_pagina}>Adicionar Receita</h1>
                        <div className={style.linha_horizontal} />
                    </div>

                    <div className={style.container_imagem_titulo}>
                        <div className={style.imagem} />
                        <div className={style.container_titulo_categoria}>
                            <label>
                                <span>Titulo</span>
                                <input className={style.input_titulo} />
                            </label>
                            <div className={style.container_categoria}>
                                <div className={style.icone} />
                                <span><b>Categoria: </b>Koreana</span>
                            </div>
                        </div>
                    </div>

                    <div className={style.container_medida_rendimento}>
                        <div className={style.container_rendimento_tempo}>
                            <div className={style.container_rendimento}>
                                <h1>Rendimento</h1>
                                <div className={style.rendimento}>
                                    <span>Ingredientes para render</span>
                                    <input type="number" />
                                    <span>porções</span>
                                </div>
                            </div>
                            <div className={style.container_tempo}>
                                <h1>Tempo de preparo</h1>
                                <div className={style.tempo}>
                                    <input type="number" />
                                    <span>Hora(s) e</span>
                                    <input type="number" />
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
                                        defaultValue={ingrediente.quantidade}
                                        className={style.input_quantidade}
                                        onChange={(e) => handleInputChange(index, 'quantidade', e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        defaultValue={ingrediente.unidade}
                                        className={style.input_unidade}
                                        onChange={(e) => handleInputChange(index, 'unidade', e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        defaultValue={ingrediente.nome}
                                        className={style.input_ingrediente}
                                        onChange={(e) => handleInputChange(index, 'nome', e.target.value)}
                                    />
                                    <img src={trash} className={style.icone} onClick={() => removerIngrediente(index)} alt="icone de lata de lixo" />
                                </div>
                            ))}
                            <button
                                className={style.adicionar_ingrediente}
                                onClick={adicionarIngrediente}
                            >
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
                                    <textarea cols="30" rows="3" defaultValue={passo.passo} onChange={(e) => handleInputChange(index, 'passo', e.target.value)} />
                                </div>

                            </div>
                        ))}
                        <button className={style.adicionar_ingrediente} onClick={adicionarPasso}> Adicionar passo</button>
                    </div>
                    <div className={style.container_botoes}>
                        <button>Cancelar</button>
                        <button type="submit">Confirmar</button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AdicionarReceita; 


















// import React, { useState } from 'react';
// import HeaderFornecedor from '../../../components/Fornecedor/HeaderFornecedor/HeaderFornecedor';
// import api from '../../../api/api';
// import style from './AdicionarReceita.module.css';
// import trash from '../../../assets/Fornecedor/Receitas/trash.svg';

// function AdicionarReceita() {
//   const [receita, setReceita] = useState({
//     nome: '',
//     horas: '',
//     minutos: '',
//     rendimento: '',
//     descricao: '',
//     qtdAvaliacoes: '',
//     mediaAvaliacoes: '',
//     ingredientes: [{ quantidade: '', unidade: '', nome: '' }],
//     modoPreparo: [{ passo: '' }],
//   });

//   const adicionarPasso = () => {
//     setReceita((prevState) => ({
//       ...prevState,
//       modoPreparo: [...prevState.modoPreparo, { passo: '' }],
//     }));
//   };

//   const adicionarIngrediente = () => {
//     setReceita((prevState) => ({
//       ...prevState,
//       ingredientes: [...prevState.ingredientes, { quantidade: '', unidade: '', nome: '' }],
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     api
//       .post('/receitas', receita)
//       .then((response) => {
//         console.log('Nova receita adicionada:', response.data);
//       })
//       .catch((error) => {
//         console.error('Erro ao adicionar receita:', error);
//       });
//     console.log('Esta é a receita:', receita);
//   };

//   const removerIngrediente = (index) => {
//     if (index === 0 && receita.ingredientes.length === 1) {
//       return;
//     }

//     setReceita((prevState) => {
//       const novosIngredientes = [...prevState.ingredientes];
//       novosIngredientes.splice(index, 1);
//       return { ...prevState, ingredientes: novosIngredientes };
//     });
//   };

//   const removerPasso = (index) => {
//     if (index === 0 && receita.modoPreparo.length === 1) {
//       return;
//     }

//     setReceita((prevState) => {
//       const novosPassos = [...prevState.modoPreparo];
//       novosPassos.splice(index, 1);
//       return { ...prevState, modoPreparo: novosPassos };
//     });
//   };

//   const handleInputChange = (index, campo, valor) => {
//     setReceita((prevState) => {
//       const novosIngredientes = [...prevState.ingredientes];
//       novosIngredientes[index][campo] = valor;
//       return { ...prevState, ingredientes: novosIngredientes };
//     });
//   };

//   const handleInputChangePasso = (index, campo, valor) => {
//     setReceita((prevState) => {
//       const novosPassos = [...prevState.modoPreparo];
//       novosPassos[index][campo] = valor;
//       return { ...prevState, modoPreparo: novosPassos };
//     });
//   };

//   return (
//     <>
//       <HeaderFornecedor />
//       <section onSubmit={handleSubmit} className={style.body}>
//         <div className={style.conteudo}>
//           <div className={style.topo}>
//             <h1 className={style.titulo_pagina}>Adicionar Receita</h1>
//             <div className={style.linha_horizontal} />
//           </div>

//           {/* ... (restante do código) */}

//           <div className={style.container_unidade_medida}>
//             <div className={style.titulos_medida}>
//               <h1 className={style.titulo_quantidade}>Quantidade</h1>
//               <h1 className={style.titulo_unidade}>Unidade</h1>
//               <h1 className={style.titulo_ingrediente}>Ingrediente</h1>
//             </div>
//             {receita.ingredientes.map((ingrediente, index) => (
//               <div className={style.inputs_medida} key={index}>
//                 <input
//                   type="number"
//                   defaultValue={ingrediente.quantidade}
//                   className={style.input_quantidade}
//                   onChange={(e) => handleInputChange(index, 'quantidade', e.target.value)}
//                 />
//                 <input
//                   type="text"
//                   defaultValue={ingrediente.unidade}
//                   className={style.input_unidade}
//                   onChange={(e) => handleInputChange(index, 'unidade', e.target.value)}
//                 />
//                 <input
//                   type="text"
//                   defaultValue={ingrediente.nome}
//                   className={style.input_ingrediente}
//                   onChange={(e) => handleInputChange(index, 'nome', e.target.value)}
//                 />
//                 <img
//                   src={trash}
//                   className={style.icone}
//                   onClick={() => removerIngrediente(index)}
//                   alt="Ícone de lata de lixo"
//                 />
//               </div>
//             ))}
//             <button className={style.adicionar_ingrediente} onClick={adicionarIngrediente}>
//               Adicionar Ingrediente
//             </button>
//           </div>

//           <div className={style.container_modo_preparo}>
//             <h1 className={style.titulo_preparo}>Modo de preparo</h1>
//             {receita.modoPreparo.map((passo, index) => (
//               <div key={index}>
//                 <div className={style.passo}>
//                   <span>Passo {index + 1}</span>
//                   <img
//                     src={trash}
//                     className={style.icone}
//                     onClick={() => removerPasso(index)}
//                     alt="Ícone de lata de lixo"
//                   />
//                   <textarea
//                     cols="30"
//                     rows="3"
//                     defaultValue={passo.passo}
//                     onChange={(e) => handleInputChangePasso(index, 'passo', e.target.value)}
//                   />
//                 </div>
//               </div>
//             ))}
//             <button className={style.adicionar_ingrediente} onClick={adicionarPasso}>
//               Adicionar passo
//             </button>
//           </div>

//           {/* ... (restante do código) */}

//         </div>
//       </section>
//     </>
//   );
// }

// export default AdicionarReceita;
