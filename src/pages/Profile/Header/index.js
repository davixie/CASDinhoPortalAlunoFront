import React from 'react';
import { useHistory, Link } from 'react-router-dom';

import logo_CASD from '../../../imagens/logo_CASD.png';
import logo from '../../../imagens/logo.png';
import './styles.css';

export default function Header(){
    const history = useHistory();

    function handleLogoff(e){
        e.preventDefault();

        localStorage.clear();
        history.push('/')
    }

    return(
        <div classNames="header-container">
            <section className="header-content">
                <img src={logo_CASD} alt="logo CASD"/>
                <img src={logo} alt="logo" id="imglogo"/>
                <button type="button" onClick={handleLogoff}>SAIR</button>
            </section>
            <header className="indice">
                <Link to="/profile">
                    HOME
                </Link>
                <Link to="/profile/boletim">
                    BOLETIM
                </Link>
                <Link to="/profile/faltas">
                    FALTAS
                </Link>
                <Link to="/profile/casdindin">
                    CASDINDIN
                </Link>
            </header>
        </div>
    );
}