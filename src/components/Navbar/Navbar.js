import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Star from '../../assets/images/star.svg';

import Malvika from '../../assets/images/student.jpeg';
import Logout from '../../assets/images/logout.png';
import Profile_icon from '../../assets/images/profile-icon.png';

import Arrow_Left from '../../assets/images/arrow-left.png';
import { useDispatch } from 'react-redux';
import { setQuizFirst, setQuizSecond, setQuizThird } from '../../store/Quiz/action';
import { setJwtToken, setUserRole, setUserId, setLogout, setSpaceBucksNew } from '../../store/Role/action';
import { setActiveLink, setLogoutLink } from '../../store/Link/action';
import { setLogoutCareer } from '../../store/Career/action';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { handleDynamicRequestHeader } from '../common/DyanamicRequest';
import { BASE_URL } from '../common/AppConfig';
import Notification from '../Notifications/Notification';
import { setDisplayOff } from '../../store/Link/action';
import { FaCartPlus } from "react-icons/fa";
import { Modal } from "reactstrap";
import SpacebugPopup from '../../assets/images/spacebug-popup.svg';

function Navbar({ handleBackClick, selectedStudent, }) {
    const [showUserPopup, setShowUserPopup] = useState(false);
    //const [spaceBucks, setSpaceBucks] = useState('');
    const activeLink = useSelector((state) => state.linkReducer.activeLink);
    const location = useLocation();
    const path = location.pathname.replace(/^\/+/, '');
    const showBackButton = path.includes('activity/webinar') || path.includes('courses') || path.includes('task') || handleBackClick;
    const o_photo = useSelector((state) => state.roleReducer.o_photo);
    const userName = useSelector((state) => state.roleReducer.userName);
    const userRole = useSelector((state) => state.roleReducer.userRole);
    const [alertMessage, setAlertMessage] = useState({ success: '', error: '' });
    const userToken = useSelector((state) => state.roleReducer.jwtToken);
    const spaceBucks = useSelector((state) => state.roleReducer.spaceBucks);
    const [showNotification, setShowNotification] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const togglePurchasePopup = () => {
        setShowPopup(!showPopup);
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(setDisplayOff(true));
        toggleUserPopup();
    }


    const toggleUserPopup = () => {
        setShowUserPopup(!showUserPopup);
        setShowNotification(false);
        if (!showUserPopup) {
            dispatch(setDisplayOff(false));
        }
    };

    const handleLogout = () => {
        sessionStorage.clear();
        localStorage.clear();
        setTimeout(() => {
            navigate('/');
            window.location.reload();
        }, 10);

        dispatch(setQuizFirst(false));
        dispatch(setQuizSecond(false));
        dispatch(setQuizThird(false));
        dispatch(setLogout());
        dispatch(setLogoutLink());
        dispatch(setLogoutCareer());
    }
    const handleProfile = () => {
        setTimeout(() => {
            navigate('/user');

        }, 10);
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
            // setSpaceBucks(data.amount);
            dispatch(setSpaceBucksNew(data.amount));
        }
        handleDynamicRequestHeader(method, url, requestBody, token, wrongResponse, rightResponse);

    }

    useEffect(() => {
        if (!userRole.includes('ROLE_COUNSELLOR')) {
            handleSpacebucks();
        }

    }, []);

    return (
        <div className="main-nav-top">
            {!showBackButton &&
                <div className="welcome-user">
                    <h2>Hi {userName},</h2>
                    <span>Welcome to AcadSpace!</span>
                </div>
            }
            {showBackButton &&
                <div className="welcome-user d-flex justifu-content-center align clickable" onClick={handleBackClick}>
                    <img className='clickable' src={Arrow_Left} alt="stars" />
                    <h2> &nbsp; Back</h2>
                </div>
            }
            <div className="user-all-details">
                {!userRole.includes('ROLE_COUNSELLOR') &&
                    <div className="star-points tw-cursor-pointer" onClick={() => navigate('/space-bucks')} >
                        <span>
                            <img src={Star} alt="stars" />
                            <div className="total-count">{spaceBucks}</div>
                        </span>
                    </div>
                }
                {/* <div onClick={() => navigate('/payment')} className='tw-hidden md:tw-block tw-bg-[#D7ECFF] tw-rounded-3xl tw-px-3 lg:tw-px-4 tw-py-2 lg:tw-py-3 tw-cursor-pointer tw-text-lg tw-font-semibold'><FaCartPlus size={24} /></div> */}
                <div onClick={togglePurchasePopup} className='tw-hidden md:tw-block tw-bg-[#D7ECFF] tw-rounded-3xl tw-px-3 lg:tw-px-4 tw-py-2 lg:tw-py-3 tw-cursor-pointer tw-text-lg tw-font-semibold'><FaCartPlus size={24} /></div>

                <div className="notification">


                    <Notification setShowUserPopup={setShowUserPopup} setShowNotification={setShowNotification} showNotification={showNotification} />

                </div>
                <div className="user-details" >

                    {o_photo ? (
                        <a href="#" onClick={toggleUserPopup}>
                            <img src={o_photo} alt="user-icon" />
                        </a>
                    ) : (
                        <a href="#" onClick={toggleUserPopup}>
                            <img src={Malvika} alt="Malvika" />
                        </a>
                    )}

                    {showUserPopup && (
                        <div className="popup-user" style={{ display: showUserPopup ? 'block' : 'none' }}>
                            <ul>
                                <button className='handle-close' onClick={handleClose}></button>
                                <li>
                                    <a onClick={handleProfile} className="profile-icon clickable">
                                        <img src={Profile_icon} alt="profile-icon" />
                                        Profile Details
                                    </a>
                                </li>
                                <li>
                                    <a onClick={handleLogout} className="logout clickable">
                                        <img src={Logout} alt="logout" /> Logout
                                    </a>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            {showPopup && <PurchasePopup onClose={togglePurchasePopup} currentSpaceBucks={spaceBucks} userToken={userToken} setAlertMessage={setAlertMessage} />}
        </div>
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

const LowBalancePurchasePopup = ({ onClose, currentSpaceBucks }) => {
    const [state, setState] = useState({ spaceBucks: 0, amount: 0 });
    const conversionRatio = 0.1;
    const tax = state.amount * 0.18;
    const total = (Number(state.amount) + tax).toFixed(2);

    const handleAmountChange = (event) => {
        const spaceBucks = event.target.value;
        const newAmount = spaceBucks * conversionRatio;
        setState({ ...state, spaceBucks: event.target.value, amount: newAmount.toFixed(2) });
    };

    const handleBuyNow = () => {
        // Logic to handle purchase using the entered amount
        console.log(`Purchasing ${state.amount} SpaceBucks for $${total}`);
        onClose();
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
                    <div className="spacebug-content-right">
                        <p>Current Balance : <span className="tw-text-red-500 tw-font-semibold tw-text-xl">{currentSpaceBucks}</span></p>
                        <p>
                            Your account is low on <b>SpaceBucks</b>.
                        </p>
                        <p>Buy SpaceBucks now for uninterrupted Career Journey!</p>
                        <div className="tw-flex tw-items-end">
                            <input
                                type="number"
                                id="amount"
                                value={state.spaceBucks || ''}
                                placeholder="Enter amount of SpaceBucks"
                                onChange={handleAmountChange}
                                className="tw-bg-[#EBF5FF] tw-py-3 tw-px-4 tw-rounded-xl tw-min-w-[260px] tw-border-none tw-placeholder-[#001E3A] tw-placeholder-opacity-30"
                            />
                            <div onClick={() => handleAddBucks(500)} className="tw-bg-[#EBF5FF] tw-p-2 tw-mx-2 tw-rounded-2xl tw-font-bold tw-text-base">500+</div>
                            <div onClick={() => handleAddBucks(1000)} className="tw-bg-[#EBF5FF] tw-p-2 tw-rounded-2xl tw-font-bold tw-text-base">1000+</div>
                        </div>
                        <div className="tw-bg-[#EBF5FF] tw-px-3 tw-py-2 tw-mt-3 tw-rounded-xl">
                            <div className="tw-flex tw-justify-between tw-items-center"><span className="tw-text-[#2B95F6]">Add to current balance</span> <span><span className="tw-text-[#2B95F6]">{state.spaceBucks || 0}</span> spacebucks</span> </div>
                            <div className="tw-flex tw-justify-between tw-my-2 tw-items-center"><span>Amount in Rupees</span> <span>₹{state.amount || 0}</span> </div>
                            <div className="tw-flex tw-justify-between tw-my-2 tw-items-center"><span>Tax (18% GST)</span> <span>₹{tax.toFixed(2)}</span> </div>
                            <div className="tw-flex tw-justify-between tw-my-2 tw-items-center tw-font-bold"><span>Total : </span> <span>₹{total}</span> </div>
                        </div>
                        <div>
                            <button onClick={handleBuyNow} className='okay-btn tw-mr-2' data-bs-dismiss="modal">Buy Now</button>
                            <button onClick={onClose} className='skip-btn' data-bs-dismiss="modal">Skip</button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default Navbar
