import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import TourMaster from '../Tour Master/TourMaster';
import CommonLayout from '../../components/common/CommonLayout';
import { setActiveLink } from '../../store/Link/action';
import { useDispatch } from 'react-redux';
import Loader from '../../components/common/Loader';
import { setQuizFirst, setQuizSecond, setQuizThird } from '../../store/Quiz/action';
import { setO_photo, setUserName, setNewRegister } from '../../store/Role/action';
import { useSelector } from 'react-redux';
import { handleDynamicRequestHeader } from '../../components/common/DyanamicRequest';
import { BASE_URL } from '../../components/common/AppConfig';
import {  Modal } from 'reactstrap';
import SpacebugPopup from '../../assets/images/spacebug-popup.svg';

function Dashboard() {
  const [userDetails, setUserDetails] = useState([]);
  const [isLoader , setIsLoader]=useState(true);
  const [testDetails , setTestDetails]=useState({});

  const [alertMessage, setAlertMessage] = useState({ success: '', error: '' });
  const userToken = useSelector((state) => state.roleReducer.jwtToken);
  const o_photo = useSelector((state) => state.roleReducer.o_photo);
  const newRegister = useSelector((state) => state.roleReducer.newRegister);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const openModel = async () => {
      setIsOpen(true);
  };

  const closeModel = async () => {
      setIsOpen(false);
      dispatch(setNewRegister(false));
  }

  useEffect(() => {
    if(newRegister){
      setTimeout(()=>{
        setIsOpen(true);
      },2000)
      
    }
    dispatch(setActiveLink('Home'));
    setTimeout(()=>{
      fetchTestData();
    },1000)
    setTimeout(()=>{
      setIsLoader(false);
    },2000);
    fetchUserData();
  }, [userToken, setActiveLink, newRegister]);

 const fetchTestData = async () => {
    const requestBody = {  };
    const method = 'POST';
    const url = `${BASE_URL}/mobile/getTestStatus`;
    const token =await userToken;
    const wrongResponse = () => {
      // setIsLoader(false); 
        setAlertMessage({ success: '', error: 'Something went wrong' });
    }
    const rightResponse = (data) => {
       const test1=data.test1.status;
       const test2=data.test2.status;
       const test3=data.test3.status;
      setTestDetails(data);
      if(test1) {
        dispatch(setQuizFirst(true));
        addFirstSpaceBucks();
      }else{
        dispatch(setQuizFirst(false));
      }
      if(test2){
        dispatch(setQuizSecond(true));
        addSecoundSpaceBucks();
      }else{
        dispatch(setQuizSecond(false));
      }if(test3){
        dispatch(setQuizThird(true));
       addThirdSpaceBucks();
      }else{
        dispatch(setQuizThird(false));
      }
      // setIsLoader(false);
    };

    handleDynamicRequestHeader(method, url, requestBody, token, wrongResponse, rightResponse);
}

const addFirstSpaceBucks = async () => {
  const requestBody = { keyword: 'TEST1_DONE' };
  const method = 'POST';
  const url = `${BASE_URL}/mobile/addSpacebucks`;
  const token = await userToken;
  const wrongResponse = () => {
      setAlertMessage({ success: '', error: 'Something went wrong' });
  }
  const rightResponse = (data) => {
  };
  handleDynamicRequestHeader(method, url, requestBody, token, wrongResponse, rightResponse);
};

const addSecoundSpaceBucks = async () => {
  const requestBody = { keyword: 'TEST2_DONE' };
  const method = 'POST';
  const url = `${BASE_URL}/mobile/addSpacebucks`;
  const token = await userToken;
  const wrongResponse = () => {
      setAlertMessage({ success: '', error: 'Something went wrong' });
  }
  const rightResponse = (data) => {
  };
  handleDynamicRequestHeader(method, url, requestBody, token, wrongResponse, rightResponse);
};

const addThirdSpaceBucks = async () => {
  const requestBody = { keyword: 'TEST3_DONE' };
  const method = 'POST';
  const url = `${BASE_URL}/mobile/addSpacebucks`;
  const token = await userToken;
  const wrongResponse = () => {
      setAlertMessage({ success: '', error: 'Something went wrong' });
  }
  const rightResponse = (data) => {
  };
  handleDynamicRequestHeader(method, url, requestBody, token, wrongResponse, rightResponse);
};
const fetchUserData = async () => {
 if(o_photo===null || o_photo===undefined){
  const requestBody = {};
  const method = 'POST';
  const url = `${BASE_URL}/mobile/profileDetails`;
  const token = await userToken;
  const wrongResponse = () => {
      setAlertMessage({ success: '', error: 'Something went wrong' });
  }
  const rightResponse = (data) => {
      setUserDetails(data);
     dispatch(setO_photo(data.student?.profilepic))
  };
  handleDynamicRequestHeader(method, url, requestBody, token, wrongResponse, rightResponse);
 }

}

  return (
    <>
    {isLoader ?(
    
   <Loader/>
    ):(
      <CommonLayout>
      <div className="left-navigation">
        <Sidebar></Sidebar>
      </div>
      <div className="right-content">
        <Navbar></Navbar>
        <TourMaster testDetails={testDetails}></TourMaster>
      </div>
    </CommonLayout>

    )}
    
    {isOpen && (
                <Modal isOpen={openModel} toggle={openModel} backdrop="static" keyboard={false} size="lg">
                    <div class=" spacebug-popup">
                        <div class="modal-body">
                            <img src={SpacebugPopup} />
                            <div className='spacebug-content-right'>
                                 <p><strong>Hey, welcome to AcadSpace family.</strong><br></br> <br></br> Let's build your career together. We are crediting 1200 SpaceBucks in your wallet. You can use it to book a webinar or workshop. </p> 
                                <p>You can gain more SpaceBucks by giving the tests, downloading report, exploring career options and by many more ways.</p>
                                <button onClick={closeModel} className='okay-btn' data-bs-dismiss="modal">Okay</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
</>
      )
}

export default Dashboard
