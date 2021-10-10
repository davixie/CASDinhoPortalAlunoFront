import React from 'react';
import './styles.css';

const CarouselImage = (props) => 
{   
    return (
        <div >
            <img src={props.image} className="Img" alt="Imagem Banner"/>
        </div>
    )
}
export default CarouselImage;