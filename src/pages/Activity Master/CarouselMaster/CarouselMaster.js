import React from 'react'
import activity from '../../../assets/images/activity-subtract.png'
import date from '../../../assets/images/date-icon.png'
function CarouselMaster() {
    return (
        <>
            <div className="col-lg-12 mb-3 section-header d-md-flex justify-content-md-between align-items-md-center">
                <h2>Today’s Top <span>Activities</span></h2>
            </div>
            <section className="today-activities">
                <div className="row">
                    <div className="col-lg-8 col-md-7 today-activities-contentBlock">
                        <div className="today-activities-heading">
                            Learn coding with <span>LEGOS</span> <br></br>
                            <p>Hands On Interactive Workshop</p>
                        </div>
                        <div className="activity-happenon">
                            <img src={date} className="img-fluid" alt="date-icon" />21’ Feb | Sat | 02:00 pm
                        </div>
                        <div>
                            <button type="button" className="btn btn-primary">Register Now</button>
                            <span className="activity-earrning">**Earn 500 SpaceBucks</span>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-5 activity-img">
                        <img src={activity} className="img-fluid" />
                    </div>
                </div>
            </section>
        </>

    )
}

export default CarouselMaster
