import React,{useState} from 'react'
import world_study from '../../../assets/images/world-study.png';
import { ChevronRight } from 'react-bootstrap-icons';
import { handleDynamicRequestHeader } from '../../../components/common/DyanamicRequest';
import { BASE_URL } from '../../../components/common/AppConfig';
import SetAlert from '../../../components/common/SetAlert';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setSpaceBucksNew } from '../../../store/Role/action';
import SpacebugPopup from '../../../assets/images/spacebug-popup.svg';
import { Modal } from 'reactstrap';
function StudyAbroad() {
    const [alertMessage, setAlertMessage] = useState({ success: '', error: '' });
    const userToken = useSelector((state) => state.roleReducer.jwtToken);
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const openModel =async () => {
      setIsOpen(true);
    };
    const closeModel =async () => {
      setIsOpen(false);
      const requestBody = {  };
      const method = 'POST';
      const url = `${BASE_URL}/mobile/addToOneQueue`;
      const token = userToken;
      const wrongResponse = (data) => {
          setAlertMessage({ success: '', error: data.msg });
      }
      const rightResponse =async (data) => {
        setAlertMessage({ success: data.msg, error: '' });
        console.log(data.msg);
      
       if(!data.msg==='Already requested for call'){
         await SpaceBucksStudyAbroad();
        handleSpacebucks();
       }
       
      }
      handleDynamicRequestHeader(method, url, requestBody, token, wrongResponse, rightResponse);
    };
  
    const handleRegisterSeat = async () => {
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

const SpaceBucksStudyAbroad = async () => {
  const requestBody = { keyword: 'STUDY_ABROAD' };
  const method = 'POST';
  const url = `${BASE_URL}/mobile/deductSpacebucks`;
  const token = await userToken;
  const wrongResponse = () => {
      setAlertMessage({ success: '', error: 'Something went wrong' });
  }
  const rightResponse = (data) => {
  };
  handleDynamicRequestHeader(method, url, requestBody, token, wrongResponse, rightResponse);
};
   
  return (
    <>   
    <div className="mt-5">
    <SetAlert alertMessage={alertMessage} setAlertMessage={setAlertMessage} />
    </div>
    
                      <section className="want-study-abroad my-5 mb-0">
                        
                    <div className="row">
                        <div className="col-lg-9 col-md-8">

                            <heading>Want to study abroad ?</heading><br></br>
                            <p>Consult an expert for pursuing your dream career abroad.</p>

                            <a href="#" onClick={handleRegisterSeat}> 
                            {/* Book a seat in the next Study Abroad webinar  */}
                            Book a call
                            <ChevronRight/>
                            </a>
                        </div>
                        <div className="col-lg-3 col-md-4">
                            <img src={world_study} alt="world-img"/>
                        </div>
                    </div>
                </section>
                {isOpen && (
                <Modal isOpen={openModel} toggle={openModel} backdrop="static" keyboard={false} size="lg">
                    <div class=" spacebug-popup">
                        <div class="modal-body">
                            <img src={SpacebugPopup} />
                            <div className='spacebug-content-right'>
                                {/* <p><strong>SpaceBuck</strong> is the currency you get rewarded with for completing tasks like completing a test, downloading report, attending a webinar, etc.</p> */}
                                <p><strong>That </strong>is a great decision!, you are going to schedule a one-to-one session call with our one of the best counsellor for study abrod. As scheduling fee, we ll deduct 400 SpaceBucks from your wallet. Have fun!'</p>
                                <button onClick={closeModel} className='okay-btn' data-bs-dismiss="modal">Okay</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
                </>
 

  )
}

export default StudyAbroad
