import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {Header} from '../Home/index';
import { message } from 'antd'

import { api_admin } from '../../../services/api';

import './styles.css';

export default function SetBoletim(){
    const history = useHistory();

    const [id, setId] = useState('');
    const [etapa, setEtapa] = useState('');
    const [notamatematica, setMat] = useState('');
    const [notaportugues, setPort] = useState('');
    const [notahistoria, setHist] = useState('');
    const [notageografia, setGeo] = useState('');
    const [notabiologia, setBio] = useState('');
    const [notafisica, setFis] = useState('');
    const [notaquimica, setQui] = useState('');

    async function handleSubmit(e){
        e.preventDefault();

        const data= {
            etapa,
            notamatematica,
            notaportugues,
            notahistoria,
            notageografia,
            notabiologia,
            notafisica,
            notaquimica,
        };

        try{
            await api_admin.post('grade', data, {
                headers: {
                    Authorization: id,
                }
            })

            history.push('/adm');
            message.success('Notas enviadas ao aluno!')
        }catch(err){
            message.error('Não foi possível inserir, tente novamente.')
        }
    }

    return(
        <div>
            <Header />
            <section className="setboletim-container">
                <form onSubmit={handleSubmit}>
                    <h1>Por favor preencha os dados seguintes com respeito ao respectivo aluno</h1>
                    <input
                        placeholder="ID do Aluno" 
                        value={id}
                        onChange={e => setId(e.target.value)}    
                    />
                    <input
                        placeholder="Qual etapa/simulado?" 
                        value={etapa}
                        onChange={e => setEtapa(e.target.value)}    
                    />
                    <input
                        placeholder="Nota de Matemática" 
                        value={notamatematica}
                        onChange={e => setMat(e.target.value)}    
                    />
                    <input
                        placeholder="Nota de Português" 
                        value={notaportugues}
                        onChange={e => setPort(e.target.value)}    
                    />
                    <input
                        placeholder="Nota de História" 
                        value={notahistoria}
                        onChange={e => setHist(e.target.value)}    
                    />
                    <input
                        placeholder="Nota de Geografia" 
                        value={notageografia}
                        onChange={e => setGeo(e.target.value)}    
                    />
                    <input
                        placeholder="Nota de Biologia" 
                        value={notabiologia}
                        onChange={e => setBio(e.target.value)}    
                    />
                    <input
                        placeholder="Nota de Física" 
                        value={notafisica}
                        onChange={e => setFis(e.target.value)}    
                    />
                    <input
                        placeholder="Nota de Química" 
                        value={notaquimica}
                        onChange={e => setQui(e.target.value)}    
                    />
                    <button type="submit">ENVIAR</button>
                </form>
            </section>
        </div>
    );
}