/* eslint-disable no-console */
import React, {useEffect} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import ReactPlayer from 'react-player';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"

import {loadTheStylesContentful} from "../../state/ducks/TheStyles/TheStyles-Actions";
import {
    getStyles,
    getTheStylesSectionDescription,
    getTheStylesSectionHeroImage,
    getTheStylesSectionTitle
} from "../../state/ducks/TheStyles/TheStyles-Selectors";

import '../../assets/css/style.scss';
import '../../assets/css/style-responsive.scss';
import './theStyles.scss';
import './theStyles-responsive.scss';
import arrowLeftIcon from '../../assets/images/arrow-left-1.svg';
import arrowRightIcon from '../../assets/images/arrow-right-1.svg';

const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <>
            <div className="slick-arrow right" onClick={onClick}>
                <img src={arrowLeftIcon}></img>
            </div>
        </>
    );
};
const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <>
            <div className="slick-arrow left" onClick={onClick}>
                <img src={arrowRightIcon}></img>
            </div>
        </>
    );
};

const TheStyles = ({
                       title,
                       description,
                       heroImage,
                       styles,
                       loadDataFromContentful
                   }) => {

    const slickSettings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    dots: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    dots: true
                }
            }
        ],
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    useEffect(() => {
        loadDataFromContentful({});
    }, []);

    if (!title && !description && !heroImage) {
        return <div/>;
    }

    return (
        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
            <div className="banner-section">
                <div className="banner-image">
                    <img className="d-block w-100" src={heroImage} alt="Banner"/>
                </div>
            </div>
            <div className="middle-section">
                <div className="book-appointment-section">
                    <div className="row">
                        <h1>{title.toUpperCase()}</h1>
                        <p>{description}</p>
                        <button className="btn-common btn-yellow btn-lg font-weight-bold responsive-500-w-100">
                            Book an Appointment
                        </button>
                    </div>

                    <div className="slider-row">
                        <Slider {...slickSettings}>
                            {styles.map((style, index) => {
                                return <div className="appointment-item" key={'appointment_' + index}>
                                    <div className="content">
                                        <img src={style.featuredImage} alt="style"/>
                                        <div className="mask">
                                            <span className="overlay">{style.title}</span>
                                        </div>
                                    </div>
                                </div>;
                            })}
                        </Slider>
                    </div>
                    {styles.map((style, index) => {
                        return <div className="book-styling-section secondary" key={index}>
                            <div className="row">
                                <div className="text-section">
                                    <div className="yellow-bar-title">
                                        <span className="yellow-bar"></span>
                                        <h3>{style.title}</h3>
                                    </div>
                                    
                                    <p>{style.subtitle}</p>
                                    <button
                                        className="btn-common btn-yellow btn-lg font-weight-bold responsive-500-w-100">Book
                                        This Style
                                    </button>
                                </div>
                                <div className="video-section">
                                    <div className="video-wrapper">
                                        <ReactPlayer url={style.featuredVideo}
                                                     className='video-player'
                                                     width='756px'
                                                     height='399px'/>
                                    </div>
                                </div>
                            </div>

                            <div className="slider-row">
                                <Slider {...slickSettings}>
                                    {style.gallery.images.map((image, index) => {
                                        return <div className="style-item" key={index}>
                                            <div className="content">
                                                <img src={image} alt="style"/>
                                                <div className="mask">
                                                    <button
                                                        className="btn-white-trans btn-common w-100 responsive-500-w-100">
                                                        Show This Model
                                                    </button>
                                                </div>
                                            </div>
                                        </div>;
                                    })}
                                </Slider>
                            </div>

                        </div>;
                    })}
                </div>
                <div className="gradient-bottom-decorator"/>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    title: getTheStylesSectionTitle(state),
    description: getTheStylesSectionDescription(state),
    heroImage: getTheStylesSectionHeroImage(state),
    styles: getStyles(state)
});

const mapDispatchToProps = (dispatch) => ({
    loadDataFromContentful: bindActionCreators(loadTheStylesContentful, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TheStyles);

