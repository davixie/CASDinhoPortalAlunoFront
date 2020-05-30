import React, { useEffect, useState } from 'react'
import './styles.css';

import Header from '../../Home/index';
import api from '../../../../services/api';

export default function Alunos(){
    const[alunos, setAlunos] = useState([])

    useEffect(() => {
        api.get('register')
        .then(response => {
            setAlunos(response.data)
        })
    }, [])

    return(
        <div>
            <Header />
            <div className="alunos-students">
                <h1>TODOS OS ALUNOS</h1>
                <table border="1">
                    <tr>
                        <td>Nome</td>
                        <td>ID</td>
                        <td>TURMA</td>
                        <td>Senha</td>
                    </tr>
                    {alunos.map(aluno => (
                        <tr>
                            <td>{aluno.nome}</td>
                            <td>{aluno.id}</td>
                            <td>{aluno.turma}</td>
                            <td>{aluno.senha}</td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    );
}