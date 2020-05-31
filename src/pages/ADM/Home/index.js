import React from 'react';
import { useHistory, Link } from 'react-router-dom';

import logo_CASD from '../../../imagens/logo_CASD.png';
import logo from '../../../imagens/logo.png';
import './styles.css';

export default function Header(){
    const history = useHistory();
    const nome = localStorage.getItem('NomeADM')

    function handleLogoff(e){
        e.preventDefault();

        localStorage.clear();
        history.push('/')
    }

    return(
        <div className="header-container-adm">
            <section className="header-content-adm">
                <img src={logo_CASD} alt="logo CASD"/>
                <img src={logo} alt="logo" id="imglogo-adm"/>
                <button type="button" onClick={handleLogoff}>SAIR</button>
            </section>
            <header className="indice-adm">
                <Link to="/adm">
                    HOME
                </Link>
                <Link to="/adm/boletim">
                    BOLETIM
                </Link>
                <Link to="/adm/faltas">
                    FALTAS
                </Link>
                <Link to="/adm/casdindin">
                    CASDINDIN
                </Link>
                <Link to="/adm/novoestudante">
                    CADASTRO DE ALUNO
                </Link>
                <Link to="/adm/lista">
                    LISTA DOS ALUNOS
                </Link>
                <Link to="/adm/novoadm">
                    CRIAR ADM
                </Link>
            </header>
            <h2>Bem vindo, {nome}!</h2>
        </div>
    );
}