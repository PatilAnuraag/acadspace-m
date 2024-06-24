import React,{useEffect, useState} from 'react'
import career from '../../../assets/images/career-counsellor.png';
import { ChevronRight } from 'react-bootstrap-icons';
import { handleDynamicRequestHeader } from '../../../components/common/DyanamicRequest';
import { BASE_URL } from '../../../components/common/AppConfig';
import { useSelector, useDispatch } from 'react-redux';
import SetAlert from '../../../components/common/SetAlert';
function DreamMaster() {
  const [alertMessage, setAlertMessage] = useState({ success: '', error: '' });
  const userToken = useSelector((state) => state.roleReducer.jwtToken);
 
  const handleUserDetails = async () => {
    const requestBody = {};
    const method = 'POST';
    const url = `${BASE_URL}/mobile/addToOneQueue`;
    const token = userToken;
    const wrongResponse = (data) => {
        setAlertMessage({ success: '', error: data.msg });
    }
    const rightResponse = (data) => {
      setAlertMessage({ success: data.msg, error: '' });
    }
    handleDynamicRequestHeader(method, url, requestBody, token, wrongResponse, rightResponse)
}

  return (
    <>
    <div className="">
    <SetAlert alertMessage={alertMessage} setAlertMessage={setAlertMessage} />
    </div>
    <section class="dreamCareer my-5">
        
    <div class="row">

        <div class="col-lg-3 col-md-4">
            <img src={career} alt="career-counsellor"/>
        </div>
        <div class="col-lg-9 col-md-8">
            <h2>Not able to find your dream career?</h2><br></br>
            <p>Consult an expert for pursuing your dream career abroad.</p>
            <a href="#" onClick={handleUserDetails}> Talk to counsellor <ChevronRight/>
            </a>
        </div>
    </div>
</section>
    </>
    
  )
}

export default DreamMaster
