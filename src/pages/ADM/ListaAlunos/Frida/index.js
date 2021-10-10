import React, { useEffect, useState } from 'react';
import './styles.css';

import api from '../../../../services/api';

import {Header} from '../../Home/index';

export default function Frida(){
    const [alunos, setAlunos] = useState([])

    useEffect(() => {
        api.get('frida')
        .then(response => {
            setAlunos(response.data);
        })
    } , [])

    return(
        <div>
            <Header />
            <div className="frida-students">
                <h1>FRIDA</h1>
                <table border="1">
                    <tr>
                        <td>Nome</td>
                        <td>ID</td>
                        <td>Senha</td>
                    </tr>
                    {alunos.map(aluno => (
                        <tr>
                            <td>{aluno.nome}</td>
                            <td>{aluno.id}</td>
                            <td>{aluno.senha}</td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    );
}