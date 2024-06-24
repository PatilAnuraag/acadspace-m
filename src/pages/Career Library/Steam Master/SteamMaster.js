import React, { useEffect, useState } from 'react'
import CommonLayout from '../../../components/common/CommonLayout'
import Sidebar from '../../../components/Sidebar/Sidebar'
import Navbar from '../../../components/Navbar/Navbar'
import { useNavigate } from 'react-router-dom'
import Loader from '../../../components/common/Loader'
import SteamDetail from './Steam Detail/SteamDetail'
import { handleDynamicRequestHeader } from '../../../components/common/DyanamicRequest';
import { BASE_URL } from '../../../components/common/AppConfig';
import { useSelector } from 'react-redux';
import { CollegeSrc, SchoolSrc } from '../../../components/common/CareerIcons';
import StudyMaster from './Study Master/StudyMaster'
import CompanyMaster from './Company Master/CompanyMaster'
function SteamMaster() {
    const userSteam = useSelector((state) => state.careerReducer.steam);
    const [alertMessage, setAlertMessage] = useState({ success: '', error: '' });
    const [steamDetails, setSteamDetails] = useState([]);
    const userToken = useSelector((state) => state.roleReducer.jwtToken);
    const userCareer = useSelector((state) => state.careerReducer.career);
    const userType = useSelector((state) => state.careerReducer.type);
    const [filteredCareerData, setFilteredCareerData] = useState([]);
   
    const [isLoader, setIsLoader] = useState(true);
    const navigate = useNavigate();
    const handleBackToActivity = () => {
        return navigate('/library/courses');
    };
    useEffect(() => {
        setTimeout(() => {
            setIsLoader(false);
        }, 2000);
    });

    const handleSteamDetails = async () => {
        window.scrollTo(0, 0);
       if(userSteam){
        const requestBody = { career:userSteam};
        const method = 'POST';
        const url = `${BASE_URL}/mobile/careerLibraryDeatils`;
        const token = userToken;
        const wrongResponse = () => {
            setAlertMessage({ success: '', error: 'Something went wrong' });
        }
        const rightResponse = (data) => {
            setSteamDetails(data);
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
    

    useEffect(()=>{
        handleSteamDetails();
    },[]);
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
                        <div className="row">
                            <div className="col-lg-12">
                                <SteamDetail steamDetails={steamDetails} filteredCareerData={filteredCareerData}/>
                            </div>
                            <div className="col-lg-12">
                                <StudyMaster steamDetails={steamDetails}/>
                            </div>
                            <div className="col-lg-12">
                                <CompanyMaster steamDetails={steamDetails}/>
                            </div>
                        </div>
                    </div >
                </CommonLayout >
            )}
        </>

    )
}

export default SteamMaster
