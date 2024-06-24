import React, { useState, useEffect } from 'react';
import competitions1 from '../../assets/images/competitions1.png'
import competitions2 from '../../assets/images/competitions2.png'
import competitions3 from '../../assets/images/competitions3.png'
import { ChevronRight } from 'react-bootstrap-icons';

function UpcomingMaster(studentData) {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
      setUserData(studentData.studentData.juniorvalue);
    }, []);
  
    return (
        <>
          {userData.comps?.length > 0 && (           
          <div className="workshop mb-1">
                <div className="row">
                    <div
                        className="section-header d-md-flex justify-content-md-between align-items-md-center">
                        <h2><span>Upcoming competitions </span> curated for you</h2>
                        <a href="">Explore workshops <ChevronRight /></a>
                    </div>
                    {userData.comps.map((workshop, index) => (
                        <div key={index} className="col-lg-4 col-md-6 mb-lg-0 mb-sm-4 mb-4">
                            <div className="workshop-img border-radius-24">
                                <img src={workshop.CompetitionPic} alt="" />
                                {workshop.daysLeft && <div className="compitition-title">{workshop.Date} </div>}
                            </div>
                            <div className="workshop-details text-dark mt-3">
                                <h3>{workshop.CompetitionName}</h3>
                                <p>By {workshop.organisedby}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            )}
            </>
     
    )
}

export default UpcomingMaster
