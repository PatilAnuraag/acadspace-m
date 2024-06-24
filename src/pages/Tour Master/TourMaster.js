import React, { useEffect, useState } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import SparklingStars from '../../assets/images/SparklingStars.png'
import congrats from '../../assets/images/congrats.png'
import report from '../../assets/images/report.png'
import complete_assigmnet from '../../assets/images/path-icon/complete-assigmnet.png'
import career_option from '../../assets/images/path-icon/career-option.png'
import career_path from '../../assets/images/path-icon/career-path.png'
import north_star from '../../assets/images/path-icon/north-star.png'
import workshop from '../../assets/images/path-icon/workshop.png'
import spacebugs from '../../assets/images/spacebugs-popup-img.png'
import { ChevronRight, Check, Lock } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import UpcomingMaster from '../Upcoming Master/UpcomingMaster';
import WebinarMaster from '../Dashboard/Webinar Master/WebinarMaster';
import WorkshopMaster from '../Dashboard/Workshop Master/WorkshopMaster';
import ScholarshipsMaster from '../Scholarships Master/ScholarshipsMaster';
import { useDispatch } from 'react-redux';
import { setTestID } from '../../store/Quiz/action';
import { setReport } from '../../store/Career/action';
import { handleDynamicRequestHeader } from '../../components/common/DyanamicRequest';
import { BASE_URL } from '../../components/common/AppConfig';
import { setSpaceBucksNew } from '../../store/Role/action';
// import SpacebugPopup from '../../assets/images/paymentPopup.png';
import SpacebugPopup from '../../assets/images/spacebug-popup.svg';
import PaymentIcon from '../../assets/images/paymentSuccess.png';

function TourMaster({ testDetails }) {
    const [showModal, setShowModal] = useState(false);
    const [showFirst, setShowFirst] = useState(false);
    const [showSecond, setShowSecond] = useState(false);
    const [showThird, setShowThird] = useState(false);
    const [careerProgress, setCareerProgress] = useState(false);
    const quizFirst = useSelector((state) => state.quizReducer.quizFirst);
    const quizSecond = useSelector((state) => state.quizReducer.quizSecond);
    const quizThird = useSelector((state) => state.quizReducer.quizThird);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState('');
    const userToken = useSelector((state) => state.roleReducer.jwtToken);
    const [alertMessage, setAlertMessage] = useState({ success: '', error: '' });
    const [isOpen, setIsOpen] = useState(false);
    const [paymentPopup, setPaymentPopup] = useState(false);
    const [spaceBucksAdded, setSpaceBucksAdded] = useState(false);

    const openModel = async () => {
        setIsOpen(true);
    };
    const closeModel = async () => {
        setIsOpen(false);
        handleSpacebucks();
        if (userDetails !== null && userDetails !== undefined) {
            window.open(userDetails, '_blank');
            const requestBody = { keyword: 'DOWNLOAD_REPORT' };
            const method = 'POST';
            const url = `${BASE_URL}/mobile/addSpacebucks`;
            const token = await userToken;
            const wrongResponse = () => {
                setAlertMessage({ success: '', error: 'Something went wrong' });
            }
            const rightResponse = (data) => {
            };
            handleDynamicRequestHeader(method, url, requestBody, token, wrongResponse, rightResponse);
            handleSpacebucks();

        }
    }
    useEffect(() => {
        handleUserDetails();
        handleReportStatus();
        handlePaymentStatus();
    }, []);

    const handleUserDetails = async () => {
        const requestBody = {};
        const method = 'POST';
        const url = `${BASE_URL}/mobile/reportDownload`;
        const token = userToken;

        const wrongResponse = () => {
            setAlertMessage({ success: '', error: 'Something went wrong' });
        }
        const rightResponse = (data) => {
            setUserDetails(data.link)
            dispatch(setReport(data.link))

        }
        handleDynamicRequestHeader(method, url, requestBody, token, wrongResponse, rightResponse)
    }

    const handleReportStatus = async () => {
        const requestBody = {};
        const method = 'POST';
        const url = `${BASE_URL}/mobile/careerPogressStatus`;
        const token = userToken;

        const wrongResponse = () => {
            setAlertMessage({ success: '', error: 'Something went wrong' });
        }
        const rightResponse = (data) => {
            setCareerProgress(data)

        }
        handleDynamicRequestHeader(method, url, requestBody, token, wrongResponse, rightResponse)
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
    const downloadFile = async () => {
        setIsOpen(true);


    }
    const toggleModal = () => {
        setShowModal(prevState => !prevState);
    };

    const handleTest = (quizNumber) => {
        const timestamp = Date.now();
        const combinedValue = `${quizNumber}_${timestamp}`;
        const encryptedValue = btoa(combinedValue);
        navigate(`/test/${encryptedValue}`);
    }

    useEffect(() => {
        if (quizFirst) {
            setShowFirst(true);
        }
        if (quizSecond) {
            setShowSecond(true);
        }
        if (quizThird) {
            setShowThird(true);
        }
    }, [quizFirst, quizSecond, quizThird, testDetails]);

    const steps = [
        {
            imageSrc: complete_assigmnet,
            title: "Complete<br />3 assessment",
            active: careerProgress.stage1 >= 99,
        },
        {
            imageSrc: career_option,
            title: "Unlock<br />career options",
            active: careerProgress.stage2 === 100,
        },
        {
            imageSrc: career_path,
            title: "Explore career<br />paths",
            ...(careerProgress.stage2 === 100
                ? { percentage: careerProgress.stage3 }
                : {}),
            active: careerProgress.stage3 === 100,
        },
        {
            imageSrc: workshop,
            title: "Upskill with<br />workshops",
            ...(careerProgress.stage3 === 100
                ? { percentage: careerProgress.stage4 }
                : {}),
            active: careerProgress.stage4 === 100,
        },

    ];

    const renderStep = (stepNumber, title, description, buttonText, handleClick, isShown) => {
        if (isShown) {
            return (
                <div className="mb-4 col-lg-4 col-md-6 mb-lg-0 mb-sm-4">
                    <div className="px-4 py-3 congrats-step border-radius-24">
                        <img src={congrats} alt="congrats" />
                        <h2>Congrats!</h2>
                        <p>You have successfully completed the test.</p>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={`col-lg-4 col-md-6 mb-lg-0 mb-sm-4 mb-4`}>
                    <div className={`future-step-${stepNumber} py-3 px-4 border-radius-24`}>
                        <div className="section-overlay"></div>
                        <div className="text-white text-time">
                            <i className="p-1 bi bi-clock-fill"></i> {description}
                        </div>
                        <div className="steps-numbers">{stepNumber}</div>
                        <div className="text-white steps-involve">
                            <h2>{title}</h2>
                            <p>{buttonText}</p>
                        </div>
                        <div className="text-center">
                            <button
                                type="button"
                                onClick={() => {
                                    handleClick(stepNumber);
                                    const testIDValue = testDetails[`test${stepNumber}`].testID;
                                    dispatch(setTestID(testIDValue));
                                }}
                                className="btn btn-light border-radius-16"
                            >
                                Take the test
                            </button>
                        </div>
                    </div>
                </div>
            );
        }
    };

    const handlePaymentStatus = async () => {
        const requestBody = {};
        const method = 'POST';
        const url = `${BASE_URL}/last_Razorpay_status`;
        const token = await userToken;
        const wrongResponse = () => {
            setAlertMessage({ success: '', error: 'Something went wrong' });
        }
        const rightResponse = (data) => {
            if (data.status === 200) {
                setPaymentPopup(true);
                setSpaceBucksAdded(data.SpaceBucks)
            }
        };
        handleDynamicRequestHeader(method, url, requestBody, token, wrongResponse, rightResponse);
    }

    return (

        <div className="row">
            <div className="col-lg-12">
                {showFirst && showSecond && showThird ? (
                    <>
                        {userDetails ? (
                            <div className="explore-card explore-report-ready add-explore-report-ready">
                                <div className="row d-flex align-items-center justify-content-center">
                                    <div className="col-lg-7 col-md-12 col-sm-12 col-10">
                                        <div className="explore-report">
                                            <h2>Yayy, your career report is ready!</h2>
                                            <a onClick={downloadFile} href="#">View report <ChevronRight className='icon-bold' /></a>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-2 col-sm-3 col-12">
                                        <img src={report} className="report-img" alt="report" />
                                    </div>
                                </div>
                            </div>
                        ) : (<></>)}
                        {careerProgress && (
                            <div className="mb-4 progress-bar">
                                <div className="row">
                                    <div className="mb-4 section-header d-md-flex justify-content-md-between align-items-md-center">
                                        <h2><span>Your progress</span></h2>
                                    </div>
                                    <div className="progress-path">
                                        {steps.map((step, index) => (
                                            <div key={index} className={`step-one${step.active ? '' : ' non-active'}`}>
                                                <div className="outer-progress">
                                                    <img src={step.imageSrc} alt="" />
                                                    {step.percentage !== undefined ? (
                                                        <span className="check-progress text-percentage">{step.percentage}%</span>
                                                    ) : (
                                                        <span className="check-progress">{step.active ? <Check /> : <Lock className='icon-bold-lock' />}</span>
                                                    )}
                                                </div>
                                                <h3 dangerouslySetInnerHTML={{ __html: step.title }} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        {/* <div className="explore-card">
                            <div className="row d-flex align-items-center justify-content-center">
                                <div className="text-left col-lg-2 col-md-2 col-sm-3 col-12">
                                    <img src={SparklingStars} className="" alt="stars" />
                                </div>
                                <div className="col-lg-7 col-md-7 col-sm-12 col-10">
                                    <div className="explore-acadspace">
                                        <h2>New to AcadSpace?</h2>
                                        <p>There’s so much to explore, let’s take a walkthrough.</p>
                                    </div>
                                </div>
                                <div className="mt-4 col-lg-3 col-md-3 col-sm-12 mt-sm-0 d-flex justify-content-center">
                                    <button type="button" onClick={toggleModal} className="btn-take-tour">
                                        Take a tour
                                    </button>
                                </div>
                            </div>
                        </div> */}
                        {testDetails && Object.keys(testDetails).length > 0 && (
                            <div className="future-steps">
                                <div className="row">
                                    {renderStep(
                                        1,
                                        testDetails.test1.name,
                                        testDetails.test1.time + ' min',
                                        testDetails.test1.testdesc,
                                        handleTest,
                                        showFirst
                                    )}
                                    {renderStep(
                                        2,
                                        testDetails.test2.name,
                                        testDetails.test2.time + ' min',
                                        testDetails.test2.testdesc,
                                        handleTest,
                                        showSecond
                                    )}
                                    {renderStep(
                                        3,
                                        testDetails.test3.name,
                                        testDetails.test3.time + ' min',
                                        testDetails.test3.testdesc,
                                        handleTest,
                                        showThird
                                    )}
                                </div>
                            </div>
                        )}

                    </>
                )}

                <WebinarMaster displayCount={2} />
                <WorkshopMaster />
                {(showFirst && showSecond && showThird) &&
                    <>
                        {/* <UpcomingMaster></UpcomingMaster> */}
                        <ScholarshipsMaster></ScholarshipsMaster>
                    </>
                }
            </div>
            <Modal isOpen={showModal} toggle={toggleModal} size="lg" centered>
                <ModalBody className='p-0'>
                    <div className="spacebugs-popup">
                        <button type="button" className="btn-close" onClick={toggleModal} aria-label="Close"></button>
                        <div className="spacebugs-popup-flex">
                            <img src={spacebugs} alt="" />
                            <div className="spacebugs-popup-content">
                                <p>
                                    <strong>SpaceBuck</strong> is the currency you get rewarded with for completing tasks like completing a test, downloading report, attending a webinar, etc.
                                </p>
                                <p>You can use these to unlock exciting discounts on exclusive workshops and premium subscription plans!</p>
                                <a href="#">Know more</a>
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
            {isOpen && (
                <Modal isOpen={openModel} toggle={openModel} backdrop="static" keyboard={false} size="lg">
                    <div class=" spacebug-popup">
                        <div class="modal-body">
                            <img src={spacebugs} />
                            <div className='spacebug-content-right'>
                                <p><strong>SpaceBuck</strong> is the currency you get rewarded with for completing tasks like completing a test, downloading report, attending a webinar, etc.</p>
                                {/* <p><strong>That </strong>is a great decision!, you are going to schedule a one-to-one session call with our one of the best counsellor for study abrod. As scheduling fee, we ll deduct 400 SpaceBucks from your wallet. Have fun!'</p> */}
                                <button onClick={closeModel} className='okay-btn' data-bs-dismiss="modal">Okay</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
            {paymentPopup && (
                <Modal
                    isOpen={setPaymentPopup}
                    toggle={setPaymentPopup}
                    backdrop="static"
                    keyboard={false}
                    size="lg"
                >
                    <div className=" spacebug-popup">
                        <div className="modal-body">
                            <img src={SpacebugPopup} className='' />
                            <div className=" tw-z-50 tw-w-full tw-flex-col tw-justify-center tw-items-center tw-my-4 md:tw-mt-14">
                                <div className="tw-font-bold tw-text-4xl re-tw-text-white tw-text-center ">Congratulations!</div>
                                <div className='tw-w-full tw-flex tw-justify-center tw-items-center md:tw-my-3'>
                                    <img src={PaymentIcon} className='tw-w-[30%] tw-object-contain tw-object-center' />
                                </div>
                                <div className='re-tw-text-white tw-font-semibold tw-text-xl tw-text-center md:tw-my-4'>
                                    Payment Successful
                                </div>
                                <div className='re-tw-text-white tw-text-center tw-my-2'><b>{spaceBucksAdded} SpaceBucks</b> have been credited to your wallet</div>

                                <div className='tw-w-full tw-flex tw-justify-center tw-items-center tw-my-3 '>
                                    <button onClick={() => setPaymentPopup(false)} className='okay-btn' data-bs-dismiss="modal">Okay</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    )
}

export default TourMaster
