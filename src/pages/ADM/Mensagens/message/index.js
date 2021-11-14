import React, { useState, useEffect } from 'react';
import { message, Modal } from 'antd'
import {PushpinOutlined, DeleteOutlined} from '@ant-design/icons'
import './styles.css';
import {api_admin} from '../../../../services/api'
import { useHistory } from 'react-router-dom';

export default function Message(message_obj){
    const token = localStorage.getItem('Token')
    let fix_sentence = ""
    if(message_obj.message_obj.pin == true){
        fix_sentence = "Desafixar"
    }else{
        fix_sentence = "Fixar"
    }
    const [del_visible, setDelVisible] = useState(false)
    const [fix_visible, setFixVisible] = useState(false)
//    const admin_id = localStorage.getItem('admin_id')
    const history = useHistory()

    async function deletar(id){
        try{
            const response = await api_admin.delete(`/messages/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if(response.status == 200){
                window.location.reload()
            }else{
                message.error("Ação inconcluída. Tente novamente mais tarde")
            }
        }catch(err){
            message.error("Erro de conexão. Tente novamente mais tarde")
        }
        setDelVisible(false)
    }

    async function fix(id){
        try{
            const response = await api_admin.patch(`/messages/${id}/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if(response.status == 200){
                window.location.reload()
            }else{
                message.error("Ação inconcluída. Tente novamente mais tarde")
            }
        }catch(err){
            message.error("Erro de conexão. Tente novamente mais tarde")
        }
        setFixVisible(false)
    }

    return(
        <div className="message-container">
            <div className="div_bar"></div>
            <section>
                <div className="text-container">
                    {(message_obj.message_obj.title.length > 31) ? 
                        <h3>{message_obj.message_obj.title.slice(0, 30) + "..."}</h3>
                    : <h3>{message_obj.message_obj.title}</h3>}
                </div>
                <div className="icons-container">
                    {(message_obj.message_obj.pin ? 
                        <span onClick={() => {
                            setFixVisible(true)
                        }}>Fixado</span>
                    : <PushpinOutlined style={{fontSize: '20px', color: '#000'}} 
                        onClick={() => {
                            setFixVisible(true)
                    }}/>)}
                    <DeleteOutlined style={{marginLeft: '20px', fontSize: '20px', color: '#000'}}
                        onClick={() => {
                            setDelVisible(true)
                    }}/>
                </div>
            </section>
            
            <Modal
                title="Deletar Palestra"
                visible={del_visible}
                onOk={() => deletar(message_obj.message_obj.id)}
                onCancel={() => setDelVisible(false)}
            >
                <p>Deseja realmente excluir essa palestra?</p>
                <p>"{message_obj.message_obj.title}" será excluído.</p>
                <p>Deseja continuar?</p>
            </Modal>
            <Modal
                title={`${fix_sentence} Mensagem`}
                visible={fix_visible}
                onOk={() => fix(message_obj.message_obj.id)}
                onCancel={() => setFixVisible(false)}
            >
                <p>Deseja realmente {fix_sentence} a mensagem "{message_obj.message_obj.title}"?</p>
                <p>Deseja continuar?</p>
            </Modal>
        </div>
    );
}