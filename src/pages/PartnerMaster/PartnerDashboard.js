import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import CommonLayout from '../../components/common/CommonLayout';
import Loader from '../../components/common/Loader';
import Analytics from './Analytics Master/Analytics';
function PartnerDashboard() {
    const [isLoader , setIsLoader]=useState(true);
  const [testDetails , setTestDetails]=useState({});

  const [alertMessage, setAlertMessage] = useState({ success: '', error: '' });

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
       <Analytics/>
      </div>
    </CommonLayout>

    )}
</>
  )
}

export default PartnerDashboard
