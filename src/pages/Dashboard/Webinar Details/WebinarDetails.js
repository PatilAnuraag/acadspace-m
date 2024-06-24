import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar';
import Navbar from '../../../components/Navbar/Navbar';
import { ChevronRight, ClockFill, Calendar2Event, Calendar } from 'react-bootstrap-icons';
import CommonLayout from '../../../components/common/CommonLayout';
import { setActiveLink } from '../../../store/Link/action';
import { useDispatch } from 'react-redux';
import Loader from '../../../components/common/Loader';
import { useSelector } from 'react-redux';
import { handleDynamicRequestHeader } from '../../../components/common/DyanamicRequest';
import { BASE_URL } from '../../../components/common/AppConfig';
import { useNavigate } from 'react-router-dom';
import SetAlert from '../../../components/common/SetAlert';
import SpacebugPopup from '../../../assets/images/spacebug-popup.svg';
import { Modal } from 'reactstrap';
import { setSpaceBucksNew } from '../../../store/Role/action';
function WebinarDetails() {
  const [isLoader, setIsLoader] = useState(true);
  const [webinarDetails, setwebninarDetails] = useState([]);
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState({ success: '', error: '' });
  const userToken = useSelector((state) => state.roleReducer.jwtToken);
  const userWebinar = useSelector((state) => state.careerReducer.webinar);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const openModel = async () => {
    setIsOpen(true);
  };
  const closeModel = async () => {
    setIsOpen(false);
    const requestBody = { id: userWebinar };
    const method = 'POST';
    const url = `${BASE_URL}/mobile/registerWebiner`;
    const token = await userToken;
    const wrongResponse = (data) => {
      setAlertMessage({ success: '', error: "Unable to Register Data" });
      setIsLoading(false);
    }
    const rightResponse = async (data) => {
      setAlertMessage({ success: data.msg, error: '' });
      if (data.msg === 'Sucessfully registered for webiner') {
        await SpaceBucksWebinar();
        handleSpacebucks();
      }
      setIsLoading(false);
      window.location.reload();
    };

    handleDynamicRequestHeader(method, url, requestBody, token, wrongResponse, rightResponse);
  }

  const [currentTime, setCurrentTime] = useState(new Date());


  setTimeout(() => {
    setIsLoader(false);
  }, 1000);

  const breadcrumbItems = [
    { label: 'Activity Center', link: '/activity' },
    { label: 'Webinars', link: '/activity/webinar/' },
    { label: 'Details', link: '/activity/webinar/details', isActive: true },
  ];

  const separator = (
    <span style={{ color: '#001E3A', marginLeft: '4px', marginRight: '4px' }}><ChevronRight /></span>
  );
  const handleBackToActivity = () => {

    return navigate('/dashboard');
  };


  const fetchWebinarData = async () => {
    if (userWebinar) {
      const requestBody = { id: userWebinar };
      const method = 'POST';
      const url = `${BASE_URL}/mobile/getWebinerDeatils`;
      const token = await userToken;
      const wrongResponse = () => {
        setAlertMessage({ success: '', error: 'Something went wrong' });
      }
      const rightResponse = async (data) => {

        setwebninarDetails(data.webiner);
        // await SpaceBucksWebinarFetch();
        SpaceBucksWebinar();

      };

      handleDynamicRequestHeader(method, url, requestBody, token, wrongResponse, rightResponse);
    }


  }

  const handleSpacebucks = async () => {

    const requestBody = {};
    const method = 'POST';
    const url = `${BASE_URL}/mobile/getSpacebucks`;
    const token = userToken;
    const wrongResponse = () => {
      setAlertMessage({ success: '', error: 'Something went wrong' });
    }
    const rightResponse = (data) => {
      dispatch(setSpaceBucksNew(data.amount));
    }
    handleDynamicRequestHeader(method, url, requestBody, token, wrongResponse, rightResponse);

  }

  const SpaceBucksWebinar = async () => {
    const requestBody = { keyword: 'WEBINAR_REG' };
    const method = 'POST';
    const url = `${BASE_URL}/mobile/deductSpacebucks`;
    const token = await userToken;
    const wrongResponse = () => {
      setAlertMessage({ success: '', error: 'Something went wrong' });
    }
    const rightResponse = (data) => {
    };
    handleDynamicRequestHeader(method, url, requestBody, token, wrongResponse, rightResponse);
  };


  const SpaceBucksWebinarFetch = async () => {
    const requestBody = { keyword: 'WEBINAR_INT' };
    const method = 'POST';
    const url = `${BASE_URL}/mobile/deductSpacebucks`;
    const token = await userToken;
    const wrongResponse = () => {
      setAlertMessage({ success: '', error: 'Something went wrong' });
    }
    const rightResponse = (data) => {
    };
    handleDynamicRequestHeader(method, url, requestBody, token, wrongResponse, rightResponse);
  };

  const canRegister = () => {

    if (webinarDetails?.joinUrl) return false

    const startTimeWithoutMeridiem = webinarDetails?.StartTime?.replace(/(AM|PM)/i, '');

    // Construct the date string with updated startTime
    // const webinarStartTime = `${webinarDetails.Date} ${startTimeWithoutMeridiem}`;
    const webinarStartTime = new Date(`${webinarDetails.Date} ${startTimeWithoutMeridiem}`);

    console.log(webinarStartTime, currentTime, currentTime < webinarStartTime);

    return currentTime < webinarStartTime;
  }

  const canJoin = () => {

    if (!webinarDetails?.joinUrl) return false

    const startTimeWithoutMeridiem = webinarDetails?.StartTime?.replace(/(AM|PM)/i, '');

    // Construct the date string with updated startTime
    // const webinarStartTime = `${webinarDetails.Date} ${startTimeWithoutMeridiem}`;
    const webinarStartTime = new Date(`${webinarDetails.Date} ${startTimeWithoutMeridiem}`);

    console.log(webinarStartTime, currentTime, currentTime < webinarStartTime);

    return currentTime > webinarStartTime;
  }

  const isregistered = () => {
    if (webinarDetails?.joinUrl) return true
    return false
  }

  const handleJoin = () => {

    console.log(webinarDetails.joinUrl);

    if (webinarDetails.joinUrl) {
      window.open(webinarDetails.joinUrl, '_blank');
    } else {
      console.error('Join URL is not available.');
    }
  }

  useEffect(() => {
    fetchWebinarData();

    // const timer = setInterval(() => {
    //   setCurrentTime(new Date());
    // }, 1000);

    // return () => clearInterval(timer);
  }, []);

  const handleRegister = async () => {
    setIsOpen(true);
    setIsLoading(true);
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

            {webinarDetails && (
              <div className="row">
                <div className="col-lg-12" style={{ height: '50px' }}>
                  <section className="my-5 mt-0 bradercrums-block" >
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
                  {isOpen && (
                    <Modal isOpen={openModel} toggle={openModel} backdrop="static" keyboard={false} size="lg">
                      <div class=" spacebug-popup">
                        <div class="modal-body">
                          <img src={SpacebugPopup} />
                          <div className='spacebug-content-right'>
                            {/* <p><strong>SpaceBuck</strong> is the currency you get rewarded with for completing tasks like completing a test, downloading report, attending a webinar, etc.</p> */}
                            <p><strong>Great</strong> decision!, you're going to register in the webinar. As registration fee, we'll deduct 200 SpaceBucks from your wallet. Have fun!'</p>
                            <button onClick={closeModel} className='okay-btn' data-bs-dismiss="modal">Okay</button>
                          </div>
                        </div>
                      </div>
                    </Modal>
                  )}
                </div>
                <div className="pt-0 mt-0 col-lg-12">

                  <SetAlert alertMessage={alertMessage} setAlertMessage={setAlertMessage} />
                  <section class="lessonsmainBlock mb-5 v2-lessonsmainBlock">
                    <div class="row">

                      <div class="lesson-details col-md-12">
                        <div class="row">
                          <div class="lesson-video col-md-5 mt-5">
                            <div class="embed-responsive embed-responsive-16by9 ">
                              <div className="webinar-img" >
                                <img src={webinarDetails.WebinerPic} className="img-fluid webinar-banner-img" style={{ width: '100%', height: '35vh' }} />

                              </div>
                            </div>
                          </div>
                          <div class="lesson-basic-destails  col-md-7  mt-5">
                            <h4>{webinarDetails.WebinerName}</h4>
                            <p class="price-buy-block">{webinarDetails.lectureBy} </p>
                            <div class=" row">
                              <div className="col-6">
                                <span ><Calendar2Event style={{ marginRight: '15px' }} />{webinarDetails.Date}</span>
                              </div>

                              <div className="col-6 d-flex justify-content-end">
                                <span><ClockFill style={{ marginRight: '15px', font: 'message-box', fontSize: '20px' }} /> {webinarDetails.StartTime} - {webinarDetails.EndTime}</span>
                              </div>


                            </div>

                            <div class="price-buy-block">
                              <div class="new-old-price">
                                <br></br>

                              </div>
                              {canRegister() && <button type="button" disabled={isLoading} class="btn btn-primary mt-4" onClick={() => handleRegister()}>Register</button>}
                              {isregistered() && !canJoin() && <button type="button" class="btn btn-primary disabled mt-4 tw-cursor-default">Registered</button>}
                              {!canRegister() && canJoin() && <button type="button" class="btn btn-primary mt-4" onClick={() => handleJoin()}>Join Now</button>}
                            </div>

                          </div>
                          <div className="">
                            <p className='pl-5 pr-5 para-webinar-details'>{webinarDetails.description}</p>
                          </div>
                        </div>
                      </div>



                    </div>
                  </section>


                </div>
              </div>
            )}

          </div>
        </CommonLayout>

      )}
    </>
  )
}

export default WebinarDetails
