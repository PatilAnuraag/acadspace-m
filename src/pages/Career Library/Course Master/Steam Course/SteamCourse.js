import React from 'react'
import { ChevronRight } from 'react-bootstrap-icons';
import engineering from '../../../../assets/images/engineering.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSteam } from '../../../../store/Career/action';
function SteamCourse({ title, courseDetails, filteredCareerData }) {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const handleSteam=(title)=>{
        dispatch(setSteam(title));
        navigate(`/library/courses/steam`);
    }
    return (
        <section className="enginneringCareer-options container">
            <div className="row">
                <heading><b>Career Streams</b> in {title}</heading>
                {courseDetails && courseDetails.substreams?.length > 0 && (
                    courseDetails.substreams.map((steam, index) => (
                        <div className="col-md-6 col-lg-3" style={{cursor:'pointer'}} key={index} onClick={()=>{handleSteam(steam.heading)}}>
                            <div className="engCareer-1">
                                <div>
                                {filteredCareerData[0].image ? (
  <img src={filteredCareerData[0].image} style={{ width: '45%', height: '45%' }} className="img-fluid" alt="" />
) : (
  <img src={engineering} style={{ width: '45%', height: '45%' }} className="img-fluid" alt="" />
)}
                                    <ChevronRight/>
                                </div>
                                <p>{steam.heading}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>

    )
}

export default SteamCourse
