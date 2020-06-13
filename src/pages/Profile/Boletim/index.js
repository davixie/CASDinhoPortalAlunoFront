import React, { useEffect, useState } from 'react';

import Header from '../Header/index';
import './styles.css';

import api from '../../../services/api';
import { useHistory } from 'react-router-dom';

export default function Boletim(){
    const NomeStudent = localStorage.getItem('StudentNome');
    const Student_ID = localStorage.getItem('StudentId');
    const history = useHistory();

    const [notas, setNotas] = useState([])

    async function grades(){
        try{
            await api.get('grade', {
                headers:{
                    Authorization: Student_ID,
                }
            }).then(resposta => (
                setNotas(resposta.data)
            ))
        }catch(err){
            history.push('/')
            alert("Não foi possível encontrar alguns dados.")
        }
    }

    useEffect(() => {
        grades();
    }, []);

    return(
        <div className="profile-container">
            <Header />
            <div>
                <h2>Seja bem vindo, {NomeStudent}! Seu boletim consta abaixo:</h2>
                <div className="boletim">
                    {notas.map(etapa => (
                        <ul>
                            <h2>{etapa.etapa}</h2>
                            <section className="boletim-title">
                                <h2>Matéria</h2>
                                <h2>Nota</h2>
                            </section>
                            <li>
                                <h3>Matemática</h3>
                                <h3>{etapa.notamatematica}</h3>
                            </li>
                            <li>
                                <h3>Português</h3>
                                <h3>{etapa.notaportugues}</h3>
                            </li>
                            <li>
                                <h3>História</h3>
                                <h3>{etapa.notahistoria}</h3>
                            </li>
                            <li>
                                <h3>Geografia</h3>
                                <h3>{etapa.notageografia}</h3>
                            </li>
                            <li>
                                <h3>Biologia</h3>
                                <h3>{etapa.notabiologia}</h3>
                            </li>
                            <li>
                                <h3>Física</h3>
                                <h3>{etapa.notafisica}</h3>
                            </li>
                            <li>
                                <h3>Química</h3>
                                <h3>{etapa.notaquimica}</h3>
                            </li>
                        </ul>
                    ))}
                </div>
            </div>
        </div>
    );
}