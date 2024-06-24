import React, { useState, useEffect } from 'react';

function LeaderMaster(studentData) {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    setUserData(studentData.studentData.juniorvalue);
  }, []);

  useEffect(()=>{
  },[userData])

  return (
    <>
      {userData.pic?.length > 0 && (
        <section className="Famous-celeb section-padding container Famous-grade-3-7-celeb mt-4 mb-5">
          <div className="row">
            <div className="Sec-HeadingBlock text-white ">
              <h4 className="pl-5" style={{ paddingLeft: '50px' }}>
                <b className="pl-5">Famous celebrities</b> you share your personality with
              </h4>
            </div>
            {userData.pic.map((celeb, index) => (
              <div className="col-lg-4 col-md-6 mb-md-3 text-center" key={index}>
                <div className="Famous-celebBlock">
                  <div className="celeb-img">
                    <img src={celeb.picname} className="img-fluid" alt="" />
                  </div>
                  <p className="text-center">
                    {celeb.name}
                    <br />
                    <span>{celeb.name}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default LeaderMaster;
