import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';


import CommonLayout from '../../components/common/CommonLayout';
import { setActiveLink } from '../../store/Link/action';
import { useDispatch } from 'react-redux';
import Loader from '../../components/common/Loader';
import { setQuizFirst, setQuizSecond, setQuizThird } from '../../store/Quiz/action';
import { setO_photo, setUserName } from '../../store/Role/action';
import { useSelector } from 'react-redux';
import { handleDynamicRequestHeader } from '../../components/common/DyanamicRequest';
import { BASE_URL } from '../../components/common/AppConfig';


import stars from '../../assets/images/starts.png';
import testone from '../../assets/images/testone.png';
import testtwo from '../../assets/images/testtwo.png';
import testthree from '../../assets/images/testthree.png';
import reports from '../../assets/images/reports.png';
import profile_bugs from '../../assets/images/profile-bugs.png';
import SpacebugsImg from '../../assets/images/spacebugs-img-box.svg';
import profile_activity from '../../assets/images/profile-activiti.png';
import SpacebugPopup from '../../assets/images/spacebug-popup.svg';
import edit_form from '../../assets/images/edit-form.png';
import { IoCartOutline } from "react-icons/io5";
import Boat from '../../assets/images/boat.png'


import SetAlert from '../../components/common/SetAlert';
import { InfoCircleFill } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'reactstrap';

function SpaceBucks() {
    const [isLoader, setIsLoader] = useState(true);
    const [spaceBucks, setSpaceBucks] = useState([]);
    const [alertMessage, setAlertMessage] = useState({ success: '', error: '' });
    const userToken = useSelector((state) => state.roleReducer.jwtToken);
    const [isOpen, setIsOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const openModel = () => {
        setIsOpen(true);
    };

    const closeModel = () => {
        setIsOpen(false);
    };

    const togglePurchasePopup = () => {
        setShowPopup(!showPopup);
    };

    useEffect(() => {
        fetchSpaceBucksData();
    }, []);


    const fetchSpaceBucksData = async () => {

        const requestBody = {};
        const method = 'POST';
        const url = `${BASE_URL}/mobile/spacebucksDetails`;
        const token = await userToken;
        const wrongResponse = () => {
            setAlertMessage({ success: '', error: 'Something went wrong' });
            setIsLoader(false);
        }
        const rightResponse = (data) => {
            setSpaceBucks(data);
            setIsLoader(false);
        };
        handleDynamicRequestHeader(method, url, requestBody, token, wrongResponse, rightResponse);

    }
    console.log(spaceBucks)



    const test1Title = { title: 'Complete first test to get 350 SpaceBucks', image: testone, bucks: 350 };
    const test2Title = { title: 'Complete second test to get 350 SpaceBucks', image: testtwo, bucks: 350 };
    const test3Title = { title: 'Complete third test to get 300 SpaceBucks', image: testthree, bucks: 300 };
    const downloadReportTitle = { title: 'Download report to get 50 SpaceBucks', image: reports, bucks: 50 };
    const webinarInterestTitle = {
        title: 'Explore your career and attend the webinar and get 200 SpaceBucks per webinar',
        note: 'Note:- Total 400 SpaceBucks will get deducted from you account per career exploration, 200 SpaceBucks for showing interest and other 200 for registration in webinar.', image: stars, bucks: 200
    };
    const studyAbroadTitle = {
        title: 'Schedule a one-to-one call to counsellor to get suggestions for studying abroad.',
        note: 'Note:- For scheduling, 400 SpaceBucks will get deducted from your account.', image: stars, bucks: 400
    };


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
                        <div className="tw-hidden md:tw-block">
                            <Navbar className="tw-hidden md:tw-block"></Navbar>
                        </div>
                        <div className="tw-block md:tw-hidden">
                            <Navbar handleBackClick={() => navigate(-1)}></Navbar>
                        </div>
                        <section className="profile-tab-nav">
                            <nav>
                                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                    <button className="nav-link active" id="nav-past-tab" data-bs-toggle="tab"
                                        data-bs-target="#nav-past" type="button" role="tab" aria-controls="nav-past"
                                        aria-selected="true">Completed</button>
                                    <button className="nav-link" id="nav-personal-tab" data-bs-toggle="tab"
                                        data-bs-target="#nav-personal" type="button" role="tab" aria-controls="nav-personal"
                                        aria-selected="false">Earn SpaceBucks</button>
                                </div>
                            </nav>
                            <div className="tab-content" id="nav-tabContent">
                                <div className="profile-past-activities completed-spacebugs-tab tab-pane fade show active" id="nav-past" role="tabpanel" aria-labelledby="nav-past-tab">

                                    <div className='row'>
                                        <div className='col-lg-7'>
                                            <h2>Completed</h2>
                                            <div className="row">
                                                {spaceBucks?.test1 > 0 && (
                                                    <div className="col-lg-12" >
                                                        <div className="past-activit-one spacebugs-img">
                                                            <img className='box-img' src={test1Title.image} alt="" />
                                                            <div>
                                                                <h3>{test1Title.title}</h3>
                                                                <p></p>
                                                                <span>
                                                                    <div className="profile-bugs">
                                                                        <img src={profile_bugs} alt="" />{test1Title.bucks}
                                                                    </div>{" "}
                                                                    <strong>Space</strong>bucks earned
                                                                </span>
                                                            </div>

                                                        </div>
                                                    </div>

                                                )}


                                                {spaceBucks?.test2 > 0 && (
                                                    <div className="col-lg-12" >
                                                        <div className="past-activit-one spacebugs-img">
                                                            <img className='box-img' src={test2Title.image} alt="" />
                                                            <div>
                                                                <h3>{test2Title.title}</h3>
                                                                <p></p>
                                                                <span>
                                                                    <div className="profile-bugs">
                                                                        <img src={profile_bugs} alt="" />{test2Title.bucks}
                                                                    </div>{" "}
                                                                    <strong>Space</strong>bucks earned
                                                                </span>
                                                            </div>

                                                        </div>
                                                    </div>

                                                )}


                                                {spaceBucks?.test3 > 0 && (
                                                    <div className="col-lg-12" >
                                                        <div className="past-activit-one spacebugs-img">
                                                            <img className='box-img' src={test3Title.image} alt="" />
                                                            <div>
                                                                <h3>{test3Title.title}</h3>
                                                                <p></p>
                                                                <span>
                                                                    <div className="profile-bugs">
                                                                        <img src={profile_bugs} alt="" />{test3Title.bucks}
                                                                    </div>{" "}
                                                                    <strong>Space</strong>bucks earned
                                                                </span>
                                                            </div>

                                                        </div>
                                                    </div>

                                                )}

                                                {spaceBucks?.stage2 > 0 && (
                                                    <div className="col-lg-12" >
                                                        <div className="past-activit-one spacebugs-img">
                                                            <img className='box-img' src={downloadReportTitle.image} alt="" />
                                                            <div>
                                                                <h3>{downloadReportTitle.title}</h3>
                                                                <p></p>
                                                                <span>
                                                                    <div className="profile-bugs">
                                                                        <img src={profile_bugs} alt="" />{downloadReportTitle.bucks}
                                                                    </div>{" "}
                                                                    <strong>Space</strong>bucks earned
                                                                </span>
                                                            </div>

                                                        </div>
                                                    </div>

                                                )}


                                                {spaceBucks?.stage3 > 0 && (
                                                    <div className="col-lg-12" >
                                                        <div className="past-activit-one spacebugs-img">
                                                            <img className='box-img' src={webinarInterestTitle.image} alt="" />
                                                            <div>
                                                                <h3>{webinarInterestTitle.title}</h3>
                                                                <p>{webinarInterestTitle.note}</p>
                                                                <span>
                                                                    <div className="profile-bugs">
                                                                        <img src={profile_bugs} alt="" />{webinarInterestTitle.bucks}
                                                                    </div>{" "}
                                                                    <strong>Space</strong>bucks earned
                                                                </span>
                                                            </div>

                                                        </div>
                                                    </div>

                                                )}
                                                {spaceBucks?.stage3 > 0 && (
                                                    <div className="col-lg-12" >
                                                        <div className="past-activit-one spacebugs-img">
                                                            <img className='box-img' src={studyAbroadTitle.image} alt="" />
                                                            <div>
                                                                <h3>{studyAbroadTitle.title}</h3>
                                                                <p>{studyAbroadTitle.note}</p>
                                                                <span>
                                                                    <div className="profile-bugs">
                                                                        <img src={profile_bugs} alt="" />{studyAbroadTitle.bucks}
                                                                    </div>{" "}
                                                                    <strong>Space</strong>bucks earned
                                                                </span>
                                                            </div>

                                                        </div>
                                                    </div>
                                                )}

                                            </div>
                                        </div>

                                        <div className='col-lg-5'>
                                            <div className='Spacebugs-right-img tw-h-full tw-max-h-[470px] tw-pt-2 tw-mt-3'>
                                                <span>{spaceBucks.bucks}</span>
                                                {/* <img src={SpacebugsImg} alt="" /> */}
                                            </div>
                                            <div className='tw-w-full tw-flex tw-justify-center tw-items-center'>
                                                <div onClick={togglePurchasePopup} className='tw-mt-6 md:tw-mt-3 tw-p-3 tw-w-[70%] tw-text-white tw-cursor-pointer tw-text-center tw-font-semibold tw-rounded-xl tw-bg-[#2d177a]'>Purchase More <IoCartOutline size={25} /> </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                                <div className="tab-pane fade profile-past-activities show " id="nav-personal" role="tabpanel" aria-labelledby="nav-personal-tab">
                                    <div className='row'>
                                        <div className='col-lg-7'>
                                            <h2>Earn SpaceBucks</h2>
                                            <div className="row">

                                                {!spaceBucks?.test1 > 0 && (
                                                    <div className="col-lg-12" >
                                                        <div className="past-activit-one spacebugs-img">
                                                            <img className='box-img' src={test1Title.image} alt="" />
                                                            <div>
                                                                <h3>{test1Title.title}</h3>
                                                                <p></p>
                                                                <span>
                                                                    <div className="profile-bugs">
                                                                        <img src={profile_bugs} alt="" />{test1Title.bucks}
                                                                    </div>{" "}
                                                                    <strong>Space</strong>bucks earned
                                                                </span>
                                                            </div>

                                                        </div>
                                                    </div>

                                                )}


                                                {!spaceBucks?.test2 > 0 && (
                                                    <div className="col-lg-12" >
                                                        <div className="past-activit-one spacebugs-img">
                                                            <img className='box-img' src={test2Title.image} alt="" />
                                                            <div>
                                                                <h3>{test2Title.title}</h3>
                                                                <p></p>
                                                                <span>
                                                                    <div className="profile-bugs">
                                                                        <img src={profile_bugs} alt="" />{test2Title.bucks}
                                                                    </div>{" "}
                                                                    <strong>Space</strong>bucks earned
                                                                </span>
                                                            </div>

                                                        </div>
                                                    </div>

                                                )}


                                                {!spaceBucks?.test3 > 0 && (
                                                    <div className="col-lg-12" >
                                                        <div className="past-activit-one spacebugs-img">
                                                            <img className='box-img' src={test3Title.image} alt="" />
                                                            <div>
                                                                <h3>{test3Title.title}</h3>
                                                                <p></p>
                                                                <span>
                                                                    <div className="profile-bugs">
                                                                        <img src={profile_bugs} alt="" />{test3Title.bucks}
                                                                    </div>{" "}
                                                                    <strong>Space</strong>bucks earned
                                                                </span>
                                                            </div>

                                                        </div>
                                                    </div>

                                                )}

                                                {!spaceBucks?.stage2 > 0 && (
                                                    <div className="col-lg-12" >
                                                        <div className="past-activit-one spacebugs-img">
                                                            <img className='box-img' src={downloadReportTitle.image} alt="" />
                                                            <div>
                                                                <h3>{downloadReportTitle.title}</h3>
                                                                <p></p>
                                                                <span>
                                                                    <div className="profile-bugs">
                                                                        <img src={profile_bugs} alt="" />{downloadReportTitle.bucks}
                                                                    </div>{" "}
                                                                    <strong>Space</strong>bucks earned
                                                                </span>
                                                            </div>

                                                        </div>
                                                    </div>

                                                )}


                                                {!spaceBucks?.stage3 > 0 && (
                                                    <div className="col-lg-12" >
                                                        <div className="past-activit-one spacebugs-img">
                                                            <img className='box-img' src={webinarInterestTitle.image} alt="" />
                                                            <div>
                                                                <h3>{webinarInterestTitle.title}</h3>
                                                                <p>{webinarInterestTitle.note}</p>
                                                                <span>
                                                                    <div className="profile-bugs">
                                                                        <img src={profile_bugs} alt="" />{webinarInterestTitle.bucks}
                                                                    </div>{" "}
                                                                    <strong>Space</strong>bucks earned
                                                                </span>
                                                            </div>

                                                        </div>
                                                    </div>

                                                )}
                                                {!spaceBucks?.stage3 > 0 && (
                                                    <div className="col-lg-12" >
                                                        <div className="past-activit-one spacebugs-img">
                                                            <img className='box-img' src={studyAbroadTitle.image} alt="" />
                                                            <div>
                                                                <h3>{studyAbroadTitle.title}</h3>
                                                                <p>{studyAbroadTitle.note}</p>
                                                                <span>
                                                                    <div className="profile-bugs">
                                                                        <img src={profile_bugs} alt="" />{studyAbroadTitle.bucks}
                                                                    </div>{" "}
                                                                    <strong>Space</strong>bucks earned
                                                                </span>
                                                            </div>

                                                        </div>
                                                    </div>
                                                )}

                                            </div>
                                        </div>

                                        <div className='col-lg-5 tw-flex-col tw-justify-center tw-items-center'>
                                            <div className='mb-4 Spacebugs-right-img tw-h-full'>
                                                <span>{spaceBucks.bucks}</span>
                                                {/* <img src={SpacebugsImg} alt="" /> */}
                                            </div>
                                            <div className='tw-w-full tw-flex tw-justify-center tw-items-center'>
                                                <div onClick={togglePurchasePopup} className='tw-w-[70%] tw-p-3 tw-text-white tw-cursor-pointer tw-text-center tw-font-semibold tw-rounded-xl tw-bg-[#2d177a]'>Purchase More <IoCartOutline size={25} /> </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                {showPopup && <PurchasePopup onClose={togglePurchasePopup} currentSpaceBucks={spaceBucks.bucks} userToken={userToken} setAlertMessage={setAlertMessage} />}
                            </div>
                        </section>
                        {/* Popup */}


                        {/* Popup */}
                    </div>
                </CommonLayout>

            )}
        </>
    )
}

const PurchasePopup = ({ onClose, currentSpaceBucks, userToken, setAlertMessage }) => {
    const [state, setState] = useState({ spaceBucks: 0, amount: 0, error: '' });
    const conversionRatio = 0.1;
    const tax = state.amount * 0.18;
    const total = (Number(state.amount) + tax).toFixed(2);
    const [buyNow, setBuyNow] = useState(false);

    const handleAmountChange = (event) => {
        const spaceBucks = event.target.value;

        // Validate input and update state with potential error message
        const newError = validateAmount(spaceBucks);
        setState({
            ...state,
            spaceBucks: spaceBucks,
            amount: (Number(spaceBucks) * conversionRatio).toFixed(2),
            error: newError,
        });
    };

    const validateAmount = (amount) => {
        if (isNaN(amount) || Number(amount) <= 0) {
            return 'Please enter a valid amount of SpaceBucks.';
        }
        return '';
    };

    const handleBuyNow = () => {

        const newError = validateAmount(state.spaceBucks);

        if(newError){
            setState({
                ...state,
                error: newError,
            });
            return;
        }

        setBuyNow(true);
        // Logic to handle purchase using the entered amount
        console.log(`Purchasing ${state.amount} SpaceBucks for $${total}`);
        const requestBody = { amount: total };
        const method = 'POST';
        const url = `${BASE_URL}/razorpay_paymentlink_create`;
        const token = userToken;
        const wrongResponse = (data) => {
            setAlertMessage({ success: '', error: 'Something went wrong \n', data });
        }
        const rightResponse = (data) => {
            console.log('check payment response : ', data.data.short_url);

            const shortUrl = data.data.short_url;

            if (shortUrl) {
                window.open(shortUrl, '_blank');
            }
            onClose();
        };
        handleDynamicRequestHeader(method, url, requestBody, token, wrongResponse, rightResponse);
    };

    const handleAddBucks = (addAmt) => {
        const spaceBucks = Number(state.spaceBucks) + addAmt;
        const newAmount = spaceBucks * conversionRatio;
        setState({ ...state, spaceBucks: spaceBucks, amount: newAmount });
    };

    return (
        <Modal
            isOpen={onClose}
            toggle={onClose}
            backdrop="static"
            keyboard={false}
            size="lg"
        >
            <div className=" spacebug-popup">
                <div className="modal-body">
                    <img src={SpacebugPopup} alt="Spacebug Popup" />
                    <div className="spacebug-content-right tw-space-y-4 ">
                        <div >Current Balance : <span className="tw-text-red-500 tw-font-semibold tw-text-xl">{currentSpaceBucks}</span></div>
                        <div>Buy SpaceBucks now for uninterrupted Career Journey!</div>
                        <div className="tw-flex tw-flex-col tw-w-full tw-items-end ">
                            <input
                                type="number"
                                id="amount"
                                value={state.spaceBucks || ''}
                                placeholder="Enter amount of SpaceBucks"
                                min={0}
                                onChange={handleAmountChange}
                                className={`tw-w-full tw-bg-[#EBF5FF] tw-py-3 tw-px-4 tw-rounded-xl tw-min-w-[260px] tw-border-none tw-placeholder-[#001E3A] tw-placeholder-opacity-30 ${state.error ? 'tw-border-red-500 tw-border-2' : ''}`}
                            />
                            {state.error && (
                                <span className="tw-text-xs tw-text-red-500 tw-mt-1">{state.error}</span>
                            )}
                            <div className='tw-flex tw-items-start tw-mt-3 tw-w-full'>
                                <div onClick={() => handleAddBucks(500)} className="tw-bg-[#EBF5FF] tw-p-2 tw-mx-2 tw-rounded-2xl tw-font-bold tw-text-base tw-cursor-pointer">500+</div>
                                <div onClick={() => handleAddBucks(1000)} className="tw-bg-[#EBF5FF] tw-p-2 tw-rounded-2xl tw-font-bold tw-text-base tw-cursor-pointer">1000+</div>
                            </div>
                        </div>
                        <div className="tw-bg-[#EBF5FF] tw-px-3 tw-py-2 tw-mt-3 tw-rounded-xl">
                            <div className="tw-flex tw-justify-between tw-items-center"><span className="tw-text-[#2B95F6]">Add to current balance</span> <span><span className="tw-text-[#2B95F6]">{state.spaceBucks || 0}</span> spacebucks</span> </div>
                            <div className="tw-flex tw-justify-between tw-my-2 tw-items-center"><span>Amount in Rupees</span> <span>₹{state.amount || 0}</span> </div>
                            <div className="tw-flex tw-justify-between tw-my-2 tw-items-center"><span>Tax (18% GST)</span> <span>₹{tax.toFixed(2)}</span> </div>
                            <div className="tw-flex tw-justify-between tw-my-2 tw-items-center tw-font-bold"><span>Total : </span> <span>₹{total}</span> </div>
                        </div>
                        <div>
                            <button onClick={handleBuyNow} disabled={buyNow} className='okay-btn tw-mr-2' data-bs-dismiss="modal">Buy Now</button>
                            <button onClick={onClose} disabled={buyNow} className='skip-btn' data-bs-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default SpaceBucks
