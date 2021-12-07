import React, { useEffect, useState } from 'react'
import './styles.css';
import { message } from 'antd'
import {Header} from '../../Home/index';
import { api_admin } from '../../../../services/api';
import { useHistory } from 'react-router';

export default function Alunos(){
    const[alunos, setAlunos] = useState([])
    const token = localStorage.getItem("Token")
    const history = useHistory()

    async function get_all_students(){
        try{
            let response = await api_admin.get('/students', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if(response.status == 200){
                setAlunos(response.data)
            }else{
                message.error('Não foi possível listar os alunos')
                history.push("/adm")
            }
        }catch(err){
            message.error('Houve erro de conexão, tente novamente mais tarde')
            history.push("/adm")
        }
    }

    useEffect(() => {
        get_all_students()
    }, [])

    return(
        <div>
            <Header />
            
            <div className="alunos-students">
                <h1>TODOS OS ALUNOS</h1>
                <table>
                    <tr className="title">
                        <td>ID</td>
                        <td>Nome</td>
                        <td>Sobrenome</td>
                        <td>Email</td>
                        <td>Usuário</td>
                        <td>Aniversário</td>
                        <td>Senha</td>
                    </tr>
                    {alunos.map(aluno => (
                        <tr>
                            <td>{aluno.id}</td>
                            <td>{aluno.first_name}</td>
                            <td>{aluno.last_name}</td>
                            <td>{aluno.email}</td>
                            <td>{aluno.username}</td>
                            <td>{aluno.birthday}</td>
                            <td>{aluno.password}</td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    );
}