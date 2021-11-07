import React, { useEffect, useState } from 'react'
import './styles.css';

import {Header} from '../../Home/index';
import { api_admin } from '../../../../services/api';

export default function Mandela(){
    const[alunos, setAlunos] = useState([])

    useEffect(() => {
        api_admin.get('mandela')
        .then(response => {
            setAlunos(response.data)
        })
    }, [])

    return(
        <div>
            <Header />
            <div className="mandela-students">
                <h1>MANDELA</h1>
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