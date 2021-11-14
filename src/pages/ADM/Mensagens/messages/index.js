import React, { useState, useEffect } from 'react';
import Message from '../message/index'
import './styles.css';
import { useHistory } from 'react-router-dom';
import { message } from 'antd';
import { api_admin } from '../../../../services/api'
import Pages from '../../../../components/pagination/index'

export default function Messages(){
    const token = localStorage.getItem('Token')
    const [messages, setMessages] = useState([])
//    const admin_id = localStorage.getItem('admin_id')

    const [currentPage, setCurrentPage] = useState(1)
    const messagesPerPage = 5

    const history = useHistory()

    async function get_messages(){
        try{
            let response = await api_admin.get("messages", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if(response.status == 200){
                setMessages(response.data)
            } else{
                message.error("Houve um erro na busca das mensagens")
                history.push("/adm")
            }
        }catch(err){
            message.error("Erro de conexão, tente novamente mais tarde.")
        }
    }

    useEffect(() => {
        get_messages()
    }, [])

    function paginate(pageNumber){
        setCurrentPage(pageNumber)
    };

    const indexOfLastMessage = currentPage * messagesPerPage;
    const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
    const currentMessages = messages.slice(indexOfFirstMessage, indexOfLastMessage);

    return(
        <div className="messages-container">
            <h2>Lista de Mensagens</h2>
            <ul>
                {currentMessages.map(message => {
                    //console.log(message)
                    return (<Message message_obj={message}/>)
                })}
            </ul>
            <Pages itensPerPage={messagesPerPage} totalItens={messages.length} paginate={paginate}/>
        </div>
    );
}