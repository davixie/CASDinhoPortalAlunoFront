import React, { Component } from "react";
import { Carousel, Icon } from "antd";
import img_alunos from '../../imagens/img_alunos.jpg'
import img_sala_aula from '../../imagens/img_sala_aula.jpg'
import './styles.css';
import CarouselImage from './carouselimage'

export default class CarouselComponent extends Component {
  state = {
    carousel: [],
  }

  componentDidMount = () => {
    this.setState({carousel: [img_alunos, img_sala_aula]})
  }

  constructor(props) {
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

  render() {
    const props = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div>
        <Carousel autoplay ref={node => (this.carousel = node)} {...props}>
            { this.state.carousel.length > 0 ? 
              this.state.carousel.map((image, index) => <CarouselImage image={image} index={index}/>)
             : <h1></h1>}
        </Carousel>
        <Icon type="left" onClick={this.previous} className="prev"/>
        <Icon type="right" onClick={this.next} className="next"/>
      </div>
    );
  }
}