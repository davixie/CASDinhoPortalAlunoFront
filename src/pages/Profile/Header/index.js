import React, {useState, useEffect} from 'react';
import { message } from 'antd'
import { useHistory, Link } from 'react-router-dom';
import { api_admin } from '../../../services/api'
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

    const [aluno, setAluno] = useState({})
    const id = localStorage.getItem('StudentId')
    
    async function selecionarAluno(){
        try{
            await api_admin.get('/studentspecific', {
                headers: {
                    Authorization: id
                }
            }).then(resposta => {
                setAluno(resposta.data)
            })
        }catch(err){
            message.error("Não foi possível enconntrar o aluno.")
            history.push('/')
        }
    }
    
    useEffect(() => {
        selecionarAluno();
    }, [])

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