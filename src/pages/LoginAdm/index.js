import React, { useState } from 'react'
import './styles.css'
import FotoUsuario from '../../imagens/FotoUsuario.jpg'
import api from '../../services/api'
import { useHistory } from 'react-router-dom'

export default function LoginAdm(){
    const [login, setLogin] = useState('')
    const [senha, setSenha] = useState('')

    const history = useHistory()

    async function loginAdm(e){
        e.preventDefault();

        try{
            const response = await api.post('loginadm', {
                login,
                senha,
            })

            localStorage.setItem('NomeADM', response.data.nome)
            
            history.push('/adm')
        }catch(err){
            alert('Não foi possível fazer o login, tente mais tarde.')
        }
    }

    return(
        <div className="login-adm">
            <form onSubmit={loginAdm}>
                <img src={FotoUsuario}/>
                <input 
                    placeholder="Login"
                    value={login}
                    onChange={e => setLogin(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="Senha" 
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                />
                <button type="submit">ENTRAR</button>
            </form>
        </div>
    )
}