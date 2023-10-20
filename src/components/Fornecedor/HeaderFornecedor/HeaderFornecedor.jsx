import React from "react"
import style from './HeaderFornecedor.module.css';
import pedidos from '../../../assets/Institucional/header/purchase_order.svg';
// import pedidos from '../../../assets/header/purchase_order.svg';
import receitas from '../../../assets/Institucional/header/cooking_book.svg';
import suporte from '../../../assets/Institucional/header/request_service.svg';
import perfil from '../../../assets/Institucional/header/profile.svg';
import logout from '../../../assets/Institucional/header/logout.svg';
import funcionarios from '../../../assets/Institucional/header/group.svg';
import dashboard from '../../../assets/Institucional/header/DashIcon.svg';

function HeaderFornecedor() {
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
                            <img src={funcionarios} alt="Icone meu plano" />
                            <span>Funcionários</span>
                        </a>
                        <a href="/" className={style.item}>
                            <img src={dashboard} alt="Icone meu plano" />
                            <span>Dashboard</span>
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

export default HeaderFornecedor;