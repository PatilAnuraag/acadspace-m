import React, { useEffect, useState } from 'react'
import CommonLayout from '../../components/common/CommonLayout'
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
import LeadMaster from './LeadMaster/LeadMaster'
import LeaderMaster from './LeaderMaster/LeaderMaster'
import LeaderBoardMaster from './LeaderBoardMaster/LeaderBoardMaster'
import UpcomingMaster from '../Upcoming Master/UpcomingMaster'
import StreamMaster from './StreamMaster/StreamMaster'
import ScholarshipsMaster from '../Scholarships Master/ScholarshipsMaster'
import { handleDynamicRequestHeader } from '../../components/common/DyanamicRequest';
import { BASE_URL } from '../../components/common/AppConfig';
import { useSelector } from 'react-redux';
import ExamMaster from './ExamMaster/ExamMaster'
import CareerOptions from './CareerOptions/CareerOptions'
import Loader from '../../components/common/Loader';
import StudyAbroad from './StudyAbroad/StudyAbroad'
import SkillsMaster from './Skills Master/SkillsMaster'

function CareerMaster() {
    const [userDetails, setUserDetails] = useState([]);
    const [studentData, setStudentData] = useState([]);
    const [careerData, setCareerData] = useState([]);
    const [classType, setClassType] = useState(false);
    const [userGroup, setUserGroup] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [alertMessage, setAlertMessage] = useState({ success: '', error: '' });
    const userToken = useSelector((state) => state.roleReducer.jwtToken);
    const careerOptions = useSelector((state) => state.careerReducer.career);
    const [isLoader, setIsLoader] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoader(false);
        }, 2000);
    });

    const handleUserDetails = async () => {
        const requestBody = {};
        const method = 'POST';
        const url = `${BASE_URL}/mobile/profileDetails`;
        const token = userToken;
        const wrongResponse = () => {
            setAlertMessage({ success: '', error: 'Something went wrong' });
        }
        const rightResponse = (data) => {
            if (data.student.Class <= 7 && data.student.type==='School') {
                setUserGroup(false)
            } else {
                setUserGroup(true);
                if (data.student.type === 'School') {
                    setClassType(false);
                } else {
                    setClassType(true);
                }
            }
        }
        handleDynamicRequestHeader(method, url, requestBody, token, wrongResponse, rightResponse)
    }

    const fetchStudentData = async () => {
        if (userToken) {
            const requestBody = {};
            const method = 'POST';
            const url = `${BASE_URL}/mobile/getReportdata`;
            const token = userToken;
            const wrongResponse = () => {
                setAlertMessage({ success: '', error: 'Something went wrong' });
            }
            const rightResponse = (data) => {
                setStudentData(data)
         
            }
            handleDynamicRequestHeader(method, url, requestBody, token, wrongResponse, rightResponse);
        }
    }
  

    const handlecareerDetails = async () => {
        if (careerOptions) {
            const requestBody = { career: careerOptions };
            const method = 'POST';
            const url = `${BASE_URL}/mobile/getCareerSpecificDetails`;
            const token = userToken;
            const wrongResponse = () => {
                setAlertMessage({ success: '', error: 'Something went wrong' });
            }
            const rightResponse = (data) => {
                setCareerData(data);
            }
            handleDynamicRequestHeader(method, url, requestBody, token, wrongResponse, rightResponse);
        }
    }

    useEffect(() => {
        handleUserDetails();
        fetchStudentData();
        handlecareerDetails();
    }, [careerOptions, ])

    useEffect(() => {
    }, [careerData,]);

    setTimeout(() => {
        setShowDetails(true)
    }, 800);

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
                        <Navbar></Navbar>
                        {showDetails && (
                            <>
                                <div className="row">

                                    {studentData.msg === 'Please completed all tests' ? (
                                        <div className="col-lg-12">
                                            <div className="welcome-user d-flex justify-content-center align-items-center mt-5 pt-5">
                                                <span>{studentData.msg}</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="col-lg-12">
                                                <LeadMaster studentData={studentData} />
                                            </div>
                                            <div className="col-lg-12">
                                                <StudyAbroad />
                                            </div>
                                            {userGroup && studentData && (
                                                <>

                                                    <div className="col-lg-12">
                                                        <CareerOptions studentData={studentData} career={careerOptions} classType={classType} />
                                                    </div>
                                                    <div className="col-lg-12" >
                                                        <StreamMaster streamCount={3} careerData={careerData} careerOptions={careerOptions} />

                                                    </div>

                                                    <div className="col-lg-12 mt-5">
                                                        <ExamMaster examCount={3} careerData={careerData} careerOptions={careerOptions} />
                                                    </div>
                                                    <div className="col-lg-12 ">
                                                        <LeaderBoardMaster careerData={careerData} careerOptions={careerOptions} />
                                                    </div>

                                                </>
                                            )}
                                            {!userGroup && studentData && studentData.juniorvalue && (
                                                <>
                                                    <div className="col-lg-12 mt-5">
                                                        <LeaderMaster studentData={studentData} />
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <UpcomingMaster studentData={studentData} />
                                                    </div>
                                                </>
                                            )}

                                            <div className="col-lg-12">
                                                <SkillsMaster studentData={studentData} />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </>
                        )
                        }
                    </div >
                </CommonLayout >
            )}
        </>
    )
}

export default CareerMaster

