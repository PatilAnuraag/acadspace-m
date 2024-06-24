import React, { useState, useEffect } from 'react'
import { BASE_URL } from '../../../components/common/AppConfig';
import { handleDynamicRequestHeader } from '../../../components/common/DyanamicRequest';
import { ChevronRight } from 'react-bootstrap-icons';
import users from '../../../assets/images/users.png'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setActiveLink } from '../../../store/Link/action';
import { setWebinar } from '../../../store/Career/action';

function WebinarMaster({ displayCount }) {
    const [alertMessage, setAlertMessage] = useState({ success: '', error: '' });
    const [webinarData, setwebninarData] = useState([]);
    const userToken = useSelector((state) => state.roleReducer.jwtToken);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fetchWebinarData = async () => {
        const requestBody = {};
        const method = 'POST';
        const url = `${BASE_URL}/mobile/getAllWebiners`;
        const token = `${userToken}`;
        const wrongResponse = () => {
            setAlertMessage({ success: '', error: 'Something went wrong' });
        }
        const rightResponse = (data) => {

            setwebninarData(data.webiners);
        }
        handleDynamicRequestHeader(method, url, requestBody, token, wrongResponse, rightResponse)
    }

    useEffect(() => {
        fetchWebinarData();
        webinarData.map((webinar) => webinar.Date)
    }, []);


    const handleWebiner = () => {
        dispatch(setActiveLink('Activity Center'));

    }
    const handleWebinerSingle = (id) => {
        dispatch(setWebinar(id))
        console.log(id)

        navigate('/activity/webinar/details')
    }
    const displayWebinars = displayCount ? webinarData.slice(0, displayCount) : webinarData;

    return (

        <div className="webinar">
            {displayWebinars.length > 0 && (
                <div className="row">
                    <div
                        className="section-header d-md-flex justify-content-md-between align-items-md-center">
                        <h2><span>Free webinars</span> curated for you</h2>
                        {displayCount > 3 ? (
                            <></>
                        ) : (
                            <Link to="/activity/webinar" onClick={handleWebiner}>View all webinars  <ChevronRight /></Link>
                        )}

                    </div>
                    {displayWebinars.map((webinar, index) => (
                        <div key={index} className="mt-4 mb-4 col-md-6 mb-lg-0 mb-sm-4">
                            <div className="webinar-img" style={{ cursor: 'pointer' }} onClick={() => { handleWebinerSingle(webinar._id) }}>
                                <div className="text-white text-time-date">
                                    {webinar.Date} <span>|</span> {webinar.StartTime}
                                </div>
                                <img src={webinar.WebinerPic} className=" webinar-banner-img" style={{ width: '100%', height: '50vh' }} />
                                <div className="px-3 py-2 webinar-content col-md-12 d-sm-flex justify-content-sm-between">
                                    <div className=" webinar-name">
                                        <h3 className="mb-1 mb-md-1">{webinar.WebinerName}</h3>
                                        <div className='tw-text-sm md:tw-text-base'>{webinar.lectureBy}</div>
                                    </div>
                                    {/* <div className="mb-3 webinar-name col-sm-6 col-12 mb-sm-0 text-sm-end">
                                 <div className="mb-2 webinarUsers mb-md-0">
                                     <img src={users} className="img-fluid" alt="Users" />
                                 </div>
                                 <p>1.5k+ interested</p>
                             </div> */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>


    )
}

export default WebinarMaster
