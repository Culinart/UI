// HeaderCliente.jsx

import React from "react"
import style from './HeaderCliente.module.css';
import pedidos from '../../../assets/header/purchase_order.svg';
import receitas from '../../../assets/header/cooking_book.svg';
import meuPlano from '../../../assets/header/to_do.svg';
import suporte from '../../../assets/header/request_service.svg';
import perfil from '../../../assets/header/profile.svg';
import logout from '../../../assets/header/logout.svg';

function HeaderCliente() {
    return (
        <>
            <header className={style.header}>
                <div className={style.conteudo}>
                    <div className={style.itens_esquerda}>
                        <a href="/" className={style.item}>
                            <img src={pedidos} alt="Icone de pedidos" />
                            <span>Pedidos</span>
                        </a>
                        <a href="/" className={style.item}>
                            <img src={receitas} alt="Icone de receitas" />
                            <span>Receitas</span>
                        </a>
                        <a href="/" className={style.item}>
                            <img src={meuPlano} alt="Icone meu plano" />
                            <span>Meu Plano</span>
                        </a>
                    </div>
                    <div className={style.itens_direita}>
                        <a href="/" className={style.item}>
                            <img src={suporte} alt="Icone suporte" />
                            <span>Suporte</span>
                        </a>
                        <a href="/" className={style.item}>
                            <img src={perfil} alt="Icone perfil" />
                            <span>Perfil</span>
                        </a>
                        <a href="/" className={style.item}>
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
