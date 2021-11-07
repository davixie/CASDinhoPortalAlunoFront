import React, { useState, useEffect } from 'react';
import { message } from 'antd'
import './styles.css';
import Header from '../Header/index';
import { useHistory } from 'react-router-dom';
import { api_admin } from '../../../services/api';

export default function Casdindin(){
    const [casdindin, setCasdindin] = useState(0)
    const [descricoes, setDescricoes] = useState([])
    const history = useHistory
    const student_Id = localStorage.getItem('StudentId');
    
    async function casdindinQuantidade(){
        try{
            await api_admin.get('/casdindin', {
                headers: {
                    Authorization: student_Id
                }
            }).then(resposta => {
                setCasdindin(resposta.data.casdindin)
            })
            await api_admin.get('/casdindinDescription', {
                headers: {
                    Authorization: student_Id
                }
            }).then(resposta => {
                setDescricoes(resposta.data)
            })
        }catch(err){
            history.push('/')
            message.error('Não foi possível encontrar a sua quantidade.')
        }
    }

    useEffect(() => {
        casdindinQuantidade()
    }, [])

    return(
        <div className="casdindin-container">
            <Header />
            <div>
                <h2>A sua quantidade de CASDindins até o momento é de: {casdindin}</h2>
            </div>
            <h2>Segue abaixo as ocorrências</h2>
            <ul className="descricao-container">
                {descricoes.map(descricao => (
                    <li className={descricao.situacao}>
                        <h3>Ocorrência: {descricao.quantidade} casdindin(s)</h3>
                        <h3>{descricao.descricao}</h3>
                    </li>
                ))}
            </ul>
        </div>
    );
}