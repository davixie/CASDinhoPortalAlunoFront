import React, { useState } from 'react'
import { message } from 'antd'
import {Header} from '../Home'
import './styles.css'
import { useHistory } from 'react-router-dom'
import { api_admin } from '../../../services/api'

export default function NovoAdm(){
    const [first_name, setFirstNome] = useState('')
    const [last_name, setSecondNome] = useState('')
    const [username, setLogin] = useState('')
    const [password, setSenha] = useState('')

    const history = useHistory()
    async function CriarAdm(e){
        e.preventDefault()
        try{
            let token = localStorage.getItem('Token')
            let response = await api_admin.post('/', {
                first_name,
                last_name,
                password,
                username
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if(response.status == 200){
                message.success('ADM criado com sucesso');
                history.push('/adm')
            } else{
                message.error('Infelizmente, você não tem permissão para criar admin. Converse com um colaborador para liberar.');
                history.push('/adm')
            }
            
        }catch(err){
            message.error('Não foi possível adicionar o novo ADM, tente novamente mais tarde.')
            history.push('/adm')
        }
    }

    return(
        <div>
            <Header />
            <div className="cadastro-adm">
                <h1>Cadastrar novo ADM</h1>
                <form onSubmit={CriarAdm}>
                    <input 
                        placeholder="Nome"
                        value={first_name}
                        onChange={e => setFirstNome(e.target.value)}
                    />
                    <input 
                        placeholder="Sobrenome"
                        value={last_name}
                        onChange={e => setSecondNome(e.target.value)}
                    />
                    <input 
                        placeholder="Usuário"
                        value={username}
                        onChange={e => setLogin(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={e => setSenha(e.target.value)}
                    />
                    <button type="submit">CRIAR ADM</button>
                </form>
            </div>
        </div>
    )
}