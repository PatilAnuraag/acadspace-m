import React, { useEffect, useState } from 'react'
import { handleDynamicRequestHeader } from '../../../components/common/DyanamicRequest';
import { BASE_URL } from '../../../components/common/AppConfig';
import leaderbulp from '../../../assets/images/leaderbulp.png'
import { ChevronRight } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import { LeadDescription}  from '../../../components/common/LeadDescription';
import { setSpaceBucksNew } from '../../../store/Role/action';
import { useDispatch } from 'react-redux';
import SpacebugPopup from '../../../assets/images/spacebug-popup.svg';
import { Modal } from 'reactstrap';
function LeadMaster(studentData) {
   const [alertMessage, setAlertMessage] = useState({ success: '', error: '' });
    const [userData, setUserData] = useState([]);
    const [matchedDescriptions, setMatchedDescriptions] = useState([]);
    const [userDetails, setUserDetails] = useState([]);
    const userToken = useSelector((state) => state.roleReducer.jwtToken);
    const userReport = useSelector((state) => state.careerReducer.report);
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const openModel =async () => {
      setIsOpen(true);
    };
    const closeModel =async () => {
      setIsOpen(false);
      handleSpacebucks();
      window.open(userReport, '_blank');
    }
    useEffect(() => {
        setUserData(studentData.studentData);
      }, []);


    const downloadFile=()=>{
      setIsOpen(true);
      
    }

    const handleSpacebucks = async () => {
        
      const requestBody = { };
      const method = 'POST';
      const url = `${BASE_URL}/mobile/getSpacebucks`;
      const token = userToken;
      const wrongResponse = () => {
          setAlertMessage({ success: '', error: 'Something went wrong' });
      }
      const rightResponse = (data) => {
          dispatch(setSpaceBucksNew(data.amount));
      }
      handleDynamicRequestHeader(method, url, requestBody, token, wrongResponse, rightResponse);
 
}
   
     
    useEffect(() => {
        if (userData && userData.personality) {
          const tempMatchedDescriptions = [];
          const userPersonalityLowercase = userData.personality.toLowerCase();
          for (const key in LeadDescription) {
            const keyLowercase = key.toLowerCase();
            if (keyLowercase === userPersonalityLowercase) {
              tempMatchedDescriptions.push(LeadDescription[key]);
            }
          }
          setMatchedDescriptions(tempMatchedDescriptions);
        }
      }, [userData]);
      
    return (
      <>
        <div className="leadeBlock section-padding text-white">
            <div className="row">
                <div className="col-md-4 col-12 leaderbulp-img">
                    <img src={leaderbulp} className="img-fluid mobile-v2leaderbulp-img" alt="leaderbulp" />
                </div>
                <div className="leaders-content activity-text-col text-white col-md-6 col-12">
                    Your personality type is: <br></br>
                    {userData && userData.juniorvalue && (
  <>
    <span style={{ textTransform: 'capitalize' }}>{userData.juniorvalue.subtitle || userData.personality}</span>
    <br />
    <p >{userData.juniorvalue.des || matchedDescriptions}</p>
  </>
)}

                    <button type="button" onClick={downloadFile} disabled={!userReport || userReport.length === 0}  className="btn btn-primary mb-3">Download Report &nbsp;
                        <ChevronRight />
                    </button>
                </div>
            </div>
            
        </div>
         {isOpen && (
          <Modal isOpen={openModel} toggle={openModel} backdrop="static" keyboard={false} size="lg">
              <div class=" spacebug-popup">
                  <div class="modal-body">
                      <img src={SpacebugPopup} />
                      <div className='spacebug-content-right'>
                          <p><strong>SpaceBuck</strong> is the currency you get rewarded with for completing tasks like completing a test, downloading report, attending a webinar, etc.</p>
                          {/* <p><strong>That </strong>is a great decision!, you are going to schedule a one-to-one session call with our one of the best counsellor for study abrod. As scheduling fee, we ll deduct 400 SpaceBucks from your wallet. Have fun!'</p> */}
                          <button onClick={closeModel} className='okay-btn' data-bs-dismiss="modal">Okay</button>
                      </div>
                  </div>
              </div>
          </Modal>
      )}
      </>
    )
}

export default LeadMaster
