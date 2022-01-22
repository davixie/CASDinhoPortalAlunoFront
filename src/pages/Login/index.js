import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { api_admin } from '../../services/api';
import { message } from 'antd'
import CASDinhoImg from '../../imagens/CASDinho.jpg';
import CASDVestImg from '../../imagens/CASDvest_logo.png'
import logoImg from '../../imagens/logo.png';
import './styles.css'

export default function Login(){
    const [id, setId] = useState('');
    const [senha, setSenha] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try{
            message.info("Aguarde enquanto tentamos fazer o login")
            const response = await api_admin.post('login', {
                username: id,
                password: senha,
            })
            if(response.status == 200){
                localStorage.setItem('Token', response.data.token);
                await checkValid(response.data.token)
                history.push('/adm');
            }else if(response.status == 406){
                message.error('Login ou senha incorretos, tente novamente.')
            }else{
                message.error('Login ou senha incorretos, tente novamente.')
            }
        }catch(err){
            message.error('Login ou senha incorretos, tente novamente.')
        }
    }

    async function checkValid(token){
        try{
            const response = await api_admin.get('/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if(response.status == 200){
                localStorage.setItem('name', response.data.first_name)
                localStorage.setItem('admin_id', response.data.id)
            }else{
                message.error('Houve um erro, tente novamente mais tarde');
            }

        }catch(err){
            history.push('/')
            message.error("Não foi possível identificar o usuário.")
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