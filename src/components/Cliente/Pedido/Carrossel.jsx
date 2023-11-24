import style from "./Carrossel.module.css"
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Carrossel({ children }) {

    const settings = {
        dots: false,
        infinite: false,
        speed: 400,
        variableWidth: true,
        adaptiveHeight: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div>
            <Slider {...settings}>
                {children}
            </Slider>
        </div>
    )
}

export default Carrossel;