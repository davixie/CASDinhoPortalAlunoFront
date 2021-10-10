import React, { useState } from 'react';
import { message } from 'antd'
import './styles.css';
import {Header} from '../Home';
import api from '../../../services/api';
import { useHistory } from 'react-router-dom';

export default function SetFaltas(){
    const [id, setId] = useState('')
    const [data, setData] = useState('')

    const history = useHistory();

    async function handleFaltas(e){
        e.preventDefault();

        try{
            await api.post('falta', {data}, {
                headers:{
                    Authorization: id,
                }
            })
            history.push('/adm');
            message.success('Falta lançada!')
        }catch(err){
            message.error('Não foi possível lançar a falta, tente novamente.');
        }
    }
    return(
        <div>
            <Header/>
            <div className="setfaltas-container">
                <form onSubmit={handleFaltas}>
                    <h1>Lançe faltas abaixo</h1>
                    <input 
                        placeholder="ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <input
                        type="date"
                        placeholder="Data da falta"
                        value={data}
                        onChange={e => setData(e.target.value)}
                    />
                    <button type="submit">LANÇAR</button>
                </form>
            </div>
        </div>
    );
}