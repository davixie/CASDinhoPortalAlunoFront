import React, { useEffect, useState } from 'react';
import { message } from 'antd'
import './styles.css';
import Header from '../Header/index';
import { useHistory } from 'react-router-dom';
import api from '../../../services/api';

export default function Home(){
    const [aluno, setAluno] = useState({})
    const [show, setShow] = useState(false)
    const [senha, setSenha] = useState("")
    const [newSenha, setNewSenha] = useState("")
    const id = localStorage.getItem('StudentId')
    const history = useHistory()
    
    async function selecionarAluno(){
        try{
            await api.get('/studentspecific', {
                headers: {
                    Authorization: id
                }
            }).then(resposta => {
                setAluno(resposta.data)
            })
        }catch(err){
            message.error("Não foi possível enconntrar o aluno.")
            history.push('/')
        }
    }
    
    useEffect(() => {
        selecionarAluno();
    }, [])

    function abrirForm() {
        if (show === true) {
            setShow(false)
        } else {
            setShow(true)
        }
    }

    function confirmPassword(senha){
        if (aluno.senha === senha) {
            return 0
        } else {
            return 1
        }
    }

    async function changePassword(oldPassword, newPassword){
        let auth = confirmPassword(oldPassword)
        if (auth === 0){
            try{
                await api.post('/student/upgrade', {
                    id,
                    newPassword
                }).catch(err => console.log(err))

                history.push('/profile')
            }catch(err){
                throw(err)
            }
        } else {
            console.log('aqui entrei')
            message.error("Senha antiga não correspondente.")
        }
    }

    return(
        <div className="home-container">
            <Header />
            <div className="content">
                <h2>Seja bem vindo, {aluno.nome}</h2>
                {
                    show ?
                    <form className="changePassword" onSubmit={() => changePassword(senha, newSenha)}>
                        <input
                            type="password"
                            placeholder="Sua senha atual" 
                            value={senha}
                            onChange={e => setSenha(e.target.value)}    
                        />
                        <input
                            type="password"
                            placeholder="Nova Senha"
                            value={newSenha}
                            onChange={e => setNewSenha(e.target.value)}    
                        />
                        <div>
                            <button onClick={abrirForm}>Fechar</button>
                            <button>ALTERAR</button>
                        </div>
                        
                    </form> : <button onClick={abrirForm}>Alterar senha</button>
                }
            </div>
            
        </div>
    );
}