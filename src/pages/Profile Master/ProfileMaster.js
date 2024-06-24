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
function ProfileMaster() {
    const [userDetails, setUserDetails] = useState([]);
    const userToken = useSelector((state) => state.roleReducer.jwtToken);
    const [alertMessage, setAlertMessage] = useState({ success: '', error: '' });
    const [isLoader, setIsLoader] = useState(true);
    const [pastActivity, setPassActivity] = useState([]);
    const [editModePersonal, setEditModePersonal] = useState(true);
    const [editModeOrganisation, setEditModeOrganisation] = useState(true);
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
        let url='';
       
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
        }else if(userDetails && userDetails.user){
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
                                <section className="profile-tab-nav">
                                    <nav>
                                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                            <button className="nav-link active" id="nav-past-tab" data-bs-toggle="tab"
                                                data-bs-target="#nav-past" type="button" role="tab" aria-controls="nav-past"
                                                aria-selected="true">Past Activities</button>
                                            <button className="nav-link" id="nav-personal-tab" data-bs-toggle="tab"
                                                data-bs-target="#nav-personal" type="button" role="tab" aria-controls="nav-personal"
                                                aria-selected="false">Personal Details</button>
                                        </div>
                                    </nav>
                                    <div className="tab-content" id="nav-tabContent">
                                        <div className="profile-past-activities tab-pane fade show active" id="nav-past" role="tabpanel" aria-labelledby="nav-past-tab">
                                            <h2>Your Past Activities</h2>
                                            <div className="row">
                                                {pastActivity && pastActivity.pastactivities.length > 0 && pastActivity.pastactivities.map((activity, index) => (
                                                    <div className="col-lg-6" key={index}>
                                                        <div className="past-activit-one">
                                                            <img src={activity.activitypic || profile_activity} alt="" />
                                                            <div>
                                                                <h3>{activity.activityName}</h3>
                                                                <p>{activity.organisedby}</p>
                                                               
                                                                <span>
                                                                    <div className="profile-bugs">
                                                                        <img src={profile_bugs} alt="" />500
                                                                    </div>{" "}
                                                                    <strong>Space</strong>bucks earned
                                                                </span>
                                                             
                                                            </div>
                                                            <div className="date-top-right">{activity.Date}</div>
                                                        </div>
                                                    </div>
                                                ))}


                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="nav-personal" role="tabpanel" aria-labelledby="nav-personal-tab">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <SetAlert alertMessage={alertMessage} setAlertMessage={setAlertMessage} />
                                                    <div className="profile-form">
                                                        <h2>Personal Details</h2>
                                                        <button className="profile-edit" onClick={handleEditPersonal}><img src={edit_form} alt="" /></button>
                                                        <form onSubmit={handleSave}>
                                                            <div className=" row">
                                                                <div className="col-lg-6 form-50-margin">
                                                                    <label>Name</label>
                                                                    <input
                                                                        type="text"
                                                                        name="name"
                                                                        value={selectedUser.name || ''}
                                                                        onChange={handleEditInputChange}
                                                                        disabled={editModePersonal}
                                                                        style={{ opacity: editModeOrganisation ? 0.8 : 1 }}
                                                                        placeholder=""
                                                                    />
                                                                </div>

                                                                <div className="col-lg-6 form-50-margin">
                                                                    <label>Parent Name</label>
                                                                    <input
                                                                        type="text"
                                                                        name="parentsName"
                                                                        value={selectedUser.parentsName || ''}
                                                                        onChange={handleEditInputChange}
                                                                        disabled={editModePersonal}
                                                                        style={{ opacity: editModeOrganisation ? 0.8 : 1 }}
                                                                        placeholder=""
                                                                    />
                                                                </div>

                                                                <div className="col-lg-6 form-50-margin">
                                                                    <label>Contact Number</label>
                                                                    <input
                                                                        type="text"
                                                                        name="mobileNo"
                                                                        value={selectedUser.mobileNo || ''}
                                                                        onChange={handleEditInputChange}
                                                                        onKeyPress={(e) => {
                                                                            const isValidInput = /^[0-9]+$/.test(e.key);
                                                                            if (!isValidInput) {
                                                                                e.preventDefault();
                                                                            }
                                                                            if (e.target.value.length >= 10 && e.key !== 'Backspace') {
                                                                                e.preventDefault();
                                                                            }
                                                                        }}
                                                                        disabled={editModePersonal}
                                                                        style={{ opacity: editModeOrganisation ? 0.8 : 1 }}
                                                                        placeholder=""
                                                                    />
                                                                </div>
                                                                <div className="col-lg-6 form-50-margin">
                                                                    <label>Email Id</label>
                                                                    <input
                                                                        type="email"
                                                                        name="email"
                                                                        value={selectedUser.email || ''}
                                                                        onChange={handleEditInputChange}
                                                                        disabled={editModePersonal}
                                                                        style={{ opacity: editModeOrganisation ? 0.8 : 1 }}
                                                                        placeholder=""
                                                                    />             </div>
                                                                <div className="col-lg-12">
                                                                    <button disabled={editModePersonal} style={{ opacity: editModePersonal ? 0.5 : 1 }} type='submit' className="save-btn-profile">SAVE</button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <div className="profile-form">
                                                        <h2>{selectedUser.type === 'College' ? 'College Details' : 'School Details'}</h2>
                                                        <button className="profile-edit" ><InfoCircleFill style={{ color: '#75b4fd', height: '25px', width: '25px' }} /></button>

                                                        <form onSubmit={handleSave}>
                                                            <div className="row">
                                                                <div className="col-lg-3 form-50-margin">
                                                                    <label>{selectedUser.type === 'College' ? 'Year' : 'Class'}</label>
                                                                    <input
                                                                        type="text"
                                                                        name="Class"
                                                                        value={selectedUser.Class || ''}
                                                                        onChange={handleEditInputChange}
                                                                        disabled={editModeOrganisation}
                                                                        style={{ opacity: editModeOrganisation ? 0.8 : 1 }}
                                                                        placeholder=""
                                                                    />
                                                                </div>
                                                                <div className="col-lg-3 form-50-margin">
                                                                    <label>{selectedUser.type === 'College' ? 'Steams' : 'Section'}</label>
                                                                    <input
                                                                        type="text"
                                                                        name="section"
                                                                        value={selectedUser.section || ''}
                                                                        onChange={handleEditInputChange}
                                                                        disabled={editModeOrganisation}
                                                                        style={{ opacity: editModeOrganisation ? 0.8 : 1 }}
                                                                        placeholder=""
                                                                    />
                                                                </div>
                                                                <div className="col-lg-6 form-50-margin">
                                                                    <label> {selectedUser.type === 'College' ? 'College Name' : 'School Name'}</label>
                                                                    <input
                                                                        type="text"
                                                                        name="schoolname"
                                                                        value={selectedUser.schoolname || ''}
                                                                        onChange={handleEditInputChange}
                                                                        disabled={editModeOrganisation}
                                                                        style={{ opacity: editModeOrganisation ? 0.8 : 1 }}
                                                                        placeholder=""
                                                                    />
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </>
                        )}






                        {userDetails && userDetails.user &&(
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
                                                    <h2>{userDetails.user.name}</h2>
                                                   <p>{userDetails.user.schoolName}</p>
                                                  {/* <p>{userDetails.user.schoolContactNo}</p> */}
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

                                <section className="profile-tab-nav">
                                    <nav>
                                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                            <button className="nav-link active" id="nav-past-tab" data-bs-toggle="tab"
                                                data-bs-target="#nav-past" type="button" role="tab" aria-controls="nav-past"
                                                aria-selected="true">Past Activities</button>
                                            <button className="nav-link" id="nav-personal-tab" data-bs-toggle="tab"
                                                data-bs-target="#nav-personal" type="button" role="tab" aria-controls="nav-personal"
                                                aria-selected="false">Personal Details</button>
                                        </div>
                                    </nav>
                                    <div className="tab-content" id="nav-tabContent">
                                        <div className="profile-past-activities tab-pane fade show active" id="nav-past" role="tabpanel" aria-labelledby="nav-past-tab">
                                            <h2>Your Past Activities</h2>
                                            <div className="row">
                                                {pastActivity && pastActivity.pastactivities.length > 0 && pastActivity.pastactivities.map((activity, index) => (
                                                    <div className="col-lg-6" key={index}>
                                                        <div className="past-activit-one">
                                                            <img src={activity.activitypic || profile_activity} alt="" />
                                                            <div>
                                                                <h3>{activity.activityName}</h3>
                                                                <p>{activity.organisedby}</p>
                                                                { (!userRole.includes('ROLE_COUNSELLOR')) &&
                                                                <span>
                                                                    <div className="profile-bugs">
                                                                        <img src={profile_bugs} alt="" />500
                                                                    </div>{" "}
                                                                    <strong>Space</strong>bucks earned
                                                                </span>
                                                                }
                                                            </div>
                                                            <div className="date-top-right">{activity.Date}</div>
                                                        </div>
                                                    </div>
                                                ))}


                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="nav-personal" role="tabpanel" aria-labelledby="nav-personal-tab">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <SetAlert alertMessage={alertMessage} setAlertMessage={setAlertMessage} />
                                                    <div className="profile-form">
                                                        <h2>Personal Details</h2>
                                                        <button className="profile-edit" onClick={handleEditPersonal}><img src={edit_form} alt="" /></button>
                                                        <form onSubmit={handleSave}>
                                                            <div className=" row">
                                                                <div className="col-lg-12 form-50-margin">
                                                                    <label>Name</label>
                                                                    <input
                                                                        type="text"
                                                                        name="name"
                                                                        value={selectedUser.name || ''}
                                                                        onChange={handleEditInputChange}
                                                                        disabled={editModePersonal}
                                                                        style={{ opacity: editModeOrganisation ? 0.8 : 1 }}
                                                                        placeholder=""
                                                                    />
                                                                </div>

                                                               
                                                                <div className="col-lg-6 form-50-margin">
                                                                    <label>Contact Number</label>
                                                                    <input
                                                                        type="text"
                                                                        name="mobileNo"
                                                                        value={selectedUser.mobileNo || ''}
                                                                        onChange={handleEditInputChange}
                                                                        onKeyPress={(e) => {
                                                                            const isValidInput = /^[0-9]+$/.test(e.key);
                                                                            if (!isValidInput) {
                                                                                e.preventDefault();
                                                                            }
                                                                            if (e.target.value.length >= 10 && e.key !== 'Backspace') {
                                                                                e.preventDefault();
                                                                            }
                                                                        }}
                                                                        disabled={editModePersonal}
                                                                        style={{ opacity: editModeOrganisation ? 0.8 : 1 }}
                                                                        placeholder=""
                                                                    />
                                                                </div>
                                                                <div className="col-lg-6 form-50-margin">
                                                                    <label>Email Id</label>
                                                                    <input
                                                                        type="email"
                                                                        name="email"
                                                                        value={selectedUser.email || ''}
                                                                        onChange={handleEditInputChange}
                                                                        disabled={editModePersonal}
                                                                        style={{ opacity: editModeOrganisation ? 0.8 : 1 }}
                                                                        placeholder=""
                                                                    />             </div>
                                                                <div className="col-lg-12">
                                                                    <button disabled={editModePersonal} style={{ opacity: editModePersonal ? 0.5 : 1 }} type='submit' className="save-btn-profile">SAVE</button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                  
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

export default ProfileMaster
