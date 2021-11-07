import React, { useState } from 'react';
import { message } from 'antd'
import './styles.css';
import {Header} from '../Home';
import { api_admin } from '../../../services/api';
import { useHistory } from 'react-router-dom';

export default function SetEventosAdmin(){
    const token = localStorage.getItem("Token")
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const class_id = "1"

    const history = useHistory();

    async function handleFaltas(e){
        e.preventDefault();
        try{
            //console.log("data: ", date)
            let response = await api_admin.post('/events', {
                name,
                description,
                date,
                class_id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if(response.status == 200){
                message.success('Evento criado')
                history.push('/adm')
            }else{
                message.error('Verifique as informações e tente novamente')
            }
        }catch(err){
            message.error("Não foi possível criar o evento, tente novamente mais tarde.")
            history.push('/adm')
        }
    }
    return(
        <div>
            <Header/>
            <div className="setfaltas-container">
                <form onSubmit={handleFaltas}>
                    <h1>Crie evento</h1>
                    <input
                        placeholder="Nome do Evento"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <textarea
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input
                        type="date"
                        placeholder="Data do Evento"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                    />
                    <button type="submit">LANÇAR</button>
                </form>
            </div>
        </div>
    );
}