import React, { useState, useEffect } from "react";
import {api} from "../../../api/api";
import style from './HeaderCliente.module.css';
import pedidos from '../../../assets/Institucional/header/purchase_order.svg';
import receitas from '../../../assets/Institucional/header/cooking_book.svg';
import meuPlano from '../../../assets/Institucional/header/to_do.svg';
import suporte from '../../../assets/Institucional/header/request_service.svg';
import perfil from '../../../assets/Institucional/header/profile.svg';
import logout from '../../../assets/Institucional/header/logout.svg';
import logo from '../../../assets/Institucional/header/logo_header.png';

function HeaderCliente() {

    const [permissao, setPermissao] = useState('');

    useEffect(() => {
        buscarInfoPessoal();
    }, []);

    function buscarInfoPessoal() {
        api
            .get(`/usuarios/${sessionStorage.getItem('idUsuario')}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                },
            })
            .then((response) => {
                console.log("Resposta", response);
                //setInputNome(response.data.nome);
                //setNome(response.data.nome);
                //telefoneChange(response.data.telefone);
                setPermissao(response.data.permissao); // Defina a permissão do usuário
            })
            .catch((erro) => {
                console.log("Erro", erro);
            });
    }
    
    const limparSessao = () => {
        sessionStorage.clear();
    }

    return (
        <>
            <header className={style.header}>
                <div className={style.conteudo}>
                    <div className={style.itens_esquerda}>

                        <a href="/">
                            <img src={logo} alt="Logo Culinart" href="/" className={style.logo} />
                        </a>
                        {permissao === 'CLIENTE' && ( // Renderize apenas se o usuário tiver permissão
                            <>
                                <a href="/cliente/pedidos" className={style.item}>
                                    <img src={pedidos} alt="Icone de pedidos" />
                                    <span>Pedidos</span>
                                </a>
                                <a href="/cliente/receitas" className={style.item}>
                                    <img src={receitas} alt="Icone de receitas" />
                                    <span>Receitas</span>
                                </a>
                                <a href="/cliente/meu-plano" className={style.item}>
                                    <img src={meuPlano} alt="Icone meu plano" />
                                    <span>Meu Plano</span>
                                </a>
                            </>
                        )}
                    </div>
                    <div className={style.itens_direita}>
                        <a href="https://app.pipefy.com/public/form/VqIeVqHH" target="_blank" className={style.item}>
                            <img src={suporte} alt="Icone suporte" />
                            <span>Suporte</span>
                        </a>
                        <a href="/cliente/perfil/info-pessoal" className={style.item}>
                            <img src={perfil} alt="Icone perfil" />
                            <span>Perfil</span>
                        </a>
                        <a href="/" onClick={limparSessao} className={style.item}>
                            <img src={logout} alt="Icone de logout" />
                            <span>Logout</span>
                        </a>
                    </div>
                </div>
            </header>
        </>
    )
}

export default HeaderCliente;
