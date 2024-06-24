import React, { useState, useEffect, useRef } from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ChevronRight, ChevronLeft } from 'react-bootstrap-icons';
import engineering from '../../../../assets/images/engineering.png';

function CourseLibrary({ filteredCareerData, title, courseDetails }) {
    const sliderRef = useRef(null);
    const [prevArrowDisplay, setPrevArrowDisplay] = useState('none');
    const [nextArrowDisplay, setNextArrowDisplay] = useState('block');

    const arrowStyle = {
        position: 'absolute',
        top: '45%',
        transform: 'translateY(-50%)',
        fontSize: '24px',
        cursor: 'pointer',
        color: '#333',
        marginRight: '15px',
    };

    const prevArrowStyle = {
        ...arrowStyle,
        left: '12px',
        zIndex: 999,
        display: prevArrowDisplay,
    };

    const nextArrowStyle = {
        ...arrowStyle,
        right: '5px',
        zIndex: 999,
        display: nextArrowDisplay,
    };

    const PrevArrow = ({ onClick }) => (
        <div style={prevArrowStyle} className="moredetail-icon" onClick={onClick}>
            <ChevronLeft style={{ color: '#FFFFFF' }} />
        </div>
    );

    const NextArrow = ({ onClick }) => (
        <div style={nextArrowStyle} className="moredetail-icon" onClick={onClick}>
            <ChevronRight style={{ color: '#FFFFFF' }} />
        </div>
    );

    const sliderSettings = {

        infinite: false,
        speed: 500,
        slidesToScroll: 1,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        beforeChange: (oldIndex, newIndex) => handleSlideChange(newIndex),
        responsive: [
            {
                breakpoint: 2400,
                settings: {
                    slidesToShow: 2,
                    dots: true,
                },
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    dots: true,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    dots: true,
                },
            },
            {
                breakpoint: 769,
                settings: {
                    arrows: true,
                    slidesToShow: 1.5,
                    dots: true,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: true,
                    slidesToShow: 1,
                    dots: true,
                },
            },
        ],

    };

    const handleSlideChange = (currentIndex) => {
        const totalSlides = sliderRef.current.innerSlider.state.slideCount || 0;
        setPrevArrowDisplay(currentIndex === 0 ? 'none' : 'block');
        setNextArrowDisplay(currentIndex === totalSlides - 2 ? 'none' : 'block');
    };

    return (
        <div>
            <section className="container">
                {courseDetails && filteredCareerData?.length > 0 ? (
                    <div className="enginnering-career-detail">
                        <div className="text-center col-md-3">
                            <img src={filteredCareerData[0].image || engineering} alt="enginnering-img" />
                        </div>
                        <div className="col-md-9">
                            <heading>{title}</heading>
                            <p>{courseDetails.desc}</p>
                        </div>
                    </div>
                ) : (
                    <p>No data available for the selected title.</p>
                )}
            </section>
            {courseDetails && courseDetails.videoarr?.length > 0 && (
                <section className="engineering-videos container">
                    <div className="row">
                        <heading><b>Success stories</b> of {title.toLowerCase()}</heading>
                        <Slider ref={sliderRef} {...sliderSettings}>
                            {courseDetails.videoarr.map((video, index) => (
                                <div className="custom-slide" key={index} style={{ width: '70%' }}>
                                    <div className="col-md-6 col-12 embed-responsive embed-responsive-16by9" style={{ width: '90%' }}>
                                        <iframe className="embed-responsive-item" src={`https://www.youtube.com/embed/${video}`} title="YouTube video player" allowFullScreen />
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </section>
            )}


        </div>
    )
}

export default CourseLibrary
