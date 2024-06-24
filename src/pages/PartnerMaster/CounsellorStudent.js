import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import CommonLayout from '../../components/common/CommonLayout';
import { handleDynamicRequestHeader } from '../../components/common/DyanamicRequest';
import { BASE_URL } from '../../components/common/AppConfig';
import { setActiveLink } from '../../store/Link/action';
import { useDispatch } from 'react-redux';
import Loader from '../../components/common/Loader';
import { useSelector } from 'react-redux';
import Analytics from './Analytics Master/Analytics';
import StudentList from './Student List/StudentList';
function CounsellorStudent() {
    const [isLoader , setIsLoader]=useState(true);
  const [testDetails , setTestDetails]=useState({});

  const [alertMessage, setAlertMessage] = useState({ success: '', error: '' });
  const userToken = useSelector((state) => state.roleReducer.jwtToken);
  const dispatch = useDispatch();

 useEffect(()=>{
    setTimeout(()=>{
        setIsLoader(false);
      },2000);
 })
 
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
       <StudentList/>
      </div>
    </CommonLayout>

    )}
</>
  )
}

export default CounsellorStudent
