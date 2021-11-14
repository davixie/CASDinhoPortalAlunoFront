import React, { useState } from 'react';
import './styles.css';
import {Header} from '../Home/index';
import { useHistory } from 'react-router-dom';
import Messages from './messages';
import NewMessage from './new_message/index'

export default function SetMensagensAdmin(){
    const token = localStorage.getItem('Token')
    const history = useHistory()

    return(
        <div>
            <Header/>
            <section className="setcasdindin-container">
                <Messages />
                <div className="divbar"></div>
                <NewMessage />
            </section>
        </div>
    );
}