import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import axios from 'axios'
import { message } from 'antd'
import CASDinhoImg from '../../imagens/CASDinho.jpg';
import CASDVestImg from '../../imagens/CASDvest_logo.png'
import logoImg from '../../imagens/logo.png';
import './styles.css'

// const BASE_URL = "http://casdplus.herokuapp.com/"

export default function Login(){
    const [id, setId] = useState('');
    const [senha, setSenha] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('login', {
                username: id,
                password: senha,
            })
            localStorage.setItem('Token', response.data.token);

            history.push('/adm');

        }catch(err){
            message.error('Login ou senha incorretos, tente novamente.')
        }
    }

    return(
        <div className="login">
            <img src={CASDinhoImg} alt="CASDinho"/>
            <div className="login-container">
                <section>
                    <img src={logoImg} alt="logo"/>
                    <img src={CASDVestImg} alt="CASDvest_logo"/>
                </section>
                
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
                    <button type="submit" className="button">ENTRAR</button>
                </form>
                
            </div>
        </div>
    )
}