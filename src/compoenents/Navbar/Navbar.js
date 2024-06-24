import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Star from '../../assets/images/star.svg';
import Notification from '../../assets/images/notification.png';
import Malvika from '../../assets/images/malvika.png';
import Logout from '../../assets/images/logout.png';
import Profile_icon from '../../assets/images/profile-icon.png';
import Notification_star from '../../assets/images/notification-star.png';
import Notification_test from '../../assets/images/notification-test.png';
import Notification_welcome from '../../assets/images/notification-welcome.png';
import Notification_career from '../../assets/images/notification-career.png';
import { useDispatch } from 'react-redux';
import { setQuizFirst, setQuizSecond, setQuizThird } from '../../store/Quiz/action';
import { setJwtToken, setUserRole, setUserId} from '../../store/Role/action';
function Navbar() {
    const [showNotification, setShowNotification] = useState(false);
    const [showUserPopup, setShowUserPopup] = useState(false);
    const navigate=useNavigate();
    const dispatch = useDispatch();

    const toggleNotification = () => {
        setShowNotification(!showNotification);
      
    };
    const toggleUserPopup = () => {
        setShowUserPopup(!showUserPopup);
      
    };

    const handleLogout=()=>{
        sessionStorage.clear();
        localStorage.clear();
        setTimeout(()=>{
            navigate('/');
            window.location.reload();
        },10);

        dispatch(setQuizFirst(false));
        dispatch(setQuizSecond(false));
        dispatch(setQuizThird(false));
        dispatch(setUserId(' '));
        dispatch(setUserRole(' '));
    }
    
    return (
           <div className="main-nav-top">
                <div className="welcome-user">
                    <h2>Hi Malvika,</h2>
                    <span>Welcome to AcadSpace!</span>
                </div>
                <div className="user-all-details">
                    <div className="star-points">
                        <span>
                            <img src={Star} alt="stars" />
                            <div className="total-count">2,43,9002</div>
                        </span>
                    </div>
                    <div className="notification">
                        <a href="#" onClick={toggleNotification}>
                            <img src={Notification} alt="notification" /><span
                                className="notification-alert"></span></a>
                        {showNotification && (
                            <div className="notification-popup" style={{ display: showNotification ? 'block' : 'none' }}>
                                <ul>
                                    <li>
                                        <img src={Notification_star} alt="notification-img" />
                                        <div className="notification-info">
                                            <h2>Wohoo! You have earned 500 spacebucks.</h2>
                                            <p>Completed checking the recommended careers.</p>
                                            <span>Today</span>
                                        </div>
                                        <span className="notification-alert"></span>
                                    </li>
                                    <li>
                                        <img src={Notification_career} alt="notification-img" />
                                        <div className="notification-info">
                                            <h2>Your career report is ready to serve.</h2>
                                            <p>Check your recommended careers.</p>
                                            <span>Yesterday</span>
                                        </div>
                                    </li>
                                    <li>
                                        <img src={Notification_test} alt="notification-img" />
                                        <div className="notification-info">
                                            <h2>You are done with Aptitude Test!</h2>
                                            <p>Complete your steps ahead.</p>
                                            <span>21/10/23</span>
                                        </div>
                                    </li>
                                    <li>
                                        <img src={Notification_welcome}
                                            alt="notification-img" />
                                        <div className="notification-info">
                                            <h2>Welcome to the acadspace.</h2>
                                            <p>Take a tour to get familiar with platform.</p>
                                            <span>18/10/23</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="user-details" >
                    <a href="#" onClick={toggleUserPopup}>
                <img src={Malvika} alt="user-icon" />
            </a>
            {showUserPopup && (
                <div className="popup-user"  style={{ display: showUserPopup ? 'block' : 'none' }}>
                    <ul>
                        <li>
                            <a href="#" className="profile-icon clickable">
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
            </div>
          
       
    )
}

export default Navbar
