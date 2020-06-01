import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import api from '../../services/api';

import CASDinhoImg from '../../imagens/CASDinho.jpg';
import logoImg from '../../imagens/logo.png';
import './styles.css'


export default function Login(){
    const [id, setId] = useState('');
    const [senha, setSenha] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('student', {
                id,
                senha,
            })
            
            localStorage.setItem('StudentId',id);
            localStorage.setItem('StudentNome', response.data.nome);

            history.push('/profile');
        }catch(err){
            alert('Login ou senha incorretos, tente novamente.')
        }
    }

    return(
        <div className="login">
            <img src={CASDinhoImg} alt="CASDinho"/>
            <div className="login-container">
                <img src={logoImg} alt="logo"/>
                <h1>LOGIN</h1>
                <form onSubmit={handleLogin}>
                    <input 
                        placeholder="Usuário" 
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <input 
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                    />
                    <Link to="/login-adm">
                        É adiministrador?
                    </Link>
                    <button type="submit" className="button">ENTRAR</button>
                </form>
                
            </div>
        </div>
    )
}