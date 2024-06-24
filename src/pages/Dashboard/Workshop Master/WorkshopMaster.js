import React, { useEffect, useState } from 'react'
import { ChevronRight } from 'react-bootstrap-icons';
import { handleDynamicRequestHeader } from '../../../components/common/DyanamicRequest';
import { BASE_URL } from '../../../components/common/AppConfig';
import { useSelector } from 'react-redux';
function WorkshopMaster() {
    const [workshopData, setWorkshopData] = useState([]);
    const userToken = useSelector((state) => state.roleReducer.jwtToken);
    const [alertMessage, setAlertMessage] = useState({ success: '', error: '' });

    useEffect(() => {
        handleScholarship();
    }, []);
    const handleScholarship = async () => {
        const requestBody = {};
        const method = 'POST';
        const url = `${BASE_URL}/mobile/getAllScholarships`;
        const token = userToken;

        const wrongResponse = () => {
            setAlertMessage({ success: '', error: 'Something went wrong' });
        }
        const rightResponse = (data) => {
            setWorkshopData(data)

        }
        handleDynamicRequestHeader(method, url, requestBody, token, wrongResponse, rightResponse)
    }

    return (
        <>
          {workshopData && workshopData.webiners?.length>0 && workshopData.webiners.map((workshop, index) => (
        <div className="workshop">
            <div className="row">
                <div className="section-header mb-4 d-md-flex justify-content-md-between align-items-md-center">
                    <h2><span>Exciting workshops </span> to up-skill yourself</h2>
                    <a href="">Explore workshops  <ChevronRight /></a>
                </div>
              
                    <div key={index} className="col-lg-4 col-md-6 mb-lg-0 mb-sm-4 mb-4">
                        <div className="workshop-img border-radius-24">
                            <img src={workshop.WorkshopPic} alt="" />
                            {workshop.free && (
                                <div className="workshop-title text-white">Free Workshop</div>
                            )}
                        </div>
                        <div className="workshop-details text-dark mt-3">
                            <h3>{workshop.WorkshopName}</h3>
                            <p>{workshop.conductedBy}</p>
                        </div>
                    </div>
              
            </div>
        </div>
          ))}
        </>
    )
}

export default WorkshopMaster

