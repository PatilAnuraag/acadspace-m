import React, { useEffect, useState } from 'react';
import { handleDynamicRequestHeader } from '../../../components/common/DyanamicRequest';
import { BASE_URL } from '../../../components/common/AppConfig';
import { setActiveLink } from '../../../store/Link/action';
import { useDispatch } from 'react-redux';
import Chart from 'chart.js/auto';
import counsllor_view_list from '../../../assets/images/counsllor-view-list.png';
import counsllor_graph from '../../../assets/images/counsllor-graph.png';
import counsllor_user from '../../../assets/images/counsler-user.png';
import counsllor_clock from '../../../assets/images/counsler-clock.png';
import counsllor_calender from '../../../assets/images/calender.svg';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function UpcommingSchedules() {
    const [studentData, setStudentData] = useState([]);
    const [scheduleData, setScheduleData] = useState([]);
    const userToken = useSelector((state) => state.roleReducer.jwtToken);
    const activeLink = useSelector((state) => state.linkReducer.activeLink);
    const [alertMessage, setAlertMessage] = useState({ success: '', error: '' });

    const navigate=useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        handleStudent();
        handleSchedule();
    }, []);



    const handleStudent = async () => {
        const requestBody = {};
        const method = 'POST';
        const url = `${BASE_URL}/mobile/getCounselorDashboard`;
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
    
    const handleCLick=()=>{
        dispatch(setActiveLink('Student List'));
        navigate('/student-list');


    }
    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        return `${day} ${month}`;
      }
    

  return (

  <div>    

    <section class="counsellor-home">

    <div class="row mb-4">
    {studentData && studentData?.studentcount  ?(<>
        
        <div class="col-lg-6">
            <div class="counsellor-view">
                <h3>Total Students</h3>
                <img src={counsllor_view_list} class="counsllor-view-list" alt="" />
                <span>{studentData?.studentcount}</span>
                <p><img src={counsllor_graph} alt="" /><strong>7% up</strong> from last the
            
                    month</p>
            </div>
        </div>

        <div class="col-lg-6">
            <div class="counselling-view">
                <h3 class="box-heading set-hours">Set availability hours</h3>
                <div class="user-box-con">
                    <div>
                        <p>Select hours when you are usually available to take calls.</p>
                    </div>
                </div>
                <div class="btn-img-cs">
                    <a href="#" data-bs-toggle="modal" data-bs-target="#availability-hours">Set Now</a>
                    <img src={counsllor_calender} alt="" />
                </div>
            </div>
        </div>

    </>):(<></>)}

    </div>

    </section>

    <div class="UpcomingSchedules">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 padding-mobile-none">

                    <div class="sec-heading">
                        <h3>Upcoming Schedules </h3> 
                        {/* <div class="tabs_btn">
                            <button type="button" class="btn btn-secondary scheduel-day">Day</button>
                            <button type="button" class="btn btn-primary scheduel-week">Week</button>
                            <button type="button" class="btn btn-success scheduel-month">Month</button>
                        </div> */}
                    </div>
                    {scheduleData && scheduleData.schedules && scheduleData.schedules.map((schedule, index) => (

                    <div key={index} className="schedulingDetails Active">
                        <div className="scheduled-time-day">
                            <h3> {schedule?.Date === new Date().toISOString().split('T')[0] ? 'Today' : formatDate(schedule.Date)}</h3>
                            <time></time>
                        </div>
                        <div className="CallScheduled_With">
                            <div className="scheduler_img">
                                <img src={schedule?.schedulepic} className="img-fluid" alt="Schedule" />
                            </div>
                            <h5>
                                {schedule.scheduleName}<br />
                                <span>{schedule?.organisedby}</span>
                            </h5>
                        </div>
                        <div className="call_block">
                            <button type="button">Join Now</button>
                            <a className='dots-view' href='#'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
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
                    {/* <div class="schedulingDetails">
                        <div class="scheduled-time-day">
                            <h3> 7 Nov </h3>
                            <time>4:00 pm</time>
                        </div>
                        <div class="CallScheduled_With">
                            <div class="scheduler_img">
                                <img src="images/Scheduler2.jpg" class="img-fluid" />
                            </div> 
                            <h5>
                                Anjali Patel<br></br>
                                <span>10th - section A | St. Xavier School</span>
                            </h5>
                        </div>
                        <div class="call_block">
                            <button type="button" class="btn btn-outline-primary">Reschedule</button>
                            <i class="bi bi-three-dots-vertical"></i>
                        </div>
                        
                    </div> */}

                </div>
            </div>
        </div>
    </div>

    {/* MODEL */}

    <div class="modal fade viewAssesment" id="availability-hours" tabIndex="-1" aria-labelledby="availability-hours" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content availability-hours-model"   id="custom-modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Set availability Hours</h5>
                    <button type="button" class="btn-close close-assesment" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    <div class="model-sheduler">

                        <div className='model-toggle-pop disabled-input'>
                            <div class="form-check form-switch form-switch-sm">
                                <input class="form-check-input" type="checkbox" id="sunday" disabled />
                                <label class="form-check-label" for="sunday">SUNDAYS</label>
                            </div>
                            <p>Unavailable</p>
                        </div>

                        <div className='model-toggle-pop'>
                            <div class="form-check form-switch form-switch-sm">
                                <input class="form-check-input" type="checkbox" id="monday" checked/>
                                <label class="form-check-label" for="monday">MONDAY</label>
                            </div>
                            
                            <div class="toggle-time-select">
                                <input type='time' />
                                <span>to</span>
                                <input type='time' />
                            </div>

                        </div>

                        <div className='model-toggle-pop'>
                            <div class="form-check form-switch form-switch-sm">
                                <input class="form-check-input" type="checkbox" id="tuesday" />
                                <label class="form-check-label" for="tuesday">TUESDAY</label>
                            </div>
                            <p>Unavailable</p>
                        </div>

                        <div className='model-toggle-pop'>
                            <div class="form-check form-switch form-switch-sm">
                                <input class="form-check-input" type="checkbox" id="wednesday" />
                                <label class="form-check-label" for="wednesday">WEDNESDAY</label>
                            </div>
                            <p>Unavailable</p>
                        </div>

                        <div className='model-toggle-pop'>
                            <div class="form-check form-switch form-switch-sm">
                                <input class="form-check-input" type="checkbox" id="thursday" />
                                <label class="form-check-label" for="thursday">THURSDAY</label>
                            </div>
                            <p>Unavailable</p>
                        </div>

                        <div className='model-toggle-pop'>
                            <div class="form-check form-switch form-switch-sm">
                                <input class="form-check-input" type="checkbox" id="friday" />
                                <label class="form-check-label" for="friday">FRIDAY</label>
                            </div>
                            <p>Unavailable</p>
                        </div>

                        <div className='model-toggle-pop disabled-input'>
                            <div class="form-check form-switch form-switch-sm">
                                <input class="form-check-input" type="checkbox" id="saturday" disabled />
                                <label class="form-check-label" for="saturday">SATURDAY</label>
                            </div>
                            <p>Unavailable</p>
                        </div>

                    </div>
                </div>
                
                <div className='model-footer-btn'>
                    <button>Save</button>
                </div>

            </div>
        </div>
      </div>


  </div>
  )
}

export default UpcommingSchedules
