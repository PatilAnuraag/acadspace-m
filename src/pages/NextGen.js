import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { BASE_URL } from '../components/common/AppConfig';
import { useDispatch } from 'react-redux';
import { setUserId, setUserRole, setUserName, setJwtToken, setO_photo, setStudent, setPhone, setLogout } from '../store/Role/action';
import { handleDynamicRequestHeader } from '../components/common/DyanamicRequest';
import SetAlert from '../components/common/SetAlert';

function NextGen() {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('npl_sso_token');
    const [alertMessage, setAlertMessage] = useState({ success: '', error: '' });
    const [error, setError] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchdata = async () => {
            console.log('got the token : ', token);
            const requestBody = { sso_token: token };
            const method = 'POST';
            const apiUrl = `${BASE_URL}/auth/nextgenlogin`;

            const urlWithParams = new URL(apiUrl);

            try {
                // const token = await userToken;
                const wrongResponse = () => {
                    setAlertMessage({ success: '', error: 'Invalid or expired sso token' });
                    setError(true)
                }
                const rightResponse = (data) => {
                    setError(false)

                    if (data.code === 0) {

                        console.log('got the data.user : ', data.user);

                        let sessionToken = data.user.token;

                        const sessionExpiration = new Date().getTime() + 5000 * 60 * 5000;
                        sessionStorage.setItem('sessionToken', sessionToken);
                        sessionStorage.setItem('sessionExpiration', sessionExpiration);

                        dispatch(setUserId(data.user.id));
                        dispatch(setUserRole(data.user.role));
                        dispatch(setUserName(data.user.name));
                        dispatch(setStudent(data.user.student));
                        dispatch(setPhone(data.user.mobileNo));
                        dispatch(setJwtToken(data.user.token));

                        setTimeout(() => {
                            window.location.reload();
                        }, 10);
                    } else {
                        setAlertMessage({ success: '', error: data.msg });
                    }
                };
                handleDynamicRequestHeader(method, urlWithParams, requestBody, '', wrongResponse, rightResponse);

                // window.location.href = '/dashboard';
                // http://app.acadspace.org/nextgen?npl_sso_token=ababshbshsbhs
            } catch (error) {
                console.error('Error fetching data.user:', error);
            }
        };

        fetchdata();
    }, [])

    return (
        <div>
            {/* {alertMessage && alertMessage.success && <p>{alertMessage.success}</p>}
            {alertMessage && alertMessage.error && <p>{alertMessage.error}</p>} */}
            <SetAlert alertMessage={alertMessage} setAlertMessage={setAlertMessage} />

            {error && <div className='next-gen tw-w-full mt-4'> </div>}
        </div>
    )
}

export default NextGen
