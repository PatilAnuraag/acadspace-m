import React, { useEffect, useState, useRef  } from 'react';
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
const renderPieChart = (chartRef, data, width = 400, height = 400) => {
    const ctx = chartRef.current.getContext('2d');
  
    // Destroy any existing chart on the canvas
    Chart.getChart(ctx)?.destroy();
  
    ctx.canvas.width = width;
    ctx.canvas.height = height;
  
    new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: {
        // Add any options you need here
      }
    });
  };
  
  
function Analytics({ data }) {

    const [studentData, setStudentData] = useState([]);
    const userToken = useSelector((state) => state.roleReducer.jwtToken);
    const activeLink = useSelector((state) => state.linkReducer.activeLink);
    const [alertMessage, setAlertMessage] = useState({ success: '', error: '' });
    const chartRef = useRef();
    const navigate=useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        handleStudent();
    }, []);


    useEffect(() => {
        if (studentData && studentData.studentcount && chartRef.current) {
          const data = {
            
            datasets: [{
              
              data:  studentData.list,
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
          renderPieChart(chartRef, data);
        }
      }, [studentData]);


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
    
    const handleCLick=()=>{
        dispatch(setActiveLink('Student List'));
        navigate('/student-list');


    }

console.log(studentData.list)
    return (
<>
<div class="col-lg-12">

<section class="counsellor-home">

    <div class="row">
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
            {/* <div class="counselling-view">
                <h3 class="box-heading">Upcoming <span>counselling</span> <a href="#"
                    class="onclick-action"></a></h3>
                <div class="user-box-con">
                    <img src={counsllor_user} alt="" />
                    <div>
                        <h4>Malvika D. Rane</h4>
                        <p>10th - section A | St. Xavier School</p>
                    </div>
                </div>
                <div class="date-know-more">
                    <p><img src={counsllor_clock} alt="" />16 Sept 2020, 2:00 pm </p>
                    <a href="#">Know more</a>
                </div>
            </div> */}
        </div>
</>):(<></>)}
       

    </div>

</section>


<section class="counsellor-analytics">

    <div class="row">

        <div class="col-lg-12">
            {/* <div class="counsellor-analytics-heading-dates">
                <h2>Student Analytics</h2>
                <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                    <div class="btn-group me-2" role="group" aria-label="">
                        <button type="button" class="btn">Weekly</button>
                    </div>
                    <div class="btn-group me-2" role="group" aria-label="">
                        <button type="button" class="btn">Monthly</button>
                    </div>
                    <div class="btn-group me-2" role="group" aria-label="">
                        <button type="button" class="btn active">Yearly</button>
                    </div>
                </div>
            </div> */}
        </div>
        {studentData && studentData?.studentcount  ?(<>
        <div class="col-lg-4">
            <div class="personality-assesment">
                <h2>Personality Assesment</h2>
                <div class="d-flex justify-content-between">
                    <h3>{studentData?.test1count}</h3>
                    <img class="blend-img-counslr" src={personality} alt="" />
                </div>
                {/* <div class="progress">
                    <div class="progress-bar" role="progressbar" style={{ width: "75%" }} aria-valuenow="0"
                        aria-valuemin="0" aria-valuemax="100"></div>
                </div> */}
                {/* <h4><strong>84%</strong> completed</h4> */}
                <a href="#" class="c-view" data-bs-toggle="modal"
                    data-bs-target="#viewAssesment">View</a>
            </div>
        </div>

        <div class="col-lg-4">
            <div class="personality-assesment bg-parents">
                <h2>Parents Assesment</h2>
                <div class="d-flex justify-content-between">
                <h3>{studentData?.test2count}</h3>
                    <img class="blend-img-counslr" src={parents} alt="" />
                </div>
                {/* <div class="progress">
                    <div class="progress-bar" role="progressbar" style={{ width: "75%" }} aria-valuenow="0"
                        aria-valuemin="0" aria-valuemax="100"></div>
                </div> */}
                {/* <h4><strong>40%</strong> completed</h4> */}
                <a href="#" class="c-view">View</a>
            </div>
        </div>

        <div class="col-lg-4">
            <div class="personality-assesment bg-discovery">
                <h2>Career Discovery</h2>
                <div class="d-flex justify-content-between">
                <h3>{studentData?.test3count}</h3>
                    <img class="blend-img-counslr" src={career} alt="" />
                </div>
                {/* <div class="progress">
                    <div class="progress-bar" role="progressbar" style={{ width: "75%" }} aria-valuenow="0"
                        aria-valuemin="0" aria-valuemax="100"></div>
                </div> */}
                {/* <h4><strong>27%</strong> completed</h4> */}
                <a href="#" class="c-view">View</a>
            </div>
        </div>
        </>):(<></>)}
    </div>

</section>
{studentData && studentData?.list  ?(<>

<section class="counsellor-types-students">

    <div class="row">
 
        <div class="col-lg-12">
            <div class="c-type-student">
                <h3>Types of Students</h3>
                <a onClick={handleCLick} class="c-view-list" style={{cursor:'pointer'}}>View List</a>
            </div>
        </div>

        <div class="col-lg-5">
            <div class="c-pie-chart">
                {/* <img src={conslr} alt="" /> */}
                <canvas ref={chartRef} />
            </div>
        </div>

        <div class="col-lg-7">
            <div className='c-pie-chart-data'>
                <div class="row">

                    <div class="col-6">
                        <div className='chart-data'>
                            <div className='head color-thinker'>{studentData.list[0]}</div>
                            <span>Thinker</span>
                        </div>
                    </div>

                    <div class="col-6">
                        <div className='chart-data'>
                            <div className='head color-creator'>{studentData.list[1]}</div>
                            <span>Creator</span>
                        </div>
                    </div>

                    <div class="col-6">
                        <div className='chart-data'>
                            <div className='head color-doer'>{studentData.list[2]}</div>
                            <span>Doer</span>
                        </div>
                    </div>

                    <div class="col-6">
                        <div className='chart-data'>
                            <div className='head color-leader'>{studentData.list[3]}</div>
                            <span>Leader</span>
                        </div>
                    </div>

                    <div class="col-6">
                        <div className='chart-data'>
                            <div className='head color-helper'>{studentData.list[4]}</div>
                            <span>Helper</span>
                        </div>
                    </div>

                    <div class="col-6">
                        <div className='chart-data'>
                            <div className='head color-organiser'>{studentData.list[5]}</div>
                            <span>Organiser</span>
                        </div>
                    </div>

            

                </div>
            </div>
        </div>
      
    </div>

</section>
</>):(<></>)}
</div>
<div class="modal fade viewAssesment" id="viewAssesment" tabIndex="-1" aria-labelledby="viewAssesment"
aria-hidden="true">
<div class="modal-dialog">
  <div class="modal-content"   id="custom-modal-content">

      <div class="modal-header">
          <h5 class="modal-title">Personality Assesment</h5>
          <button type="button" class="btn-close close-assesment" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <div class="modal-body">

          <ul class="nav nav-pills" id="pills-tab" role="tablist">
              <li class="nav-item" role="presentation">
                  <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill"
                      data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home"
                      aria-selected="true">Completed</button>
              </li>
              <li class="nav-item" role="presentation">
                  <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill"
                      data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile"
                      aria-selected="false">Pending</button>
              </li>
          </ul>
          <div class="tab-content" id="pills-tabContent">
              
              <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">

                  <div class="tab-c-user-personality">
                      <img src={c_user} alt=""/>
                      <div>
                          <h3>Templeton Peck</h3>
                          <p>10th - section A | St. Xavier School</p>
                      </div>
                      <a href="#" class="c-arow"></a>
                  </div>

                  <div class="tab-c-user-personality">
                      <img src={c_user} alt=""/>
                      <div>
                          <h3>Templeton Peck</h3>
                          <p>10th - section A | St. Xavier School</p>
                      </div>
                      <a href="#" class="c-arow"></a>
                  </div>

                  <div class="tab-c-user-personality">
                      <img src={c_user} alt=""/>
                      <div>
                          <h3>Templeton Peck</h3>
                          <p>10th - section A | St. Xavier School</p>
                      </div>
                      <a href="#" class="c-arow"></a>
                  </div>
                  

              </div>
              
              <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
              
                  <div class="tab-c-user-personality">
                      <img src={c_user} alt=""/>
                      <div>
                          <h3>Templeton Peck</h3>
                          <p>10th - section A | St. Xavier School</p>
                      </div>
                      <a href="#" class="c-arow"></a>
                  </div>
              
              </div>

          </div>

      </div>

  </div>
</div>
</div>
</>
  
    )
}

export default Analytics
