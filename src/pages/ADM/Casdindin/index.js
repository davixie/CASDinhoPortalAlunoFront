import React, { useState, useEffect } from 'react';

import './styles.css';
import Home from '../Home';
import api from '../../../services/api';
import { useHistory } from 'react-router-dom';

export default function SetCasdindin(){
    const [student_id, setId] = useState('')
    const history = useHistory()
    const [ganhar, setGanhar] = useState(false)
    const [quantidade, setQuantidade] = useState(0)
    const [aux, setAux] = useState('')

    async function getQuant(){
        try{
            await api.get('/casdindin', {
                headers: {
                    Authorization: student_id
                }
            }).then(resposta => {
                console.log(resposta.data)
                setAux(resposta.data.casdindin)
            })
        }catch(err){
            history.push('/adm')
            alert('Ocorreu um erro.')
        }   
    }

    useEffect(() => {
        getQuant()
    }, [student_id])

    async function handleSubmit(e){
        e.preventDefault();
        try{
            let quanty = parseInt(quantidade)
            console.log('quanty eh ', quanty)
            let casdindin = parseInt(aux)
            if(ganhar == true){
                casdindin = casdindin + quanty
            }
            else{
                casdindin = casdindin - quanty
            }
            console.log('casdindin eh ', casdindin)
            console.log(casdindin)
            await api.post('/casdinUpdate', {
                casdindin,
                student_id
            })
            history.push('/adm')
        }catch(err){
            alert("Não foi possível adicionar, tente novamente mais tarde.")
            history.push('/adm')
        }
    }

    return(
        <div>
            <Home/>
            <section className="setcasdindin-container">
                <form onSubmit={handleSubmit}>
                    <h1>Por favor preencha os dados seguintes com respeito ao respectivo aluno</h1>
                    <input
                        placeholder="ID do Aluno" 
                        value={student_id}
                        onChange={e => setId(e.target.value)}    
                    />
                    <select 
                        placeholder="Deseja dar ou tirar?"
                        onChange={e => setGanhar(e.target.value)}
                        defaultValue={true}
                    >
                        <option value={false}>Perder</option>
                        <option value={true}>Ganhar</option>
                    </select>
                    <input
                        placeholder="Quantidade" 
                        onChange={e => setQuantidade(e.target.value)}    
                    />
                    
                    <button type="submit">ENVIAR</button>
                </form>
            </section>
        </div>
    );
}