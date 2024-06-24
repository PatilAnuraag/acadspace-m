import React from 'react'
import CommonLayout from '../../../components/common/CommonLayout'
import Sidebar from '../../../components/Sidebar/Sidebar'
import Navbar from '../../../components/Navbar/Navbar'
import WebinarMaster from '../../Dashboard/Webinar Master/WebinarMaster';
import UpcomingMaster from '../../Upcoming Master/UpcomingMaster';
import { ChevronRight} from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
function ActivitySubMaster() {
    const navigate = useNavigate();
   
    const breadcrumbItems = [
        { label: 'Activity Center', link: '/activity' },
        { label: 'Webinars', link: '/activity/webinar', isActive: true },
      ];
    
      const separator = (
        <span style={{ color: '#001E3A', marginLeft: '4px', marginRight: '4px' }}><ChevronRight/></span>
      );
      const handleBackToActivity = () => {
        console.log('hello')
        return navigate('/activity');
      };
  return (
    <CommonLayout>
    <div className="left-navigation">
      <Sidebar></Sidebar>
    </div>
    <div className="right-content">
      <Navbar  handleBackClick={handleBackToActivity} ></Navbar>
      <div className="row">
      <div className="col-lg-12">
      <section className="bradercrums-block my-5 mt-0 bradercrums-width" >
      <div className="row">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            {breadcrumbItems.map((item, index) => (
              <React.Fragment key={index}>
                <li className="breadcrumb-item">
                  <a href={item.link}>{item.label}</a>
                </li>
                {index !== breadcrumbItems.length - 1 && separator}
              </React.Fragment>
            ))}
          </ol>
        </nav>
      </div>
    </section>

</div>

          <div className="col-lg-12">
          <WebinarMaster ></WebinarMaster>
         </div>
          {/* <div className="col-lg-12">
          <UpcomingMaster></UpcomingMaster>
         </div> */}
         
         </div>
      
    </div>
  </CommonLayout>
  )
}

export default ActivitySubMaster
