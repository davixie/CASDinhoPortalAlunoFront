import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import logo_CASD from '../../../imagens/logo_CASD.png';
import logo from '../../../imagens/logo.png';
import CASDvest from '../../../imagens/CASDvest_logo.png'
import './styles.css';
import api from '../../../services/api';

export default function Header(){
    const history = useHistory();
    const nome = localStorage.getItem('NomeADM')
    const [adm, setAdm] = useState({})
    function handleLogoff(e){
        e.preventDefault();

        localStorage.clear();
        history.push('/')
    }

    async function pegarAdm(){
        try{
            await api.get('admspecific', {
                headers: {
                    Authorization: nome
                }
            }).then(resposta => {
                setAdm(resposta.data)
            })
        }catch(err){
            history.push('/')
            alert("Não foi possível identificar o usuário.")
        }
    }

    useEffect(() => {
        pegarAdm()
    },[])
    return(
        <div className="header-container-adm">
            <section className="header-content-adm">
                <img src={logo_CASD} alt="logo CASD"/>
                <img src={logo} alt="logo" id="imglogo-adm"/>
                <img src={CASDvest} alt="casdvwest_logo" id="casdvest_logo" />
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
                <Link to="/adm/eventos">
                    EVENTOS
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
            <h2>Olá {nome}.</h2>
        </div>
    );
}