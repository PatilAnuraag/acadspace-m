import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../components/common/AppConfig';
import SetAlert from '../../components/common/SetAlert';
import CommonHome from '../../components/common/CommonHome';
import priyansh from '../../assets/images/student.jpeg';
import malvika from '../../assets/images/parents.jpeg';
import counselor from '../../assets/images/counsellor.jpeg';
import add from '../../assets/images/add-icon.png';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { handleDynamicRequest } from '../../components/common/DyanamicRequest';
import { setUserId, setUserName, setO_photo, setUserRole, setJwtToken } from '../../store/Role/action';
import Loader from '../../components/common/Loader';
function Profile() {
  const userRole = useSelector((state) => state.roleReducer.userRole);
  const student = useSelector((state) => state.roleReducer.student)
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [alertMessage, setAlertMessage] = useState({ success: '', error: '' });
  const [isLoader, setIsLoader] = useState(true);
  const [showCounsellorPopup, setShowCounsellorPopup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddAccountClick = () => {
    navigate('/register');
  };

  const handleStudent = async (student) => {
    const requestBody = { id: student._id };
    const method = 'POST';
    const url = `${BASE_URL}/mobile/studentProfileCheck`;
    const wrongResponse = () => {
      setAlertMessage({ success: '', error: 'Wrong Credentials' });
    }
    const rightResponse = (data) => {
      if (data) {

        const sessionToken = data.token;
        const sessionExpiration = new Date().getTime() + 5000 * 60 * 5000;
        sessionStorage.setItem('sessionToken', sessionToken);
        sessionStorage.setItem('sessionExpiration', sessionExpiration);
        dispatch(setJwtToken(data.token));
        console.log(data.token)
        dispatch(setUserId(data.id));
        dispatch(setUserRole(data.role));
        dispatch(setUserName(data.name));

        console.log(data)

      }
    }
    handleDynamicRequest(method, url, requestBody, wrongResponse, rightResponse)

    setSelectedStudent(student);
    dispatch(setO_photo(student.profilepic));
    navigate('/dashboard');
  }

  const handleParent = (role) => {
    navigate('/register', { state: { role } });
  }

  const handleCounsellor = () => {
    setShowCounsellorPopup(true);
  }

  const handleConfirmStudent = () => {
    setShowCounsellorPopup(false);
  }

  const handlePort = () => {
    navigate('/port');
  }

  useEffect(() => {

    // if(userRole.includes('ROLE_STUDENT')){
    //   navigate('/dashboard')
    // }
    setTimeout(() => {
      setIsLoader(false);
    }, 2000);
  }, [dispatch]);


  return (
    <>
      {isLoader ? (
        <Loader />
      ) : (
        <CommonHome  >
          {(userRole === 'ROLE_PARENT') &&
            <div className="onboarding-middle-content">
              <div className="onboarding-info">
                <h1>Welcome back!</h1>
                <p>Please select the account you want to log in to </p>
                <div className="users">
                  {student.map((student) => (
                    <div key={student._id} className="user-info" onClick={() => handleStudent(student)}>
                      <img src={student.profilepic} alt={student.name} />
                      <div className="user-name">{student.name}</div>
                    </div>
                  ))}
                  <div className="user-info-add" onClick={handleAddAccountClick}>
                    <div className="add-user">
                      <img src={add} alt="" />
                      <div className="add-account">Add account</div>
                    </div>
                  </div>
                </div>
                <span>If you already have an account on another number</span>
                <a onClick={handlePort}>port it here!</a>
              </div>
            </div>
          }

          {userRole === 'NEW_ACCOUNT' &&
            <div className="onboarding-middle-content">
              <div className="onboarding-info">
                <p>How do you want to use this App </p>
                <h1>Are you a-</h1>
                <div className="users">
                  <div className="user-info" onClick={() => handleParent('Student')}>
                    <img src={priyansh} alt="" />
                    <div className="user-name">Student</div>
                  </div>
                  <div className="user-info" onClick={() => handleParent('Parent')}>
                    <img src={malvika} alt="" />
                    <div className="user-name">Parent</div>
                  </div>
                  <div className="user-info" onClick={() => handleCounsellor()}>
                    <img src={counselor} alt="" />
                    <div className="user-name">Counsellor</div>
                  </div>
                </div>
                <span>If you already have an account on another number</span>
                <a onClick={handlePort}>port it here!</a>

              </div>
            </div>
          }

          <div className="onboarding-bottom-content">
            <h2>Trusted by 1M+ students</h2>
          </div>
        </CommonHome>
      )}
      {showCounsellorPopup && (
        <div className="tw-fixed tw-top-0 tw-left-0 tw-z-50 tw-flex tw-items-center tw-justify-center tw-w-full tw-h-full">
          <div className="tw-absolute tw-top-0 tw-left-0 tw-w-full tw-h-full tw-bg-gray-800 tw-bg-opacity-75"></div>
          <div className="tw-z-50 tw-p-8 tw-bg-white tw-rounded-lg tw-shadow-lg">
            <p className="tw-mb-4 tw-text-center tw-text-gray-800">
              This option is not for students. Are you sure you are not a student?
            </p>
            <div className="tw-flex tw-justify-center">
              <button
                className="tw-px-4 tw-py-2 tw-mr-4 tw-font-bold tw-text-white tw-rounded tw-bg-blue-500 tw-hover:tw-bg-blue-700"
                onClick={() => handleParent('Counsellor')}
              >
                I confirm I'm not a student
              </button>
              <button
                className="tw-px-4 tw-py-2 tw-font-bold tw-text-white tw-rounded tw-bg-red-500 tw-hover:tw-bg-red-700"
                onClick={() => handleConfirmStudent()}
              >
                I am a student
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  )
}

export default Profile
