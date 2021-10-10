import React, { useState } from 'react'
import { message } from 'antd'
import {Header} from '../Home'
import './styles.css'
import { useHistory } from 'react-router-dom'
import api from '../../../services/api'

export default function NovoAdm(){
    const [nome, setNome] = useState('')
    const [login, setLogin] = useState('')
    const [senha, setSenha] = useState('')

    const history = useHistory()
    async function CriarAdm(){
        try{
            await api.post('adm', {
                nome,
                login,
                senha
            })
            history.push('/adm')
        }catch(err){
            message.error('Não foi possível adicionar o novo ADM, tente novamente mais tarde.')
        }
    }

    return(
        <div>
            <Header />
            <div className="cadastro-adm">
                <h1>Cadastrar novo ADM</h1>
                <form onSubmit={CriarAdm}>
                    <input 
                        placeholder="Nome do ADM"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />
                    <input 
                        placeholder="Nome de Login"
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                    />
                    <button>GERAR ADM</button>
                </form>
            </div>
        </div>
    )
}