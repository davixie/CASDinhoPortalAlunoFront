import React, { useState } from 'react';

import './styles.css';
import Home from '../Home';
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
            alert('Falta lançada!')
        }catch(err){
            alert('Não foi possível lançar a falta, tente novamente.');
        }
    }
    return(
        <div>
            <Home/>
            <div className="setfaltas-container">
                <form onSubmit={handleFaltas}>
                    <h1>Lançe faltas abaixo</h1>
                    <input 
                        placeholder="ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <input 
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