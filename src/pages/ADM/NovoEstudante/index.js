import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { message } from 'antd'
import api from '../../../services/api';

import './styles.css';
import {Header} from '../Home';

export default function NovoEstudante(){
    const history = useHistory();

    const [nome, setNome] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [turma, setTurma] = useState('');
    const [senha, setSenha] = useState('');

    async function handleCreateStudent(e){
        e.preventDefault();

        try{
            const response = await api.post('register', {
                nome,
                whatsapp,
                turma,
                senha
            })
            message.info('ID do novo aluno é: ' + response.data.id)
            history.push('/adm')
        }catch(err){
            message.error('Não foi possível fazer o cadastro!')
        }
    };

    return(
        <div>
            <Header/>
            <section className="section">
                <h1>Cadastre o novo aluno abaixo:</h1>
                <form className="novo-estudante-container" onSubmit={handleCreateStudent}>
                    <input 
                        placeholder="Nome do aluno" 
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />
                    <input 
                        placeholder="Whatsapp (opcional, colocar 00000000000 se não houver)"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />
                    <select 
                        placeholder="Turma"
                        value={turma}
                        onChange={e => setTurma(e.target.value)}
                        defaultValue={'turma'}
                    >
                        <option value="turma">Selecione a turma</option>
                        <option value="Frida">Frida</option>
                        <option value="Mandela">Mandela</option>
                        <option value="Turing">Turing</option>
                        <option value="Malala">Malala</option>
                    </select>
                    
                    <input 
                        type="password"
                        placeholder="senha"
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                    />
                    <button type="submit">CADASTRAR</button>
                </form>
            </section>
        </div>
    );
}
