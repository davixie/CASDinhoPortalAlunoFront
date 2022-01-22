import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { message } from 'antd'
import { api_admin } from '../../../services/api';

import './styles.css';
import {Header} from '../Home';

export default function NovoEstudante(){
    const history = useHistory();

    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [birthday, setBirthday] = useState('')
    const [password, setPassword] = useState()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [class_id, setClassId] = useState(0)

    async function handleCreateStudent(e){
        e.preventDefault();

        try{
            let token = localStorage.getItem('Token')
            const response = await api_admin.post('students', {
                first_name: first_name,
                last_name: last_name,
                birthday: birthday,
                password: password,
                username: username,
                email: email,
                class_id: class_id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            message.success('Aluno cadastrado com sucesso')
            history.push('/adm')
        }catch(err){
            console.log(err)
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
                        placeholder="Primeiro nome" 
                        value={first_name}
                        onChange={e => setFirstName(e.target.value)}
                    />
                    <input 
                        placeholder="Último nome (sobrenome)" 
                        value={last_name}
                        onChange={e => setLastName(e.target.value)}
                    />
                    <input
                        type="date"
                        placeholder="Data Nascimento"
                        value={birthday}
                        onChange={e => setBirthday(e.target.value)}
                    />
                    <input 
                        type="password"
                        placeholder="senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <input 
                        placeholder="Username" 
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <input 
                        placeholder="E-mail" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <select 
                        placeholder="Classe"
                        onChange={e => setClassId(e.target.value)}
                        defaultValue={1}
                    >
                        <option value={0}>CASDVest</option>
                        <option value={1}>CASDinho</option>
                    </select>
                    <button type="submit">CADASTRAR</button>
                </form>
            </section>
        </div>
    );
}
