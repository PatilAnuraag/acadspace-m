import React, { useState, useEffect } from 'react';
import Boat from '../../assets/images/boat.png'
import Logo from '../../assets/images/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setActiveLink } from '../../store/Link/action';
import { useSelector } from 'react-redux';
import { setDisplayOff } from '../../store/Link/action';
import { BASE_URL } from '../common/AppConfig';
import SpacebugPopup from '../../assets/images/spacebug-popup.svg';
import { handleDynamicRequestHeader } from '../common/DyanamicRequest';
import { Modal } from 'reactstrap';
function Sidebar() {
    const activeLink = useSelector((state) => state.linkReducer.activeLink);
    //const storedNavItem = localStorage.getItem('activeNavItem');
    const [isLoader, setIsLoader] = useState(true);
    const [activeNavItem, setActiveNavItem] = useState(activeLink || 'Home');
    const userRole = useSelector((state) => state.roleReducer.userRole);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const quizFirst = useSelector((state) => state.quizReducer.quizFirst);
    const quizSecond = useSelector((state) => state.quizReducer.quizSecond);
    const quizThird = useSelector((state) => state.quizReducer.quizThird);
    const userToken = useSelector((state) => state.roleReducer.jwtToken);
    const spaceBucks = useSelector((state) => state.roleReducer.spaceBucks);
    const assigments = quizFirst + quizSecond + quizThird;
    const [isPurchasePopup, setIsPurchasePopup] = useState(false);
    const [isLowBalancePopup, setIsLowBalancePopup] = useState(false);
    const [alertMessage, setAlertMessage] = useState({ success: '', error: '' });

    const handleNavItemClick = (itemName) => {
        dispatch(setActiveLink(itemName));
        setActiveNavItem(itemName);
        //  localStorage.setItem('activeNavItem', itemName);
    };

    const handleChatBotAccess = (itemName) => {
        fetchChatData();
    };

    const handleDisplay = () => {
        dispatch(setDisplayOff(false));
    }
    const handleClose = () => {
        dispatch(setDisplayOff(true));
    }

    const closeModal = () => {
        setIsPurchasePopup(false)
    }

    const handleSubscribe = () => {
        const requestBody = { keyword : "CHATBOT"};
        const method = 'POST';
        const url = `${BASE_URL}/mobile/deductSpacebucks`;
        const token = userToken;
        const wrongResponse = () => {
            setAlertMessage({ success: '', error: 'Something went wrong' });
            setIsLoader(false);
        }
        const rightResponse = (data) => {
            console.log('Subscribr success : ', data);
            dispatch(setActiveLink('ChatBot'));
            setActiveNavItem('ChatBot');
            navigate('/chatbot');
        };
        handleDynamicRequestHeader(method, url, requestBody, token, wrongResponse, rightResponse);
    }

    useEffect(() => {

    }, []);

    useEffect(() => {
    }, [activeNavItem]);

    let navItems;

    if (userRole.includes('ROLE_COUNSELLOR')) {
        navItems = [
            { name: 'Home', label: 'Home', linkTo: '/consoler', className: 'nav-link-home' },
            { name: 'Student List', label: 'Student List', linkTo: '/student-list', className: 'nav-link-career' },
            { name: 'Schedules', label: 'Schedules', linkTo: '/schedules', className: 'nav-link-spacebucks' },
            // { name: 'Activity Center', label: 'Activity Center', linkTo: '/activity', className: 'nav-link-activity' },
            { name: 'Career Library', label: 'Career Library', linkTo: '/library', className: 'nav-link-library' },

        ];
    } else if (userRole.includes('ROLE_FREELANCER')) {
        navItems = [
            { name: '', label: '', linkTo: '/partner', className: 'mobile-logo-new' },
            { name: 'Home', label: 'Home', linkTo: '/partner', className: 'nav-link-home' },
            { name: 'Assigned Tasks', label: 'Assigned Tasks', linkTo: '/assigned-list', className: 'nav-link-career' },
            { name: 'Performance', label: 'Performance', linkTo: '/partner', className: 'nav-link-library' },
            { name: 'Wallet', label: 'Wallet', linkTo: '/partner', className: 'nav-link-spacebucks' },
            // { name: 'Activity Center', label: 'Activity Center', linkTo: '/activity', className: 'nav-link-activity' },
        ];
    }
    else {
        navItems = [
            { name: '', label: '', linkTo: '/dashboard', className: 'mobile-logo-new' },
            { name: 'Home', label: 'Home', linkTo: '/dashboard', className: 'nav-link-home' },
            { name: 'Career Report', label: 'Career Report', linkTo: '/career', className: 'nav-link-career' },
            { name: 'Activity Center', label: 'Activity Center', linkTo: '/activity', className: 'nav-link-activity' },
            { name: 'Career Library', label: 'Career Library', linkTo: '/library', className: 'nav-link-library' },
            { name: 'SpaceBucks', label: 'SpaceBucks', linkTo: '/space-bucks', className: 'nav-link-spacebucks' },
        ];
    }

    const closeLowBalancePopup = () => {
        setIsLowBalancePopup(false)
    }

    const fetchChatData = async () => {

        const requestBody = {};
        const method = 'POST';
        const url = `${BASE_URL}/mobile/updateUserThread`;
        const token = await userToken;
        const wrongResponse = () => {
            setAlertMessage({ success: '', error: 'Something went wrong' });
            setIsLoader(false);
        }
        const rightResponse = (data) => {

           

            if (data.status === 200) {
                setIsPurchasePopup(true)
            } else if (data.status === 401) {
                console.log('what data ', data);
                setIsLowBalancePopup(true)
            } else {
                dispatch(setActiveLink('ChatBot'));
                setActiveNavItem('ChatBot');
                navigate('/chatbot');
            }
        };
        handleDynamicRequestHeader(method, url, requestBody, token, wrongResponse, rightResponse);

    }

    return (

        <>
            <nav className="navbar navbar-expand-md">
                <a className="navbar-brand" href="#">
                    <img className="logo tw-ml-[0px]" src={Logo} alt="" />
                </a>
                <button className="navbar-toggler" onClick={handleDisplay} type="button" data-bs-toggle="collapse"
                    data-bs-target="#mynavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="mynavbar">
                    <button data-bs-toggle="collapse" data-bs-target="#mynavbar" className='navcllaps' onClick={handleClose}></button>
                    <ul className="nav-list-bar">
                        {navItems.map((item, index) => (

                            <li key={index} className={`nav-item ${activeNavItem === item.name ? 'active' : ''}`}>
                                <Link className={`nav-link ${item.className}`} to={item.linkTo}
                                    onClick={() => handleNavItemClick(item.name)}>
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                        {assigments === 3 && <div className=" md:tw-hidden tw-relative tw-items-center tw-justify-center tw-mx-3 tw-mt-8">
                            <div onClick={() => handleChatBotAccess()} className='tw-relative tw-cursor-pointer tw-z-20'>
                                <div className='tw-pb-2 tw-w-full tw-flex tw-justify-center tw-items-center'>
                                    <img className='tw-flex tw-w-6/12 tw-object-center' src={Boat} alt="Boat Img" />
                                </div>
                                <div className="">
                                    <div className='tw-text-black tw-text-center tw-w-full tw-font-bold tw-text-xl '>Get Your Answers</div>
                                    <p className='px-2 tw-font-light tw-text-sm tw-text-center' >Have Career related questions ask our AI Bot & Get Your Questions Answered</p>
                                </div>
                            </div>
                            <div className='tw-bg-[#DCEDFF] tw-w-full tw-h-[70%] tw-absolute tw-top-[35%] tw-left-0 tw-z-0 tw-rounded-xl'></div>
                        </div>}
                    </ul>
                </div>

                {isPurchasePopup && (
                    <Modal
                        isOpen={setIsPurchasePopup}
                        toggle={setIsPurchasePopup}
                        backdrop="static"
                        keyboard={false}
                        size="lg"
                    >
                        <div className=" spacebug-popup">
                            <div className="modal-body">
                                <img src={SpacebugPopup} />
                                <div className="spacebug-content-right">
                                    <p>
                                        <strong>Unlock Premium Access to AcadBot!</strong>
                                    </p>
                                    <p>Subscribe now for just 990 SpaceBucks and enjoy unlimited access to all of AcadBot’s premium features for 30 days. Enhance your learning experience with:</p>
                                    <p>
                                        <strong>Unlimited usage, Exclusive content, - Priority support</strong>
                                    </p>
                                    <p>Don’t miss out on this opportunity to maximize your career potential!</p>
                                    <strong>Confirm your subscription now!</strong>
                                    <div className='tw-mt-3'>
                                        <button onClick={handleSubscribe} className='okay-btn tw-mr-3' data-bs-dismiss="modal">Confirm</button>
                                        <button onClick={closeModal} className='skip-btn' data-bs-dismiss="modal">Skip</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal>
                )}

                {isLowBalancePopup && <LowBalancePurchasePopup onClose={closeLowBalancePopup} currentSpaceBucks={spaceBucks} setAlertMessage={setAlertMessage} userToken={userToken} />}

                {assigments === 3 && <div className="tw-hidden md:tw-block tw-relative tw-items-center tw-justify-center tw-mx-6 lg:tw-mx-12 lg:tw-px-2 xl:tw-px-3 tw-mt-8">
                    <div onClick={() => handleChatBotAccess()} className='tw-relative tw-cursor-pointer tw-z-20'>
                        <div className='tw-pb-2 tw-w-full tw-flex tw-justify-center tw-items-center'>
                            <img className='tw-flex tw-w-6/12 tw-object-center' src={Boat} alt="Boat Img" />
                        </div>
                        <div className="">
                            <div className='tw-text-black tw-text-center tw-w-full tw-font-bold tw-text-xl '>Get Your Answers</div>
                            <p className='px-2 tw-font-light tw-text-sm tw-text-center' >Have Career related questions ask our AI Bot & Get Your Questions Answered</p>
                        </div>
                    </div>
                    <div className='tw-bg-[#DCEDFF] tw-w-full tw-h-[70%] tw-absolute tw-top-20 tw-left-0 tw-z-0 tw-rounded-xl'></div>
                </div>}
            </nav>
        </>
    )
}

const LowBalancePurchasePopup = ({ onClose, currentSpaceBucks, setAlertMessage, userToken }) => {
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
                    <div className="spacebug-content-right tw-space-y-4">
                        <div>Current Balance : <span className="tw-text-red-500 tw-font-semibold tw-text-xl">{currentSpaceBucks}</span></div>
                        <div>
                            Your account is low on <b>SpaceBucks</b>.
                        </div>
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
                                <div onClick={() => handleAddBucks(500)} className="tw-bg-[#EBF5FF] tw-p-2 tw-mx-3 tw-rounded-2xl tw-font-bold tw-text-base tw-cursor-pointer">500+</div>
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
                            <button onClick={onClose} disabled={buyNow} className='skip-btn' data-bs-dismiss="modal">Skip</button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default Sidebar
