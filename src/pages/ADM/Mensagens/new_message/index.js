import React, { useState, useEffect } from 'react';
import { message } from 'antd'
import './styles.css';
import { api_admin } from '../../../../services/api';
import { useHistory } from 'react-router-dom';

export default function NewMessage(){
    const token = localStorage.getItem('Token')
    const admin_id = localStorage.getItem('admin_id')
    const [categorias, setCategorias] = useState([])
    const [title, setTitle] = useState("")
    const [class_id, setCategoria] = useState("")
    const [body, setBody] = useState("")

    const history = useHistory()

    async function set_categorias(){
        try{
            const response = await api_admin.get('/categorias', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if(response.status == 200){
                setCategorias(response.data)
            }else{
                message.error("Houve um problema para importar algumas categorias")
                history.push("/adm")
            }
        }catch(err){
            message.error("Houve um problema de conexão, tente novamente mais tarde")
            history.push("/adm")
        }
    }

    useEffect(() => {
        set_categorias()
    }, [])

    async function handleSubmit(e){
        e.preventDefault();
        try{
            
            let response = await api_admin.post('/messages', {
                title,
                body,
                admin_id,
                class_id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if(response.status == 200){
                message.success('Mensagem criado')
                history.push('/adm')
            }else{
                message.error('Verifique os dados e tente novamente')
            }
        }catch(err){
            message.error("Não foi possível adicionar, tente novamente mais tarde.")
            history.push('/adm')
        }
    }

    return(
        <form onSubmit={handleSubmit} className="form_new_message">
            <h1>Adicione uma mensagem</h1>
            <input
                placeholder="Título" 
                value={title}
                onChange={e => setTitle(e.target.value)}    
            />
            <select 
                placeholder="Categoria"
                onChange={e => setCategoria(e.target.value)}
                defaultValue=""
            >
                {categorias.map(categoria => (
                    <option value={categoria.id}>{categoria.label}</option>
                ))}
            </select>
            <textarea
                style={{resize: "vertical"}}
                placeholder="Descrição"
                value = {body}
                onChange={e => setBody(e.target.value)}
            ></textarea>
            
            <button type="submit">ENVIAR</button>
        </form>
    );
}