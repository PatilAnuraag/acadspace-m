import React, { useState, useRef, useEffect } from 'react';
import CommonHome from '../../components/common/CommonHome';
import { BASE_URL } from '../../components/common/AppConfig';
import SetAlert from '../../components/common/SetAlert';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { handleDynamicRequest } from '../../components/common/DyanamicRequest';
import { setUserId, setUserRole, setUserName, setJwtToken, setO_photo, setStudent, setPhone, setLogout } from '../../store/Role/action';
import logo from '../../assets/images/logo.png'
import Loader from '../../components/common/Loader';
import mixpanel from 'mixpanel-browser';

function Login() {
    const [showRequestForm, setShowRequestForm] = useState(true);
    const [showOtpForm, setShowOtpForm] = useState(false);
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [disableButton, setDisableButton] = useState(false);
    const [alertMessage, setAlertMessage] = useState({ success: '', error: '' });
    const otpInputs = useRef(Array.from({ length: 6 }, () => React.createRef()));
    const [mobileNo, setmobileNo] = useState('');
    const [otpValues, setOtpValues] = useState(Array(6).fill(''));
    const combinedOtp = otpValues.join('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLogout(null))
        if (showOtpForm) {
            const firstInput = otpInputs.current[0]?.current;
            if (firstInput) {
                firstInput.focus();
            }
        }
    }, [showOtpForm]);


    const handleRequestOTP = async () => {
        setIsLoader(true)
        const requestBody = { mobileNo: mobileNo };
        const method = 'POST';
        const url = `${BASE_URL}/mobile/signin`;
        const wrongResponse = () => {
            setShowRequestForm(true);
            setShowOtpForm(false);
            setIsLoader(false);
            setAlertMessage({ success: '', error: 'Wrong Mobile Number' });
        }
        const rightResponse = (data) => {
            if (data.msg === 'OTP sent to the registered mobile number') {
                setShowRequestForm(false);
                setShowOtpForm(true);
                setIsLoader(false)
            }
            else {
                setShowRequestForm(true);
                setShowOtpForm(false);
            }
        }
        handleDynamicRequest(method, url, requestBody, wrongResponse, rightResponse)
    }


    const handleVerifyOTP = async () => {
        setDisableButton(true);
        const requestBody = { mobileNo: mobileNo, otp: combinedOtp };
        const method = 'POST';

        const url = `${BASE_URL}/mobile/OTPCheck`;
        const rightResponse = (data) => {
            let sessionToken = data.token;

            const sessionExpiration = new Date().getTime() + 5000 * 60 * 5000;
            sessionStorage.setItem('sessionToken', sessionToken);
            sessionStorage.setItem('sessionExpiration', sessionExpiration);

            dispatch(setUserId(data.id));
            dispatch(setUserRole(data.role));
            dispatch(setUserName(data.name));
            dispatch(setStudent(data.student));
            dispatch(setPhone(data.mobileNo));
            dispatch(setJwtToken(data.token));
            setShowRequestForm(false);
            setDisableButton(false);

            mixpanel.track("Sign In", {
                "Signup Type": "Sign In Web",
                'name': data.name || 'asasa',
                'id': data.id || 'asasa',
                'mobileNo': data.mobileNo || mobileNo || 'asasa',
            }, () => {
                setTimeout(() => {
                    window.location.reload();
                }, 10);
            });

        }
        const wrongResponse = () => {
            setIsLoader(false);
            setDisableButton(false);
            setAlertMessage({ success: '', error: 'Wrong Otp' });
        }

        handleDynamicRequest(method, url, requestBody, wrongResponse, rightResponse)
    }

    const handleEmailSubmit = async () => {
        setDisableButton(true);
        const requestBody = { email: formData.email, password: formData.password };
        const method = 'POST';
        const url = `${BASE_URL}/auth/signin`;
        const wrongResponse = () => {
            setDisableButton(false);
            setAlertMessage({ success: '', error: 'Wrong Credentials' });
        }
        const rightResponse = (data) => {
            if (data) {
                setIsLoader(false);
                const sessionToken = data.token;
                const sessionExpiration = new Date().getTime() + 5000 * 60 * 5000;
                sessionStorage.setItem('sessionToken', sessionToken);
                sessionStorage.setItem('sessionExpiration', sessionExpiration);
                dispatch(setUserId(data.id));
                dispatch(setUserRole(data.roles));
                dispatch(setUserName(data.name));
                dispatch(setJwtToken(data.token));
                dispatch(setStudent(data.student));

                setTimeout(() => {
                    window.location.reload();
                }, 10);

            }
        }
        handleDynamicRequest(method, url, requestBody, wrongResponse, rightResponse)
    }

    const handleCloseOTP = () => {
        setShowRequestForm(true);
        setShowOtpForm(false);
        setShowEmailForm(false);
    };


    const handlemobileNoChange = (e) => {
        const input = e.target.value;
        const numericRegex = /^[0-9]+$/;

        if (numericRegex.test(input) && input.length <= 10) {
            setmobileNo(input);
        } else if (input === '') {
            setmobileNo('');
        }
    };

    const handleInputChange = (index, e) => {
        const input = e.target;
        const maxLength = parseInt(input.getAttribute('maxlength'));
        const currentLength = input.value.length;
        const numericRegex = /^[0-9\b]+$/;
        const value = input.value;

        if (/^\d*$/.test(value) && value.length <= 1) {
            const updatedOtpValues = [...otpValues];
            updatedOtpValues[index] = value;
            setOtpValues(updatedOtpValues);
        }
        if (!numericRegex.test(input.value)) {
            input.value = '';
            return;
        }

        if (e.key === 'Backspace' && index > 0) {
            if (input.value === '') {
                setTimeout(() => {
                    otpInputs.current[index - 1]?.focus();
                }, 0);
            }
            return;
        }

        if (currentLength === maxLength && index < otpInputs.current.length - 1) {
            setTimeout(() => {
                otpInputs.current[index + 1]?.focus();
            }, 0);
        }
    };

    const handleKeyUp = (index, e) => {
        const input = e.target;
        const maxLength = parseInt(input.getAttribute('maxlength'));
        const currentLength = input.value.length;

        if (e.key === 'Backspace' && index > 0 && input.value === '') {
            setTimeout(() => {
                otpInputs.current[index - 1]?.focus();
            }, 0);
        } else if (e.key === 'Enter') {
            handleVerifyOTP()
        } else if (currentLength === maxLength && index < otpInputs.current.length - 1 && e.key !== 'Backspace') {
            setTimeout(() => {
                otpInputs.current[index + 1]?.focus();
            }, 100);
        }
    };

    const handleKeyDown = (index, e) => {
        const input = e.target;
        const keyCode = e.keyCode || e.which;

        if (e.key === 'Backspace' && index > 0 && input.value === '') {
            setTimeout(() => {
                otpInputs.current[index - 1]?.focus();
            }, 0);
        }

        if (!((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105) || keyCode === 8)) {
            e.preventDefault();
        }
    };

    const handleEmail = () => {
        setShowEmailForm(true);
        setShowRequestForm(false)
    }

    const [formData, setFormData] = useState({
        email: '',
        password: '',


    });

    const handleInputChangeEmail = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleInputChangePassword = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleMobileLogin = () => {
        setShowRequestForm(true);
        setShowEmailForm(false);
    }

    const ismobileNoValid = mobileNo.length >= 10;
    const isOtpValid = otpValues.filter(value => value !== '').length === 6;
    const isEmailAndPasswordValid = formData.email.trim() !== '' && formData.password.trim() !== '';
    const [isLoader, setIsLoader] = useState(false);




    return (
        <>
            {!isLoader ? (
                <CommonHome>
                    <div className="create-account-middle-content">
                        <div className="create-account-info">
                            {showOtpForm &&
                                <button className="close-form" onClick={() => { handleCloseOTP() }}></button>
                            }
                            <div className="row justify-content-center">
                                <div className="col-lg-12 d-flex justify-content-center" style={{ width: '100%' }}>
                                    <img className='d-flex justify-content-center' style={{ width: '50%' }} src={logo} />
                                </div>
                            </div>

                            {/* <hr></hr> */}
                            {(showRequestForm || showEmailForm) && (
                                <div className='mt-4'>
                                    <p className='login-font'>Join us on the expedition to discover students future!</p>
                                </div>
                            )}

                            {showOtpForm && (
                                <div className='mt-4'>
                                    <p className='login-font'>Please enter OTP sent to your mobile number</p>

                                </div>
                            )}
                            <SetAlert alertMessage={alertMessage} setAlertMessage={setAlertMessage} />
                            {showRequestForm && (
                                <form className="create-account-form">
                                    <div className="row">
                                        <div className="col-lg-12">

                                            <input
                                                className="input col-icon"
                                                type="number"
                                                placeholder="Enter Phone Number"
                                                value={mobileNo}
                                                onChange={handlemobileNoChange}
                                                minLength={10}
                                                maxLength={10}
                                            />
                                        </div>
                                        <div className="col-lg-12">
                                            <button
                                                className={`request-otp ${!ismobileNoValid ? 'request-otp-disable' : ''}`}
                                                type="button"
                                                onClick={handleRequestOTP}
                                                disabled={!ismobileNoValid}
                                            >
                                                Request OTP
                                            </button>
                                        </div>

                                        <div className="col-lg-12 tw-w-full tw-flex tw-p-3 tw-justify-center tw-items-center">
                                            <a
                                                className={`${disableButton ? 'disabled' : ''}`}
                                                href="#"
                                                onClick={(e) => {
                                                    if (!disableButton) {
                                                        handleEmail(e);
                                                    }
                                                    e.preventDefault();
                                                }}
                                                style={{ pointerEvents: disableButton ? 'none' : 'auto' }}
                                            >
                                                Login with Email
                                            </a>
                                        </div>
                                    </div>
                                </form>
                            )}
                            {showOtpForm && (
                                <form className="create-account-form" onSubmit={handleVerifyOTP}>
                                    <div className="row">
                                        {Array.from({ length: 6 }, (_, index) => (
                                            <div className="col-2 d-flex" key={index}>
                                                <input
                                                    className="otpinput"
                                                    type="text"
                                                    inputMode="numeric"
                                                    maxLength={1}
                                                    ref={(element) => (otpInputs.current[index] = element)}
                                                    onChange={(e) => handleInputChange(index, e)}
                                                    onKeyUp={(e) => handleKeyUp(index, e)}
                                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                                />

                                            </div>
                                        ))}
                                    </div>
                                    <div className="col-lg-12">
                                        <button
                                            className={`request-otp ${isOtpValid ? '' : 'request-otp-disable'}`}
                                            type="submit"
                                            onClick={handleVerifyOTP}
                                            disabled={isOtpValid && disableButton}
                                        >
                                            Verify OTP
                                        </button>
                                    </div>
                                </form>
                            )}
                            {showEmailForm && (
                                <form className="create-account-form">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <label>Email</label>
                                            <input
                                                className="input"
                                                type="email"
                                                placeholder="Enter Your Email"
                                                value={formData.email}
                                                onChange={handleInputChangeEmail}
                                                name="email"
                                            />
                                        </div>
                                        <div className="col-lg-12">
                                            <label>Password</label>
                                            <input
                                                className="input"
                                                type="password"
                                                placeholder="Enter Your Password"
                                                value={formData.password}
                                                onChange={handleInputChangePassword}
                                                name="password"
                                            />
                                        </div>
                                        <div className="col-lg-12">
                                            <button
                                                className={`request-otp ${isEmailAndPasswordValid ? '' : 'request-otp-disable'}`}
                                                type="button"
                                                onClick={handleEmailSubmit}
                                                disabled={!isEmailAndPasswordValid}
                                            >
                                                Login with Email
                                            </button>
                                        </div>
                                        <div className="col-lg-12 tw-w-full tw-flex tw-p-3 tw-justify-center tw-items-center">
                                            <a
                                                className=""
                                                href="#"
                                                onClick={(e) => {
                                                    handleMobileLogin(e);
                                                    e.preventDefault();
                                                }}
                                            >
                                                Login with Mobile
                                            </a>
                                        </div>
                                    </div>
                                </form>
                            )}

                            <div className="col-lg-12">
                                <p className='pt-4 pb-0 mb-0 ' style={{ opacity: 0.5 }}>In case of help, contact: </p>
                                <p className='pb-2 mb-0'>support@acadspace.org </p>
                            </div>
                        </div>
                    </div>
                </CommonHome>
            ) : (
                <Loader></Loader>
            )}
        </>
    )
}

export default Login
