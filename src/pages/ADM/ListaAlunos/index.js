import React from 'react';
import './styles.css';
import Header from '../Home/index';
import { Link } from 'react-router-dom';

export default function Lista(){
    return(
        <div>
            <Header />
            <div className="nome-turmas">
                <Link to="/adm/lista/alunos" className="alunos">
                    TODOS OS ALUNOS
                </Link>
                <Link to="/adm/lista/frida" className="frida">
                    FRIDA
                </Link>
                <Link to="/adm/lista/mandela" className="mandela">
                    MANDELA
                </Link>
                <Link to="/adm/lista/turing" className="turing">
                    TURING
                </Link>
                <Link to="/adm/lista/malala" className="malala">
                    MALALA
                </Link>
            </div>
        </div>
    );
}