import React, { useEffect, useState } from 'react'
import CommonLayout from '../../../components/common/CommonLayout'
import Sidebar from '../../../components/Sidebar/Sidebar'
import Navbar from '../../../components/Navbar/Navbar'
import StreamMaster from '../StreamMaster/StreamMaster'
import { handleDynamicRequestHeader } from '../../../components/common/DyanamicRequest';
import { BASE_URL } from '../../../components/common/AppConfig';
import { useSelector } from 'react-redux';
import Loader from '../../../components/common/Loader';
import SteamCourse from '../../Career Library/Course Master/Steam Course/SteamCourse'
import { CollegeSrc, SchoolSrc } from '../../../components/common/CareerIcons';
import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'react-bootstrap-icons';
import engineering from '../../../assets/images/engineering.png';
import { setSteam, setCarrer } from '../../../store/Career/action'
import { useDispatch } from 'react-redux'
function AllSteams() {
    const [isLoader, setIsLoader] = useState(true);
    const dispatch=useDispatch();
    useEffect(() => {
        setTimeout(() => {
            setIsLoader(false);
        }, 2000);
    });

    const [alertMessage, setAlertMessage] = useState({ success: '', error: '' });
    const [courseDetails, setCourseDetails] = useState([]);
    const [filteredCareerData, setFilteredCareerData] = useState([]);
    const userToken = useSelector((state) => state.roleReducer.jwtToken);
    const userCareer = useSelector((state) => state.careerReducer.career);
    const userType = useSelector((state) => state.careerReducer.type);
    const navigate = useNavigate();
    const handleBackToActivity = () => {
        return navigate('/library');
    };

    useEffect(() => {
        handleCourseDetails();
    }, []);

    const handleCourseDetails = async () => {
        window.scrollTo(0, 0);
        if (userCareer) {
            const requestBody = { career: userCareer };
            const method = 'POST';
            const url = `${BASE_URL}/mobile/careerLibraryDeatils`;
            const token = userToken;
            const wrongResponse = () => {
                setAlertMessage({ success: '', error: 'Something went wrong' });
            }
            const rightResponse = (data) => {
                setCourseDetails(data);
            }
            handleDynamicRequestHeader(method, url, requestBody, token, wrongResponse, rightResponse)
        }

    }
    useEffect(() => {
        if (userCareer && userType) {
            if (userType === 'School') {
                setFilteredCareerData(SchoolSrc.filter(item => item.title === userCareer));
            } else {
                setFilteredCareerData(CollegeSrc.filter(item => item.title === userCareer));
            }
        }
    }, [userCareer, userType]);
    const breadcrumbItems = [
        { label: 'Career Reports', link: '/career' },
        { label: 'Steams', link: '/career/steams/' },

    ];

    const separator = (
        <span style={{ color: '#001E3A', marginLeft: '4px', marginRight: '4px' }}><ChevronRight /></span>
    );
    const handleSteam = (title) => {
        dispatch(setSteam(title))
        navigate('/library/courses/')
    }

    return (
        <>
            {isLoader ? (
                <Loader />
            ) : (
                <CommonLayout>
                    <div className="left-navigation">
                        <Sidebar></Sidebar>
                    </div>
                    <div className="right-content">
                        <Navbar handleBackClick={handleBackToActivity}></Navbar>

                        <div className="col-lg-12" style={{ height: '50px' }}>
                            <section className="bradercrums-block my-5 mt-0 bradercrums-width" >
                                <div className="row">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            {breadcrumbItems.map((item, index) => (
                                                <React.Fragment key={index}>
                                                    <li className="breadcrumb-item">
                                                        <a href={item.link}>{item.label}</a>
                                                    </li>
                                                    {index !== breadcrumbItems.length - 1 && separator}
                                                </React.Fragment>
                                            ))}
                                        </ol>
                                    </nav>
                                </div>
                            </section>

                        </div>

                        <div className="col-lg-12" >

                            <section className="enginneringCareer-options container">
                                <div className="row">
                                    <heading><b>Career Streams</b> in {userCareer}</heading>
                                    {courseDetails && courseDetails.substreams?.length > 0 && (
                                        courseDetails.substreams.map((steam, index) => (
                                            <div className="col-md-6 col-lg-3" style={{ cursor: 'pointer' }} key={index} onClick={() => { handleSteam(steam.heading) }}>
                                                <div className="engCareer-1">
                                                    <div>
                                                    {filteredCareerData[0].image ? (
  <img src={filteredCareerData[0].image} style={{ width: '45%', height: '45%' }} className="img-fluid" alt="" />
) : (
  <img src={engineering} style={{ width: '45%', height: '45%' }} className="img-fluid" alt="" />
)}
                                                        <ChevronRight />
                                                    </div>
                                                    <p>{steam.heading}</p>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </section>
                        </div>

                    </div >
                </CommonLayout >
            )}
        </>
    )
}

export default AllSteams
