import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Carousel, Button, Icon, message } from 'antd'
import logo_CASD from '../../../imagens/logo_CASD.png';
import logo from '../../../imagens/logo.png';
import CASDvest from '../../../imagens/CASDvest_logo.png'
import img_alunos from '../../../imagens/img_alunos.jpg'
import img_sala_aula from '../../../imagens/img_sala_aula.jpg'
import './styles.css';
import { api_admin } from '../../../services/api';
import { Component } from 'react';
import "antd/dist/antd.css";
import { FormComponentProps } from "antd/lib/form";

export default class Header_Page extends Component{
    constructor(props:FormComponentProps) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.carousel = React.createRef();
    }
    next() {
        this.carousel.next();
    }
    previous() {
        this.carousel.prev();
    }
    state={
        visibleModal:false,
        list_carousel: [img_alunos, img_sala_aula]
    }
    render(){
        const props = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return(
            <div className="header_page_container">
                <Header />
                {/* <CarouselComponent className="CarouselComponent"/> */}
                <div className = "content-carousel">
                    <div className="carousel">
                        <Carousel autoplay ref={node => (this.carousel = node)} {...props} className="carousel-container">
                            {this.state.list_carousel.map((imgUrl)=>{
                                if(imgUrl!="" && imgUrl != undefined && imgUrl != null){
                                    return <img src={imgUrl} alt="imagem palestra" key="0"/>
                                }
                            })}
                        </Carousel>
                        <Icon type="left" onClick={this.previous} className="prevPicture"/>
                        <Icon type="right" onClick={this.next} className="nextPicture"/>
                    </div>
                    <div className="text_container">
                        <section className="text_casdinho">
                            <span>
                                Nós somos o CASDinho e essa é nossa missão
                            </span>
                            <span>
                                Vamos mudar o mundo por meio da educação
                            </span>
                            <span>
                                Somos uma família capaz de transformar
                            </span>
                            <span>
                                Potencial em movimento e nunca mais parar
                            </span>
                            <span>
                                Bora CASDinho!
                            </span>
                        </section>
                        <section className="text_casdvest">
                            <span>
                                É CASD, é CASD, é CASD CASDVEST
                            </span>
                            <span>
                                Vamos mudar o mundo por meio da educação
                            </span>
                            <span>
                                Somos uma família capaz de transformar
                            </span>
                            <span>
                                Potencial em movimento e nunca mais parar
                            </span>
                            <span>
                                Bora CASDVest!
                            </span>
                        </section>
                    </div>
                    
                </div>    
            </div>
            
        )
    }
    
}

export function Header(){
    const history = useHistory();
    const [name, setName] = useState("")

    async function handleLogoff(e){
        e.preventDefault();
        try{
            let token = localStorage.getItem("Token")
            const response = await api_admin.delete('logout', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if(response.status == 200){
                localStorage.clear();
                history.push('/');
            }else{
                message.error('Houve um erro, tente novamente mais tarde');
                localStorage.clear();
                history.push('/');
            }
        }catch(err){
            message.error('Infelizmente a conexão falhou no momento, tente novamente mais tarde.')
            localStorage.clear();
            history.push('/');
        }
    }

    async function checkValid(){
        try{
            let name_local = localStorage.getItem('name')
            setName(name_local)
        }catch(err){
            history.push('/')
            message.error("Não foi possível identificar o usuário.")
        }
    }

    useEffect(() => {
        checkValid()
    },[])
    return(
        <div className="header-container-adm">
            <section className="header-content-adm">
                <img src={logo_CASD} alt="logo CASD"/>
                <img src={logo} alt="logo" id="imglogo-adm"/>
                <img src={CASDvest} alt="casdvest_logo" id="casdvest_logo" />
                <button type="button" onClick={handleLogoff}>SAIR</button>
            </section>
            <header className="indice-adm">
                <Link to="/adm">
                    HOME
                </Link>
                <Link to="/adm/boletim">
                    BOLETIM
                </Link>
                <Link to="/adm/eventos">
                    EVENTOS
                </Link>
                <Link to="/adm/mensagens">
                    MENSAGENS
                </Link>
                <Link to="/adm/novoestudante">
                    CADASTRO ALUNO
                </Link>
                <Link to="/adm/lista">
                    LISTA DOS ALUNOS
                </Link>
                <Link to="/adm/novoadm">
                    CRIAR ADM
                </Link>
            </header>
            <h2>Olá {name}, seja bem vindo!</h2>

        </div>
    );
}
