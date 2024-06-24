import React from 'react'
import engineering from '../../../../assets/images/engineering.png';
function SteamDetail({steamDetails,filteredCareerData}) {
    console.log(steamDetails,'herk')
  return (
    <div>
          <section className="container">
        <div className="civil_engineering_JobType">
            <div className="row">
                <div className="col-md-9">
                    <heading>{steamDetails.title}</heading>
                    <p>
                       {steamDetails.desc}
                    </p>
                </div>
                <div className="text-center col-md-3">
                <img src={filteredCareerData[0].image || engineering} style={{width:'60%' , height:'60%'}} className="img-fluid" alt="" />
                </div>

                <div className="enginner-job-type row">
                    <label className=" col-md-2">Type of Jobs:</label>
                    <div className="JobType-badges col-md-10">
                        <span className="badge rounded-pill text-bg-primary">Site Engineer</span> 
                        <span className="badge rounded-pill text-bg-primary">Environmental Engineer</span> 
                        <span className="badge rounded-pill text-bg-primary">Transportation Engineer</span> 
                        <span className="badge rounded-pill text-bg-primary">Geotechnical Engineer</span> 
                        <span className="badge rounded-pill text-bg-primary">Structural Engineer</span> 
                        <span className="badge rounded-pill text-bg-primary">Water Resource Engineer</span> 
                        <span className="badge rounded-pill text-bg-primary">Construction Manager</span> 
                        <span className="badge rounded-pill text-bg-primary">Estimator</span> 
                        <span className="badge rounded-pill text-bg-primary">Nuclear Engineer</span> 
                    </div>
                </div>
            </div>
        </div>
    </section>
    </div>
  )
}

export default SteamDetail
