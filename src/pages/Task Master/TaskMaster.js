import React, { useEffect, useState } from 'react'
import CommonLayout from '../../components/common/CommonLayout';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import { handleDynamicRequestHeader } from '../../components/common/DyanamicRequest';
import { BASE_URL } from '../../components/common/AppConfig';
import { useSelector } from 'react-redux';
import bulb from '../../assets/images/user-profile-bulb.png';
import profile_bugs from '../../assets/images/profile-bugs.png';
import profile_activity from '../../assets/images/profile-activiti.png';
import edit_form from '../../assets/images/edit-form.png';
import Loader from '../../components/common/Loader';
import SetAlert from '../../components/common/SetAlert';
import { useNavigate } from 'react-router-dom';
function TaskMaster() {
    const [userDetails, setUserDetails] = useState([]);
    const userToken = useSelector((state) => state.roleReducer.jwtToken);
    const [alertMessage, setAlertMessage] = useState({ success: '', error: '' });
    const [isLoader, setIsLoader] = useState(true);
    const [pastActivity, setPassActivity] = useState([]);
    const [editModePersonal, setEditModePersonal] = useState(true);
    const [editModeOrganisation, setEditModeOrganisation] = useState(true);
    const navigate = useNavigate();
    const userRole = useSelector((state) => state.roleReducer.userRole);

    const [selectedUser, setSelectedUser] = useState({
        name: "",
        email: "",
        Class: "",
        mobileNo: "",
        parentsName: "",
        section: "",
        profilepic: "",
        schoolname: "",
        parentsNumber: "",
        parentsemail: "",
        type: ""
    });

    const handleEditPersonal = (e) => {
        e.preventDefault();
        setEditModePersonal(!editModePersonal);
    };
    const handleEditOrganisation = (e) => {
        e.preventDefault();
        setEditModeOrganisation(!editModeOrganisation);
    };
    useEffect(() => {
        fetchUserData();
        fetchPastActivity();
    }, []);

    const fetchUserData = async () => {
        setIsLoader(true);
        const requestBody = {};
        const method = 'POST';
        let url = '';

        if (userRole.includes('ROLE_COUNSELLOR')) {
            url = `${BASE_URL}/mobile/getCounselorProfile`;
        } else {
            url = `${BASE_URL}/mobile/profileDetails`;
        }

        const token = await userToken;
        const wrongResponse = () => {
            setAlertMessage({ success: '', error: 'Something went wrong' });
        }
        const rightResponse = (data) => {
            setUserDetails(data);
            setIsLoader(false);
        };
        handleDynamicRequestHeader(method, url, requestBody, token, wrongResponse, rightResponse)
    }
    useEffect(() => {
        setTimeout(() => {
            setIsLoader(false);
        }, 2000);
    });

    console.log(userDetails)
    useEffect(() => {
        if (userDetails && userDetails.student) {
            setSelectedUser({
                name: userDetails.student.name,
                email: userDetails.student.email,
                Class: userDetails.student.Class,
                mobileNo: userDetails.student.mobileNo,
                parentsName: userDetails.student.parentsName,
                section: userDetails.student.section,
                profilepic: userDetails.student.profilepic,
                schoolname: userDetails.student.schoolname,
                parentsNumber: userDetails.student.parentsNumber,
                parentsemail: userDetails.student.parentsemail,
                type: userDetails.student.type
            });
        } else if (userDetails && userDetails.user) {
            setSelectedUser({
                name: userDetails.user.name,
                email: userDetails.user.email,
                mobileNo: userDetails.user.mobileNo,
                profilepic: userDetails.user.profilepic,

                type: userDetails.user.type
            })
        }
    }, [userDetails]);

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        let selectedValue = value;
        setSelectedUser((prevUser) => ({
            ...prevUser,
            [name]: selectedValue,
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (selectedUser) {
            setEditModePersonal(true);
            setEditModeOrganisation(true);
            setIsLoader(true);
            const requestBody = {
                name: selectedUser.name,
                email: selectedUser.email,
                Class: selectedUser.Class,
                mobileNo: selectedUser.mobileNo,
                parentsName: selectedUser.parentsName,
                section: selectedUser.section,
                profilepic: selectedUser.profilepic,
                schoolname: selectedUser.schoolname,
                parentsNumber: selectedUser.parentsNumber,
                parentsemail: selectedUser.parentsemail,
                type: selectedUser.type
            };
            const method = 'POST';
            const url = `${BASE_URL}/mobile/profileupdate`;
            const token = await userToken;
            const wrongResponse = () => {
                setAlertMessage({ success: '', error: 'Wrong Credentials' });
            }
            const rightResponse = (data) => {
                if (data) {
                    setIsLoader(false);

                    setAlertMessage({ success: 'Data Edited Successfully', error: '' });
                }
            }
            handleDynamicRequestHeader(method, url, requestBody, token, wrongResponse, rightResponse);
        }
    };


    const fetchPastActivity = async () => {

        const requestBody = {};
        const method = 'POST';
        const url = `${BASE_URL}/mobile/pastActivityDetails`;
        const token = await userToken;
        const wrongResponse = () => {
            setAlertMessage({ success: '', error: 'Something went wrong' });
        }
        const rightResponse = (data) => {
            setPassActivity(data);

        };
        handleDynamicRequestHeader(method, url, requestBody, token, wrongResponse, rightResponse)
    }

    const handleBackToActivity = () => {
        return navigate('/partner');
    };

    return (
        <div>
            {isLoader ? (
                <Loader />
            ) : (
                <CommonLayout>
                    <div className="left-navigation">
                        <Sidebar></Sidebar>
                    </div>
                    <div className="right-content">
                        <Navbar handleBackClick={handleBackToActivity}></Navbar>
                        <div className="just-block "> Task Details </div>
                        {userDetails && userDetails.student && (
                            <>
                                <section className="user-profile-content">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="profile-sec">
                                                <div className="choose-file-profile">
                                                    <img src={userDetails.student.profilepic} alt="" />
                                                    <input type="file" />
                                                    {/* <span className="choose-file"></span> */}
                                                </div>
                                                <div className="user-profile-details-info">
                                                    <h2>{userDetails.student.name}</h2>
                                                    <p>{userDetails.student.Class}</p>
                                                    <p>{userDetails.student.schoolname}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="user-profile-bulb">
                                                <img src={bulb} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </>
                        )}


                        {userDetails && userDetails.user && (
                            <>
                                <section className="user-profile-content">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="profile-sec">
                                                <div className="choose-file-profile">
                                                    <img src={userDetails.user.profilepic} alt="" />
                                                    <input type="file" />
                                                    {/* <span className="choose-file"></span> */}
                                                </div>
                                                <div className="user-profile-details-info">
                                                    <h2>Delhi Public School</h2>
                                                    <p>Andheri East, Mumbai- 789455</p>
                                                    {/* <p>{userDetails.user.schoolContactNo}</p> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 border-start ">
                                            <div className="profile-sec">
                                                <div className="user-profile-details-info ">
                                                    <h2>1500 students</h2>
                                                    <p>7th April 2024, 2:00PM</p>
                                                    {/* <p>{userDetails.user.schoolContactNo}</p> */}
                                                </div>
                                            </div>
                                        </div>       
                                    </div>
                                </section>
                            </>
                        )}
                    </div>
                </CommonLayout>
            )}
        </div>
    )
}

export default TaskMaster
