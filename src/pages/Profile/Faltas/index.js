import React, { useState, useEffect } from 'react';
import { message } from 'antd'
import './styles.css';
import Header from '../Header/index';
import api from '../../../services/api';
import { useHistory } from 'react-router-dom';

export default function Faltas(){
    const [faltas, setFaltas] = useState([])
    const student_id = localStorage.getItem('StudentId');
    const history = useHistory()

    async function pegarFaltas(){
        try{
            await api.get('falta', {
                headers:{
                    Authorization: student_id,
                }
            }).then(response => {
                setFaltas(response.data)
            })
        }catch(err){
            message.error('Não foi possível encontrar alguns dados.')
            history.push('/')
        }
    }

    useEffect(() => {
        pegarFaltas()
    }, [])
    return(
        <div>
            <Header />
            <div className="faltas-container">
                <h2>AS DATAS DAS FALTAS CONSTAM ABAIXO</h2>
                <table border="1">
                    <tr>
                        <td>DATA</td>
                    </tr>
                    {faltas.map(falta => (
                        <tr>
                            <td>{falta.data}</td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    );
}