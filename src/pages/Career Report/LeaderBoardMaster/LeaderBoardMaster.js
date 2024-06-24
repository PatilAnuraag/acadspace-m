import React, { useEffect, useState } from 'react';
import { handleDynamicRequestHeader } from '../../../components/common/DyanamicRequest';
import { BASE_URL } from '../../../components/common/AppConfig';
import { useSelector } from 'react-redux';
import leadership_icon1 from '../../../assets/images/leadership-icon.png'
import leadership_icon2 from '../../../assets/images/leadership-icon1.png'
import leadership_icon3 from '../../../assets/images/leadership-icon2.png'
import webinar1 from '../../../assets/images/webinar1.png'
import webinar2 from '../../../assets/images/webinar2.png'
import webinar3 from '../../../assets/images/webinar3.png'
import webinar4 from '../../../assets/images/webinar4.png'
import { ArrowDownSquare, ArrowDown, ArrowUp } from 'react-bootstrap-icons';
function LeaderBoardMaster({ careerData, careerOptions }) {
    const [board, setBoardData] = useState({ development: [] });
    const [boardId, setBoardId] = useState('');
    const [webinarData, setWebinarData] = useState([]);
    const [alertMessage, setAlertMessage] = useState({ success: '', error: '' });
    const userToken = useSelector((state) => state.roleReducer.jwtToken);
    useEffect(() => {
        if (careerData) {
            setBoardData(careerData);
            if (careerData && careerData.development?.length > 0) {
                setBoardId(careerData.development[0]._id);
            }

        }
    }, [careerData, webinarData, careerOptions]);


    const handleWorkShop = async () => {
        if (boardId) {
            const requestBody = { _id: boardId };
            const method = 'POST';
            const url = `${BASE_URL}/mobile/getDevAreaSpecificWebiners`;
            const token = userToken;
            const wrongResponse = () => {
                setAlertMessage({ success: '', error: 'Something went wrong' });
            }
            const rightResponse = (data) => {
                setWebinarData(data);
            }
            handleDynamicRequestHeader(method, url, requestBody, token, wrongResponse, rightResponse);
        }
    }

    useEffect(() => {
        handleWorkShop();
    }, [boardId])
    const [showAll, setShowAll] = useState(false);
    const [visibleTabs, setVisibleTabs] = useState(5);

    const handleShowMore = () => {
        setShowAll(!showAll);
        setVisibleTabs(showAll ? 5 : board.development.length);
    };

    return (
        <>
            {board && board.development?.length > 0 && (
                <div className="development-areas">
                    <div className="row">
                        <div className="section-header mb-4  justify-content-md-between align-items-md-center">
                            <h2><span>Your development areas </span>{careerOptions}
                            </h2>
                            <p className="heading-para">This is designed to support your development as per your career report</p>
                        </div>
                        <div className="tab-content-development">
                            <div className="row">
                                <div className="col-lg-3 col-md-3 col-12 padding-left-right0">
                                    <div className="nav flex-column nav-tabs" id="v-tabs-tab" role="tablist" aria-orientation="vertical">
                                        {board.development?.slice(0, visibleTabs).map((tab, index) => (
                                            <a
                                                key={index}
                                                className={`nav-link ${index === 0 ? 'active' : ''}`}
                                                id={`v-tabs-${tab._id}-tab`}
                                                data-bs-toggle="tab"
                                                href={`#v-tabs-${tab._id}`}
                                                role="tab"
                                                aria-controls={`v-tabs-${tab._id}`}
                                                aria-selected={tab._id}
                                                style={{ color: 'black' }}
                                                onClick={() => setBoardId(tab._id)}
                                            >
                                                <img src={tab.imgSrc || leadership_icon1} alt="" /> {tab.name}
                                            </a>
                                        ))}
                                    </div>
                                    {board.development.length > 5 && (

                                        <>

                                            <p className='show-more-less' onClick={handleShowMore}>{showAll ? 'Show Less' : 'Show More'}
                                                {!showAll && (
                                                    <ArrowDown />
                                                )}
                                                {showAll && (
                                                    <ArrowUp />
                                                )}
                                            </p>
                                        </>
                                    )}
                                </div>

                                <div className="col-lg-9 col-md-9 col-12">
                                    <div className="tab-content" id="v-tabs-tabContent">
                                        {board.development?.map((tab, index) => (
                                            <div key={index} className={`tab-pane fade ${index === 0 ? 'show active' : ''}`} id={`v-tabs-${tab._id}`} role="tabpanel" aria-labelledby={`v-tabs-${tab._id}-tab`}>
                                                <div className="tab-content-development-inner">
                                                    <h2><strong>Webinars, courses and workshops</strong> curated for you</h2>
                                                    {webinarData && webinarData.webinar?.length > 0 ? (
                                                        <div id={`leadership-${tab._id}`} className="carousel slide" data-bs-ride="carousel">
                                                            <div className="carousel-indicators">
                                                                {webinarData && webinarData.webiners?.map((_, idx) => (
                                                                    <button
                                                                        key={idx}
                                                                        type="button"
                                                                        data-bs-target={`#leadership-${tab._id}`}
                                                                        data-bs-slide-to={idx}
                                                                        className={idx === 0 ? 'active' : ''}
                                                                    ></button>
                                                                ))}
                                                            </div>

                                                            <div className="carousel-inner">
                                                                {webinarData && webinarData.webiners?.map((carouselItem, idx) => (
                                                                    <div key={idx} className={`carousel-item ${idx === 0 ? 'active' : ''}`}>
                                                                        <div className="row">
                                                                            {carouselItem.map((item, itemIndex) => (
                                                                                <div key={itemIndex} className="col-lg-6 col-md-12 col-12">
                                                                                    <div className="leadership-slide">
                                                                                        <img src={item.WebinerPic} alt="" />
                                                                                        <h3>{item.WebinerName}</h3>
                                                                                        <p>{item.lectureBy}</p>
                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <button className="carousel-control-prev" type="button" data-bs-target={`#leadership-${tab._id}`} data-bs-slide="prev">
                                                                <span className="carousel-control-prev-icon"></span>
                                                            </button>
                                                            <button className="carousel-control-next" type="button" data-bs-target={`#leadership-${tab._id}`} data-bs-slide="next">
                                                                <span className="carousel-control-next-icon"></span>
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div style={{ height: "100%", marginTop: "40%" }} className="tab-content-development-inner d-flex justify-content-center align-items-center">Currently No Webinars not Available</div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default LeaderBoardMaster


