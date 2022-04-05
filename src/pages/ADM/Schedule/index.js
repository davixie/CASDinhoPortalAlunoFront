import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {Header} from '../Home/index';
import { message } from 'antd'

import { api_admin } from '../../../services/api';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import './styles.css';

export default function SetSchedule(){
    const history = useHistory();
    const token = localStorage.getItem('Token')

    const props = {
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange({ file, fileList }) {
            if (file.status !== 'uploading') {
                setFile(file)
                console.log(file, fileList);
            }
        },
        defaultFileList: [],
    };

    const [classes, setClasses] = useState([])
    const [file_, setFile] = useState({})
    const [id, setId] = useState(1)

    async function get_classes(){
        try{
            let response = await api_admin.get('classes', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setClasses(response.data)
        } catch(err){
            message.error("Infelizmente houve um erro para carregar alguns dados, tente novamente mais tarde")
            history.push("/adm")
        } 
    }

    useEffect(() => {
        get_classes()
    }, [])

    async function handleSubmit(e){
        e.preventDefault();
        try{
            console.log("aqui temos", props.defaultFileList)
            let form_data = new FormData();
            form_data.append("file", file_)

            let response = await api_admin.patch('classes/' + id + '/schedule', form_data,{
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })

            if(response.status == 200){
                message.success('Horário enviado.')
            }else{
                message.error("Houve um erro, tente novamente mais tarde")
            }

        }catch(error){
            console.log(error)
            message.error("Houve um erro, tente novamente mais tarde")
            history.push("/adm")
        }
    }

    return(
        <div>
            <Header />
            <section className="setboletim-container">
                <form onSubmit={handleSubmit}>
                    <h1>Envie um horário de aula</h1>
                    <section className="selection">
                        <h3>Selecione a turma:</h3>
                        <select
                            onChange={e => setId(e.target.value)}>
                            {classes.map(class_ => (
                                <option value={class_.id}>{class_.name}</option>
                            ))}
                        </select>
                    </section>
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />} className="carregar_button">Carregar</Button>
                    </Upload>
                    <button type="submit">ENVIAR</button>
                </form>
            </section>
        </div>
    );
}