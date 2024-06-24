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
import { InfoCircleFill } from 'react-bootstrap-icons';
function TaskList() {
    const [userDetails, setUserDetails] = useState([]);
    const userToken = useSelector((state) => state.roleReducer.jwtToken);
    const [alertMessage, setAlertMessage] = useState({ success: '', error: '' });
    const [isLoader, setIsLoader] = useState(true);
    const [pastActivity, setPassActivity] = useState([]);
    const [editModePersonal, setEditModePersonal] = useState(true);
    const [editModeOrganisation, setEditModeOrganisation] = useState(true);
    const userRole = useSelector((state) => state.roleReducer.userRole);
    const [scheduleData, setScheduleData] = useState([
        {
            "schedulepic": "https://firebasestorage.googleapis.com/v0/b/acadspace-36bb8.appspot.com/o/webinar%2FBMH2.jpeg?alt=media&",
            "scheduleName": "Event Management Webiner",
            "organisedby": "Mr. Rk Mohan",
            "Date": "2023-10-24"
        }
    ]);

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
                        <Navbar></Navbar>


                        <>
                            <section className="profile-tab-nav">
                                <nav>
                                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                        <button className="nav-link active" id="nav-past-tab" data-bs-toggle="tab"
                                            data-bs-target="#nav-past" type="button" role="tab" aria-controls="nav-past"
                                            aria-selected="true">Due Task</button>
                                        <button className="nav-link" id="nav-personal-tab" data-bs-toggle="tab"
                                            data-bs-target="#nav-personal" type="button" role="tab" aria-controls="nav-personal"
                                            aria-selected="false">Incomplete/Gave Up</button>
                                        <button className="nav-link" id="nav-personal-tab" data-bs-toggle="tab"
                                            data-bs-target="#nav-personal" type="button" role="tab" aria-controls="nav-personal"
                                            aria-selected="false">Completed Task</button>
                                    </div>
                                </nav>
                                <div className="tab-content" id="nav-tabContent">
                                    <div className="profile-past-activities tab-pane fade show active" id="nav-past" role="tabpanel" aria-labelledby="nav-past-tab">
                                        {scheduleData && scheduleData.map((schedule, index) => (

                                            <div class="schedulingDetails" onClick={() => { }}>
                                                <div class="CallScheduled_With">
                                                    <div class="scheduler_img">
                                                        <img src={schedule?.schedulepic} className="img-fluid" alt="Schedule" />
                                                    </div>
                                                    <h5> DPS School
                                                        <br></br>
                                                        <span>Andheri East, Mumbai</span>
                                                    </h5>
                                                </div>
                                                <div class="call_block">
                                                    <button type="button" class="btn btn-outline-primary">Interested</button>
                                                    <a className='dots-view' href='#'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000000" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                                    </svg>
                                                    </a>
                                                </div>


                                            </div>

                                        ))}
                                    </div>
                                    <div className="tab-pane fade" id="nav-personal" role="tabpanel" aria-labelledby="nav-personal-tab">
                                        {scheduleData && scheduleData.map((schedule, index) => (

                                            <div class="schedulingDetails" onClick={() => { }}>
                                                <div class="CallScheduled_With">
                                                    <div class="scheduler_img">
                                                        <img src={schedule?.schedulepic} className="img-fluid" alt="Schedule" />
                                                    </div>
                                                    <h5> DPS School
                                                        <br></br>
                                                        <span>Andheri East, Mumbai</span>
                                                    </h5>
                                                </div>
                                                <div class="call_block">
                                                    <button type="button" class="btn btn-outline-primary">Interested</button>
                                                    <a className='dots-view' href='#'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000000" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                                    </svg>
                                                    </a>
                                                </div>


                                            </div>

                                        ))}
                                    </div>
                                </div>
                            </section>
                        </>

                    </div>
                </CommonLayout>
            )}
        </div>
    )
}

export default TaskList
