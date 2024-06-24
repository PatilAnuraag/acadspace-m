import React, { useEffect, useState } from 'react'
import CommonLayout from '../../components/common/CommonLayout'
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
import WebinarMaster from '../Dashboard/Webinar Master/WebinarMaster';
import UpcomingMaster from '../Upcoming Master/UpcomingMaster';
import CarouselMaster from './CarouselMaster/CarouselMaster';
import BannerMaster from './BannerMaster/BannerMaster';
import WorkshopMaster from '../Dashboard/Workshop Master/WorkshopMaster';
import ScholarshipsMaster from '../Scholarships Master/ScholarshipsMaster';
import BlogMaster from './BlogMaster.js/BlogMaster';
import Loader from '../../components/common/Loader';
import { ChevronRight } from 'react-bootstrap-icons';
import { handleDynamicRequestHeader } from '../../components/common/DyanamicRequest';
import { BASE_URL } from '../../components/common/AppConfig';
import { useSelector } from 'react-redux';
function ActivityMaster() {
  const [isLoader, setIsLoader] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoader(false);
    }, 2000);
  });

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
      setScholarshipsData(data.scholarship)

    }
    handleDynamicRequestHeader(method, url, requestBody, token, wrongResponse, rightResponse)
  }

  const handleClick = (title) => {
    window.open(title, '_blank');
  }
  console.log(scholarshipsData)
  return (
    <>
      {isLoader ? (
        <Loader />

      ) : (
        <CommonLayout>
          <div className="left-navigation">
            <Sidebar></Sidebar>
          </div>
          <div className="right-content">
            <Navbar></Navbar>
            <div className="row">
              {/* <div className="col-lg-12 mb-5">
             <CarouselMaster/>
             </div> */}
              <div className="col-lg-12">
                <WebinarMaster displayCount={2}></WebinarMaster>
              </div>
              {/* <div className="col-lg-12">
             <UpcomingMaster></UpcomingMaster>
            </div> */}
              {/* <div className="col-lg-12">
             <BannerMaster/>
            </div>
             <div className="col-lg-12">
             <WorkshopMaster/>
            </div>

             <div className="col-lg-12">
             <BlogMaster/>
            </div> */}
              <div className="col-lg-12">
                {scholarshipsData && scholarshipsData?.length > 0 && scholarshipsData.map((scholarship, index) => (
                  <div className="scolership">
                    <div className="row">
                      <div
                        className="section-header mb-4 d-md-flex justify-content-md-between align-items-md-center">
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
              </div>
            </div>

          </div>
        </CommonLayout>
      )}
    </>


  )
}

export default ActivityMaster
