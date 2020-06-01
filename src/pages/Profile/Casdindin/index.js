import React, { useState, useEffect } from 'react';
import './styles.css';
import Header from '../Header/index';
import { useHistory } from 'react-router-dom';
import api from '../../../services/api';

export default function Casdindin(){
    const [casdindin, setCasdindin] = useState(0)
    const history = useHistory
    const student_Id = localStorage.getItem('StudentId');
    
    async function casdindinQuantidade(){
        try{
            await api.get('/casdindin', {
                headers: {
                    Authorization: student_Id
                }
            }).then(resposta => {
                setCasdindin(resposta.data.casdindin)
            })
        }catch(err){
            history.push('/')
            alert('Não foi possível encontrar a sua quantidade.')
        }
    }

    useEffect(() => {
        casdindinQuantidade()
    }, [])

    return(
        <div>
            <Header />
            <div>
                <h2>A sua quantidade de CASDindins até o momento é de: {casdindin}</h2>
            </div>
        </div>
    );
}