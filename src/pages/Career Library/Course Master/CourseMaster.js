import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar';
import Navbar from '../../../components/Navbar/Navbar';
import CommonLayout from '../../../components/common/CommonLayout';
import CourseLibrary from './Course Library/CourseLibrary';
import { useNavigate } from 'react-router-dom';
import { handleDynamicRequestHeader } from '../../../components/common/DyanamicRequest';
import { BASE_URL } from '../../../components/common/AppConfig';
import { useSelector } from 'react-redux';
import SteamCourse from './Steam Course/SteamCourse';
import { CollegeSrc, SchoolSrc } from '../../../components/common/CareerIcons';
import CareerPath from './Career Path/CareerPath';
import CollegeMaster from './College Master/CollegeMaster';
function CourseMaster() {
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

    useEffect(()=>{
        handleCourseDetails();
    },[]);
 
    const handleCourseDetails = async () => {
        window.scrollTo(0, 0);
       if(userCareer){
        const requestBody = { career:userCareer};
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
    return (
        <>

            <CommonLayout>
                <div className="left-navigation">
                    <Sidebar></Sidebar>
                </div>
                <div className="right-content">
                    <Navbar handleBackClick={handleBackToActivity}></Navbar>
                    <div className="col-lg-12">
                        <CourseLibrary courseDetails={courseDetails} title={'Engineering'} filteredCareerData={filteredCareerData}/>
                    </div>
                    <div className="col-lg-12">
                        <SteamCourse title={userCareer} courseDetails={courseDetails} filteredCareerData={filteredCareerData}/>
                    </div>
                    <div className="col-lg-12">
                        <CareerPath title={userCareer} courseDetails={courseDetails} filteredCareerData={filteredCareerData}/>
                    </div>
                    <div className="col-lg-12">
                        <CollegeMaster title={userCareer} courseDetails={courseDetails} filteredCareerData={filteredCareerData}/>
                    </div>
                </div>
            </CommonLayout>


        </>
    )
}

export default CourseMaster
