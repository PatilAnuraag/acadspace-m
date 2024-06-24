import React from 'react'
import vedantulogo from '../../../assets/images/vedantulogo.png'
function BannerMaster() {
  return (
    <section className="vedantu-career my-5">
    <div className="row">
   
        <div className="col-lg-9 col-md-8">
            <h4>Less stress, more progress!</h4><br></br>
            <p>Book a free demo!</p>
        </div>
        <div className="col-lg-3 col-md-4 vedantu-career-img">
            <img src={vedantulogo} alt="world-img"/>
        </div>
</div>
</section>
  )
}

export default BannerMaster
