import React, { useEffect, useState, useRef } from 'react';
import counsllor_view_list from '../../../assets/images/counsllor-view-list.png';
import counsllor_graph from '../../../assets/images/counsllor-graph.png';
import counsllor_user from '../../../assets/images/counsler-user.png';
import counsllor_clock from '../../../assets/images/counsler-clock.png';
import personality from '../../../assets/images/personality-assesment-skills.png';
import parents from '../../../assets/images/parents-assesment-skills.png';
import career from '../../../assets/images/career-discovery-skills.png';
import conslr from '../../../assets/images/conslr-chart.png';
import c_user from '../../../assets/images/c-user-personality.png';
import { handleDynamicRequestHeader } from '../../../components/common/DyanamicRequest';
import { BASE_URL } from '../../../components/common/AppConfig';
import { setActiveLink } from '../../../store/Link/action';
import { useDispatch } from 'react-redux';
import Chart from 'chart.js/auto';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function Analytics({ data }) {

    const [partnerData, setStudentData] = useState([]);
    const userToken = useSelector((state) => state.roleReducer.jwtToken);
    const activeLink = useSelector((state) => state.linkReducer.activeLink);
    const [scheduleData, setScheduleData] = useState([
        {
            "schedulepic": "https://firebasestorage.googleapis.com/v0/b/acadspace-36bb8.appspot.com/o/webinar%2FBMH2.jpeg?alt=media&",
            "scheduleName": "Event Management Webiner",
            "organisedby": "Mr. Rk Mohan",
            "Date": "2023-10-24"
        }
    ]);
    const [alertMessage, setAlertMessage] = useState({ success: '', error: '' });
    const chartRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        handleStudent();
        // handleSchedule();
    }, []);


    useEffect(() => {
        if (partnerData && partnerData.complete_count) {
            const data = {
                datasets: [{
                    data: partnerData,
                    backgroundColor: [
                        '#001E3A',
                        '#2CAF49',
                        '#23048E',
                        '#369FFF',
                        '#FF5757',
                        '#FF8B01'
                    ]
                }]
            };
        }
    }, [partnerData]);


    const handleStudent = async () => {
        const requestBody = {};
        const method = 'POST';
        const url = `${BASE_URL}/partner/dashboard`;
        const token = userToken;

        const wrongResponse = () => {
            setAlertMessage({ success: '', error: 'Something went wrong' });
        }
        const rightResponse = (data) => {
            setStudentData(data)

        }
        handleDynamicRequestHeader(method, url, requestBody, token, wrongResponse, rightResponse)
    }

    const handleSchedule = async () => {
        const requestBody = {};
        const method = 'POST';
        const url = `${BASE_URL}/mobile/schedulesDetails`;
        const token = userToken;

        const wrongResponse = () => {
            setAlertMessage({ success: '', error: 'Something went wrong' });
        }
        const rightResponse = (data) => {
            setScheduleData(data)

        }
        handleDynamicRequestHeader(method, url, requestBody, token, wrongResponse, rightResponse)
    }

    const handleCLick = () => {
        dispatch(setActiveLink('Student List'));
        navigate('/student-list');


    }


    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        return `${day} ${month}`;
    }

    const handleTask = () => {
        dispatch(setActiveLink('Task Master'));
        navigate('/partner/task');

    }

    return (
        <>
            <div class="col-lg-12">

                <section class="counsellor-home">

                    <div class="row">
                        {partnerData ? (<>
                            <div class="col-lg-6">
                                <div class="counsellor-view">
                                    <h3>Total Gigs Completed</h3>
                                    <img src={counsllor_view_list} class="counsllor-view-list" alt="" />
                                    <span>{partnerData?.complete_count}</span>
                                    <p><img src={counsllor_graph} alt="" /><strong>7% up </strong> from last the
                                        month</p>
                                </div>
                            </div>

                            <div class="col-lg-6">
                                <div class="counselling-view">z
                                    <h3 class="box-heading">Upcoming <span>onboarding</span> <a href="#"
                                        class="onclick-action"></a></h3>
                                    <div class="user-box-con">
                                        <img src={counsllor_user} alt="" />
                                        <div>
                                            <h4>DPS School</h4>
                                            <p>Bangalore, karnataka</p>
                                        </div>
                                    </div>
                                    <div class="date-know-more">
                                        <p><img src={counsllor_clock} alt="" />16 Sept 2023, 2:00 pm </p>
                                        <a href="/partner/task">Know more</a>
                                    </div>
                                </div>
                            </div>
                        </>) : (<></>)}


                    </div>

                </section>


                <div class="UpcomingSchedules">
                    <div class="container">

                        <div class="row">
                            <div class="col-lg-12 padding-mobile-none">

                                <div class="sec-heading">
                                    <h3>Available Tasks </h3>

                                </div>
                                {scheduleData && scheduleData.map((schedule, index) => (

                                    <div class="schedulingDetails" onClick={() => handleTask()}>
                                        {/* <div class="scheduled-time-day">
                                                <h3> 7 Nov </h3>
                                                <time>4:00 pm</time>
                                            </div> */}
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

                                {/* <div class="schedulingDetails Active">
                                <div class="scheduled-time-day">
                                    <h3> Today </h3>
                                    <time>2:00 pm</time>
                                </div>
                                <div class="CallScheduled_With">
                                    <div class="scheduler_img">
                                        <img src="images/Scheduler1.jpg" class="img-fluid" />
                                    </div>
                                    <h5>
                                        Malvika D. Rane<br></br>
                                        <span>10th - section A | St. Xavier School</span>
                                    </h5>
                                </div>
                                <div class="call_block">
                                    <button type="button" class="btn btn-primary">Join Now</button>
                                    <i class="bi bi-three-dots-vertical"></i>
                                </div>

                            </div> */}

                            </div>

                        </div>

                    </div>
                </div>

            </div >
        </>

    )
}

export default Analytics
