import React, { useEffect, useState } from 'react'
import { ChevronRight } from 'react-bootstrap-icons';
import { handleDynamicRequestHeader } from '../../components/common/DyanamicRequest';
import { BASE_URL } from '../../components/common/AppConfig';
import { useSelector } from 'react-redux';
function ScholarshipsMaster() {
    const [scholarshipsData, setScholarshipsData] = useState([]);
    const userToken = useSelector((state) => state.roleReducer.jwtToken);
    const [alertMessage, setAlertMessage] = useState({ success: '', error: '' });

    useEffect(() => {
        handleScholarship();
    }, []);
    const handleScholarship = async () => {
        const requestBody = {};
        const method = 'POST';
        const url = `${BASE_URL}/mobile/ActivityCenterDetails`;
        const token = userToken;

        const wrongResponse = () => {
            setAlertMessage({ success: '', error: 'Something went wrong' });
        }
        const rightResponse = (data) => {
            setScholarshipsData(data)

        }
        handleDynamicRequestHeader(method, url, requestBody, token, wrongResponse, rightResponse)
    }

    const handleClick = (title) => {
        window.open(title, '_blank');
    }

    return (
        <>
            {scholarshipsData && scholarshipsData.scholarship?.length > 0 && scholarshipsData.scholarship.map((scholarship, index) => (
                <div className="scolership">
                    <div className="row">
                        <div
                            className="mb-4 section-header d-md-flex justify-content-md-between align-items-md-center">
                            <h2><span>Scholarships </span> curated for you</h2>
                            {/* <a href="">Explore Scholarships <ChevronRight /></a> */} 
                        </div>

                        <div key={index} className="col-lg-6 col-md-6" style={{ cursor: 'pointer' }}>
                            <div className="scolership-details" onClick={() => { handleClick(scholarship.ScholarshipLink) }}>
                                <h3>{scholarship.ScholarshipName}</h3>
                                <p>{scholarship.organisedby}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default ScholarshipsMaster
