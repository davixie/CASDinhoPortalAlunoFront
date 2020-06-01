import React, { useEffect, useState } from 'react';
import './styles.css';
import Header from '../Header/index';
import { useHistory } from 'react-router-dom';
import api from '../../../services/api';

export default function Home(){
    const [aluno, setAluno] = useState({})
    const id = localStorage.getItem('StudentId')
    const history = useHistory()
    
    async function selecionarAluno(){
        try{
            await api.get('/studentspecific', {
                headers: {
                    Authorization: id
                }
            }).then(resposta => {
                setAluno(resposta.data)
            })
        }catch(err){
            alert("Não foi possível enconntrar o aluno.")
            history.push('/')
        }
    }
    
    useEffect(() => {
        selecionarAluno();
    }, [])
    return(
        <div className="home-container">
            <Header />
            <h2>Seja bem vindo, {aluno.nome}</h2>
        </div>
    );
}