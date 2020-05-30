import React, { useState, useEffect } from 'react';
import './styles.css';
import Header from '../Header/index';
import api from '../../../services/api';

export default function Faltas(){
    const [faltas, setFaltas] = useState([])
    const student_id = localStorage.getItem('StudentId');

    useEffect(() => {
        api.get('falta', {
            headers:{
                Authorization: student_id,
            }
        }).then(response => {
            setFaltas(response.data)
        })
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