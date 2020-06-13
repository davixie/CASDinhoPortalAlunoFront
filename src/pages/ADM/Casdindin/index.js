import React, { useState, useEffect } from 'react';

import './styles.css';
import Home from '../Home';
import api from '../../../services/api';
import { useHistory } from 'react-router-dom';

export default function SetCasdindin(){
    const [student_id, setId] = useState('')
    const history = useHistory()
    const [ganhar, setGanhar] = useState(true)
    const [descricao, setDescricao] = useState('')
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
            let casdindin = parseInt(aux)
            let situacao
            if(ganhar == true){
                situacao = "ganho"
                casdindin = casdindin + quanty
            }
            else{
                situacao = "perda"
                casdindin = casdindin - quanty
            }
            await api.post('/casdinUpdate', {
                casdindin,
                student_id
            })
            await api.post('/casdindinDescription', {
                descricao,
                student_id,
                situacao,
                quantidade
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
                    <textarea
                        style={{resize: "vertical"}}
                        placeholder="Descrição"
                        onChange={e => setDescricao(e.target.value)}
                    ></textarea>
                    
                    <button type="submit">ENVIAR</button>
                </form>
            </section>
        </div>
    );
}