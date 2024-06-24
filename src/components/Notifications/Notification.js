import React, { useState, useEffect } from 'react';
import Boat from '../../assets/images/boat.png'
import Logo from '../../assets/images/logo.png'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setActiveLink } from '../../store/Link/action';
import { useSelector } from 'react-redux';
import Notification_star from '../../assets/images/notification-star.png';
import Notification_test from '../../assets/images/notification-test.png';
import Notification_welcome from '../../assets/images/notification-welcome.png';
import Notification_career from '../../assets/images/notification-career.png';
import { handleDynamicRequestHeader } from '../../components/common/DyanamicRequest';
import NotificationIcon from '../../assets/images/notification.png';
import { BASE_URL } from '../../components/common/AppConfig';
import { setDisplayOff } from '../../store/Link/action';
function Notification({ setShowUserPopup, setShowNotification, showNotification }) {
    const [alertMessage, setAlertMessage] = useState({ success: '', error: '' });
    const userToken = useSelector((state) => state.roleReducer.jwtToken);
    const [userDetails, setUserDetails] = useState([]);
    const dispatch = useDispatch();
    const toggleNotification = () => {
        setShowNotification(!showNotification);
        setShowUserPopup(false);
        dispatch(setDisplayOff(showNotification));
    };
 const handleClose=()=>{
    dispatch(setDisplayOff(true));
    toggleNotification();
 }

    const notificationList = [Notification_welcome];

    useEffect(() => {
        fetchTestData();
    }, []);

    const fetchTestData = async () => {
        const requestBody = {};
        const method = 'POST';
        const url = `${BASE_URL}/mobile/getNotif`;
        const token = await userToken;
        const wrongResponse = () => {
            setAlertMessage({ success: '', error: 'Something went wrong' });
        }
        const rightResponse = (data) => {

            const notificationsWithImages = data.notif.map((notification, index) => ({
                ...notification,
                imgSrc: notificationList[index % notificationList.length]
            }));

            setUserDetails({ ...data, notif: notificationsWithImages });
        };

        handleDynamicRequestHeader(method, url, requestBody, token, wrongResponse, rightResponse);
    }

    return (

        <>
            <a href="#" onClick={toggleNotification}>
                <img src={NotificationIcon} alt="notification" /><span
                    className="notification-alert"></span></a>
            {showNotification && (
                <div className="notification-popup" style={{ display: showNotification ? 'block' : 'none' }}>
                    <button className='handle-close' onClick={handleClose}></button>
                    <ul>
                        {userDetails && userDetails.notif && userDetails.notif.length > 0 ? (
                            <ul>
                                {userDetails.notif.map((notify, index) => (
                                    <li key={index}>
                                        <img src={notify.imgSrc} alt="notification-img" />
                                        <div className="notification-info">
                                            <h2>{notify.title}</h2>
                                            <p>{notify.body}</p>
                                            {/* <span>Today</span> */}
                                        </div>
                                        <span className="notification-alert"></span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="no-notification-message">No notification yet!</p>
                        )}

                    </ul>
                </div>
            )}
        </>
    )
}

export default Notification
