import React, { Component } from 'react'
import ImgError from '../../imagens/error404.png'
import './styles.css'

export default class Error404 extends Component{
    render(){
        return(
            <div className="error404-container">
                <h1>ERRO 404</h1>
                <img src={ImgError} alt="imagem de erro"/>
                <h2>Infelizmente, não conseguimos encontrar essa página</h2>
            </div>
        )
    }
}