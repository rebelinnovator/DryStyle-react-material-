/* eslint-disable no-console */
import React, {useEffect} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import ReactPlayer from 'react-player'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"

import enlargeIcon from '../../assets/images/ic-enlarge.png';

import {loadDryStylingContentful} from "../../state/ducks/DryStyling/Dry-Styling-Actions";

import '../../assets/css/style.scss';
import '../../assets/css/style-responsive.scss';
import './dry-styling.scss';
import {
    getDryStylingSectionAction,
    getDryStylingSectionDescription, getDryStylingSectionFeaturedVideo,
    getDryStylingSectionHeroImage, getDryStylingSectionImages, getDryStylingSectionPromo, getDryStylingSectionSubTitle,
    getDryStylingSectionTitle
} from "../../state/ducks/DryStyling/Dry-Styling-Selectors";
import {parsedJSON2Html} from "../../state/utils/contentful";

const DryStyling = ({
                        action,
                        title,
                        subtitle,
                        description,
                        heroImage,
                        featuredVideo,
                        images,
                        promo,
                        loadDataFromContentful
                    }) => {
    useEffect(() => {
        loadDataFromContentful({});
    }, []);

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
        ]
    };

    if (!title && !subtitle && !description) {
        return <div/>;
    }
    return (
        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
            <div className="banner-section">
                <div className="banner-image">
                    <img className="d-block w-100" src={heroImage} alt="Banner"/>
                </div>
            </div>
            <div className="middle-section bg-light">
                <div className="book-styling-section">
                    <div className="row">
                        <div className="text-section">
                            <h3>{title}</h3>
                            <span>{subtitle}</span>
                            <p dangerouslySetInnerHTML={{__html: parsedJSON2Html(description)}}/>
                            <button
                                className="btn-common btn-yellow btn-lg font-weight-bold responsive-500-w-100">{action.title}</button>
                        </div>
                        <div className="video-section">
                            <div className="video-wrapper">
                                <ReactPlayer url={featuredVideo}
                                             className='video-player'
                                             width='756px'
                                             height='399px'/>
                            </div>
                        </div>
                    </div>

                    <div className="slider-row">
                        <Slider {...slickSettings}>
                            {images.map((image, index) => {
                                return <div className="style-item" key={index}>
                                    <div className="content">
                                        <img src={image} alt="style"/>
                                        <div className="mask">
                                            <img className="enlarge-icon" src={enlargeIcon} alt="Enlarge Icon"
                                                 onClick={() => {
                                                 }}/>
                                        </div>
                                    </div>
                                </div>;
                            })}
                        </Slider>
                    </div>

                </div>
            </div>

            <div className="banner-section">
                <div className="banner-image">
                    <img className="d-block w-100" src={promo.image} alt="Banner"/>
                </div>
            </div>
            <div className="d-flex justify-content-center shop-all-kits">
                <a href={promo.action.link}>
                    <button
                        className="btn-gray-trans btn-common btn-lg responsive-500-w-100">{promo.action.title}</button>
                </a>
            </div>
            <div className="gradient-bottom-decorator"/>
        </div>
    );
};

const mapStateToProps = (state) => ({
    title: getDryStylingSectionTitle(state),
    subtitle: getDryStylingSectionSubTitle(state),
    description: getDryStylingSectionDescription(state),
    featuredVideo: getDryStylingSectionFeaturedVideo(state),
    heroImage: getDryStylingSectionHeroImage(state),
    images: getDryStylingSectionImages(state),
    action: getDryStylingSectionAction(state),
    promo: getDryStylingSectionPromo(state),
});

const mapDispatchToProps = (dispatch) => ({
    loadDataFromContentful: bindActionCreators(loadDryStylingContentful, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DryStyling);
